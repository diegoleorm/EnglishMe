import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const temas = [
  {
    id: 1,
    titulo: 'Saludos y despedidas',
    descripcion: 'Hello, goodbye, nice to meet you...',
    emoji: '👋',
    color: '#27AE60',
    lecciones: 5,
    nivel: 'Nivel 0',
  },
  {
    id: 2,
    titulo: 'Números y fechas',
    descripcion: 'One, two, three, days, months...',
    emoji: '🔢',
    color: '#2980B9',
    lecciones: 6,
    nivel: 'Nivel 0',
  },
  {
    id: 3,
    titulo: 'Colores y formas',
    descripcion: 'Red, blue, circle, square...',
    emoji: '🎨',
    color: '#8E44AD',
    lecciones: 4,
    nivel: 'A1',
  },
  {
    id: 4,
    titulo: 'La familia',
    descripcion: 'Mother, father, brother, sister...',
    emoji: '👨‍👩‍👧‍👦',
    color: '#E67E22',
    lecciones: 5,
    nivel: 'A1',
  },
  {
    id: 5,
    titulo: 'Comida y bebidas',
    descripcion: 'I like, I don\'t like, breakfast...',
    emoji: '🍎',
    color: '#E91E8C',
    lecciones: 6,
    nivel: 'A1',
  },
  {
    id: 6,
    titulo: 'Presente simple',
    descripcion: 'I work, she works, do you...?',
    emoji: '📝',
    color: '#16A085',
    lecciones: 8,
    nivel: 'A2',
  },
  {
    id: 7,
    titulo: 'Pasado simple',
    descripcion: 'I went, she said, did you...?',
    emoji: '⏮️',
    color: '#C0392B',
    lecciones: 8,
    nivel: 'B1',
  },
  {
    id: 8,
    titulo: 'Phrasal verbs',
    descripcion: 'Give up, look up, turn on...',
    emoji: '💡',
    color: '#F39C12',
    lecciones: 10,
    nivel: 'B2',
  },
  {
    id: 9,
    titulo: 'Inglés de negocios',
    descripcion: 'Meetings, emails, presentations...',
    emoji: '💼',
    color: '#2C3E50',
    lecciones: 10,
    nivel: 'C1',
  },
];

export default function TemasScreen() {
  const router = useRouter();
  const { nombre, emoji } = useLocalSearchParams();

  const tutorNombre = nombre as string || 'Tu tutor';
  const tutorEmoji = emoji as string || '🎓';

  return (
    <ScrollView style={styles.container}>
      <View style={styles.tutorBar}>
        <Text style={styles.tutorEmoji}>{tutorEmoji}</Text>
        <View>
          <Text style={styles.tutorNombre}>{tutorNombre}</Text>
          <Text style={styles.tutorSub}>Tu tutor personal</Text>
        </View>
      </View>

      <Text style={styles.title}>¿Qué quieres aprender?</Text>
      <Text style={styles.subtitle}>Elige un tema para comenzar</Text>

      {temas.map((tema) => (
        <TouchableOpacity
          key={tema.id}
          style={[styles.card, { borderLeftColor: tema.color }]}
          onPress={() => router.push({
            pathname: '/leccion',
            params: { nombre: tutorNombre, emoji: tutorEmoji }
          })}
        >
          <Text style={styles.temaEmoji}>{tema.emoji}</Text>
          <View style={styles.temaInfo}>
            <Text style={styles.temaTitulo}>{tema.titulo}</Text>
            <Text style={styles.temaDesc}>{tema.descripcion}</Text>
            <View style={styles.temaTags}>
              <Text style={[styles.tag, { backgroundColor: tema.color }]}>{tema.nivel}</Text>
              <Text style={styles.tagGray}>{tema.lecciones} lecciones</Text>
            </View>
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
    padding: 16,
  },
  tutorBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C3E50',
    borderRadius: 16,
    padding: 16,
    marginTop: 40,
    marginBottom: 24,
    gap: 12,
  },
  tutorEmoji: {
    fontSize: 40,
  },
  tutorNombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  tutorSub: {
    fontSize: 13,
    color: '#BDC3C7',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: '#7F8C8D',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 5,
    elevation: 2,
  },
  temaEmoji: {
    fontSize: 32,
    marginRight: 14,
  },
  temaInfo: {
    flex: 1,
  },
  temaTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 2,
  },
  temaDesc: {
    fontSize: 12,
    color: '#7F8C8D',
    marginBottom: 6,
  },
  temaTags: {
    flexDirection: 'row',
    gap: 6,
  },
  tag: {
    fontSize: 11,
    color: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  tagGray: {
    fontSize: 11,
    color: '#7F8C8D',
    backgroundColor: '#ECF0F1',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  arrow: {
    fontSize: 20,
    color: '#BDC3C7',
  },
});