import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.emoji}>🌎</Text>
        <Text style={styles.title}>EnglishMe</Text>
        <Text style={styles.subtitle}>Aprende inglés con tu propio avatar</Text>
      </View>

      <View style={styles.features}>
        <Text style={styles.feature}>✅ Niveles desde cero hasta avanzado</Text>
        <Text style={styles.feature}>✅ Elige o crea tu avatar</Text>
        <Text style={styles.feature}>✅ Gramática, vocabulario y conversación</Text>
        <Text style={styles.feature}>✅ Aprende a tu ritmo</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/nivel')}>
        <Text style={styles.buttonText}>¡Comenzar ahora!</Text>
      </TouchableOpacity>

      <Text style={styles.login}>¿Ya tienes cuenta? Inicia sesión</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A90D9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  emoji: {
    fontSize: 80,
    marginBottom: 12,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#E0F0FF',
    textAlign: 'center',
  },
  features: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    marginBottom: 40,
  },
  feature: {
    fontSize: 15,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#FFD700',
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 60,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  login: {
    fontSize: 14,
    color: '#E0F0FF',
    textDecorationLine: 'underline',
  },
});