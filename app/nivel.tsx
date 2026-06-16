import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const niveles = [
  { id: 0, nombre: 'Nivel 0', descripcion: 'Absoluto principiante', emoji: '🌱', color: '#27AE60' },
  { id: 1, nombre: 'Nivel A1', descripcion: 'Principiante', emoji: '⭐', color: '#2980B9' },
  { id: 2, nombre: 'Nivel A2', descripcion: 'Básico', emoji: '⭐⭐', color: '#8E44AD' },
  { id: 3, nombre: 'Nivel B1', descripcion: 'Intermedio', emoji: '⭐⭐⭐', color: '#E67E22' },
  { id: 4, nombre: 'Nivel B2', descripcion: 'Intermedio alto', emoji: '⭐⭐⭐⭐', color: '#C0392B' },
  { id: 5, nombre: 'Nivel C1', descripcion: 'Avanzado', emoji: '🏆', color: '#F39C12' },
];

export default function NivelScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>¿Cuál es tu nivel?</Text>
      <Text style={styles.subtitle}>Selecciona el nivel con el que quieres comenzar</Text>

      {niveles.map((nivel) => (
        <TouchableOpacity
          key={nivel.id}
          style={[styles.card, { borderLeftColor: nivel.color }]}
          onPress={() => router.push('/')}
        >
          <Text style={styles.emoji}>{nivel.emoji}</Text>
          <View style={styles.cardText}>
            <Text style={[styles.cardTitulo, { color: nivel.color }]}>{nivel.nombre}</Text>
            <Text style={styles.cardDesc}>{nivel.descripcion}</Text>
          </View>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginTop: 40,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#7F8C8D',
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  emoji: {
    fontSize: 28,
    marginRight: 16,
  },
  cardText: {
    flex: 1,
  },
  cardTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardDesc: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 2,
  },
  arrow: {
    fontSize: 20,
    color: '#BDC3C7',
  },
});