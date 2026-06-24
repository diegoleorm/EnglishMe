import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { obtenerLeccionesDeTema } from './contenido/lecciones';
import { useProgreso } from './theme/ProgresoContext';
import { useTema } from './theme/ThemeContext';
import type { Tema } from './theme/colors';

export default function LeccionScreen() {
  const router = useRouter();
  const { colores } = useTema();
  const styles = crearEstilos(colores);
  const { emoji, temaId, temaTitulo } = useLocalSearchParams();
  const { completarTema } = useProgreso();

  const tutorEmoji = emoji as string || '🎓';
  const tituloTema = temaTitulo as string || 'Lección';
  const idTemaNumero = temaId ? parseInt(temaId as string, 10) : null;
  const lecciones = obtenerLeccionesDeTema(idTemaNumero ?? 0);

  const [paso, setPaso] = useState(0);
  const [seleccion, setSeleccion] = useState<number | null>(null);
  const [correcto, setCorrecto] = useState<boolean | null>(null);
  const [puntaje, setPuntaje] = useState(0);
  const [terminado, setTerminado] = useState(false);
  const [guardando, setGuardando] = useState(false);

  const leccionActual = lecciones[paso];
  const progreso = (paso / lecciones.length) * 100;

  const responder = (index: number) => {
    if (seleccion !== null) return;
    setSeleccion(index);
    const esCorrecto = index === leccionActual.correcta;
    setCorrecto(esCorrecto);
    if (esCorrecto) setPuntaje(puntaje + 1);
  };

  const siguiente = async () => {
    if (paso + 1 >= lecciones.length) {
      setTerminado(true);
      if (idTemaNumero !== null) {
        setGuardando(true);
        // 10 puntos por cada respuesta correcta
        await completarTema(idTemaNumero, puntaje * 10);
        setGuardando(false);
      }
    } else {
      setPaso(paso + 1);
      setSeleccion(null);
      setCorrecto(null);
    }
  };

  const reiniciar = () => {
    setPaso(0);
    setSeleccion(null);
    setCorrecto(null);
    setPuntaje(0);
    setTerminado(false);
  };

  if (terminado) {
    const porcentaje = Math.round((puntaje / lecciones.length) * 100);
    const esPerfecto = puntaje === lecciones.length;
    const esBueno = puntaje >= lecciones.length / 2;

    return (
      <View style={styles.resultContainer}>
        <View style={styles.resultCard}>
          <Text style={styles.resultEmoji}>
            {esPerfecto ? '🏆' : esBueno ? '🌟' : '💪'}
          </Text>
          <Text style={styles.resultTitulo}>
            {esPerfecto ? '¡Perfecto!' : esBueno ? '¡Muy bien!' : '¡Sigue practicando!'}
          </Text>
          <Text style={styles.resultMensaje}>
            {esPerfecto
              ? 'Excelente trabajo, lo dominaste todo'
              : esBueno
              ? 'Vas muy bien, sigue así'
              : 'La práctica hace al maestro'}
          </Text>
          <View style={[styles.puntajeCirculo, {
            borderColor: esPerfecto ? '#CA8A04' : esBueno ? colores.primario : colores.error
          }]}>
            <Text style={[styles.puntajeNumero, {
              color: esPerfecto ? '#CA8A04' : esBueno ? colores.primario : colores.error
            }]}>{porcentaje}%</Text>
            <Text style={styles.puntajeLabel}>{puntaje}/{lecciones.length} correctas</Text>
          </View>
          <View style={styles.estrellas}>
            {[1, 2, 3].map((i) => (
              <Text key={i} style={[
                styles.estrella,
                { opacity: puntaje >= Math.ceil((lecciones.length / 3) * i) ? 1 : 0.2 }
              ]}>⭐</Text>
            ))}
          </View>
          {guardando && (
            <Text style={styles.guardandoTexto}>Guardando tu progreso...</Text>
          )}
          <TouchableOpacity style={styles.btnRepetir} onPress={reiniciar} disabled={guardando}>
            <Text style={styles.btnRepetirTexto}>🔄  Repetir lección</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnVolver} onPress={() => router.back()} disabled={guardando}>
            <Text style={styles.btnVolverTexto}>← Volver a temas</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backTexto}>✕</Text>
        </TouchableOpacity>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${progreso}%` }]} />
        </View>
        <Text style={styles.progressLabel}>{paso + 1}/{lecciones.length}</Text>
      </View>

      <Text style={styles.temaTituloHeader}>{tituloTema}</Text>

      <View style={styles.tutorRow}>
        <View style={styles.tutorAvatarWrap}>
          <Text style={styles.tutorEmoji}>{tutorEmoji}</Text>
        </View>
        <View style={styles.burbuja}>
          <Text style={styles.burbujaIngles}>{leccionActual.ingles}</Text>
          <Text style={styles.burbujaEspanol}>{leccionActual.espanol}</Text>
        </View>
      </View>

      <Text style={styles.instruccion}>Elige la respuesta correcta:</Text>

      <View style={styles.opcionesWrap}>
        {leccionActual.opciones.map((opcion, index) => {
          let estiloOpcion = styles.opcion;

          if (seleccion !== null) {
            if (index === leccionActual.correcta) {
              estiloOpcion = { ...styles.opcion, ...styles.opcionCorrecta };
            } else if (seleccion === index && !correcto) {
              estiloOpcion = { ...styles.opcion, ...styles.opcionIncorrecta };
            } else {
              estiloOpcion = { ...styles.opcion, ...styles.opcionDesactivada };
            }
          }

          return (
            <TouchableOpacity
              key={index}
              style={estiloOpcion}
              onPress={() => responder(index)}
              activeOpacity={0.85}
            >
              <View style={styles.opcionLetra}>
                <Text style={styles.opcionLetraTexto}>
                  {['A', 'B', 'C', 'D'][index]}
                </Text>
              </View>
              <Text style={styles.opcionTexto}>{opcion}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.bottomWrap}>
        {seleccion !== null && (
          <View style={[styles.feedback, correcto ? styles.feedbackCorrecto : styles.feedbackIncorrecto]}>
            <Text style={styles.feedbackEmoji}>{correcto ? '✅' : '❌'}</Text>
            <View style={styles.feedbackTextos}>
              <Text style={styles.feedbackTitulo}>
                {correcto ? '¡Correcto! Great job!' : 'Incorrecto'}
              </Text>
              {!correcto && (
                <Text style={styles.feedbackRespuesta}>
                  Respuesta: {leccionActual.opciones[leccionActual.correcta]}
                </Text>
              )}
            </View>
          </View>
        )}

        {seleccion !== null && (
          <TouchableOpacity style={styles.btnSiguiente} onPress={siguiente}>
            <Text style={styles.btnSiguienteTexto}>
              {paso + 1 >= lecciones.length ? 'Ver resultado 🏆' : 'Siguiente →'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

    </View>
  );
}

function crearEstilos(colores: Tema) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colores.fondo,
      paddingHorizontal: 16,
      paddingBottom: 32,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 56,
      paddingBottom: 24,
      gap: 12,
    },
    backBtn: {
      width: 32,
      height: 32,
      alignItems: 'center',
      justifyContent: 'center',
    },
    backTexto: {
      color: colores.textoTerciario,
      fontSize: 18,
    },
    progressBarBg: {
      flex: 1,
      height: 8,
      backgroundColor: colores.fondoTarjeta,
      borderRadius: 4,
    },
    progressBarFill: {
      height: 8,
      backgroundColor: colores.primario,
      borderRadius: 4,
    },
    progressLabel: {
      color: colores.primario,
      fontSize: 13,
      fontWeight: '700',
      minWidth: 32,
      textAlign: 'right',
    },
    temaTituloHeader: {
      color: colores.textoSecundario,
      fontSize: 13,
      fontWeight: '600',
      marginBottom: 16,
    },
    tutorRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 12,
      marginBottom: 20,
    },
    tutorAvatarWrap: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: colores.fondoTarjeta,
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },
    tutorEmoji: {
      fontSize: 34,
    },
    burbuja: {
      flex: 1,
      backgroundColor: colores.fondoTarjeta,
      borderRadius: 16,
      borderTopLeftRadius: 4,
      padding: 16,
    },
    burbujaIngles: {
      fontSize: 20,
      fontWeight: '700',
      color: colores.textoPrimario,
      marginBottom: 6,
    },
    burbujaEspanol: {
      fontSize: 14,
      color: colores.textoTerciario,
      fontStyle: 'italic',
    },
    instruccion: {
      fontSize: 13,
      color: colores.textoTerciario,
      marginBottom: 12,
    },
    opcionesWrap: {
      gap: 12,
    },
    opcion: {
      height: 72,
      backgroundColor: colores.fondoTarjeta,
      borderRadius: 16,
      paddingHorizontal: 16,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 14,
      borderWidth: 1.5,
      borderColor: colores.fondoTarjeta,
    },
    opcionCorrecta: {
      backgroundColor: colores.exitoFondo,
      borderColor: colores.exito,
    },
    opcionIncorrecta: {
      backgroundColor: colores.errorFondo,
      borderColor: colores.error,
    },
    opcionDesactivada: {
      opacity: 0.4,
    },
    opcionLetra: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: colores.borde,
      alignItems: 'center',
      justifyContent: 'center',
    },
    opcionLetraTexto: {
      color: colores.textoSecundario,
      fontSize: 13,
      fontWeight: '700',
    },
    opcionTexto: {
      color: colores.textoPrimario,
      fontSize: 16,
      flex: 1,
    },
    bottomWrap: {
      gap: 12,
      paddingTop: 16,
    },
    feedback: {
      borderRadius: 14,
      padding: 14,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    feedbackCorrecto: {
      backgroundColor: colores.exitoFondo,
    },
    feedbackIncorrecto: {
      backgroundColor: colores.errorFondo,
    },
    feedbackEmoji: {
      fontSize: 24,
    },
    feedbackTextos: {
      flex: 1,
    },
    feedbackTitulo: {
      color: colores.textoPrimario,
      fontSize: 14,
      fontWeight: '700',
    },
    feedbackRespuesta: {
      color: colores.textoSecundario,
      fontSize: 12,
      marginTop: 2,
    },
    btnSiguiente: {
      backgroundColor: colores.primario,
      borderRadius: 14,
      paddingVertical: 16,
      alignItems: 'center',
    },
    btnSiguienteTexto: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '700',
    },
    resultContainer: {
      flex: 1,
      backgroundColor: colores.fondo,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
    },
    resultCard: {
      backgroundColor: colores.fondoTarjeta,
      borderRadius: 24,
      padding: 28,
      width: '100%',
      alignItems: 'center',
    },
    resultEmoji: {
      fontSize: 64,
      marginBottom: 12,
    },
    resultTitulo: {
      fontSize: 26,
      fontWeight: '700',
      color: colores.textoPrimario,
      marginBottom: 6,
    },
    resultMensaje: {
      fontSize: 14,
      color: colores.textoTerciario,
      textAlign: 'center',
      marginBottom: 24,
    },
    puntajeCirculo: {
      width: 120,
      height: 120,
      borderRadius: 60,
      borderWidth: 5,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    puntajeNumero: {
      fontSize: 32,
      fontWeight: '700',
    },
    puntajeLabel: {
      fontSize: 11,
      color: colores.textoTerciario,
      marginTop: 2,
    },
    estrellas: {
      flexDirection: 'row',
      gap: 8,
      marginBottom: 28,
    },
    estrella: {
      fontSize: 32,
    },
    guardandoTexto: {
      color: colores.textoTerciario,
      fontSize: 13,
      marginBottom: 14,
    },
    btnRepetir: {
      backgroundColor: colores.primario,
      borderRadius: 14,
      paddingVertical: 15,
      width: '100%',
      alignItems: 'center',
      marginBottom: 10,
    },
    btnRepetirTexto: {
      color: '#FFFFFF',
      fontSize: 15,
      fontWeight: '700',
    },
    btnVolver: {
      backgroundColor: colores.fondo,
      borderRadius: 14,
      paddingVertical: 15,
      width: '100%',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colores.borde,
    },
    btnVolverTexto: {
      color: colores.textoSecundario,
      fontSize: 15,
      fontWeight: '600',
    },
  });
}
