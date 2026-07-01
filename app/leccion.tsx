import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';
import { ExpoSpeechRecognitionModule, useSpeechRecognitionEvent } from 'expo-speech-recognition';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { obtenerLeccionesDeTema } from './contenido/lecciones';
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

function fraseCorrecto(): string {
  return FRASES_CORRECTO[Math.floor(Math.random() * FRASES_CORRECTO.length)];
}
function fraseIncorrecto(r: string): string {
  return `${FRASES_INCORRECTO[Math.floor(Math.random() * FRASES_INCORRECTO.length)]}${r}.`;
}

function mezclar<T>(arr: T[]): T[] {
  const c = [...arr];
  for (let i = c.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [c[i], c[j]] = [c[j], c[i]];
  }
  return c;
}

const DATOS_AVATAR: Record<string, { emoji: string; color: string; bg: string }> = {
  Michelle: { emoji: '👩',    color: '#DB2777', bg: '#FCE7F3' },
  Esteban:  { emoji: '👨',    color: '#1D4ED8', bg: '#DBEAFE' },
  Luciana:  { emoji: '👩‍🏫', color: '#7E22CE', bg: '#F3E8FF' },
  Charley:  { emoji: '👨‍💼', color: '#C2410C', bg: '#FFEDD5' },
};

// ── Avatar animado ────────────────────────────────────────────────────────────
function AvatarHablando({ nombre, hablando, escuchando, onPress }: {
  nombre: string; hablando: boolean; escuchando: boolean; onPress: () => void;
}) {
  const pulso    = useRef(new Animated.Value(1)).current;
  const rotacion = useRef(new Animated.Value(0)).current;
  const datos    = DATOS_AVATAR[nombre] ?? DATOS_AVATAR['Michelle'];

  useEffect(() => {
    if (hablando) {
      Animated.loop(Animated.sequence([
        Animated.timing(pulso, { toValue: 1.08, duration: 400, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(pulso, { toValue: 0.96, duration: 400, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ])).start();
    } else {
      pulso.stopAnimation();
      Animated.timing(pulso, { toValue: 1, duration: 200, useNativeDriver: true }).start();
    }
  }, [hablando]);

  useEffect(() => {
    if (escuchando) {
      Animated.loop(Animated.sequence([
        Animated.timing(rotacion, { toValue: 1,  duration: 600, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(rotacion, { toValue: -1, duration: 600, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(rotacion, { toValue: 0,  duration: 300, useNativeDriver: true }),
      ])).start();
    } else {
      rotacion.stopAnimation();
      Animated.timing(rotacion, { toValue: 0, duration: 200, useNativeDriver: true }).start();
    }
  }, [escuchando]);

  const rotate = rotacion.interpolate({ inputRange: [-1, 1], outputRange: ['-4deg', '4deg'] });

  return (
    <TouchableOpacity style={eAvatar.contenedor} onPress={onPress} activeOpacity={0.85}>
      {hablando && (
        <>
          <Animated.View style={[eAvatar.anillo, { backgroundColor: datos.color + '20', transform: [{ scale: pulso }] }]} />
          <Animated.View style={[eAvatar.anilloMedio, { backgroundColor: datos.color + '15', transform: [{ scale: pulso }] }]} />
        </>
      )}
      {escuchando && (
        <Animated.View style={[eAvatar.anillo, { backgroundColor: '#22C55E20', transform: [{ scale: pulso }] }]} />
      )}
      <Animated.View style={[
        eAvatar.circulo,
        { backgroundColor: datos.bg, borderColor: hablando ? datos.color : escuchando ? '#22C55E' : datos.color + '40' },
        { transform: [{ scale: hablando ? pulso : 1 }, { rotate: escuchando ? rotate : '0deg' }] },
      ]}>
        <Text style={eAvatar.emoji}>{datos.emoji}</Text>
      </Animated.View>
      <View style={[eAvatar.badge, { backgroundColor: hablando ? datos.color : escuchando ? '#22C55E' : '#64748B' }]}>
        <Text style={eAvatar.badgeTexto}>
          {hablando ? '🔊 Hablando' : escuchando ? '👂 Escuchando' : '🔁 Toca para repetir'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const eAvatar = StyleSheet.create({
  contenedor:  { height: 180, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  anillo:      { position: 'absolute', width: 160, height: 160, borderRadius: 80 },
  anilloMedio: { position: 'absolute', width: 130, height: 130, borderRadius: 65 },
  circulo:     { width: 90, height: 90, borderRadius: 45, alignItems: 'center', justifyContent: 'center', borderWidth: 3 },
  emoji:       { fontSize: 46 },
  badge:       { position: 'absolute', bottom: 8, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 },
  badgeTexto:  { color: '#fff', fontSize: 11, fontWeight: '700' },
});

// ── Botón micrófono con tema ──────────────────────────────────────────────────
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

// ── Pantalla principal ────────────────────────────────────────────────────────
export default function LeccionScreen() {
  const router = useRouter();
  const { colores } = useTema();
  const styles = crearEstilos(colores);
  const { nombre, temaId, temaTitulo } = useLocalSearchParams();
  const { completarTema } = useProgreso();

  const nombreAvatar = nombre as string || 'Michelle';
  const tituloTema   = temaTitulo as string || 'Lección';
  const idTema       = temaId ? parseInt(temaId as string, 10) : null;
  const todasLecciones = obtenerLeccionesDeTema(idTema ?? 0);

  const [preguntasSeleccionadas] = useState(() => {
    if (todasLecciones.length === 0) return [];
    const resultado: typeof todasLecciones = [];
    let mezcladas = mezclar(todasLecciones);
    while (resultado.length < TOTAL_PREGUNTAS) {
      resultado.push(...mezcladas);
      mezcladas = mezclar(todasLecciones);
    }
    return resultado.slice(0, TOTAL_PREGUNTAS);
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

  const alTerminarHablar = useRef<(() => void) | null>(null);
  const soundRef         = useRef<Audio.Sound | null>(null);
  const hablandoRef      = useRef(false);
  const montado          = useRef(true);
  const textoPreguntaActual = useRef('');
  const yaRespondio      = useRef(false);

  const indiceGlobal  = grupo * PREGUNTAS_POR_GRUPO + pasoEnGrupo;
  const leccionActual = preguntasSeleccionadas[indiceGlobal];
  const preguntasEnGrupoActual = Math.min(PREGUNTAS_POR_GRUPO, preguntasSeleccionadas.length - grupo * PREGUNTAS_POR_GRUPO);
  const progresoGrupo   = (pasoEnGrupo / preguntasEnGrupoActual) * 100;
  const porcentajeTotal = Math.round((indiceGlobal / preguntasSeleccionadas.length) * 100);

  useEffect(() => { montado.current = true; return () => { montado.current = false; }; }, []);

  // ── Voz ───────────────────────────────────────────────────────────────────
  useSpeechRecognitionEvent('result', (event) => {
    if (!event.results || event.results.length === 0) return;
    if (yaRespondio.current) return;
    const textoReconocido = event.results[0]?.transcript ?? '';
    const indice = encontrarMejorOpcion(textoReconocido, leccionActual.opciones);
    if (indice !== -1) {
      yaRespondio.current = true;
      setProcesando(false); setTextoEscuchado('');
      responder(indice);
    } else {
      setProcesando(false); setTextoEscuchado('');
      const frases = ["Hmm, I didn't catch that. Try again!", "Sorry, could you repeat that?",
        "Try once more, you can do it!", "Almost! Say it again please.", "I didn't quite get that. One more time!"];
      hablarAvatar(frases[Math.floor(Math.random() * frases.length)]);
    }
  });

  useSpeechRecognitionEvent('end', () => {
    if (montado.current) { setEscuchando(false); setProcesando(false); }
  });

  useSpeechRecognitionEvent('error', () => {
    if (montado.current) {
      setEscuchando(false); setProcesando(false); setTextoEscuchado('');
      const frases = ["I didn't hear you. Try again!", "Speak up! Try again.", "I'm listening! Once more."];
      hablarAvatar(frases[Math.floor(Math.random() * frases.length)]);
    }
  });

  useEffect(() => {
    if (!leccionActual || terminado || terminadoGrupo) return;
    if (hablandoRef.current) return;
    hablandoRef.current = true;
    yaRespondio.current = false;
    setSeleccion(null); setCorrecto(null); setTextoEscuchado(''); setMensajeFeedback('');
    textoPreguntaActual.current = leccionActual.ingles;
    const tieneBlanco = leccionActual.ingles.includes('___');
    const timer = setTimeout(() => {
      if (tieneBlanco) {
        const partes = leccionActual.ingles.split('___');
        hablarAvatarConPausa(partes[0].trim().replace(/,\s*$/, ''), (partes[1] || '').trim().replace(/^[,.]\s*/, ''));
      } else {
        hablarAvatar(leccionActual.ingles);
      }
    }, 400);
    return () => { clearTimeout(timer); hablandoRef.current = false; };
  }, [indiceGlobal, terminadoGrupo]);

  useEffect(() => {
    return () => {
      Speech.stop();
      ExpoSpeechRecognitionModule.stop();
      soundRef.current?.stopAsync().then(() => soundRef.current?.unloadAsync());
    };
  }, []);

  const detenerTodoAudio = async () => {
    Speech.stop();
    if (soundRef.current) {
      try { await soundRef.current.stopAsync(); await soundRef.current.unloadAsync(); } catch (_) {}
      soundRef.current = null;
    }
    if (montado.current) setAvatarHablando(false);
  };

  const hablarAvatarConPausa = async (parte1: string, parte2: string) => {
    if (!montado.current) return;
    setAvatarHablando(true);
    await new Promise<void>((resolve) => {
      Speech.speak(parte1, { language: 'en-US', rate: 0.85, onDone: resolve, onStopped: resolve, onError: resolve });
    });
    await new Promise(r => setTimeout(r, 600));
    if (!montado.current) { setAvatarHablando(false); return; }
    if (parte2) {
      await new Promise<void>((resolve) => {
        Speech.speak(parte2, { language: 'en-US', rate: 0.85, onDone: resolve, onStopped: resolve, onError: resolve });
      });
    }
    if (montado.current) {
      setAvatarHablando(false);
      alTerminarHablar.current?.();
      alTerminarHablar.current = null;
    }
  };

  const hablarAvatar = async (texto: string) => {
    try {
      await detenerTodoAudio();
      if (!montado.current) return;
      setAvatarHablando(true);
      await Audio.setAudioModeAsync({ playsInSilentModeIOS: true, staysActiveInBackground: false });
      const base64 = await generarVozBase64(texto, nombreAvatar);
      if (!montado.current) return;
      if (!base64) {
        setTimeout(() => {
          if (montado.current) {
            setAvatarHablando(false);
            alTerminarHablar.current?.();
            alTerminarHablar.current = null;
          }
        }, Math.max(texto.length * 55, 2000));
        return;
      }
      const { sound } = await Audio.Sound.createAsync({ uri: `data:audio/mpeg;base64,${base64}` }, { shouldPlay: true });
      soundRef.current = sound;
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          if (montado.current) {
            setAvatarHablando(false);
            alTerminarHablar.current?.();
            alTerminarHablar.current = null;
          }
          sound.unloadAsync();
          soundRef.current = null;
        }
      });
    } catch (e) {
      if (montado.current) setAvatarHablando(false);
    }
  };

  const repetirPregunta = () => {
    if (escuchando || procesando || seleccion !== null) return;
    hablandoRef.current = false;
    alTerminarHablar.current = null;
    const tieneBlanco = leccionActual.ingles.includes('___');
    if (tieneBlanco) {
      const partes = leccionActual.ingles.split('___');
      hablarAvatarConPausa(partes[0].trim().replace(/,\s*$/, ''), (partes[1] || '').trim().replace(/^[,.]\s*/, ''));
    } else {
      hablarAvatar(leccionActual.ingles);
    }
  };

  const iniciarEscucha = async () => {
    if (seleccion !== null || procesando || avatarHablando) return;
    try {
      await detenerTodoAudio();
      yaRespondio.current = false;
      const { granted } = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
      if (!granted) { setTextoEscuchado('Necesitas dar permiso al micrófono.'); return; }
      setEscuchando(true);
      setTextoEscuchado('🎤 Escuchando...');
      ExpoSpeechRecognitionModule.start({ lang: 'en-US', interimResults: false, maxAlternatives: 1 });
    } catch (e) {
      setTextoEscuchado('Error al acceder al micrófono.');
      setEscuchando(false);
    }
  };

  const terminarEscucha = () => {
    if (!escuchando) return;
    setProcesando(true);
    ExpoSpeechRecognitionModule.stop();
  };

  const limpiarTexto = (t: string) =>
    t.toLowerCase().replace(/[.,!?;:'"¿¡]/g, '').replace(/\s+/g, ' ').trim();

  const encontrarMejorOpcion = (texto: string, opciones: string[]): number => {
    const tl = limpiarTexto(texto);
    let mejorI = -1, mejorP = 0;
    opciones.forEach((op, i) => {
      const o = limpiarTexto(op);
      if (tl === o) { mejorI = i; mejorP = 100; return; }
      if (tl.includes(o) || o.includes(tl)) {
        const p = (Math.min(tl.length, o.length) / Math.max(tl.length, o.length)) * 95;
        if (p > mejorP) { mejorP = p; mejorI = i; }
      }
      const pw = tl.split(' ').filter(x => x.length > 1);
      const ow = o.split(' ').filter(x => x.length > 1);
      const comunes = pw.filter(x => ow.includes(x));
      if (comunes.length > 0 && ow.length > 0) {
        const p = (comunes.length / ow.length) * 85;
        if (p > mejorP) { mejorP = p; mejorI = i; }
      }
    });
    opciones.forEach((op, i) => {
      const o = limpiarTexto(op);
      if (o.split(' ').length === 1 && tl.split(' ').includes(o)) {
        if (90 > mejorP) { mejorP = 90; mejorI = i; }
      }
    });
    const esCorta = opciones.every(o => limpiarTexto(o).split(' ').length <= 2);
    return mejorP > (esCorta ? 15 : 30) ? mejorI : -1;
  };

  const responder = (index: number) => {
    if (seleccion !== null) return;
    setSeleccion(index);
    const esCorrecto = index === leccionActual.correcta;
    setCorrecto(esCorrecto);
    if (esCorrecto) { setPuntajeGrupo(p => p + 1); setPuntajeTotal(p => p + 1); }
    const textoFeedback = esCorrecto ? fraseCorrecto() : fraseIncorrecto(leccionActual.opciones[leccionActual.correcta]);
    setMensajeFeedback(textoFeedback);
    alTerminarHablar.current = () => {
      if (!montado.current) return;
      hablandoRef.current = false;
      setTimeout(() => {
        if (!montado.current) return;
        if (pasoEnGrupo + 1 >= preguntasEnGrupoActual) {
          setTerminadoGrupo(true);
        } else {
          setPasoEnGrupo(p => p + 1);
          setSeleccion(null); setCorrecto(null);
        }
      }, 600);
    };
    hablarAvatar(textoFeedback);
  };

  const continuarSiguienteGrupo = () => {
    const sig = grupo + 1;
    if (sig >= totalGrupos) {
      finalizarLeccion();
    } else {
      setGrupo(sig); setPasoEnGrupo(0); setPuntajeGrupo(0);
      setTerminadoGrupo(false); setSeleccion(null); setCorrecto(null);
      hablandoRef.current = false;
    }
  };

  const finalizarLeccion = async () => {
    setTerminado(true);
    if (idTema !== null) {
      setGuardando(true);
      await completarTema(idTema, puntajeTotal * 10);
      if (montado.current) setGuardando(false);
    }
  };

  // ── Pantalla entre grupos ─────────────────────────────────────────────────
  if (terminadoGrupo && !terminado) {
    const sig = grupo + 1;
    const esUltimo = sig >= totalGrupos;
    const pct = Math.round((puntajeGrupo / preguntasEnGrupoActual) * 100);
    return (
      <View style={styles.resultContainer}>
        <View style={styles.resultCard}>
          <Text style={styles.resultEmoji}>{pct === 100 ? '🏆' : pct >= 60 ? '🌟' : '💪'}</Text>
          <Text style={styles.resultTitulo}>
            {pct === 100 ? '¡Grupo perfecto!' : pct >= 60 ? '¡Bien hecho!' : '¡Sigue adelante!'}
          </Text>
          <View style={styles.progresoTemaWrap}>
            <View style={styles.progresoTemaBarBg}>
              <View style={[styles.progresoTemaBarFill, { width: `${porcentajeTotal}%` }]} />
            </View>
            <Text style={styles.progresoTemaTexto}>
              Grupo {grupo + 1} de {totalGrupos} completado — {porcentajeTotal}%
            </Text>
          </View>
          <View style={[styles.puntajeCirculo, {
            borderColor: pct === 100 ? '#CA8A04' : pct >= 60 ? colores.primario : colores.error
          }]}>
            <Text style={[styles.puntajeNumero, {
              color: pct === 100 ? '#CA8A04' : pct >= 60 ? colores.primario : colores.error
            }]}>{pct}%</Text>
            <Text style={styles.puntajeLabel}>{puntajeGrupo}/{preguntasEnGrupoActual} correctas</Text>
          </View>
          <Text style={styles.puntajeTotalTexto}>
            Total acumulado: {puntajeTotal}/{indiceGlobal + 1} correctas
          </Text>
          <TouchableOpacity style={styles.btnRepetir} onPress={continuarSiguienteGrupo}>
            <Text style={styles.btnRepetirTexto}>
              {esUltimo ? '🏁 Ver resultado final' : `➡️  Siguiente grupo (${sig + 1}/${totalGrupos})`}
            </Text>
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
    const total = preguntasSeleccionadas.length;
    const pct   = Math.round((puntajeTotal / total) * 100);
    const esPerfecto = puntajeTotal === total;
    const esBueno    = puntajeTotal >= total / 2;
    return (
      <View style={styles.resultContainer}>
        <View style={styles.resultCard}>
          <Text style={styles.resultEmoji}>{esPerfecto ? '🏆' : esBueno ? '🌟' : '💪'}</Text>
          <Text style={styles.resultTitulo}>
            {esPerfecto ? '¡Perfecto!' : esBueno ? '¡Muy bien!' : '¡Sigue practicando!'}
          </Text>
          <Text style={styles.resultMensaje}>
            {esPerfecto ? 'Lo dominaste todo' : esBueno ? 'Vas muy bien, sigue así' : 'La práctica hace al maestro'}
          </Text>
          <View style={[styles.puntajeCirculo, {
            borderColor: esPerfecto ? '#CA8A04' : esBueno ? colores.primario : colores.error
          }]}>
            <Text style={[styles.puntajeNumero, {
              color: esPerfecto ? '#CA8A04' : esBueno ? colores.primario : colores.error
            }]}>{pct}%</Text>
            <Text style={styles.puntajeLabel}>{puntajeTotal}/{total} correctas</Text>
          </View>
          <View style={styles.estrellas}>
            {[1, 2, 3].map(i => (
              <Text key={i} style={[styles.estrella, {
                opacity: puntajeTotal >= Math.ceil((total / 3) * i) ? 1 : 0.2
              }]}>⭐</Text>
            ))}
          </View>
          {guardando && <Text style={styles.guardandoTexto}>Guardando progreso...</Text>}
          <TouchableOpacity style={styles.btnRepetir} onPress={() => {
            router.replace({ pathname: '/leccion', params: { nombre: nombreAvatar, temaId: temaId as string, temaTitulo: tituloTema } });
          }}>
            <Text style={styles.btnRepetirTexto}>🔄  Repetir con nuevas preguntas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnVolver} onPress={() => { detenerTodoAudio(); router.back(); }}>
            <Text style={styles.btnVolverTexto}>← Volver a temas</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // ── Pantalla de lección ───────────────────────────────────────────────────
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contenido} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { detenerTodoAudio(); ExpoSpeechRecognitionModule.stop(); router.back(); }} style={styles.backBtn}>
          <Text style={styles.backTexto}>✕</Text>
        </TouchableOpacity>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${progresoGrupo}%` }]} />
        </View>
        <Text style={styles.progressLabel}>{pasoEnGrupo + 1}/{preguntasEnGrupoActual}</Text>
      </View>

      <View style={styles.grupoInfo}>
        <Text style={styles.temaTitulo}>{tituloTema}</Text>
        <View style={styles.grupoPill}>
          <Text style={styles.grupoTexto}>Grupo {grupo + 1}/{totalGrupos} · {porcentajeTotal}% completado</Text>
        </View>
      </View>

      <AvatarHablando
        nombre={nombreAvatar}
        hablando={avatarHablando}
        escuchando={escuchando}
        onPress={repetirPregunta}
      />

      <View style={styles.burbujaWrap}>
        {seleccion === null ? (
          <>
            <Text style={styles.burbujaIngles}>{leccionActual.ingles}</Text>
            <Text style={styles.burbujaEspanol}>{leccionActual.espanol}</Text>
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
          {leccionActual.opciones.map((opcion, index) => (
            <TouchableOpacity
              key={index}
              style={styles.opcion}
              onPress={() => responder(index)}
              activeOpacity={0.85}
              disabled={procesando || escuchando}
            >
              <View style={styles.opcionLetra}>
                <Text style={styles.opcionLetraTexto}>{['A', 'B', 'C'][index]}</Text>
              </View>
              <Text style={styles.opcionTexto}>{opcion}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {seleccion === null && (
        <View style={styles.micWrap}>
          <BotonMicrofono
            onIniciar={iniciarEscucha}
            onTerminar={terminarEscucha}
            escuchando={escuchando}
            disabled={procesando || avatarHablando}
            colores={colores}
          />
          {procesando && <Text style={styles.procesandoTexto}>Analizando tu respuesta...</Text>}
        </View>
      )}
    </ScrollView>
  );
}

// ── Estilos ───────────────────────────────────────────────────────────────────
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
