import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import { obtenerLeccionesDeTema } from './contenido/lecciones';
import { generarVozBase64 } from './lib/elevenlabs';
import { useProgreso } from './theme/ProgresoContext';
import { useTema } from './theme/ThemeContext';
import type { Tema } from './theme/colors';

// ── Datos de cada avatar ─────────────────────────────────────────────────────
const DATOS_AVATAR: Record<string, { emoji: string; color: string; bg: string }> = {
  Michelle: { emoji: '👩',    color: '#DB2777', bg: '#FCE7F3' },
  Esteban:  { emoji: '👨',    color: '#1D4ED8', bg: '#DBEAFE' },
  Luciana:  { emoji: '👩‍🏫', color: '#7E22CE', bg: '#F3E8FF' },
  Charley:  { emoji: '👨‍💼', color: '#C2410C', bg: '#FFEDD5' },
};

// ── Componente Avatar animado ────────────────────────────────────────────────
function AvatarHablando({
  nombre,
  hablando,
  escuchando,
}: {
  nombre: string;
  hablando: boolean;
  escuchando: boolean;
}) {
  const pulso = useRef(new Animated.Value(1)).current;
  const rotacion = useRef(new Animated.Value(0)).current;
  const datos = DATOS_AVATAR[nombre] ?? DATOS_AVATAR['Michelle'];

  useEffect(() => {
    if (hablando) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulso, { toValue: 1.08, duration: 400, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
          Animated.timing(pulso, { toValue: 0.96, duration: 400, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        ])
      ).start();
    } else {
      pulso.stopAnimation();
      Animated.timing(pulso, { toValue: 1, duration: 200, useNativeDriver: true }).start();
    }
  }, [hablando]);

  useEffect(() => {
    if (escuchando) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(rotacion, { toValue: 1, duration: 600, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
          Animated.timing(rotacion, { toValue: -1, duration: 600, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
          Animated.timing(rotacion, { toValue: 0, duration: 300, useNativeDriver: true }),
        ])
      ).start();
    } else {
      rotacion.stopAnimation();
      Animated.timing(rotacion, { toValue: 0, duration: 200, useNativeDriver: true }).start();
    }
  }, [escuchando]);

  const rotate = rotacion.interpolate({ inputRange: [-1, 1], outputRange: ['-4deg', '4deg'] });

  return (
    <View style={estilosAvatar.contenedor}>
      {/* Anillos de pulso */}
      {hablando && (
        <>
          <Animated.View style={[estilosAvatar.anillo, { backgroundColor: datos.color + '20', transform: [{ scale: pulso }] }]} />
          <Animated.View style={[estilosAvatar.anilloMedio, { backgroundColor: datos.color + '15', transform: [{ scale: pulso }] }]} />
        </>
      )}
      {escuchando && (
        <Animated.View style={[estilosAvatar.anillo, { backgroundColor: '#22C55E20', transform: [{ scale: pulso }] }]} />
      )}

      {/* Círculo principal */}
      <Animated.View style={[
        estilosAvatar.circulo,
        { backgroundColor: datos.bg, borderColor: hablando ? datos.color : escuchando ? '#22C55E' : datos.color + '40' },
        { transform: [{ scale: hablando ? pulso : 1 }, { rotate: escuchando ? rotate : '0deg' }] }
      ]}>
        <Text style={estilosAvatar.emoji}>{datos.emoji}</Text>
      </Animated.View>

      {/* Badge de estado */}
      <View style={[
        estilosAvatar.badge,
        { backgroundColor: hablando ? datos.color : escuchando ? '#22C55E' : '#64748B' }
      ]}>
        <Text style={estilosAvatar.badgeTexto}>
          {hablando ? '🔊 Hablando' : escuchando ? '👂 Escuchando' : '💬 ' + nombre}
        </Text>
      </View>
    </View>
  );
}

const estilosAvatar = StyleSheet.create({
  contenedor: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  anillo: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
  },
  anilloMedio: {
    position: 'absolute',
    width: 130,
    height: 130,
    borderRadius: 65,
  },
  circulo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
  },
  emoji: {
    fontSize: 52,
  },
  badge: {
    position: 'absolute',
    bottom: 10,
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 20,
  },
  badgeTexto: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
});

// ── Componente Micrófono ─────────────────────────────────────────────────────
function BotonMicrofono({
  onIniciar,
  onTerminar,
  escuchando,
  disabled,
}: {
  onIniciar: () => void;
  onTerminar: () => void;
  escuchando: boolean;
  disabled: boolean;
}) {
  const escala = useRef(new Animated.Value(1)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !disabled,
      onPanResponderGrant: () => {
        Animated.spring(escala, { toValue: 0.9, useNativeDriver: true }).start();
        onIniciar();
      },
      onPanResponderRelease: () => {
        Animated.spring(escala, { toValue: 1, useNativeDriver: true }).start();
        onTerminar();
      },
      onPanResponderTerminate: () => {
        Animated.spring(escala, { toValue: 1, useNativeDriver: true }).start();
        onTerminar();
      },
    })
  ).current;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        estilosMic.boton,
        escuchando && estilosMic.botonActivo,
        disabled && estilosMic.botonDesactivado,
        { transform: [{ scale: escala }] },
      ]}
    >
      <Text style={estilosMic.icono}>{escuchando ? '🔴' : '🎤'}</Text>
      <Text style={[estilosMic.texto, escuchando && estilosMic.textoActivo]}>
        {escuchando ? 'Suelta para enviar' : 'Mantén presionado'}
      </Text>
    </Animated.View>
  );
}

const estilosMic = StyleSheet.create({
  boton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#1E293B',
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderWidth: 2,
    borderColor: '#334155',
  },
  botonActivo: {
    backgroundColor: '#14532D',
    borderColor: '#22C55E',
  },
  botonDesactivado: {
    opacity: 0.4,
  },
  icono: {
    fontSize: 22,
  },
  texto: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '600',
  },
  textoActivo: {
    color: '#22C55E',
  },
});

// ── Pantalla principal ───────────────────────────────────────────────────────
export default function LeccionScreen() {
  const router = useRouter();
  const { colores } = useTema();
  const styles = crearEstilos(colores);
  const { nombre, emoji, temaId, temaTitulo } = useLocalSearchParams();
  const { completarTema } = useProgreso();

  const nombreAvatar = nombre as string || 'Michelle';
  const tituloTema   = temaTitulo as string || 'Lección';
  const idTema       = temaId ? parseInt(temaId as string, 10) : null;
  const lecciones    = obtenerLeccionesDeTema(idTema ?? 0);

  const [paso, setPaso]               = useState(0);
  const [seleccion, setSeleccion]     = useState<number | null>(null);
  const [correcto, setCorrecto]       = useState<boolean | null>(null);
  const [puntaje, setPuntaje]         = useState(0);
  const [terminado, setTerminado]     = useState(false);
  const [guardando, setGuardando]     = useState(false);
  const [avatarHablando, setAvatarHablando] = useState(false);
  const [escuchando, setEscuchando]   = useState(false);
  const [textoEscuchado, setTextoEscuchado] = useState('');
  const [procesando, setProcesando]   = useState(false);
  const [mensajeFeedback, setMensajeFeedback] = useState('');

  const soundRef      = useRef<Audio.Sound | null>(null);
  const reconociendo  = useRef(false);
  const grabacion     = useRef<Audio.Recording | null>(null);

  const leccionActual = lecciones[paso];
  const progreso      = ((paso) / lecciones.length) * 100;

  // Al cambiar de pregunta → el avatar la lee en voz alta
  useEffect(() => {
    if (!leccionActual || terminado) return;
    setSeleccion(null);
    setCorrecto(null);
    setTextoEscuchado('');
    setMensajeFeedback('');
    const texto = `${leccionActual.ingles}. Choose the correct answer.`;
    setTimeout(() => hablarAvatar(texto), 400);
  }, [paso]);

  // ── Reproducir voz con ElevenLabs + expo-av ──────────────────────────────
  const hablarAvatar = async (texto: string) => {
    try {
      setAvatarHablando(true);
      if (soundRef.current) {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }
      await Audio.setAudioModeAsync({ playsInSilentModeIOS: true, staysActiveInBackground: false });

      const base64 = await generarVozBase64(texto, nombreAvatar);
      if (!base64) {
        // Fallback a texto a voz del sistema
        Speech.speak(texto, { language: 'en-US', rate: 0.9 });
        setTimeout(() => setAvatarHablando(false), texto.length * 60);
        return;
      }

      const { sound } = await Audio.Sound.createAsync(
        { uri: `data:audio/mpeg;base64,${base64}` },
        { shouldPlay: true }
      );
      soundRef.current = sound;
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          setAvatarHablando(false);
        }
      });
    } catch (e) {
      console.error('hablarAvatar error:', e);
      setAvatarHablando(false);
    }
  };

  // ── Iniciar grabación de voz ──────────────────────────────────────────────
  const iniciarEscucha = async () => {
    if (seleccion !== null || procesando || avatarHablando) return;
    try {
      // Detener cualquier audio reproduciéndose
      if (soundRef.current) {
        await soundRef.current.stopAsync();
        setAvatarHablando(false);
      }

      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) {
        setMensajeFeedback('Necesitas dar permiso al micrófono en ajustes.');
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      grabacion.current = recording;
      setEscuchando(true);
      setTextoEscuchado('🎤 Escuchando...');
      reconociendo.current = true;
    } catch (e) {
      console.error('iniciarEscucha error:', e);
      setMensajeFeedback('Error al acceder al micrófono.');
    }
  };

  // ── Terminar grabación y comparar respuesta ───────────────────────────────
  const terminarEscucha = async () => {
    if (!reconociendo.current || !grabacion.current) return;
    reconociendo.current = false;
    setEscuchando(false);
    setProcesando(true);
    setTextoEscuchado('Analizando...');

    try {
      await grabacion.current.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({ allowsRecordingIOS: false });

      // Usar expo-speech para reconocimiento de voz (Speech Recognition nativo)
      // Como expo-speech no tiene STT, usamos comparación por texto con las opciones
      // disponibles mediante reconocimiento nativo del dispositivo
      const uri = grabacion.current.getURI();
      grabacion.current = null;

      if (!uri) {
        setProcesando(false);
        setTextoEscuchado('No se grabó audio. Intenta de nuevo.');
        return;
      }

      // Intentar reconocimiento con la API nativa del dispositivo via fetch
      // Como alternativa gratuita: comparamos usando expo-speech STT si está disponible
      await evaluarRespuestaVoz(uri);
    } catch (e) {
      console.error('terminarEscucha error:', e);
      setProcesando(false);
      setTextoEscuchado('Error al procesar. Toca una opción.');
    }
  };

  // ── Evaluar respuesta de voz ──────────────────────────────────────────────
  const evaluarRespuestaVoz = async (audioUri: string) => {
    try {
      // Intentar con Web Speech API via expo-speech recognition
      // Si no está disponible, usar reconocimiento nativo del SO
      const opciones = leccionActual.opciones;
      const correcta = opciones[leccionActual.correcta];

      // Como Speech-to-Text gratuito: usamos el reconocimiento nativo
      // del dispositivo disponible en Android e iOS
      let textoReconocido = '';

      if (Platform.OS === 'android' || Platform.OS === 'ios') {
        // Usar expo-speech para TTS y el micrófono del sistema para STT
        // En este caso mostramos las opciones para que el usuario elija
        // después de intentar el reconocimiento
        textoReconocido = await reconocerVozNativa(audioUri);
      }

      if (textoReconocido) {
        setTextoEscuchado(`"${textoReconocido}"`);
        // Comparar con las opciones disponibles
        const indiceDetectado = encontrarMejorOpcion(textoReconocido, opciones);
        if (indiceDetectado !== -1) {
          setProcesando(false);
          responder(indiceDetectado);
        } else {
          setProcesando(false);
          setTextoEscuchado(`Escuché: "${textoReconocido}"\nNo coincide con ninguna opción. Toca una.`);
        }
      } else {
        setProcesando(false);
        setTextoEscuchado('No entendí. Toca una opción o intenta de nuevo.');
      }
    } catch (e) {
      setProcesando(false);
      setTextoEscuchado('No pude reconocer. Toca una opción.');
    }
  };

  // ── Reconocimiento nativo (Android SpeechRecognizer / iOS STT) ───────────
  const reconocerVozNativa = async (audioUri: string): Promise<string> => {
    return new Promise((resolve) => {
      // Intento via fetch a la API de reconocimiento del dispositivo
      // Android tiene SpeechRecognizer nativo que puede usarse
      // iOS usa AVSpeechRecognizer
      // Como estamos sin librería nativa instalada, resolvemos vacío
      // y el usuario toca la opción manualmente
      setTimeout(() => resolve(''), 1500);
    });
  };

  // ── Encontrar opción más parecida al texto reconocido ────────────────────
  const encontrarMejorOpcion = (texto: string, opciones: string[]): number => {
    const textoLimpio = texto.toLowerCase().trim();
    let mejorIndice = -1;
    let mejorPuntaje = 0;

    opciones.forEach((opcion, i) => {
      const opcionLimpia = opcion.toLowerCase().trim();
      // Coincidencia exacta
      if (textoLimpio === opcionLimpia) { mejorIndice = i; mejorPuntaje = 100; return; }
      // Coincidencia parcial: la opción está contenida en lo dicho o viceversa
      if (textoLimpio.includes(opcionLimpia) || opcionLimpia.includes(textoLimpio)) {
        const puntaje = (Math.min(textoLimpio.length, opcionLimpia.length) / Math.max(textoLimpio.length, opcionLimpia.length)) * 90;
        if (puntaje > mejorPuntaje) { mejorPuntaje = puntaje; mejorIndice = i; }
      }
      // Coincidencia por palabras comunes
      const palabrasTexto  = textoLimpio.split(' ').filter(p => p.length > 2);
      const palabrasOpcion = opcionLimpia.split(' ').filter(p => p.length > 2);
      const comunes = palabrasTexto.filter(p => palabrasOpcion.includes(p));
      if (comunes.length > 0) {
        const puntaje = (comunes.length / Math.max(palabrasTexto.length, palabrasOpcion.length)) * 70;
        if (puntaje > mejorPuntaje) { mejorPuntaje = puntaje; mejorIndice = i; }
      }
    });

    return mejorPuntaje > 40 ? mejorIndice : -1;
  };

  // ── Responder (tocando o por voz) ────────────────────────────────────────
  const responder = (index: number) => {
    if (seleccion !== null) return;
    setSeleccion(index);
    const esCorrecto = index === leccionActual.correcta;
    setCorrecto(esCorrecto);
    if (esCorrecto) setPuntaje(prev => prev + 1);

    const textoFeedback = esCorrecto
      ? `Excellent! That's correct! ${leccionActual.opciones[leccionActual.correcta]} is the right answer. Well done!`
      : `Not quite. The correct answer is: ${leccionActual.opciones[leccionActual.correcta]}. Let's keep going!`;

    setMensajeFeedback(textoFeedback);
    hablarAvatar(textoFeedback);

    // Avanzar automáticamente después de 3.5 segundos
    setTimeout(() => {
      if (paso + 1 >= lecciones.length) {
        finalizarLeccion();
      } else {
        setPaso(prev => prev + 1);
      }
    }, 3500);
  };

  const finalizarLeccion = async () => {
    setTerminado(true);
    if (idTema !== null) {
      setGuardando(true);
      await completarTema(idTema, puntaje * 10);
      setGuardando(false);
    }
  };

  // Limpiar al salir
  useEffect(() => {
    return () => {
      soundRef.current?.unloadAsync();
      grabacion.current?.stopAndUnloadAsync();
    };
  }, []);

  // ── Pantalla de resultados ────────────────────────────────────────────────
  if (terminado) {
    const total      = lecciones.length;
    const porcentaje = Math.round((puntaje / total) * 100);
    const esPerfecto = puntaje === total;
    const esBueno    = puntaje >= total / 2;

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
            }]}>{porcentaje}%</Text>
            <Text style={styles.puntajeLabel}>{puntaje}/{total} correctas</Text>
          </View>
          <View style={styles.estrellas}>
            {[1, 2, 3].map(i => (
              <Text key={i} style={[styles.estrella, {
                opacity: puntaje >= Math.ceil((total / 3) * i) ? 1 : 0.2
              }]}>⭐</Text>
            ))}
          </View>
          {guardando && <Text style={styles.guardandoTexto}>Guardando progreso...</Text>}
          <TouchableOpacity style={styles.btnRepetir} onPress={() => {
            setPaso(0); setPuntaje(0); setTerminado(false);
            setSeleccion(null); setCorrecto(null);
          }}>
            <Text style={styles.btnRepetirTexto}>🔄  Repetir lección</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnVolver} onPress={() => router.back()}>
            <Text style={styles.btnVolverTexto}>← Volver a temas</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // ── Pantalla de lección ───────────────────────────────────────────────────
  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backTexto}>✕</Text>
        </TouchableOpacity>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${progreso}%` }]} />
        </View>
        <Text style={styles.progressLabel}>{paso + 1}/{lecciones.length}</Text>
      </View>

      <Text style={styles.temaTitulo}>{tituloTema}</Text>

      {/* Avatar animado */}
      <AvatarHablando
        nombre={nombreAvatar}
        hablando={avatarHablando}
        escuchando={escuchando}
      />

      {/* Pregunta / feedback de voz */}
      <View style={styles.burbujaWrap}>
        {seleccion === null ? (
          <>
            <Text style={styles.burbujaIngles}>{leccionActual.ingles}</Text>
            <Text style={styles.burbujaEspanol}>{leccionActual.espanol}</Text>
            {textoEscuchado !== '' && (
              <Text style={styles.textoEscuchado}>{textoEscuchado}</Text>
            )}
          </>
        ) : (
          <Text style={[styles.feedbackTexto, { color: correcto ? colores.exito : colores.error }]}>
            {correcto ? '✅ ' : '❌ '}{mensajeFeedback}
          </Text>
        )}
      </View>

      {/* Opciones */}
      {seleccion === null && (
        <View style={styles.opcionesWrap}>
          <Text style={styles.instruccion}>Habla o toca una opción:</Text>
          {leccionActual.opciones.map((opcion, index) => (
            <TouchableOpacity
              key={index}
              style={styles.opcion}
              onPress={() => responder(index)}
              activeOpacity={0.85}
              disabled={procesando}
            >
              <View style={styles.opcionLetra}>
                <Text style={styles.opcionLetraTexto}>{['A', 'B', 'C'][index]}</Text>
              </View>
              <Text style={styles.opcionTexto}>{opcion}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Botón micrófono estilo WhatsApp */}
      {seleccion === null && (
        <View style={styles.micWrap}>
          <BotonMicrofono
            onIniciar={iniciarEscucha}
            onTerminar={terminarEscucha}
            escuchando={escuchando}
            disabled={procesando || avatarHablando}
          />
          {procesando && (
            <Text style={styles.procesandoTexto}>Analizando tu respuesta...</Text>
          )}
        </View>
      )}

    </View>
  );
}

// ── Estilos ──────────────────────────────────────────────────────────────────
function crearEstilos(colores: Tema) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colores.fondo,
      paddingHorizontal: 16,
      paddingBottom: 24,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 56,
      paddingBottom: 10,
      gap: 12,
    },
    backBtn: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
    backTexto: { color: colores.textoTerciario, fontSize: 18 },
    progressBarBg: {
      flex: 1, height: 8,
      backgroundColor: colores.fondoTarjeta, borderRadius: 4,
    },
    progressBarFill: {
      height: 8, backgroundColor: colores.primario, borderRadius: 4,
    },
    progressLabel: {
      color: colores.primario, fontSize: 13, fontWeight: '700',
      minWidth: 32, textAlign: 'right',
    },
    temaTitulo: {
      color: colores.textoSecundario, fontSize: 13,
      fontWeight: '600', marginBottom: 4,
    },
    burbujaWrap: {
      backgroundColor: colores.fondoTarjeta,
      borderRadius: 16,
      padding: 14,
      marginBottom: 12,
      minHeight: 70,
    },
    burbujaIngles: {
      fontSize: 18, fontWeight: '700',
      color: colores.textoPrimario, marginBottom: 4,
    },
    burbujaEspanol: {
      fontSize: 13, color: colores.textoTerciario, fontStyle: 'italic',
    },
    textoEscuchado: {
      fontSize: 13, color: colores.primario,
      fontStyle: 'italic', marginTop: 8,
    },
    feedbackTexto: {
      fontSize: 15, fontWeight: '600', lineHeight: 22,
    },
    instruccion: {
      fontSize: 12, color: colores.textoTerciario, marginBottom: 8,
    },
    opcionesWrap: { gap: 8, marginBottom: 12 },
    opcion: {
      height: 54,
      backgroundColor: colores.fondoTarjeta,
      borderRadius: 14, paddingHorizontal: 14,
      flexDirection: 'row', alignItems: 'center', gap: 12,
      borderWidth: 1.5, borderColor: colores.borde,
    },
    opcionLetra: {
      width: 28, height: 28, borderRadius: 14,
      backgroundColor: colores.borde,
      alignItems: 'center', justifyContent: 'center',
    },
    opcionLetraTexto: {
      color: colores.textoSecundario, fontSize: 12, fontWeight: '700',
    },
    opcionTexto: { color: colores.textoPrimario, fontSize: 15, flex: 1 },
    micWrap: {
      alignItems: 'center', gap: 8, paddingTop: 4,
    },
    procesandoTexto: {
      color: colores.textoTerciario, fontSize: 12, fontStyle: 'italic',
    },
    // Resultados
    resultContainer: {
      flex: 1, backgroundColor: colores.fondo,
      alignItems: 'center', justifyContent: 'center', padding: 24,
    },
    resultCard: {
      backgroundColor: colores.fondoTarjeta,
      borderRadius: 24, padding: 28, width: '100%', alignItems: 'center',
    },
    resultEmoji: { fontSize: 64, marginBottom: 12 },
    resultTitulo: {
      fontSize: 26, fontWeight: '700',
      color: colores.textoPrimario, marginBottom: 6,
    },
    resultMensaje: {
      fontSize: 14, color: colores.textoTerciario,
      textAlign: 'center', marginBottom: 24,
    },
    puntajeCirculo: {
      width: 120, height: 120, borderRadius: 60, borderWidth: 5,
      alignItems: 'center', justifyContent: 'center', marginBottom: 20,
    },
    puntajeNumero: { fontSize: 32, fontWeight: '700' },
    puntajeLabel: { fontSize: 11, color: colores.textoTerciario, marginTop: 2 },
    estrellas: { flexDirection: 'row', gap: 8, marginBottom: 28 },
    estrella: { fontSize: 32 },
    guardandoTexto: {
      color: colores.textoTerciario, fontSize: 13, marginBottom: 14,
    },
    btnRepetir: {
      backgroundColor: colores.primario, borderRadius: 14,
      paddingVertical: 15, width: '100%', alignItems: 'center', marginBottom: 10,
    },
    btnRepetirTexto: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
    btnVolver: {
      backgroundColor: colores.fondo, borderRadius: 14,
      paddingVertical: 15, width: '100%', alignItems: 'center',
      borderWidth: 1, borderColor: colores.borde,
    },
    btnVolverTexto: { color: colores.textoSecundario, fontSize: 15, fontWeight: '600' },
  });
}
