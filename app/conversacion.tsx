import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';
import { ExpoSpeechRecognitionModule, useSpeechRecognitionEvent } from 'expo-speech-recognition';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Animated, Easing, ScrollView, StyleSheet,
  Text, TouchableOpacity, View,
} from 'react-native';
import { generarVozBase64 } from './lib/elevenlabs';
import { useTema } from './theme/ThemeContext';
import type { Tema } from './theme/colors';
import { obtenerGuionesDeNivel, type GuionConversacion } from './contenido/guiones';

// ── Mezclar opciones de cada turno al azar ───────────────────────────────────
function mezclarOpciones(guion: GuionConversacion): GuionConversacion {
  const turnosMezclados = guion.turnos.map(turno => {
    const indices = [0, 1, 2];
    // Fisher-Yates
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    const opcionesMezcladas = indices.map(i => turno.opciones[i]);
    const nuevaCorrecta = indices.indexOf(turno.correcta);
    return { ...turno, opciones: opcionesMezcladas, correcta: nuevaCorrecta };
  });
  return { ...guion, turnos: turnosMezclados };
}

const DATOS_AVATAR: Record<string, { emoji: string; color: string; bg: string }> = {
  Michelle: { emoji: '👩',    color: '#DB2777', bg: '#FCE7F3' },
  Esteban:  { emoji: '👨',    color: '#1D4ED8', bg: '#DBEAFE' },
  Luciana:  { emoji: '👩‍🏫', color: '#7E22CE', bg: '#F3E8FF' },
  Charley:  { emoji: '👨‍💼', color: '#C2410C', bg: '#FFEDD5' },
};

function AvatarConversacion({ nombre, hablando, escuchando, onPress }: {
  nombre: string; hablando: boolean; escuchando: boolean; onPress: () => void;
}) {
  const pulso    = useRef(new Animated.Value(1)).current;
  const rotacion = useRef(new Animated.Value(0)).current;
  const datos    = DATOS_AVATAR[nombre] ?? DATOS_AVATAR['Michelle'];

  useEffect(() => {
    if (hablando) {
      Animated.loop(Animated.sequence([
        Animated.timing(pulso, { toValue: 1.1, duration: 350, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(pulso, { toValue: 0.95, duration: 350, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ])).start();
    } else {
      pulso.stopAnimation();
      Animated.timing(pulso, { toValue: 1, duration: 200, useNativeDriver: true }).start();
    }
  }, [hablando]);

  useEffect(() => {
    if (escuchando) {
      Animated.loop(Animated.sequence([
        Animated.timing(rotacion, { toValue: 1,  duration: 500, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(rotacion, { toValue: -1, duration: 500, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(rotacion, { toValue: 0,  duration: 250, useNativeDriver: true }),
      ])).start();
    } else {
      rotacion.stopAnimation();
      Animated.timing(rotacion, { toValue: 0, duration: 200, useNativeDriver: true }).start();
    }
  }, [escuchando]);

  const rotate = rotacion.interpolate({ inputRange: [-1, 1], outputRange: ['-5deg', '5deg'] });

  return (
    <TouchableOpacity style={eAv.contenedor} onPress={onPress} activeOpacity={0.85}>
      {hablando && (
        <>
          <Animated.View style={[eAv.anillo,      { backgroundColor: datos.color + '25', transform: [{ scale: pulso }] }]} />
          <Animated.View style={[eAv.anilloMedio, { backgroundColor: datos.color + '18', transform: [{ scale: pulso }] }]} />
        </>
      )}
      {escuchando && (
        <Animated.View style={[eAv.anillo, { backgroundColor: '#22C55E25', transform: [{ scale: pulso }] }]} />
      )}
      <Animated.View style={[
        eAv.circulo,
        { backgroundColor: datos.bg, borderColor: hablando ? datos.color : escuchando ? '#22C55E' : datos.color + '50' },
        { transform: [{ scale: hablando ? pulso : 1 }, { rotate: escuchando ? rotate : '0deg' }] },
      ]}>
        <Text style={eAv.emoji}>{datos.emoji}</Text>
      </Animated.View>
      <View style={[eAv.badge, {
        backgroundColor: hablando ? datos.color : escuchando ? '#22C55E' : '#64748B'
      }]}>
        <Text style={eAv.badgeTexto}>
          {hablando ? '🔊 Hablando' : escuchando ? '🎤 Escuchando...' : '🔁 Toca para repetir'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const eAv = StyleSheet.create({
  contenedor:  { height: 190, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  anillo:      { position: 'absolute', width: 170, height: 170, borderRadius: 85 },
  anilloMedio: { position: 'absolute', width: 135, height: 135, borderRadius: 68 },
  circulo:     { width: 95, height: 95, borderRadius: 48, alignItems: 'center', justifyContent: 'center', borderWidth: 3 },
  emoji:       { fontSize: 48 },
  badge:       { position: 'absolute', bottom: 8, paddingHorizontal: 14, paddingVertical: 5, borderRadius: 20 },
  badgeTexto:  { color: '#fff', fontSize: 11, fontWeight: '700' },
});

// ── Pantalla principal ────────────────────────────────────────────────────────
export default function ConversacionScreen() {
  const router = useRouter();
  const { colores } = useTema();
  const styles = crearEstilos(colores);
  const { nombre, nivelIndex } = useLocalSearchParams();

  const nombreAvatar = nombre as string || 'Michelle';
  const nivelIdx     = nivelIndex ? parseInt(nivelIndex as string, 10) : 0;

  // Elegir guión al azar del nivel
  const [guion] = useState<GuionConversacion>(() => {
    const guiones = obtenerGuionesDeNivel(nivelIdx);
    const elegido = guiones[Math.floor(Math.random() * guiones.length)];
    return mezclarOpciones(elegido);
  });

  const totalTurnos = guion.turnos.length;

  // Series: 3 series de 5 turnos
  const TURNOS_POR_SERIE = 5;
  const TOTAL_SERIES     = Math.ceil(totalTurnos / TURNOS_POR_SERIE);

  const [turnoActual, setTurnoActual]     = useState(0);
  const [respuestas, setRespuestas]       = useState<{ correcta: boolean; opcionElegida: number }[]>([]);
  const [terminadaSerie, setTerminadaSerie] = useState(false);
  const [terminado, setTerminado]         = useState(false);
  const [avatarHablando, setAvatarHablando] = useState(false);
  const [escuchando, setEscuchando]       = useState(false);
  const [procesando, setProcesando]       = useState(false);
  const [intentos, setIntentos]           = useState(0);
  const [mensajeEstado, setMensajeEstado] = useState('');

  const soundRef     = useRef<Audio.Sound | null>(null);
  const montado      = useRef(true);
  const hablandoRef  = useRef(false);
  const yaRespondio  = useRef(false);
  const micAutoRef   = useRef<ReturnType<typeof setTimeout> | null>(null);

  const serieActual   = Math.floor(turnoActual / TURNOS_POR_SERIE);
  const turnoEnSerie  = turnoActual % TURNOS_POR_SERIE;
  const turno         = guion.turnos[turnoActual];
  const progresoPct   = Math.round((turnoActual / totalTurnos) * 100);

  useEffect(() => { montado.current = true; return () => { montado.current = false; }; }, []);

  // Al cambiar turno → avatar habla automáticamente
  useEffect(() => {
    if (!turno || terminado || terminadaSerie) return;
    hablandoRef.current = true;
    yaRespondio.current = false;
    setMensajeEstado('');
    setIntentos(0);

    const timer = setTimeout(() => {
      hablarAvatar(turno.avatar);
    }, 500);

    return () => { clearTimeout(timer); hablandoRef.current = false; };
  }, [turnoActual, terminadaSerie]);

  // Limpiar al salir
  useEffect(() => {
    return () => {
      Speech.stop();
      ExpoSpeechRecognitionModule.stop();
      if (micAutoRef.current) clearTimeout(micAutoRef.current);
      soundRef.current?.stopAsync().then(() => soundRef.current?.unloadAsync());
    };
  }, []);

  // ── Reconocimiento de voz ─────────────────────────────────────────────────
  useSpeechRecognitionEvent('result', (event) => {
    if (!event.results || event.results.length === 0) return;
    if (yaRespondio.current) return;

    const texto = event.results[0]?.transcript ?? '';
    const indice = encontrarMejorOpcion(texto, turno.opciones);

    if (indice !== -1) {
      yaRespondio.current = true;
      setProcesando(false);
      setMensajeEstado('');
      registrarRespuesta(indice);
    } else {
      setProcesando(false);
      setIntentos(prev => prev + 1);
      if (intentos >= 1) {
        // Después de 2 intentos fallidos, el avatar pide repetir y reactiva mic
        const frases = [
          "Sorry, I didn't catch that. Could you say that again?",
          "Hmm, try once more please!",
          "I couldn't understand. Please repeat.",
        ];
        hablarAvatar(frases[Math.floor(Math.random() * frases.length)]);
      } else {
        setMensajeEstado("No te entendí. Intenta de nuevo.");
        activarMicAutomatico(1500);
      }
    }
  });

  useSpeechRecognitionEvent('end', () => {
    if (montado.current) { setEscuchando(false); setProcesando(false); }
  });

  useSpeechRecognitionEvent('error', () => {
    if (montado.current) {
      setEscuchando(false); setProcesando(false);
      setMensajeEstado("No te escuché. Intenta de nuevo.");
      activarMicAutomatico(2000);
    }
  });

  // ── Audio ─────────────────────────────────────────────────────────────────
  const detenerTodoAudio = async () => {
    Speech.stop();
    if (soundRef.current) {
      try { await soundRef.current.stopAsync(); await soundRef.current.unloadAsync(); } catch (_) {}
      soundRef.current = null;
    }
    if (montado.current) setAvatarHablando(false);
  };

  const hablarAvatar = async (texto: string, alTerminar?: () => void) => {
    try {
      await detenerTodoAudio();
      if (!montado.current) return;
      setAvatarHablando(true);

      await Audio.setAudioModeAsync({ playsInSilentModeIOS: true, staysActiveInBackground: false });
      const base64 = await generarVozBase64(texto, nombreAvatar);

      if (!montado.current) return;

      const onFin = () => {
        if (montado.current) {
          setAvatarHablando(false);
          alTerminar?.();
          // Activar micrófono automáticamente después de que el avatar habla
          activarMicAutomatico(600);
        }
      };

      if (!base64) {
        const duracion = Math.max(texto.length * 55, 2000);
        setTimeout(onFin, duracion);
        return;
      }

      const { sound } = await Audio.Sound.createAsync(
        { uri: `data:audio/mpeg;base64,${base64}` },
        { shouldPlay: true }
      );
      soundRef.current = sound;
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          onFin();
          sound.unloadAsync();
          soundRef.current = null;
        }
      });
    } catch (e) {
      if (montado.current) {
        setAvatarHablando(false);
        activarMicAutomatico(800);
      }
    }
  };

  const repetirPregunta = () => {
    if (procesando) return;
    hablarAvatar(turno.avatar);
  };

  // ── Micrófono automático ──────────────────────────────────────────────────
  const activarMicAutomatico = (delay = 800) => {
    if (micAutoRef.current) clearTimeout(micAutoRef.current);
    micAutoRef.current = setTimeout(() => {
      if (montado.current && !avatarHablando) {
        iniciarEscucha();
      }
    }, delay);
  };

  const iniciarEscucha = async () => {
    if (avatarHablando || procesando || terminado || terminadaSerie) return;
    try {
      yaRespondio.current = false;
      const { granted } = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
      if (!granted) { setMensajeEstado('Necesitas dar permiso al micrófono.'); return; }
      setEscuchando(true);
      setMensajeEstado('');
      ExpoSpeechRecognitionModule.start({ lang: 'en-US', interimResults: false, maxAlternatives: 1 });
    } catch (e) {
      setMensajeEstado('Error al acceder al micrófono.');
      setEscuchando(false);
    }
  };

  const detenerEscucha = () => {
    if (!escuchando) return;
    setProcesando(true);
    ExpoSpeechRecognitionModule.stop();
  };

  // ── Comparación de voz ────────────────────────────────────────────────────
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

  // ── Registrar respuesta y avanzar ─────────────────────────────────────────
  const registrarRespuesta = (indice: number) => {
    const esCorrecto = indice === turno.correcta;
    const nuevasRespuestas = [...respuestas, { correcta: esCorrecto, opcionElegida: indice }];
    setRespuestas(nuevasRespuestas);

    const siguienteTurno = turnoActual + 1;
    const finDeSerie = turnoEnSerie + 1 >= TURNOS_POR_SERIE;
    const finTotal   = siguienteTurno >= totalTurnos;

    // El avatar simplemente continúa la conversación (no dice correcto/incorrecto)
    if (finTotal) {
      // Última respuesta → terminar
      setTerminado(true);
    } else if (finDeSerie) {
      // Fin de serie → pantalla intermedia
      setTerminadaSerie(true);
    } else {
      // Continuar conversación naturalmente
      setTimeout(() => {
        if (montado.current) setTurnoActual(siguienteTurno);
      }, 400);
    }
  };

  // ── Continuar siguiente serie ─────────────────────────────────────────────
  const continuarSiguienteSerie = () => {
    setTerminadaSerie(false);
    setTurnoActual(turnoActual + 1);
  };

  // ── Pantalla entre series ─────────────────────────────────────────────────
  if (terminadaSerie && !terminado) {
    const respuestasSerie = respuestas.slice(serieActual * TURNOS_POR_SERIE);
    const correctasSerie  = respuestasSerie.filter(r => r.correcta).length;
    const pctSerie = Math.round((correctasSerie / TURNOS_POR_SERIE) * 100);
    const esUltima = serieActual + 1 >= TOTAL_SERIES;

    return (
      <View style={styles.resultContainer}>
        <View style={styles.resultCard}>
          <Text style={styles.resultEmoji}>{pctSerie >= 80 ? '🌟' : pctSerie >= 60 ? '👍' : '💪'}</Text>
          <Text style={styles.resultTitulo}>
            {pctSerie >= 80 ? '¡Excelente fluidez!' : pctSerie >= 60 ? '¡Bien hecho!' : '¡Sigue practicando!'}
          </Text>
          <Text style={styles.contextoTexto}>📍 {guion.contexto}</Text>

          <View style={styles.progresoWrap}>
            <View style={styles.progresoBarBg}>
              <View style={[styles.progresoBarFill, { width: `${progresoPct}%` }]} />
            </View>
            <Text style={styles.progresoTexto}>
              Serie {serieActual + 1} de {TOTAL_SERIES} — {progresoPct}% completado
            </Text>
          </View>

          <View style={[styles.puntajeCirculo, {
            borderColor: pctSerie >= 80 ? colores.exito : pctSerie >= 60 ? colores.primario : colores.advertencia
          }]}>
            <Text style={[styles.puntajeNumero, {
              color: pctSerie >= 80 ? colores.exito : pctSerie >= 60 ? colores.primario : colores.advertencia
            }]}>{pctSerie}%</Text>
            <Text style={styles.puntajeLabel}>{correctasSerie}/{TURNOS_POR_SERIE} correctas</Text>
          </View>

          <Text style={styles.notaTexto}>
            💡 El avatar no reveló las respuestas durante la conversación para que fuera más natural.
          </Text>

          <TouchableOpacity style={styles.btnContinuar} onPress={continuarSiguienteSerie}>
            <Text style={styles.btnContinuarTexto}>
              {esUltima ? '🏁 Ver resultado final' : `➡️  Siguiente serie (${serieActual + 2}/${TOTAL_SERIES})`}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnVolver} onPress={() => { detenerTodoAudio(); router.back(); }}>
            <Text style={styles.btnVolverTexto}>← Salir de la conversación</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // ── Pantalla de resultado final ───────────────────────────────────────────
  if (terminado) {
    const totalCorrectas = respuestas.filter(r => r.correcta).length;
    const pct = Math.round((totalCorrectas / totalTurnos) * 100);
    const esPerfecto = totalCorrectas === totalTurnos;
    const esBueno    = pct >= 70;

    return (
      <View style={styles.resultContainer}>
        <View style={styles.resultCard}>
          <Text style={styles.resultEmoji}>{esPerfecto ? '🏆' : esBueno ? '🌟' : '💪'}</Text>
          <Text style={styles.resultTitulo}>
            {esPerfecto ? '¡Conversación perfecta!' : esBueno ? '¡Muy buena fluidez!' : '¡Sigue practicando!'}
          </Text>
          <Text style={styles.contextoTexto}>📍 {guion.contexto}</Text>

          <View style={[styles.puntajeCirculo, {
            borderColor: esPerfecto ? '#CA8A04' : esBueno ? colores.primario : colores.advertencia
          }]}>
            <Text style={[styles.puntajeNumero, {
              color: esPerfecto ? '#CA8A04' : esBueno ? colores.primario : colores.advertencia
            }]}>{pct}%</Text>
            <Text style={styles.puntajeLabel}>{totalCorrectas}/{totalTurnos} respuestas correctas</Text>
          </View>

          <View style={styles.estrellas}>
            {[1, 2, 3].map(i => (
              <Text key={i} style={[styles.estrella, {
                opacity: totalCorrectas >= Math.ceil((totalTurnos / 3) * i) ? 1 : 0.2
              }]}>⭐</Text>
            ))}
          </View>

          {/* Resumen por turno */}
          <View style={styles.resumenWrap}>
            <Text style={styles.resumenTitulo}>Resumen de la conversación:</Text>
            {respuestas.map((r, i) => (
              <View key={i} style={styles.resumenFila}>
                <Text style={styles.resumenNumero}>{i + 1}.</Text>
                <Text style={[styles.resumenIcono, { color: r.correcta ? colores.exito : colores.error }]}>
                  {r.correcta ? '✅' : '❌'}
                </Text>
                <Text style={styles.resumenTexto} numberOfLines={1}>
                  {guion.turnos[i].opciones[r.correcta ? r.opcionElegida : guion.turnos[i].correcta]}
                </Text>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.btnContinuar} onPress={() => {
            router.replace({
              pathname: '/conversacion',
              params: { nombre: nombreAvatar, nivelIndex: nivelIndex as string }
            });
          }}>
            <Text style={styles.btnContinuarTexto}>🔄  Nueva conversación</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnVolver} onPress={() => { detenerTodoAudio(); router.back(); }}>
            <Text style={styles.btnVolverTexto}>← Volver a temas</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // ── Pantalla de conversación ──────────────────────────────────────────────
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contenido} showsVerticalScrollIndicator={false}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {
          detenerTodoAudio();
          ExpoSpeechRecognitionModule.stop();
          router.back();
        }} style={styles.backBtn}>
          <Text style={styles.backTexto}>✕</Text>
        </TouchableOpacity>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${progresoPct}%` }]} />
        </View>
        <Text style={styles.progressLabel}>{turnoActual + 1}/{totalTurnos}</Text>
      </View>

      {/* Info */}
      <View style={styles.infoRow}>
        <View style={styles.modoPill}>
          <Text style={styles.modoTexto}>🎙️ Modo Conversación</Text>
        </View>
        <View style={styles.seriePill}>
          <Text style={styles.serieTexto}>Serie {serieActual + 1}/{TOTAL_SERIES}</Text>
        </View>
      </View>

      <Text style={styles.contextoLabel}>📍 {guion.contexto}</Text>

      {/* Avatar */}
      <AvatarConversacion
        nombre={nombreAvatar}
        hablando={avatarHablando}
        escuchando={escuchando}
        onPress={repetirPregunta}
      />

      {/* Burbuja con lo que dice el avatar */}
      <View style={styles.burbujaAvatar}>
        <Text style={styles.burbujaTexto}>{turno.avatar}</Text>
      </View>

      {/* Opciones — visibles pero NO tocables */}
      <View style={styles.opcionesWrap}>
        <Text style={styles.instruccion}>
          {escuchando ? '🎤 Te estoy escuchando...' :
           procesando  ? '⏳ Analizando...' :
           avatarHablando ? '🔊 El avatar está hablando...' :
           '🎤 Responde en voz alta'}
        </Text>
        {turno.opciones.map((opcion, index) => (
          <View key={index} style={styles.opcionNoTocable}>
            <View style={styles.opcionLetra}>
              <Text style={styles.opcionLetraTexto}>{['A', 'B', 'C'][index]}</Text>
            </View>
            <Text style={styles.opcionTexto}>{opcion}</Text>
            <Text style={styles.opcionLock}>🔒</Text>
          </View>
        ))}
      </View>

      {/* Estado del micrófono */}
      {mensajeEstado !== '' && (
        <View style={styles.mensajeWrap}>
          <Text style={styles.mensajeTexto}>{mensajeEstado}</Text>
        </View>
      )}

      {/* Botón micrófono manual (respaldo) */}
      {!avatarHablando && !procesando && (
        <View style={styles.micWrap}>
          <TouchableOpacity
            style={[styles.micBtn, escuchando && styles.micBtnActivo]}
            onPressIn={iniciarEscucha}
            onPressOut={detenerEscucha}
            activeOpacity={0.85}
          >
            <Text style={styles.micIcono}>{escuchando ? '🔴' : '🎤'}</Text>
            <Text style={[styles.micTexto, escuchando && styles.micTextoActivo]}>
              {escuchando ? 'Suelta para enviar' : 'Mantén presionado'}
            </Text>
          </TouchableOpacity>
        </View>
      )}

    </ScrollView>
  );
}

function crearEstilos(colores: Tema) {
  return StyleSheet.create({
    container:   { flex: 1, backgroundColor: colores.fondo },
    contenido:   { paddingHorizontal: 16, paddingBottom: 40 },
    header:      { flexDirection: 'row', alignItems: 'center', paddingTop: 52, paddingBottom: 8, gap: 12 },
    backBtn:     { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
    backTexto:   { color: colores.textoTerciario, fontSize: 18 },
    progressBarBg:   { flex: 1, height: 8, backgroundColor: colores.fondoTarjeta, borderRadius: 4 },
    progressBarFill: { height: 8, backgroundColor: colores.primario, borderRadius: 4 },
    progressLabel:   { color: colores.primario, fontSize: 13, fontWeight: '700', minWidth: 32, textAlign: 'right' },
    infoRow:         { flexDirection: 'row', gap: 8, marginBottom: 6 },
    modoPill:        { backgroundColor: colores.primario + '22', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
    modoTexto:       { color: colores.primario, fontSize: 11, fontWeight: '700' },
    seriePill:       { backgroundColor: colores.fondoTarjeta, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, borderWidth: 1, borderColor: colores.borde },
    serieTexto:      { color: colores.textoTerciario, fontSize: 11, fontWeight: '600' },
    contextoLabel:   { fontSize: 12, color: colores.textoSecundario, fontWeight: '600', marginBottom: 4 },
    burbujaAvatar:   { backgroundColor: colores.fondoTarjeta, borderRadius: 16, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: colores.borde },
    burbujaTexto:    { fontSize: 16, fontWeight: '600', color: colores.textoPrimario, lineHeight: 24 },
    instruccion:     { fontSize: 12, color: colores.textoTerciario, marginBottom: 8, textAlign: 'center' },
    opcionesWrap:    { gap: 8, marginBottom: 12 },
    opcionNoTocable: { height: 50, backgroundColor: colores.fondoTarjeta, borderRadius: 14, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 10, borderWidth: 1.5, borderColor: colores.bordeSutil, opacity: 0.7 },
    opcionLetra:     { width: 26, height: 26, borderRadius: 13, backgroundColor: colores.borde, alignItems: 'center', justifyContent: 'center' },
    opcionLetraTexto:{ color: colores.textoSecundario, fontSize: 12, fontWeight: '700' },
    opcionTexto:     { color: colores.textoSecundario, fontSize: 13, flex: 1 },
    opcionLock:      { fontSize: 14 },
    mensajeWrap:     { backgroundColor: colores.fondoTarjeta, borderRadius: 12, padding: 10, marginBottom: 8, alignItems: 'center' },
    mensajeTexto:    { color: colores.advertencia, fontSize: 13, fontWeight: '600' },
    micWrap:         { alignItems: 'center', marginTop: 4 },
    micBtn:          { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: colores.fondoTarjeta, borderRadius: 30, paddingVertical: 14, paddingHorizontal: 24, borderWidth: 2, borderColor: colores.borde },
    micBtnActivo:    { backgroundColor: colores.exitoFondo, borderColor: colores.exito },
    micIcono:        { fontSize: 20 },
    micTexto:        { color: colores.textoSecundario, fontSize: 13, fontWeight: '600' },
    micTextoActivo:  { color: colores.exito },
    // Pantallas de resultado
    resultContainer: { flex: 1, backgroundColor: colores.fondo, alignItems: 'center', justifyContent: 'center', padding: 20 },
    resultCard:      { backgroundColor: colores.fondoTarjeta, borderRadius: 24, padding: 24, width: '100%', alignItems: 'center', maxHeight: '95%' },
    resultEmoji:     { fontSize: 56, marginBottom: 8 },
    resultTitulo:    { fontSize: 22, fontWeight: '700', color: colores.textoPrimario, marginBottom: 4, textAlign: 'center' },
    contextoTexto:   { fontSize: 12, color: colores.textoTerciario, marginBottom: 16 },
    progresoWrap:    { width: '100%', marginBottom: 16 },
    progresoBarBg:   { height: 8, backgroundColor: colores.borde, borderRadius: 4, marginBottom: 6 },
    progresoBarFill: { height: 8, backgroundColor: colores.primario, borderRadius: 4 },
    progresoTexto:   { fontSize: 11, color: colores.textoTerciario, textAlign: 'center' },
    puntajeCirculo:  { width: 100, height: 100, borderRadius: 50, borderWidth: 4, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
    puntajeNumero:   { fontSize: 28, fontWeight: '700' },
    puntajeLabel:    { fontSize: 10, color: colores.textoTerciario, marginTop: 2, textAlign: 'center' },
    estrellas:       { flexDirection: 'row', gap: 6, marginBottom: 16 },
    estrella:        { fontSize: 28 },
    notaTexto:       { fontSize: 11, color: colores.textoTerciario, textAlign: 'center', marginBottom: 16, fontStyle: 'italic', paddingHorizontal: 8 },
    resumenWrap:     { width: '100%', marginBottom: 16 },
    resumenTitulo:   { fontSize: 13, fontWeight: '700', color: colores.textoPrimario, marginBottom: 8 },
    resumenFila:     { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
    resumenNumero:   { fontSize: 11, color: colores.textoTerciario, width: 20 },
    resumenIcono:    { fontSize: 14 },
    resumenTexto:    { fontSize: 11, color: colores.textoSecundario, flex: 1 },
    btnContinuar:    { backgroundColor: colores.primario, borderRadius: 14, paddingVertical: 14, width: '100%', alignItems: 'center', marginBottom: 8 },
    btnContinuarTexto:{ color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
    btnVolver:       { backgroundColor: colores.fondo, borderRadius: 14, paddingVertical: 12, width: '100%', alignItems: 'center', borderWidth: 1, borderColor: colores.borde },
    btnVolverTexto:  { color: colores.textoSecundario, fontSize: 13, fontWeight: '600' },
  });
}
