import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LeccionScreen() {
  const router = useRouter();
  const { nombre, emoji } = useLocalSearchParams();

  const tutorNombre = nombre as string || 'Tu tutor';
  const tutorEmoji = emoji as string || '🎓';

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarEmoji}>{tutorEmoji}</Text>
        <Text style={styles.avatarNombre}>{tutorNombre}</Text>
        <View style={styles.onlineIndicator}>
          <Text style={styles.onlineTexto}>● En línea</Text>
        </View>
      </View>

      <View style={styles.dialogo}>
        <Text style={styles.tutorNombre}>{tutorEmoji} {tutorNombre} — Tu tutor/a</Text>
        <Text style={styles.mensaje}>
          "Hello! My name is {tutorNombre}. Today we are going to learn basic greetings in English. Ready?"
        </Text>
        <Text style={styles.traduccion}>
          "¡Hola! Me llamo {tutorNombre}. Hoy vamos a aprender saludos básicos en inglés. ¿Listos?"
        </Text>
      </View>

      <ScrollView horizontal style={styles.opciones} showsHorizontalScrollIndicator={false}>
        <TouchableOpacity style={styles.opcion}>
          <Text style={styles.opcionTexto}>Yes, I'm ready! ✅</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.opcion}>
          <Text style={styles.opcionTexto}>Repeat please 🔄</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.opcion}>
          <Text style={styles.opcionTexto}>Too fast 🐢</Text>
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity style={styles.siguiente} onPress={() => router.back()}>
        <Text style={styles.siguienteTexto}>← Volver</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  avatarContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#16213e',
    margin: 16,
    borderRadius: 20,
  },
  avatarEmoji: {
    fontSize: 100,
    marginBottom: 12,
  },
  avatarNombre: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  onlineIndicator: {
    backgroundColor: '#0f3460',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 10,
  },
  onlineTexto: {
    color: '#4CAF50',
    fontSize: 13,
  },
  dialogo: {
    backgroundColor: '#16213e',
    margin: 16,
    borderRadius: 16,
    padding: 16,
  },
  tutorNombre: {
    fontSize: 14,
    color: '#4A90D9',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  mensaje: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 8,
    lineHeight: 24,
  },
  traduccion: {
    fontSize: 14,
    color: '#A0A0B0',
    fontStyle: 'italic',
  },
  opciones: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  opcion: {
    backgroundColor: '#0f3460',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  opcionTexto: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  siguiente: {
    margin: 16,
    padding: 16,
    backgroundColor: '#4A90D9',
    borderRadius: 12,
    alignItems: 'center',
  },
  siguienteTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});