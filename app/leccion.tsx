import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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

  if (terminado) {
    return (
      <View style={styles.container}>
        <View style={styles.resultadoContainer}>
          <Text style={styles.resultadoEmoji}>🏆</Text>
          <Text style={styles.resultadoTitulo}>¡Lección completada!</Text>
          <Text style={styles.resultadoPuntaje}>{puntaje}/{lecciones.length} correctas</Text>
          <Text style={styles.resultadoMensaje}>
            {puntaje === lecciones.length ? '¡Perfecto! Excelente trabajo 🌟' :
             puntaje >= lecciones.length / 2 ? '¡Muy bien! Sigue practicando 💪' :
             'Sigue practicando, lo lograrás 🎯'}
          </Text>
          <TouchableOpacity style={styles.btnRepetir} onPress={() => { setPaso(0); setSeleccion(null); setCorrecto(null); setPuntaje(0); setTerminado(false); }}>
            <Text style={styles.btnTexto}>🔄 Repetir lección</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnVolver} onPress={() => router.back()}>
            <Text style={styles.btnTexto}>← Volver</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarEmoji}>{tutorEmoji}</Text>
        <Text style={styles.avatarNombre}>{tutorNombre}</Text>
        <Text style={styles.progreso}>Pregunta {paso + 1} de {lecciones.length}</Text>
      </View>

      <View style={styles.preguntaContainer}>
        <Text style={styles.ingles}>{leccionActual.ingles}</Text>
        <Text style={styles.espanol}>{leccionActual.espanol}</Text>
      </View>

      <Text style={styles.instruccion}>Elige la respuesta correcta:</Text>

      {leccionActual.opciones.map((opcion, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.opcion,
            seleccion === index && correcto ? styles.opcionCorrecta :
            seleccion === index && !correcto ? styles.opcionIncorrecta :
            seleccion !== null && index === leccionActual.correcta ? styles.opcionCorrecta :
            null
          ]}
          onPress={() => responder(index)}
        >
          <Text style={styles.opcionTexto}>{opcion}</Text>
        </TouchableOpacity>
      ))}

      {seleccion !== null && (
        <View style={styles.feedbackContainer}>
          <Text style={styles.feedback}>
            {correcto ? '✅ ¡Correcto! Great job!' : '❌ Incorrecto. La respuesta era: ' + leccionActual.opciones[leccionActual.correcta]}
          </Text>
          <TouchableOpacity style={styles.btnSiguiente} onPress={siguiente}>
            <Text style={styles.btnSiguienteTexto}>
              {paso + 1 >= lecciones.length ? 'Ver resultado 🏆' : 'Siguiente →'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    padding: 16,
  },
  avatarContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#16213e',
    borderRadius: 20,
    marginBottom: 16,
  },
  avatarEmoji: {
    fontSize: 60,
    marginBottom: 8,
  },
  avatarNombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  progreso: {
    fontSize: 13,
    color: '#4A90D9',
  },
  preguntaContainer: {
    backgroundColor: '#16213e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  ingles: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  espanol: {
    fontSize: 15,
    color: '#A0A0B0',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  instruccion: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 12,
  },
  opcion: {
    backgroundColor: '#0f3460',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },
  opcionCorrecta: {
    backgroundColor: '#1a5e1a',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  opcionIncorrecta: {
    backgroundColor: '#5e1a1a',
    borderWidth: 2,
    borderColor: '#F44336',
  },
  opcionTexto: {
    color: '#FFFFFF',
    fontSize: 15,
  },
  feedbackContainer: {
    marginTop: 8,
  },
  feedback: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 12,
    textAlign: 'center',
  },
  btnSiguiente: {
    backgroundColor: '#4A90D9',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  btnSiguienteTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultadoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultadoEmoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  resultadoTitulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  resultadoPuntaje: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 8,
  },
  resultadoMensaje: {
    fontSize: 16,
    color: '#A0A0B0',
    textAlign: 'center',
    marginBottom: 32,
  },
  btnRepetir: {
    backgroundColor: '#4A90D9',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  btnVolver: {
    backgroundColor: '#0f3460',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    alignItems: 'center',
  },
  btnTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});