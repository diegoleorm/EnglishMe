import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const lecciones = [
  {
    id: 1,
    ingles: "Hello! How are you?",
    espanol: "¡Hola! ¿Cómo estás?",
    opciones: ["Hello! I'm fine.", "Goodbye!", "My name is Diego."],
    correcta: 0,
  },
  {
    id: 2,
    ingles: "What is your name?",
    espanol: "¿Cuál es tu nombre?",
    opciones: ["I am from Colombia.", "My name is Diego.", "I don't know."],
    correcta: 1,
  },
  {
    id: 3,
    ingles: "Nice to meet you!",
    espanol: "¡Mucho gusto!",
    opciones: ["See you later!", "Nice to meet you too!", "I am tired."],
    correcta: 1,
  },
  {
    id: 4,
    ingles: "Where are you from?",
    espanol: "¿De dónde eres?",
    opciones: ["I am from Colombia.", "I am 30 years old.", "I like coffee."],
    correcta: 0,
  },
  {
    id: 5,
    ingles: "How old are you?",
    espanol: "¿Cuántos años tienes?",
    opciones: ["I am fine.", "I am 25 years old.", "I like music."],
    correcta: 1,
  },
];

export default function LeccionScreen() {
  const router = useRouter();
  const { nombre, emoji } = useLocalSearchParams();

  const tutorNombre = nombre as string || 'Tu tutor';
  const tutorEmoji = emoji as string || '🎓';

  const [paso, setPaso] = useState(0);
  const [seleccion, setSeleccion] = useState<number | null>(null);
  const [correcto, setCorrecto] = useState<boolean | null>(null);
  const [puntaje, setPuntaje] = useState(0);
  const [terminado, setTerminado] = useState(false);

  const leccionActual = lecciones[paso];
  const progreso = ((paso) / lecciones.length) * 100;

  const responder = (index: number) => {
    if (seleccion !== null) return;
    setSeleccion(index);
    const esCorresto = index === leccionActual.correcta;
    setCorrecto(esCorresto);
    if (esCorresto) setPuntaje(puntaje + 1);
  };

  const siguiente = () => {
    if (paso + 1 >= lecciones.length) {
      setTerminado(true);
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

  // Pantalla de resultados
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

          {/* Círculo de puntaje */}
          <View style={[styles.puntajeCirculo, {
            borderColor: esPerfecto ? '#CA8A04' : esBueno ? '#2563EB' : '#DC2626'
          }]}>
            <Text style={[styles.puntajeNumero, {
              color: esPerfecto ? '#CA8A04' : esBueno ? '#2563EB' : '#DC2626'
            }]}>{porcentaje}%</Text>
            <Text style={styles.puntajeLabel}>{puntaje}/{lecciones.length} correctas</Text>
          </View>

          {/* Estrellas */}
          <View style={styles.estrellas}>
            {[1, 2, 3].map((i) => (
              <Text key={i} style={[
                styles.estrella,
                { opacity: puntaje >= Math.ceil((lecciones.length / 3) * i) ? 1 : 0.2 }
              ]}>⭐</Text>
            ))}
          </View>

          <TouchableOpacity style={styles.btnRepetir} onPress={reiniciar}>
            <Text style={styles.btnRepetirTexto}>🔄  Repetir lección</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnVolver} onPress={() => router.back()}>
            <Text style={styles.btnVolverTexto}>← Volver a temas</Text>
          </TouchableOpacity>

        </View>
      </View>
    );
  }

  // Pantalla de lección
  return (
    <View style={styles.container}>

      {/* Header con progreso */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backTexto}>✕</Text>
        </TouchableOpacity>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${progreso}%` }]} />
        </View>
        <Text style={styles.progressLabel}>{paso + 1}/{lecciones.length}</Text>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Tutor con burbuja */}
        <View style={styles.tutorRow}>
          <View style={styles.tutorAvatarWrap}>
            <Text style={styles.tutorEmoji}>{tutorEmoji}</Text>
          </View>
          <View style={styles.burbuja}>
            <Text style={styles.burbujaIngles}>{leccionActual.ingles}</Text>
            <Text style={styles.burbujaEspanol}>{leccionActual.espanol}</Text>
          </View>
        </View>

        {/* Instrucción */}
        <Text style={styles.instruccion}>Elige la respuesta correcta:</Text>

        {/* Opciones */}
        <View style={styles.opciones}>
          {leccionActual.opciones.map((opcion, index) => {
            let estiloOpcion = styles.opcion;
            let estiloTexto = styles.opcionTexto;

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
                <Text style={estiloTexto}>{opcion}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Feedback */}
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

        {/* Botón siguiente */}
        {seleccion !== null && (
          <TouchableOpacity style={styles.btnSiguiente} onPress={siguiente}>
            <Text style={styles.btnSiguienteTexto}>
              {paso + 1 >= lecciones.length ? 'Ver resultado 🏆' : 'Siguiente →'}
            </Text>
          </TouchableOpacity>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 56,
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 12,
  },
  backBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backTexto: {
    color: '#64748B',
    fontSize: 18,
  },
  progressBarBg: {
    flex: 1,
    height: 8,
    backgroundColor: '#1E293B',
    borderRadius: 4,
  },
  progressBarFill: {
    height: 8,
    backgroundColor: '#3B6FE8',
    borderRadius: 4,
  },
  progressLabel: {
    color: '#3B6FE8',
    fontSize: 13,
    fontWeight: '700',
    minWidth: 32,
    textAlign: 'right',
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 16,
  },
  tutorRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 24,
  },
  tutorAvatarWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  tutorEmoji: {
    fontSize: 32,
  },
  burbuja: {
    flex: 1,
    backgroundColor: '#1E293B',
    borderRadius: 16,
    borderTopLeftRadius: 4,
    padding: 14,
  },
  burbujaIngles: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  burbujaEspanol: {
    fontSize: 13,
    color: '#64748B',
    fontStyle: 'italic',
  },
  instruccion: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 12,
  },
  opciones: {
    gap: 10,
    marginBottom: 16,
  },
  opcion: {
    backgroundColor: '#1E293B',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1.5,
    borderColor: '#1E293B',
  },
  opcionCorrecta: {
    backgroundColor: '#14532D',
    borderColor: '#22C55E',
  },
  opcionIncorrecta: {
    backgroundColor: '#4C0519',
    borderColor: '#EF4444',
  },
  opcionDesactivada: {
    opacity: 0.4,
  },
  opcionLetra: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
  },
  opcionLetraTexto: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '700',
  },
  opcionTexto: {
    color: '#FFFFFF',
    fontSize: 15,
    flex: 1,
  },
  feedback: {
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  feedbackCorrecto: {
    backgroundColor: '#14532D',
  },
  feedbackIncorrecto: {
    backgroundColor: '#4C0519',
  },
  feedbackEmoji: {
    fontSize: 24,
  },
  feedbackTextos: {
    flex: 1,
  },
  feedbackTitulo: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  feedbackRespuesta: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 2,
  },
  btnSiguiente: {
    backgroundColor: '#3B6FE8',
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
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  resultCard: {
    backgroundColor: '#1E293B',
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
    color: '#FFFFFF',
    marginBottom: 6,
  },
  resultMensaje: {
    fontSize: 14,
    color: '#64748B',
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
    color: '#64748B',
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
  btnRepetir: {
    backgroundColor: '#3B6FE8',
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
    backgroundColor: '#0F172A',
    borderRadius: 14,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  btnVolverTexto: {
    color: '#94A3B8',
    fontSize: 15,
    fontWeight: '600',
  },
});