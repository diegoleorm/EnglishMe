import AsyncStorage from '@react-native-async-storage/async-storage';
import { Session } from '@supabase/supabase-js';
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/supabase';

const CLAVE_PROGRESO = 'progreso_usuario';

export interface AvatarElegido {
  nombre: string;
  emoji: string;
}

export interface ProgresoData {
  nivelId: number | null;
  nivelNombre: string | null;
  avatar: AvatarElegido | null;
  temasCompletados: number[];
  puntos: number;
  leccionesCompletadas: number;
  rachaDias: number;
  ultimaFechaActividad: string | null; // ISO date string (solo la fecha, sin hora)
}

interface ProgresoContextType extends ProgresoData {
  cargando: boolean;
  sesionActiva: boolean;
  elegirNivel: (nivelId: number, nivelNombre: string) => Promise<void>;
  elegirAvatar: (avatar: AvatarElegido) => Promise<void>;
  completarTema: (temaId: number, puntosGanados: number) => Promise<void>;
  estaTemaCompletado: (temaId: number) => boolean;
  restablecerProgreso: () => Promise<void>;
}

const progresoInicial: ProgresoData = {
  nivelId: null,
  nivelNombre: null,
  avatar: null,
  temasCompletados: [],
  puntos: 0,
  leccionesCompletadas: 0,
  rachaDias: 0,
  ultimaFechaActividad: null,
};

const ProgresoContext = createContext<ProgresoContextType | undefined>(undefined);

function fechaDeHoy(): string {
  return new Date().toISOString().split('T')[0];
}

function diasEntre(fechaA: string, fechaB: string): number {
  const a = new Date(fechaA).getTime();
  const b = new Date(fechaB).getTime();
  return Math.round((b - a) / (1000 * 60 * 60 * 24));
}

// Convierte entre el formato de la tabla `progreso` (snake_case) y nuestro
// objeto de estado en la app (camelCase).
function filaABusinessData(fila: any): ProgresoData {
  return {
    nivelId: fila.nivel_id,
    nivelNombre: fila.nivel_nombre,
    avatar: fila.avatar_nombre ? { nombre: fila.avatar_nombre, emoji: fila.avatar_emoji } : null,
    temasCompletados: fila.temas_completados || [],
    puntos: fila.puntos || 0,
    leccionesCompletadas: fila.lecciones_completadas || 0,
    rachaDias: fila.racha_dias || 0,
    ultimaFechaActividad: fila.ultima_fecha_actividad,
  };
}

function datosAFilaSupabase(userId: string, datos: ProgresoData) {
  return {
    id: userId,
    nivel_id: datos.nivelId,
    nivel_nombre: datos.nivelNombre,
    avatar_nombre: datos.avatar?.nombre ?? null,
    avatar_emoji: datos.avatar?.emoji ?? null,
    temas_completados: datos.temasCompletados,
    puntos: datos.puntos,
    lecciones_completadas: datos.leccionesCompletadas,
    racha_dias: datos.rachaDias,
    ultima_fecha_actividad: datos.ultimaFechaActividad,
    actualizado_en: new Date().toISOString(),
  };
}

export function ProgresoProvider({ children }: { children: ReactNode }) {
  const [datos, setDatos] = useState<ProgresoData>(progresoInicial);
  const [cargando, setCargando] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  // Referencia siempre actualizada de `datos`, para usar en funciones async
  // sin depender de closures viejos del estado de React.
  const datosRef = useRef(datos);
  datosRef.current = datos;

  useEffect(() => {
    inicializar();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nuevaSession) => {
      setSession(nuevaSession);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const inicializar = async () => {
    const { data } = await supabase.auth.getSession();
    setSession(data.session);
    await cargarProgreso(data.session);
    setCargando(false);
  };

  // Cuando cambia la sesión (login, logout, registro), recargamos el progreso
  // desde la fuente correcta (Supabase si hay sesión, AsyncStorage si no).
  useEffect(() => {
    if (!cargando) {
      cargarProgreso(session);
    }
  }, [session?.user?.id]);

  const cargarProgreso = async (sesionActual: Session | null) => {
    try {
      if (sesionActual) {
        const { data, error } = await supabase
          .from('progreso')
          .select('*')
          .eq('id', sesionActual.user.id)
          .maybeSingle();

        if (error) {
          console.log('Error cargando progreso de Supabase:', error.message);
          return;
        }

        if (data) {
          // El usuario ya tenía progreso guardado en la nube (login normal).
          setDatos(filaABusinessData(data));
        } else {
          // Usuario nuevo en Supabase: puede que venga de usar la app como
          // invitado. Si hay progreso guardado localmente, lo migramos hacia
          // la cuenta nueva en vez de empezar de cero.
          const progresoInvitado = await leerProgresoLocal();
          const datosIniciales = progresoInvitado ?? progresoInicial;

          setDatos(datosIniciales);
          await supabase.from('progreso').insert(datosAFilaSupabase(sesionActual.user.id, datosIniciales));

          if (progresoInvitado) {
            // Ya se migró a la cuenta, limpiamos el progreso local de invitado.
            await AsyncStorage.removeItem(CLAVE_PROGRESO);
          }
        }
      } else {
        const guardado = await leerProgresoLocal();
        setDatos(guardado ?? progresoInicial);
      }
    } catch (e) {
      console.log('Error cargando progreso:', e);
    }
  };

  const leerProgresoLocal = async (): Promise<ProgresoData | null> => {
    try {
      const guardado = await AsyncStorage.getItem(CLAVE_PROGRESO);
      if (!guardado) return null;
      const datosGuardados: ProgresoData = { ...progresoInicial, ...JSON.parse(guardado) };
      // Solo cuenta como "progreso real para migrar" si el invitado de verdad
      // avanzó algo (eligió nivel, avatar, o completó algún tema).
      const tieneAvance =
        datosGuardados.nivelId !== null ||
        datosGuardados.avatar !== null ||
        datosGuardados.temasCompletados.length > 0;
      return tieneAvance ? datosGuardados : null;
    } catch (e) {
      console.log('Error leyendo progreso local:', e);
      return null;
    }
  };

  const guardar = async (nuevosDatos: ProgresoData) => {
    setDatos(nuevosDatos);
    try {
      if (session) {
        const { error } = await supabase
          .from('progreso')
          .upsert(datosAFilaSupabase(session.user.id, nuevosDatos));
        if (error) console.log('Error guardando progreso en Supabase:', error.message);
      } else {
        await AsyncStorage.setItem(CLAVE_PROGRESO, JSON.stringify(nuevosDatos));
      }
    } catch (e) {
      console.log('Error guardando progreso:', e);
    }
  };

  const elegirNivel = async (nivelId: number, nivelNombre: string) => {
    await guardar({ ...datosRef.current, nivelId, nivelNombre });
  };

  const elegirAvatar = async (avatar: AvatarElegido) => {
    await guardar({ ...datosRef.current, avatar });
  };

  // Calcula la nueva racha de días según la fecha de la última actividad.
  const calcularNuevaRacha = (): number => {
    const actuales = datosRef.current;
    const hoy = fechaDeHoy();
    if (!actuales.ultimaFechaActividad) return 1;
    const diferencia = diasEntre(actuales.ultimaFechaActividad, hoy);
    if (diferencia === 0) return actuales.rachaDias || 1; // ya practicó hoy
    if (diferencia === 1) return (actuales.rachaDias || 0) + 1; // día consecutivo
    return 1; // se rompió la racha, vuelve a empezar
  };

  const completarTema = async (temaId: number, puntosGanados: number) => {
    const actuales = datosRef.current;
    const yaCompletado = actuales.temasCompletados.includes(temaId);
    const temasCompletados = yaCompletado
      ? actuales.temasCompletados
      : [...actuales.temasCompletados, temaId];

    await guardar({
      ...actuales,
      temasCompletados,
      puntos: actuales.puntos + puntosGanados,
      leccionesCompletadas: actuales.leccionesCompletadas + 1,
      rachaDias: calcularNuevaRacha(),
      ultimaFechaActividad: fechaDeHoy(),
    });
  };

  const estaTemaCompletado = (temaId: number) => datos.temasCompletados.includes(temaId);

  const restablecerProgreso = async () => {
    await guardar(progresoInicial);
  };

  return (
    <ProgresoContext.Provider
      value={{
        ...datos,
        cargando,
        sesionActiva: !!session,
        elegirNivel,
        elegirAvatar,
        completarTema,
        estaTemaCompletado,
        restablecerProgreso,
      }}
    >
      {children}
    </ProgresoContext.Provider>
  );
}

export function useProgreso() {
  const context = useContext(ProgresoContext);
  if (!context) {
    throw new Error('useProgreso debe usarse dentro de ProgresoProvider');
  }
  return context;
}
