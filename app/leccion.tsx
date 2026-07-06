import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';
import { ExpoSpeechRecognitionModule, useSpeechRecognitionEvent } from 'expo-speech-recognition';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Animated, Dimensions, Easing, Image, Modal, ScrollView, StyleSheet,
  Text, TouchableOpacity, View,
} from 'react-native';
import { obtenerLeccionesDeTema } from './contenido/lecciones';
import { obtenerEjerciciosPorNivel, type EjercicioOrdenar, type EjercicioVerdaderoFalso, type EjercicioRelacionar } from './contenido/ejercicios';
import { generarVozBase64 } from './lib/elevenlabs';
import { useProgreso } from './theme/ProgresoContext';
import { useTema } from './theme/ThemeContext';
import type { Tema } from './theme/colors';

const PREGUNTAS_POR_GRUPO = 5;
const TOTAL_PREGUNTAS     = 30;

const FRASES_CORRECTO = [
  "Great job! That's correct!", "Excellent! Well done!", "Perfect! You got it!",
  "Amazing! That's right!", "Fantastic work!", "Yes! That's the one!",
  "Brilliant! Keep it up!", "Spot on! Great answer!", "Wonderful! You nailed it!",
  "Outstanding! That's correct!", "¡Muy bien! That's right!", "¡Excelente! Perfect answer!",
  "¡Correcto! You're doing great!", "¡Genial! That's exactly right!", "¡Perfecto! Keep going!",
  "You're on fire! That's correct!", "Superb! That's the right answer!",
  "Impressive! Well done!", "That's it! You're getting better!", "Nice work! That's absolutely right!",
];
const FRASES_INCORRECTO = [
  "Not quite. The correct answer is: ", "Almost! The right answer is: ",
  "Good try! It was: ", "Not this time. The answer is: ",
  "Close, but the correct answer is: ", "Keep trying! The answer was: ",
  "Don't worry, the correct answer is: ", "Nearly there! It's actually: ",
  "¡Casi! The right answer is: ", "¡Sigue intentando! The answer is: ",
  "No worries, you'll get the next one! The answer was: ",
  "Learning takes practice! The answer is: ", "That's okay! The correct answer is: ",
  "You'll remember next time! It was: ", "Keep it up! The right answer is: ",
];
const FRASES_INCORRECTO_EJERCICIO = [
  "Not quite, but don't worry. Check the correct answer!",
  "Almost! Take a look at the right answer.",
  "Good try! Check the correct answer on screen.",
  "That's okay, learning takes practice. Look at the answer!",
  "Not this time. See the correct answer above.",
];

// Explicación corta de gramática / orden de palabras, una por nivel (0 a 5).
// Se muestra antes de empezar la lección y también se puede volver a ver
// en cualquier momento tocando el botón "?" durante el ejercicio.
const EXPLICACION_GRAMATICAL: Record<number, { titulo: string; texto: string }> = {
  0: {
    titulo: 'Orden básico: Sujeto + Verbo + Complemento',
    texto: "En inglés, el orden casi siempre es Sujeto + Verbo + Complemento (SVO), y casi nunca cambia como en español. Ejemplo: \"I like apples\" (Yo + gusto + manzanas).",
  },
  1: {
    titulo: 'Presente simple y presente continuo',
    texto: "En preguntas y negaciones se usa \"do/does\" antes del verbo: \"Do you like coffee?\". En presente continuo, el orden es Sujeto + am/is/are + verbo-ing: \"She is reading a book\".",
  },
  2: {
    titulo: 'Pasado simple y pasado continuo',
    texto: "En pasado simple, el verbo cambia de forma (irregular) o se le agrega \"-ed\": \"I visited my grandmother\". En pasado continuo: Sujeto + was/were + verbo-ing.",
  },
  3: {
    titulo: 'Presente y pasado perfecto',
    texto: "El presente perfecto usa have/has + participio pasado: \"I have seen that movie\". Conecta una acción del pasado con el presente, algo que no existe igual en español.",
  },
  4: {
    titulo: 'Condicionales y voz pasiva',
    texto: "Los condicionales combinan \"if\" + una condición + una consecuencia: \"If I study, I will pass\". La voz pasiva invierte el enfoque de la frase: \"The book was written by her\".",
  },
  5: {
    titulo: 'Estructuras avanzadas',
    texto: "En nivel avanzado el orden puede invertirse para dar énfasis: \"Never have I seen...\", o usarse estructuras como el subjuntivo: \"I wish I had known\".",
  },
};

function fraseCorrecto() { return FRASES_CORRECTO[Math.floor(Math.random() * FRASES_CORRECTO.length)]; }
function fraseIncorrecto(r: string) { return `${FRASES_INCORRECTO[Math.floor(Math.random() * FRASES_INCORRECTO.length)]}${r}.`; }
function fraseIncorrectoEjercicio() { return FRASES_INCORRECTO_EJERCICIO[Math.floor(Math.random() * FRASES_INCORRECTO_EJERCICIO.length)]; }

function mezclar<T>(arr: T[]): T[] {
  const c = [...arr];
  for (let i = c.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [c[i], c[j]] = [c[j], c[i]];
  }
  return c;
}

// ── Tipos de pregunta unificados ──────────────────────────────────────────────
type TipoPregunta = 'normal' | 'ordenar' | 'verdadero_falso' | 'relacionar';

interface PreguntaUnificada {
  tipo: TipoPregunta;
  datos: any;
}

// ── Datos de avatar ───────────────────────────────────────────────────────────
// 3 fotos por tutor (misma pose, distinta boca) que se ciclan al azar mientras
// habla, para simular movimiento de boca sin necesidad de IA de video.
// Por ahora `imagenMedia` e `imagenAbierta` apuntan a copias temporales de la
// misma foto (placeholders) — al reemplazar esos archivos por las versiones
// reales de boca media/abierta, la animación mejora de inmediato sin tocar código.
const DATOS_AVATAR: Record<string, { imagenCerrada: any; imagenMedia: any; imagenAbierta: any; color: string; bg: string }> = {
  Michelle: {
    imagenCerrada: require('../assets/avatares/michelle.png'),
    imagenMedia:   require('../assets/avatares/michelle_bocamedia.png'),
    imagenAbierta: require('../assets/avatares/michelle_bocaabierta.png'),
    color: '#DB2777', bg: '#FCE7F3',
  },
  Esteban: {
    imagenCerrada: require('../assets/avatares/esteban.png'),
    imagenMedia:   require('../assets/avatares/esteban_bocamedia.png'),
    imagenAbierta: require('../assets/avatares/esteban_bocaabierta.png'),
    color: '#1D4ED8', bg: '#DBEAFE',
  },
  Luciana: {
    imagenCerrada: require('../assets/avatares/luciana.png'),
    imagenMedia:   require('../assets/avatares/luciana_bocamedia.png'),
    imagenAbierta: require('../assets/avatares/luciana_bocaabierta.png'),
    color: '#7E22CE', bg: '#F3E8FF',
  },
  Charley: {
    imagenCerrada: require('../assets/avatares/charley.png'),
    imagenMedia:   require('../assets/avatares/charley_bocamedia.png'),
    imagenAbierta: require('../assets/avatares/charley_bocaabierta.png'),
    color: '#C2410C', bg: '#FFEDD5',
  },
};

// Altura del avatar grande: ~32% del alto de pantalla, ocupando la parte
// superior como una tarjeta grande (no más el círculo pequeño de antes).
const ALTURA_AVATAR_GRANDE = Math.round(Dimensions.get('window').height * 0.32);

function AvatarHablando({ nombre, hablando, escuchando, onPress }: {
  nombre: string; hablando: boolean; escuchando: boolean; onPress: () => void;
}) {
  const pulso   = useRef(new Animated.Value(1)).current;
  const glow    = useRef(new Animated.Value(0)).current;
  const datos   = DATOS_AVATAR[nombre] ?? DATOS_AVATAR['Michelle'];
  const [formaBoca, setFormaBoca] = useState(0); // 0 = cerrada, 1 = media, 2 = abierta
  const imagenesBoca = [datos.imagenCerrada, datos.imagenMedia, datos.imagenAbierta];

  // Respiración/pulso sutil de toda la imagen mientras habla, y ciclado al
  // azar entre las 3 formas de boca (evitando repetir la misma dos veces
  // seguidas, para que se vea más natural y menos robótico).
  useEffect(() => {
    if (hablando) {
      Animated.loop(Animated.sequence([
        Animated.timing(pulso, { toValue: 1.015, duration: 450, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(pulso, { toValue: 1,     duration: 450, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ])).start();
      const intervalo = setInterval(() => {
        setFormaBoca(actual => {
          let siguiente = Math.floor(Math.random() * 3);
          if (siguiente === actual) siguiente = (siguiente + 1) % 3;
          return siguiente;
        });
      }, 170);
      return () => { clearInterval(intervalo); setFormaBoca(0); };
    } else {
      pulso.stopAnimation();
      Animated.timing(pulso, { toValue: 1, duration: 200, useNativeDriver: true }).start();
    }
  }, [hablando]);

  // Resplandor del borde: pulsa siempre suavemente, con más fuerza cuando
  // habla o escucha, para reemplazar los anillos que tenía el círculo chico.
  useEffect(() => {
    const anim = Animated.loop(Animated.sequence([
      Animated.timing(glow, { toValue: 1, duration: 700, easing: Easing.inOut(Easing.ease), useNativeDriver: false }),
      Animated.timing(glow, { toValue: 0, duration: 700, easing: Easing.inOut(Easing.ease), useNativeDriver: false }),
    ]));
    anim.start();
    return () => anim.stop();
  }, []);

  const colorEstado = hablando ? datos.color : escuchando ? '#22C55E' : datos.color + '50';
  const anchoBorde = glow.interpolate({ inputRange: [0, 1], outputRange: (hablando || escuchando) ? [2, 6] : [2, 3] });

  return (
    <TouchableOpacity style={eAv.contenedor} onPress={onPress} activeOpacity={0.9}>
      {/* Capa externa: solo maneja el "pulso" (transform/scale), animación
          nativa. Capa interna: solo maneja el resplandor del borde
          (borderWidth/borderColor), animación por JS. Deben ir en Animated.View
          separados porque React Native no permite mezclar animación nativa y
          por JS sobre el mismo nodo — mezclarlas causaba el error
          "Attempting to run JS driven animation on animated node...". */}
      <Animated.View style={{ transform: [{ scale: hablando ? pulso : 1 }] }}>
        <Animated.View style={[eAv.tarjeta, { borderColor: colorEstado, borderWidth: anchoBorde }]}>
          <Image source={hablando ? imagenesBoca[formaBoca] : datos.imagenCerrada} style={eAv.imagen} resizeMode="cover" />
        </Animated.View>
      </Animated.View>
      <View style={[eAv.badge, { backgroundColor: hablando ? datos.color : escuchando ? '#22C55E' : '#64748B' }]}>
        <Text style={eAv.badgeTexto}>
          {hablando ? '🔊 Hablando' : escuchando ? '👂 Escuchando' : '🔁 Toca para repetir'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const eAv = StyleSheet.create({
  contenedor:  { width: '100%', marginBottom: 12 },
  tarjeta:     { width: '100%', height: ALTURA_AVATAR_GRANDE, borderRadius: 28, overflow: 'hidden', backgroundColor: '#0B1220' },
  imagen:      { width: '100%', height: '100%' },
  badge:       { position: 'absolute', bottom: 12, alignSelf: 'center', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20 },
  badgeTexto:  { color: '#fff', fontSize: 12, fontWeight: '700' },
});

function BotonMicrofono({ onIniciar, onTerminar, escuchando, disabled, colores }: {
  onIniciar: () => void; onTerminar: () => void; escuchando: boolean; disabled: boolean; colores: Tema;
}) {
  return (
    <TouchableOpacity
      onPressIn={onIniciar} onPressOut={onTerminar} disabled={disabled}
      style={[
        { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
          backgroundColor: colores.fondoTarjeta, borderRadius: 30, paddingVertical: 14,
          paddingHorizontal: 24, borderWidth: 2, borderColor: colores.borde },
        escuchando && { backgroundColor: colores.exitoFondo, borderColor: colores.exito },
        disabled && { opacity: 0.4 },
      ]}
      activeOpacity={0.85}
    >
      <Text style={{ fontSize: 20 }}>{escuchando ? '🔴' : '🎤'}</Text>
      <Text style={{ color: escuchando ? colores.exito : colores.textoSecundario, fontSize: 13, fontWeight: '600' }}>
        {escuchando ? 'Suelta para enviar' : 'Mantén presionado'}
      </Text>
    </TouchableOpacity>
  );
}

// ── Componente Ordenar palabras ───────────────────────────────────────────────
// Recibe las palabras YA mezcladas (palabrasMezcladas) desde el componente
// padre, para que sea EXACTAMENTE el mismo orden que el avatar narra en voz alta.
function EjercicioOrdenarComp({ ejercicio, colores, onRespuesta }: {
  ejercicio: EjercicioOrdenar & { palabrasMezcladas: string[] }; colores: Tema; onRespuesta: (correcto: boolean) => void;
}) {
  const [palabrasDisponibles, setPalabrasDisponibles] = useState<string[]>(() => [...ejercicio.palabrasMezcladas]);
  const [seleccionadas, setSeleccionadas]             = useState<string[]>([]);
  const [respondido, setRespondido]                   = useState(false);
  const [esCorrecto, setEsCorrecto]                   = useState<boolean | null>(null);
  const yaVerificadoRef = useRef(false);

  const agregarPalabra = (palabra: string, index: number) => {
    if (respondido) return;
    setSeleccionadas(prev => [...prev, palabra]);
    setPalabrasDisponibles(prev => prev.filter((_, i) => i !== index));
  };

  const quitarPalabra = (palabra: string, index: number) => {
    if (respondido) return;
    setPalabrasDisponibles(prev => [...prev, palabra]);
    setSeleccionadas(prev => prev.filter((_, i) => i !== index));
  };

  const verificar = () => {
    if (yaVerificadoRef.current) return;
    yaVerificadoRef.current = true;
    const frase = seleccionadas.join(' ');
    const correcto = frase.toLowerCase() === ejercicio.frase_correcta.toLowerCase();
    setEsCorrecto(correcto);
    setRespondido(true);
    onRespuesta(correcto);
  };

  return (
    <View style={{ gap: 10 }}>
      <Text style={{ color: colores.textoTerciario, fontSize: 12, textAlign: 'center' }}>
        📝 Ordena las palabras para formar la frase
      </Text>
      <Text style={{ color: colores.textoSecundario, fontSize: 12, textAlign: 'center', fontStyle: 'italic' }}>
        {ejercicio.espanol}
      </Text>

      {/* Zona de respuesta */}
      <View style={{ minHeight: 50, backgroundColor: colores.fondoTarjeta, borderRadius: 12,
        padding: 10, borderWidth: 1.5, borderColor: respondido
          ? esCorrecto ? colores.exito : colores.error
          : colores.borde, flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
        {seleccionadas.length === 0
          ? <Text style={{ color: colores.textoTerciario, fontSize: 12, alignSelf: 'center' }}>Toca las palabras en orden...</Text>
          : seleccionadas.map((p, i) => (
            <TouchableOpacity key={i} onPress={() => quitarPalabra(p, i)}
              style={{ backgroundColor: colores.primario, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 }}>
              <Text style={{ color: '#fff', fontSize: 13, fontWeight: '600' }}>{p}</Text>
            </TouchableOpacity>
          ))
        }
      </View>

      {respondido && (
        <Text style={{ textAlign: 'center', fontSize: 13, fontWeight: '700',
          color: esCorrecto ? colores.exito : colores.error }}>
          {esCorrecto ? '✅ ¡Correcto!' : `❌ Era: "${ejercicio.frase_correcta}"`}
        </Text>
      )}

      {/* Palabras disponibles */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
        {palabrasDisponibles.map((p, i) => (
          <TouchableOpacity key={i} onPress={() => agregarPalabra(p, i)} disabled={respondido}
            style={{ backgroundColor: colores.fondoSecundario, paddingHorizontal: 12, paddingVertical: 7,
              borderRadius: 10, borderWidth: 1, borderColor: colores.borde, opacity: respondido ? 0.5 : 1 }}>
            <Text style={{ color: colores.textoPrimario, fontSize: 13, fontWeight: '600' }}>{p}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {!respondido && seleccionadas.length > 0 && (
        <TouchableOpacity onPress={verificar}
          style={{ backgroundColor: colores.primario, borderRadius: 14, paddingVertical: 12, alignItems: 'center' }}>
          <Text style={{ color: '#fff', fontSize: 14, fontWeight: '700' }}>✓ Verificar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// ── Componente Verdadero o Falso ──────────────────────────────────────────────
function EjercicioVFComp({ ejercicio, colores, onRespuesta }: {
  ejercicio: EjercicioVerdaderoFalso; colores: Tema; onRespuesta: (correcto: boolean) => void;
}) {
  const [seleccion, setSeleccion] = useState<string | null>(null);
  const yaRespondioRef = useRef(false);

  const responder = (valor: string) => {
    if (yaRespondioRef.current) return;
    yaRespondioRef.current = true;
    setSeleccion(valor);
    const correcto = valor === ejercicio.correcta;
    onRespuesta(correcto);
  };

  const colorBoton = (valor: string) => {
    if (!seleccion) return colores.fondoTarjeta;
    if (valor === ejercicio.correcta) return colores.exitoFondo;
    if (valor === seleccion) return colores.errorFondo;
    return colores.fondoTarjeta;
  };

  const colorBorde = (valor: string) => {
    if (!seleccion) return colores.borde;
    if (valor === ejercicio.correcta) return colores.exito;
    if (valor === seleccion) return colores.error;
    return colores.borde;
  };

  return (
    <View style={{ gap: 12 }}>
      <Text style={{ color: colores.textoTerciario, fontSize: 12, textAlign: 'center' }}>
        ✅❌ ¿Verdadero o Falso?
      </Text>
      <View style={{ backgroundColor: colores.fondoTarjeta, borderRadius: 14, padding: 16, borderWidth: 1, borderColor: colores.borde }}>
        <Text style={{ fontSize: 16, fontWeight: '700', color: colores.textoPrimario, textAlign: 'center', marginBottom: 6 }}>
          {ejercicio.ingles}
        </Text>
        <Text style={{ fontSize: 12, color: colores.textoTerciario, textAlign: 'center', fontStyle: 'italic' }}>
          {ejercicio.espanol}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', gap: 12 }}>
        {['True', 'False'].map(valor => (
          <TouchableOpacity key={valor} onPress={() => responder(valor)} disabled={!!seleccion}
            style={{ flex: 1, paddingVertical: 16, borderRadius: 14, alignItems: 'center',
              backgroundColor: colorBoton(valor), borderWidth: 2, borderColor: colorBorde(valor) }}>
            <Text style={{ fontSize: 24, marginBottom: 4 }}>{valor === 'True' ? '✅' : '❌'}</Text>
            <Text style={{ fontSize: 15, fontWeight: '700', color: colores.textoPrimario }}>{valor}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {seleccion && (
        <Text style={{ textAlign: 'center', fontSize: 13, fontWeight: '700',
          color: seleccion === ejercicio.correcta ? colores.exito : colores.error }}>
          {seleccion === ejercicio.correcta ? '✅ ¡Correcto!' : `❌ Era: ${ejercicio.correcta}`}
        </Text>
      )}
    </View>
  );
}

// ── Componente Relacionar ─────────────────────────────────────────────────────
function EjercicioRelacionarComp({ ejercicio, colores, onRespuesta }: {
  ejercicio: EjercicioRelacionar; colores: Tema; onRespuesta: (correcto: boolean) => void;
}) {
  // Usar hasta 6 pares mezclados
  const paresUsados = ejercicio.pares.slice(0, 6);
  const [inglesmezclado] = useState(() => mezclar(paresUsados.map(p => p.ingles)));
  const [espanolMezclado] = useState(() => mezclar(paresUsados.map(p => p.espanol)));
  const [selIngles, setSelIngles]   = useState<string | null>(null);
  const [selEspanol, setSelEspanol] = useState<string | null>(null);
  const [conectados, setConectados] = useState<{ ingles: string; espanol: string; correcto: boolean }[]>([]);
  const [terminado, setTerminado]   = useState(false);
  const yaNotificadoRef = useRef(false);

  useEffect(() => {
    if (selIngles && selEspanol) {
      const par = paresUsados.find(p => p.ingles === selIngles);
      const correcto = par?.espanol === selEspanol;
      const nuevos = [...conectados, { ingles: selIngles, espanol: selEspanol, correcto }];
      setConectados(nuevos);
      setSelIngles(null);
      setSelEspanol(null);
      if (nuevos.length === paresUsados.length && !yaNotificadoRef.current) {
        yaNotificadoRef.current = true;
        setTerminado(true);
        const todosCorrecto = nuevos.every(c => c.correcto);
        onRespuesta(todosCorrecto);
      }
    }
  }, [selIngles, selEspanol]);

  const estaConectadoIngles = (w: string) => conectados.find(c => c.ingles === w);
  const estaConectadoEspanol = (w: string) => conectados.find(c => c.espanol === w);

  const colorTarjeta = (conectado: { correcto: boolean } | undefined, seleccionado: boolean) => {
    if (conectado) return conectado.correcto ? colores.exitoFondo : colores.errorFondo;
    if (seleccionado) return colores.primario + '30';
    return colores.fondoTarjeta;
  };

  const colorBordeTarjeta = (conectado: { correcto: boolean } | undefined, seleccionado: boolean) => {
    if (conectado) return conectado.correcto ? colores.exito : colores.error;
    if (seleccionado) return colores.primario;
    return colores.borde;
  };

  return (
    <View style={{ gap: 10 }}>
      <Text style={{ color: colores.textoTerciario, fontSize: 13, textAlign: 'center', fontWeight: '600' }}>
        🔗 Relaciona cada palabra con su traducción
      </Text>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <View style={{ flex: 1, gap: 6 }}>
          {inglesmezclado.map((w, i) => {
            const conectado = estaConectadoIngles(w);
            const seleccionado = selIngles === w;
            return (
              <TouchableOpacity key={i} onPress={() => !conectado && !terminado && setSelIngles(seleccionado ? null : w)}
                style={{ paddingVertical: 14, paddingHorizontal: 8, borderRadius: 12, alignItems: 'center',
                  backgroundColor: colorTarjeta(conectado, seleccionado),
                  borderWidth: 2, borderColor: colorBordeTarjeta(conectado, seleccionado) }}>
                <Text style={{ fontSize: 16, fontWeight: '700', color: colores.textoPrimario }}>{w}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={{ flex: 1, gap: 6 }}>
          {espanolMezclado.map((w, i) => {
            const conectado = estaConectadoEspanol(w);
            const seleccionado = selEspanol === w;
            return (
              <TouchableOpacity key={i} onPress={() => !conectado && !terminado && setSelEspanol(seleccionado ? null : w)}
                style={{ paddingVertical: 14, paddingHorizontal: 8, borderRadius: 12, alignItems: 'center',
                  backgroundColor: colorTarjeta(conectado, seleccionado),
                  borderWidth: 2, borderColor: colorBordeTarjeta(conectado, seleccionado) }}>
                <Text style={{ fontSize: 16, fontWeight: '700', color: colores.textoPrimario }}>{w}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      {selIngles && !selEspanol && (
        <Text style={{ textAlign: 'center', fontSize: 13, color: colores.primario, fontWeight: '600' }}>
          Ahora toca la traducción en español →
        </Text>
      )}
    </View>
  );
}

// ── Pantalla principal ────────────────────────────────────────────────────────
export default function LeccionScreen() {
  const router = useRouter();
  const { colores } = useTema();
  const styles = crearEstilos(colores);
  const { nombre, temaId, temaTitulo, nivelIndex } = useLocalSearchParams();
  const { completarTema } = useProgreso();

  const nombreAvatar = nombre as string || 'Michelle';
  const tituloTema   = temaTitulo as string || 'Lección';
  const idTema       = temaId ? parseInt(temaId as string, 10) : null;
  const nivelIdx     = nivelIndex ? parseInt(nivelIndex as string, 10) : 0;
  const todasLecciones = obtenerLeccionesDeTema(idTema ?? 0);

  // Construir lista mixta de preguntas (normales + ejercicios nuevos)
  const [preguntasSeleccionadas] = useState<PreguntaUnificada[]>(() => {
    // Seleccionar 20 preguntas normales
    if (todasLecciones.length === 0) return [];
    let mezcladas = mezclar(todasLecciones);
    const normales: PreguntaUnificada[] = [];
    while (normales.length < 20) {
      normales.push(...mezcladas.map(d => ({ tipo: 'normal' as TipoPregunta, datos: d })));
      mezcladas = mezclar(todasLecciones);
    }
    const normalesFinales = normales.slice(0, 20).map(p => {
      // Mezclar opciones para que la correcta no siempre sea la primera
      const indices = [0, 1, 2];
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      const opcionesMezcladas = indices.map((i: number) => p.datos.opciones[i]);
      const nuevaCorrecta = indices.indexOf(p.datos.correcta);
      return { ...p, datos: { ...p.datos, opciones: opcionesMezcladas, correcta: nuevaCorrecta } };
    });

    // Seleccionar 5 ejercicios de cada tipo nuevo (15 total)
    const ejercicios = obtenerEjerciciosPorNivel(nivelIdx);
    // Para "ordenar": se mezcla UNA sola vez aquí y se guarda en
    // `palabrasMezcladas`, para que el avatar y la pantalla usen exactamente
    // el mismo orden (antes se mezclaban por separado y no coincidían).
    const ordenar = mezclar(ejercicios.ordenar).slice(0, 5).map(d => ({
      tipo: 'ordenar' as TipoPregunta,
      datos: { ...d, palabrasMezcladas: mezclar(d.palabras) },
    }));
    const vf         = mezclar(ejercicios.verdaderoFalso).slice(0, 5).map(d => ({ tipo: 'verdadero_falso' as TipoPregunta, datos: d }));
    const relacionar = mezclar(ejercicios.relacionar).slice(0, 5).map(d => ({ tipo: 'relacionar' as TipoPregunta, datos: d }));

    // Mezclar todo: 20 normales + 15 ejercicios = 35, pero tomamos 30
    const todos = mezclar([...normalesFinales, ...ordenar, ...vf, ...relacionar]);
    return todos.slice(0, TOTAL_PREGUNTAS);
  });

  const totalGrupos = Math.ceil(preguntasSeleccionadas.length / PREGUNTAS_POR_GRUPO);
  const [grupo, setGrupo]               = useState(0);
  const [pasoEnGrupo, setPasoEnGrupo]   = useState(0);
  const [puntajeGrupo, setPuntajeGrupo] = useState(0);
  const [puntajeTotal, setPuntajeTotal] = useState(0);
  const [seleccion, setSeleccion]       = useState<number | null>(null);
  const [correcto, setCorrecto]         = useState<boolean | null>(null);
  const [mensajeFeedback, setMensajeFeedback] = useState('');
  const [terminadoGrupo, setTerminadoGrupo]   = useState(false);
  const [terminado, setTerminado]       = useState(false);
  const [guardando, setGuardando]       = useState(false);
  const [avatarHablando, setAvatarHablando] = useState(false);
  const [escuchando, setEscuchando]     = useState(false);
  const [textoEscuchado, setTextoEscuchado] = useState('');
  const [procesando, setProcesando]     = useState(false);
  const [esperandoEjercicio, setEsperandoEjercicio] = useState(false);
  const [mostrarIntro, setMostrarIntro] = useState(true);
  const [mostrarAyuda, setMostrarAyuda] = useState(false);

  const alTerminarHablar = useRef<(() => void) | null>(null);
  const soundRef         = useRef<Audio.Sound | null>(null);
  const hablandoRef      = useRef(false);
  const montado          = useRef(true);
  const yaRespondio      = useRef(false);
  const pasoEnGrupoRef   = useRef(0);
  const grupoRef         = useRef(0);
  // Token que identifica la "voz" activa en cada momento.
  // Cada vez que se inicia un nuevo audio, se incrementa. Cualquier callback
  // de un audio anterior que llegue tarde revisa este token y, si no coincide,
  // se ignora. Esto evita que se solapen o repitan frases.
  const tokenAudio       = useRef(0);
  // Guarda la última frase (o combinación p1+p2) que se empezó a narrar y
  // cuándo, para ignorar un segundo intento de decir EXACTAMENTE lo mismo
  // en menos de 2 segundos (evita que la pregunta se repita dos veces).
  const ultimaFraseRef     = useRef<string>('');
  const horaUltimaFraseRef = useRef<number>(0);
  // Evita que se procese un feedback (correcto/incorrecto) dos veces si,
  // por un doble toque, se llega a llamar dos veces casi al mismo tiempo.
  const feedbackEnCursoRef = useRef(false);

  // Sincronizar refs con estado actual
  pasoEnGrupoRef.current = pasoEnGrupo;
  grupoRef.current = grupo;

  const indiceGlobal  = grupo * PREGUNTAS_POR_GRUPO + pasoEnGrupo;
  const preguntaActual = preguntasSeleccionadas[indiceGlobal];
  const preguntasEnGrupoActual = Math.min(PREGUNTAS_POR_GRUPO, preguntasSeleccionadas.length - grupo * PREGUNTAS_POR_GRUPO);
  const progresoGrupo   = (pasoEnGrupo / preguntasEnGrupoActual) * 100;
  const porcentajeTotal = Math.round((indiceGlobal / preguntasSeleccionadas.length) * 100);
  const esNormal = preguntaActual?.tipo === 'normal';

  useEffect(() => { montado.current = true; return () => { montado.current = false; }; }, []);

  useSpeechRecognitionEvent('result', (event) => {
    if (!event.results || event.results.length === 0) return;
    if (yaRespondio.current || !esNormal) return;
    const textoReconocido = event.results[0]?.transcript ?? '';
    const indice = encontrarMejorOpcion(textoReconocido, preguntaActual.datos.opciones);
    if (indice !== -1) {
      yaRespondio.current = true; setProcesando(false); setTextoEscuchado('');
      responder(indice);
    } else {
      setProcesando(false); setTextoEscuchado('');
      const frases = ["Hmm, I didn't catch that. Try again!", "Sorry, could you repeat that?", "Try once more!"];
      hablarAvatar(frases[Math.floor(Math.random() * frases.length)]);
    }
  });

  useSpeechRecognitionEvent('end', () => { if (montado.current) { setEscuchando(false); setProcesando(false); } });
  useSpeechRecognitionEvent('error', () => {
    if (montado.current) {
      setEscuchando(false); setProcesando(false); setTextoEscuchado('');
      hablarAvatar("I didn't hear you. Try again!");
    }
  });

  // Texto que el avatar dice para cada tipo de ejercicio
  const instruccionAvatar = () => {
    if (!preguntaActual) return '';
    switch (preguntaActual.tipo) {
      // Usa palabrasMezcladas (el MISMO orden que ve el usuario en pantalla)
      case 'ordenar': return `Put these words in order: ${preguntaActual.datos.palabrasMezcladas.join(', ')}`;
      case 'verdadero_falso': return `True or false? ${preguntaActual.datos.ingles}`;
      case 'relacionar': return 'Match each word with its correct translation.';
      default: {
        // Eliminar contenido entre paréntesis antes de leer (ej: "(13)" → "")
        const textoLimpio = preguntaActual.datos.ingles.replace(/\s*\(.*?\)/g, '').trim();
        if (textoLimpio.includes('___')) {
          const partes = textoLimpio.split('___');
          const parte1 = partes[0].trim().replace(/,\s*$/, '');
          const parte2 = (partes[1] || '').trim().replace(/^[,.]\s*/, '');
          return parte1 + (parte2 ? ', blank, ' + parte2 : ', blank');
        }
        return textoLimpio;
      }
    }
  };

  useEffect(() => {
    if (!preguntaActual || terminado || terminadoGrupo || mostrarIntro) return;
    if (hablandoRef.current) return;
    hablandoRef.current = true;
    yaRespondio.current = false;
    feedbackEnCursoRef.current = false;
    respondioNormalRef.current = false;
    setSeleccion(null); setCorrecto(null); setTextoEscuchado(''); setMensajeFeedback('');
    setEsperandoEjercicio(false);
    const timer = setTimeout(() => {
      if (!esNormal) {
        hablarAvatar(instruccionAvatar());
      } else {
        const tieneBlanco = preguntaActual.datos.ingles.includes('___');
        if (tieneBlanco) {
          const partes = preguntaActual.datos.ingles.split('___');
          hablarAvatarConPausa(partes[0].trim().replace(/,\s*$/, ''), (partes[1] || '').trim().replace(/^[,.]\s*/, ''));
        } else {
          hablarAvatar(preguntaActual.datos.ingles);
        }
      }
    }, 400);
    return () => { clearTimeout(timer); hablandoRef.current = false; };
  }, [indiceGlobal, terminadoGrupo, mostrarIntro]);

  useEffect(() => {
    return () => {
      tokenAudio.current++;
      Speech.stop(); ExpoSpeechRecognitionModule.stop();
      soundRef.current?.stopAsync().then(() => soundRef.current?.unloadAsync());
    };
  }, []);

  // El avatar (el mismo elegido como tutor) lee en voz alta la explicación
  // gramatical apenas se muestra la tarjeta de introducción.
  useEffect(() => {
    if (mostrarIntro) {
      const expl = EXPLICACION_GRAMATICAL[nivelIdx] ?? EXPLICACION_GRAMATICAL[0];
      hablandoRef.current = false; alTerminarHablar.current = null;
      hablarAvatar(expl.texto);
    }
  }, [mostrarIntro]);

  // Lo mismo cuando se abre el modal de ayuda "❓" durante el ejercicio.
  // Al cerrarlo, se detiene el audio de la explicación (no interfiere con
  // el progreso de la pregunta que quedó pendiente detrás del modal).
  useEffect(() => {
    if (mostrarAyuda) {
      const expl = EXPLICACION_GRAMATICAL[nivelIdx] ?? EXPLICACION_GRAMATICAL[0];
      hablandoRef.current = false; alTerminarHablar.current = null;
      hablarAvatar(expl.texto);
    } else {
      detenerTodoAudio();
    }
  }, [mostrarAyuda]);

  // Detiene cualquier audio en curso (voz nativa o mp3 de ElevenLabs) e
  // invalida el token de cualquier voz anterior para que sus callbacks
  // tardíos no disparen nada.
  const detenerTodoAudio = async () => {
    tokenAudio.current++;
    Speech.stop();
    if (soundRef.current) {
      try { await soundRef.current.stopAsync(); await soundRef.current.unloadAsync(); } catch (_) {}
      soundRef.current = null;
    }
    if (montado.current) setAvatarHablando(false);
  };

  const hablarAvatarConPausa = async (p1: string, p2: string) => {
    const clave = `${p1}|||${p2}`;
    const ahora = Date.now();
    if (clave === ultimaFraseRef.current && ahora - horaUltimaFraseRef.current < 2000) return;
    ultimaFraseRef.current = clave;
    horaUltimaFraseRef.current = ahora;
    await detenerTodoAudio();
    if (!montado.current) return;
    const miToken = tokenAudio.current;
    setAvatarHablando(true);
    await new Promise<void>(r => Speech.speak(p1, { language: 'en-US', rate: 0.85, onDone: () => r(), onStopped: () => r(), onError: () => r() }));
    if (!montado.current || tokenAudio.current !== miToken) return;
    await new Promise(r => setTimeout(r, 600));
    if (!montado.current || tokenAudio.current !== miToken) { if (montado.current) setAvatarHablando(false); return; }
    if (p2) await new Promise<void>(r => Speech.speak(p2, { language: 'en-US', rate: 0.85, onDone: () => r(), onStopped: () => r(), onError: () => r() }));
    if (montado.current && tokenAudio.current === miToken) {
      setAvatarHablando(false);
      alTerminarHablar.current?.();
      alTerminarHablar.current = null;
    }
  };

  const hablarAvatar = async (texto: string) => {
    const ahora = Date.now();
    if (texto === ultimaFraseRef.current && ahora - horaUltimaFraseRef.current < 2000) return;
    ultimaFraseRef.current = texto;
    horaUltimaFraseRef.current = ahora;
    try {
      await detenerTodoAudio();
      if (!montado.current) return;
      const miToken = tokenAudio.current;
      setAvatarHablando(true);

      const onFinVoz = () => {
        if (!montado.current || tokenAudio.current !== miToken) return;
        setAvatarHablando(false);
        alTerminarHablar.current?.();
        alTerminarHablar.current = null;
      };

      await Audio.setAudioModeAsync({ playsInSilentModeIOS: true, staysActiveInBackground: false });
      const base64 = await generarVozBase64(texto, nombreAvatar);
      if (!montado.current || tokenAudio.current !== miToken) return;

      if (!base64) {
        // Fallback: usar expo-speech con callback al terminar
        Speech.speak(texto, {
          language: 'en-US',
          rate: 0.85,
          onDone: onFinVoz,
          onStopped: onFinVoz,
          onError: onFinVoz,
        });
        return;
      }

      const { sound } = await Audio.Sound.createAsync({ uri: `data:audio/mpeg;base64,${base64}` }, { shouldPlay: true });
      if (tokenAudio.current !== miToken) { sound.unloadAsync(); return; }
      soundRef.current = sound;
      sound.setOnPlaybackStatusUpdate(s => {
        if (s.isLoaded && s.didJustFinish) {
          onFinVoz();
          sound.unloadAsync();
          if (soundRef.current === sound) soundRef.current = null;
        }
      });
    } catch {
      if (montado.current) {
        setAvatarHablando(false);
        alTerminarHablar.current?.();
        alTerminarHablar.current = null;
      }
    }
  };

  const repetirPregunta = () => {
    if (escuchando || procesando || !preguntaActual) return;
    hablandoRef.current = false; alTerminarHablar.current = null;
    if (!esNormal) {
      // Ordenar / Verdadero-Falso / Relacionar: repetir la instrucción del ejercicio
      hablarAvatar(instruccionAvatar());
      return;
    }
    if (seleccion !== null) return;
    const tieneBlanco = preguntaActual.datos.ingles.includes('___');
    if (tieneBlanco) {
      const partes = preguntaActual.datos.ingles.split('___');
      hablarAvatarConPausa(partes[0].trim().replace(/,\s*$/, ''), (partes[1] || '').trim().replace(/^[,.]\s*/, ''));
    } else { hablarAvatar(preguntaActual.datos.ingles); }
  };

  const iniciarEscucha = async () => {
    if (!esNormal || seleccion !== null || procesando || avatarHablando) return;
    try {
      await detenerTodoAudio(); yaRespondio.current = false;
      const { granted } = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
      if (!granted) { setTextoEscuchado('Necesitas dar permiso al micrófono.'); return; }
      setEscuchando(true); setTextoEscuchado('🎤 Escuchando...');
      ExpoSpeechRecognitionModule.start({ lang: 'en-US', interimResults: false, maxAlternatives: 1 });
    } catch { setTextoEscuchado('Error al acceder al micrófono.'); setEscuchando(false); }
  };

  const terminarEscucha = () => { if (!escuchando) return; setProcesando(true); ExpoSpeechRecognitionModule.stop(); };

  const limpiarTexto = (t: string) => t.toLowerCase().replace(/[.,!?;:'"¿¡]/g, '').replace(/\s+/g, ' ').trim();

  const encontrarMejorOpcion = (texto: string, opciones: string[]): number => {
    const tl = limpiarTexto(texto);
    let mejorI = -1, mejorP = 0;
    opciones.forEach((op, i) => {
      const o = limpiarTexto(op);
      if (tl === o) { mejorI = i; mejorP = 100; return; }
      if (tl.includes(o) || o.includes(tl)) { const p = (Math.min(tl.length, o.length) / Math.max(tl.length, o.length)) * 95; if (p > mejorP) { mejorP = p; mejorI = i; } }
      const pw = tl.split(' ').filter(x => x.length > 1), ow = limpiarTexto(op).split(' ').filter(x => x.length > 1);
      const comunes = pw.filter(x => ow.includes(x));
      if (comunes.length > 0 && ow.length > 0) { const p = (comunes.length / ow.length) * 85; if (p > mejorP) { mejorP = p; mejorI = i; } }
    });
    opciones.forEach((op, i) => { const o = limpiarTexto(op); if (o.split(' ').length === 1 && tl.split(' ').includes(o)) { if (90 > mejorP) { mejorP = 90; mejorI = i; } } });
    return mejorP > (opciones.every(o => limpiarTexto(o).split(' ').length <= 2) ? 15 : 30) ? mejorI : -1;
  };

  const avanzar = (esCorrecto: boolean, delayMs: number = 1500) => {
    if (esCorrecto) { setPuntajeGrupo(p => p + 1); setPuntajeTotal(p => p + 1); }
    hablandoRef.current = false;
    const pasoActual = pasoEnGrupoRef.current;
    const pregActual = Math.min(PREGUNTAS_POR_GRUPO, preguntasSeleccionadas.length - grupoRef.current * PREGUNTAS_POR_GRUPO);
    setTimeout(() => {
      if (!montado.current) return;
      if (pasoActual + 1 >= pregActual) {
        setTerminadoGrupo(true);
      } else {
        setPasoEnGrupo(pasoActual + 1);
        setSeleccion(null);
        setCorrecto(null);
      }
    }, delayMs);
  };

  // Función central de feedback: dice la frase en voz alta y SOLO avanza
  // cuando se cumplen dos condiciones: (1) la voz terminó de verdad, y
  // (2) pasó un tiempo mínimo de lectura (más largo si hay que leer la
  // respuesta correcta). Así nunca se corta antes de tiempo ni se solapa
  // con la siguiente narración.
  const hablarFeedbackYAvanzar = (esCorrecto: boolean, textoFeedback: string, tiempoExtraMs: number = 0) => {
    if (feedbackEnCursoRef.current) return; // ya se está procesando un feedback, ignorar el duplicado
    feedbackEnCursoRef.current = true;
    tokenAudio.current++;
    const miToken = tokenAudio.current;
    Speech.stop();
    if (soundRef.current) {
      soundRef.current.stopAsync().catch(() => {});
      soundRef.current.unloadAsync().catch(() => {});
      soundRef.current = null;
    }
    setAvatarHablando(true);

    // tiempoExtraMs se usa cuando el feedback incluye una frase larga que
    // el usuario necesita tiempo de leer en pantalla (ej: ejercicios de
    // ordenar, donde se lee la frase completa antes de confirmar).
    const tiempoMinimoMs = (esCorrecto ? 1800 : 3200) + tiempoExtraMs;

    let vozLista = false;
    let tiempoListo = false;
    let yaAvanzo = false;

    const intentarAvanzar = () => {
      if (yaAvanzo || tokenAudio.current !== miToken) return;
      if (!vozLista || !tiempoListo) return;
      yaAvanzo = true;
      feedbackEnCursoRef.current = false;
      if (montado.current) setAvatarHablando(false);
      avanzar(esCorrecto, 200);
    };

    Speech.speak(textoFeedback, {
      language: 'en-US',
      rate: 0.85,
      onDone: () => { vozLista = true; intentarAvanzar(); },
      onStopped: () => { vozLista = true; intentarAvanzar(); },
      onError: () => { vozLista = true; intentarAvanzar(); },
    });
    // Respaldo por si el callback de voz nunca llega en algún dispositivo
    setTimeout(() => { vozLista = true; intentarAvanzar(); }, 5000);
    // Tiempo mínimo garantizado para poder leer el feedback en pantalla
    setTimeout(() => { tiempoListo = true; intentarAvanzar(); }, tiempoMinimoMs);
  };

  const respondioNormalRef = useRef(false);
  const responder = (index: number) => {
    if (respondioNormalRef.current || seleccion !== null) return;
    respondioNormalRef.current = true;
    setSeleccion(index);
    const esCorrecto = index === preguntaActual.datos.correcta;
    setCorrecto(esCorrecto);
    const textoFeedback = esCorrecto ? fraseCorrecto() : fraseIncorrecto(preguntaActual.datos.opciones[preguntaActual.datos.correcta]);
    setMensajeFeedback(textoFeedback);
    hablarFeedbackYAvanzar(esCorrecto, textoFeedback);
  };

  // Usado por los ejercicios de ordenar / verdadero-falso / relacionar,
  // que antes avanzaban en silencio sin que Milo dijera nada.
  // `fraseParaLeer` (solo en ordenar) hace que el avatar lea la frase
  // completa en voz alta ANTES del feedback, y le da tiempo extra en
  // pantalla para poder leerla — tanto si acertó como si no.
  const manejarRespuestaEjercicio = (esCorrecto: boolean, fraseParaLeer?: string) => {
    const feedbackBase = esCorrecto ? fraseCorrecto() : fraseIncorrectoEjercicio();
    const textoFeedback = fraseParaLeer ? `${fraseParaLeer}. ${feedbackBase}` : feedbackBase;
    const tiempoExtraMs = fraseParaLeer ? 1500 : 0;
    hablarFeedbackYAvanzar(esCorrecto, textoFeedback, tiempoExtraMs);
  };

  const continuarSiguienteGrupo = () => {
    const sig = grupo + 1;
    if (sig >= totalGrupos) { finalizarLeccion(); }
    else { setGrupo(sig); setPasoEnGrupo(0); setPuntajeGrupo(0); setTerminadoGrupo(false); setSeleccion(null); setCorrecto(null); hablandoRef.current = false; }
  };

  const finalizarLeccion = async () => {
    setTerminado(true);
    if (idTema !== null) { setGuardando(true); await completarTema(idTema, puntajeTotal * 10); if (montado.current) setGuardando(false); }
  };

  // Icono por tipo de ejercicio
  const iconoTipo = () => {
    if (!preguntaActual) return '';
    switch (preguntaActual.tipo) {
      case 'ordenar': return '📝';
      case 'verdadero_falso': return '✅❌';
      case 'relacionar': return '🔗';
      default: return '💬';
    }
  };

  // ── Pantalla de introducción gramatical ───────────────────────────────────
  // Se muestra una vez al entrar a la lección. El mismo contenido se puede
  // volver a consultar tocando el botón "?" durante el ejercicio, sin perder
  // el progreso (ver Modal de ayuda más abajo).
  if (mostrarIntro) {
    const expl = EXPLICACION_GRAMATICAL[nivelIdx] ?? EXPLICACION_GRAMATICAL[0];
    const repetirExplicacion = () => {
      hablandoRef.current = false; alTerminarHablar.current = null;
      hablarAvatar(expl.texto);
    };
    return (
      <View style={styles.resultContainer}>
        <View style={styles.resultCard}>
          <AvatarHablando nombre={nombreAvatar} hablando={avatarHablando} escuchando={false} onPress={repetirExplicacion} />
          <Text style={styles.resultTitulo}>{expl.titulo}</Text>
          <Text style={[styles.resultMensaje, { marginBottom: 24 }]}>{expl.texto}</Text>
          <TouchableOpacity style={styles.btnRepetir} onPress={() => { detenerTodoAudio(); setMostrarIntro(false); }}>
            <Text style={styles.btnRepetirTexto}>✅ Entendido, ¡empecemos!</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 11, color: colores.textoTerciario, textAlign: 'center', marginTop: 4 }}>
            Puedes volver a ver esta explicación tocando el botón "❓" durante la lección.
          </Text>
        </View>
      </View>
    );
  }

  // ── Pantalla entre grupos ─────────────────────────────────────────────────
  if (terminadoGrupo && !terminado) {
    const sig = grupo + 1; const esUltimo = sig >= totalGrupos;
    const pct = Math.round((puntajeGrupo / preguntasEnGrupoActual) * 100);
    return (
      <View style={styles.resultContainer}>
        <View style={styles.resultCard}>
          <Text style={styles.resultEmoji}>{pct === 100 ? '🏆' : pct >= 60 ? '🌟' : '💪'}</Text>
          <Text style={styles.resultTitulo}>{pct === 100 ? '¡Grupo perfecto!' : pct >= 60 ? '¡Bien hecho!' : '¡Sigue adelante!'}</Text>
          <View style={styles.progresoTemaWrap}>
            <View style={styles.progresoTemaBarBg}><View style={[styles.progresoTemaBarFill, { width: `${porcentajeTotal}%` }]} /></View>
            <Text style={styles.progresoTemaTexto}>Grupo {grupo + 1} de {totalGrupos} completado — {porcentajeTotal}%</Text>
          </View>
          <View style={[styles.puntajeCirculo, { borderColor: pct === 100 ? '#CA8A04' : pct >= 60 ? colores.primario : colores.error }]}>
            <Text style={[styles.puntajeNumero, { color: pct === 100 ? '#CA8A04' : pct >= 60 ? colores.primario : colores.error }]}>{pct}%</Text>
            <Text style={styles.puntajeLabel}>{puntajeGrupo}/{preguntasEnGrupoActual} correctas</Text>
          </View>
          <Text style={styles.puntajeTotalTexto}>Total acumulado: {puntajeTotal}/{indiceGlobal + 1} correctas</Text>
          <TouchableOpacity style={styles.btnRepetir} onPress={continuarSiguienteGrupo}>
            <Text style={styles.btnRepetirTexto}>{esUltimo ? '🏁 Ver resultado final' : `➡️  Siguiente grupo (${sig + 1}/${totalGrupos})`}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnVolver} onPress={() => { detenerTodoAudio(); router.back(); }}>
            <Text style={styles.btnVolverTexto}>← Volver a temas</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // ── Pantalla de resultados finales ────────────────────────────────────────
  if (terminado) {
    const total = preguntasSeleccionadas.length; const pct = Math.round((puntajeTotal / total) * 100);
    const esPerfecto = puntajeTotal === total; const esBueno = puntajeTotal >= total / 2;
    return (
      <View style={styles.resultContainer}>
        <View style={styles.resultCard}>
          <Text style={styles.resultEmoji}>{esPerfecto ? '🏆' : esBueno ? '🌟' : '💪'}</Text>
          <Text style={styles.resultTitulo}>{esPerfecto ? '¡Perfecto!' : esBueno ? '¡Muy bien!' : '¡Sigue practicando!'}</Text>
          <Text style={styles.resultMensaje}>{esPerfecto ? 'Lo dominaste todo' : esBueno ? 'Vas muy bien, sigue así' : 'La práctica hace al maestro'}</Text>
          <View style={[styles.puntajeCirculo, { borderColor: esPerfecto ? '#CA8A04' : esBueno ? colores.primario : colores.error }]}>
            <Text style={[styles.puntajeNumero, { color: esPerfecto ? '#CA8A04' : esBueno ? colores.primario : colores.error }]}>{pct}%</Text>
            <Text style={styles.puntajeLabel}>{puntajeTotal}/{total} correctas</Text>
          </View>
          <View style={styles.estrellas}>
            {[1, 2, 3].map(i => (<Text key={i} style={[styles.estrella, { opacity: puntajeTotal >= Math.ceil((total / 3) * i) ? 1 : 0.2 }]}>⭐</Text>))}
          </View>
          {guardando && <Text style={styles.guardandoTexto}>Guardando progreso...</Text>}
          <TouchableOpacity style={styles.btnRepetir} onPress={() => router.replace({ pathname: '/leccion', params: { nombre: nombreAvatar, temaId: temaId as string, temaTitulo: tituloTema, nivelIndex: nivelIndex as string } })}>
            <Text style={styles.btnRepetirTexto}>🔄  Repetir con nuevas preguntas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnVolver} onPress={() => { detenerTodoAudio(); router.back(); }}>
            <Text style={styles.btnVolverTexto}>← Volver a temas</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (!preguntaActual) return <View style={styles.container} />;

  // ── Pantalla de lección ───────────────────────────────────────────────────
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contenido} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { detenerTodoAudio(); ExpoSpeechRecognitionModule.stop(); router.back(); }} style={styles.backBtn}>
          <Text style={styles.backTexto}>✕</Text>
        </TouchableOpacity>
        <View style={styles.progressBarBg}><View style={[styles.progressBarFill, { width: `${progresoGrupo}%` }]} /></View>
        <Text style={styles.progressLabel}>{pasoEnGrupo + 1}/{preguntasEnGrupoActual}</Text>
        <TouchableOpacity onPress={() => setMostrarAyuda(true)} style={styles.ayudaBtn}>
          <Text style={styles.ayudaBtnTexto}>❓</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.grupoInfo}>
        <Text style={styles.temaTitulo}>{tituloTema}</Text>
        <View style={styles.grupoPill}>
          <Text style={styles.grupoTexto}>{iconoTipo()} Grupo {grupo + 1}/{totalGrupos} · {porcentajeTotal}%</Text>
        </View>
      </View>

      {/* Avatar para todos los tipos */}
      <AvatarHablando nombre={nombreAvatar} hablando={avatarHablando} escuchando={escuchando} onPress={repetirPregunta} />

      {/* Contenido según tipo */}
      {esNormal ? (
        <>
          <View style={styles.burbujaWrap}>
            {seleccion === null ? (
              <>
                <Text style={styles.burbujaIngles}>{preguntaActual.datos.ingles}</Text>
                <Text style={styles.burbujaEspanol}>{preguntaActual.datos.espanol}</Text>
                {textoEscuchado !== '' && <Text style={styles.textoEscuchado}>{textoEscuchado}</Text>}
              </>
            ) : (
              <Text style={[styles.feedbackTexto, { color: correcto ? colores.exito : colores.error }]}>
                {correcto ? '✅ ' : '❌ '}{mensajeFeedback}
              </Text>
            )}
          </View>
          {seleccion === null && (
            <View style={styles.opcionesWrap}>
              <Text style={styles.instruccion}>Habla o toca una opción:</Text>
              {preguntaActual.datos.opciones.map((opcion: string, index: number) => (
                <TouchableOpacity key={index} style={styles.opcion} onPress={() => responder(index)}
                  activeOpacity={0.85} disabled={procesando || escuchando}>
                  <View style={styles.opcionLetra}><Text style={styles.opcionLetraTexto}>{['A', 'B', 'C'][index]}</Text></View>
                  <Text style={styles.opcionTexto}>{opcion}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          {seleccion === null && (
            <View style={styles.micWrap}>
              <BotonMicrofono onIniciar={iniciarEscucha} onTerminar={terminarEscucha}
                escuchando={escuchando} disabled={procesando || avatarHablando} colores={colores} />
              {procesando && <Text style={styles.procesandoTexto}>Analizando tu respuesta...</Text>}
            </View>
          )}
        </>
      ) : (
        /* Ejercicios nuevos */
        <View style={styles.burbujaWrap}>
          {preguntaActual.tipo === 'ordenar' && (
            <EjercicioOrdenarComp key={indiceGlobal} ejercicio={preguntaActual.datos} colores={colores}
              onRespuesta={(ok) => manejarRespuestaEjercicio(ok, preguntaActual.datos.frase_correcta)} />
          )}
          {preguntaActual.tipo === 'verdadero_falso' && (
            <EjercicioVFComp key={indiceGlobal} ejercicio={preguntaActual.datos} colores={colores}
              onRespuesta={(ok) => manejarRespuestaEjercicio(ok)} />
          )}
          {preguntaActual.tipo === 'relacionar' && (
            <EjercicioRelacionarComp key={indiceGlobal} ejercicio={preguntaActual.datos} colores={colores}
              onRespuesta={(ok) => manejarRespuestaEjercicio(ok)} />
          )}
        </View>
      )}

      {/* Modal de ayuda: se abre encima de todo sin cambiar de pantalla,
          así que al cerrarla el usuario vuelve exactamente al mismo punto
          (misma pregunta, mismas palabras ya seleccionadas, etc.) */}
      <Modal visible={mostrarAyuda} transparent animationType="fade" onRequestClose={() => setMostrarAyuda(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <AvatarHablando nombre={nombreAvatar} hablando={avatarHablando} escuchando={false}
              onPress={() => { hablandoRef.current = false; alTerminarHablar.current = null; hablarAvatar((EXPLICACION_GRAMATICAL[nivelIdx] ?? EXPLICACION_GRAMATICAL[0]).texto); }} />
            <Text style={styles.resultTitulo}>{(EXPLICACION_GRAMATICAL[nivelIdx] ?? EXPLICACION_GRAMATICAL[0]).titulo}</Text>
            <Text style={[styles.resultMensaje, { marginBottom: 20 }]}>{(EXPLICACION_GRAMATICAL[nivelIdx] ?? EXPLICACION_GRAMATICAL[0]).texto}</Text>
            <TouchableOpacity style={styles.btnRepetir} onPress={() => setMostrarAyuda(false)}>
              <Text style={styles.btnRepetirTexto}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

function crearEstilos(colores: Tema) {
  return StyleSheet.create({
    container:           { flex: 1, backgroundColor: colores.fondo },
    contenido:           { paddingHorizontal: 16, paddingBottom: 32 },
    header:              { flexDirection: 'row', alignItems: 'center', paddingTop: 52, paddingBottom: 8, gap: 12 },
    backBtn:             { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
    backTexto:           { color: colores.textoTerciario, fontSize: 18 },
    progressBarBg:       { flex: 1, height: 8, backgroundColor: colores.fondoTarjeta, borderRadius: 4 },
    progressBarFill:     { height: 8, backgroundColor: colores.primario, borderRadius: 4 },
    progressLabel:       { color: colores.primario, fontSize: 13, fontWeight: '700', minWidth: 32, textAlign: 'right' },
    ayudaBtn:            { width: 30, height: 30, borderRadius: 15, backgroundColor: colores.fondoTarjeta, borderWidth: 1, borderColor: colores.borde, alignItems: 'center', justifyContent: 'center' },
    ayudaBtnTexto:       { fontSize: 14 },
    modalOverlay:        { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', alignItems: 'center', justifyContent: 'center', padding: 24 },
    modalCard:           { backgroundColor: colores.fondoTarjeta, borderRadius: 24, padding: 24, width: '100%', maxWidth: 420, alignItems: 'center' },
    grupoInfo:           { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
    temaTitulo:          { color: colores.textoSecundario, fontSize: 13, fontWeight: '600' },
    grupoPill:           { backgroundColor: colores.fondoTarjeta, paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20, borderWidth: 1, borderColor: colores.borde },
    grupoTexto:          { color: colores.textoTerciario, fontSize: 11, fontWeight: '600' },
    burbujaWrap:         { backgroundColor: colores.fondoTarjeta, borderRadius: 16, padding: 14, marginBottom: 10, minHeight: 65 },
    burbujaIngles:       { fontSize: 17, fontWeight: '700', color: colores.textoPrimario, marginBottom: 4 },
    burbujaEspanol:      { fontSize: 12, color: colores.textoTerciario, fontStyle: 'italic' },
    textoEscuchado:      { fontSize: 12, color: colores.primario, fontStyle: 'italic', marginTop: 6 },
    feedbackTexto:       { fontSize: 14, fontWeight: '600', lineHeight: 20 },
    instruccion:         { fontSize: 12, color: colores.textoTerciario, marginBottom: 6 },
    opcionesWrap:        { gap: 7, marginBottom: 10 },
    opcion:              { height: 50, backgroundColor: colores.fondoTarjeta, borderRadius: 14, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 12, borderWidth: 1.5, borderColor: colores.borde },
    opcionLetra:         { width: 26, height: 26, borderRadius: 13, backgroundColor: colores.borde, alignItems: 'center', justifyContent: 'center' },
    opcionLetraTexto:    { color: colores.textoSecundario, fontSize: 12, fontWeight: '700' },
    opcionTexto:         { color: colores.textoPrimario, fontSize: 14, flex: 1 },
    micWrap:             { alignItems: 'center', gap: 6, paddingTop: 2 },
    procesandoTexto:     { color: colores.textoTerciario, fontSize: 11, fontStyle: 'italic' },
    progresoTemaWrap:    { width: '100%', marginBottom: 16 },
    progresoTemaBarBg:   { height: 10, backgroundColor: colores.borde, borderRadius: 5, marginBottom: 6 },
    progresoTemaBarFill: { height: 10, backgroundColor: colores.primario, borderRadius: 5 },
    progresoTemaTexto:   { fontSize: 12, color: colores.textoTerciario, textAlign: 'center' },
    puntajeTotalTexto:   { fontSize: 13, color: colores.textoSecundario, marginBottom: 20 },
    resultContainer:     { flex: 1, backgroundColor: colores.fondo, alignItems: 'center', justifyContent: 'center', padding: 24 },
    resultCard:          { backgroundColor: colores.fondoTarjeta, borderRadius: 24, padding: 28, width: '100%', alignItems: 'center' },
    resultEmoji:         { fontSize: 60, marginBottom: 10 },
    resultTitulo:        { fontSize: 24, fontWeight: '700', color: colores.textoPrimario, marginBottom: 6 },
    resultMensaje:       { fontSize: 13, color: colores.textoTerciario, textAlign: 'center', marginBottom: 20 },
    puntajeCirculo:      { width: 110, height: 110, borderRadius: 55, borderWidth: 5, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
    puntajeNumero:       { fontSize: 30, fontWeight: '700' },
    puntajeLabel:        { fontSize: 11, color: colores.textoTerciario, marginTop: 2 },
    estrellas:           { flexDirection: 'row', gap: 8, marginBottom: 24 },
    estrella:            { fontSize: 30 },
    guardandoTexto:      { color: colores.textoTerciario, fontSize: 12, marginBottom: 12 },
    btnRepetir:          { backgroundColor: colores.primario, borderRadius: 14, paddingVertical: 14, width: '100%', alignItems: 'center', marginBottom: 10 },
    btnRepetirTexto:     { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
    btnVolver:           { backgroundColor: colores.fondo, borderRadius: 14, paddingVertical: 14, width: '100%', alignItems: 'center', borderWidth: 1, borderColor: colores.borde },
    btnVolverTexto:      { color: colores.textoSecundario, fontSize: 14, fontWeight: '600' },
  });
}
