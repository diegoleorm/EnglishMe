import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Tema, temaClaro, temaOscuro } from './colors';

type TipoTema = 'claro' | 'oscuro';

interface ThemeContextType {
  modoTema: TipoTema;
  colores: Tema;
  cambiarTema: (modo: TipoTema) => void;
  alternarTema: () => void;
  cargando: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [modoTema, setModoTema] = useState<TipoTema>('oscuro');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarTemaGuardado();
  }, []);

  const cargarTemaGuardado = async () => {
    try {
      const temaGuardado = await AsyncStorage.getItem('modo_tema');
      if (temaGuardado === 'claro' || temaGuardado === 'oscuro') {
        setModoTema(temaGuardado);
      }
    } catch (e) {
      console.log('Error cargando tema:', e);
    }
    setCargando(false);
  };

  const cambiarTema = async (modo: TipoTema) => {
    setModoTema(modo);
    try {
      await AsyncStorage.setItem('modo_tema', modo);
    } catch (e) {
      console.log('Error guardando tema:', e);
    }
  };

  const alternarTema = () => {
    cambiarTema(modoTema === 'oscuro' ? 'claro' : 'oscuro');
  };

  const colores = modoTema === 'oscuro' ? temaOscuro : temaClaro;

  return (
    <ThemeContext.Provider value={{ modoTema, colores, cambiarTema, alternarTema, cargando }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTema() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTema debe usarse dentro de ThemeProvider');
  }
  return context;
}