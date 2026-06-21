import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const temasPorNivel = [
  {
    nivel: 'Nivel 0',
    color: '#16A34A',
    bgColor: '#DCFCE7',
    temas: [
      { id: 1, titulo: 'Saludos y despedidas', descripcion: 'Hello, goodbye, nice to meet you...', emoji: '👋', lecciones: 5, completado: true },
      { id: 2, titulo: 'Números y fechas', descripcion: 'One, two, three, days, months...', emoji: '🔢', lecciones: 6, completado: true },
      { id: 3, titulo: 'Colores y formas', descripcion: 'Red, blue, circle, square...', emoji: '🎨', lecciones: 4, completado: false },
      { id: 4, titulo: 'El alfabeto', descripcion: 'A, B, C... pronunciación correcta', emoji: '🔤', lecciones: 3, completado: false },
      { id: 5, titulo: 'Verbos básicos', descripcion: 'Be, have, do, go, come...', emoji: '⚡', lecciones: 5, completado: false },
    ],
  },
  {
    nivel: 'Nivel A1',
    color: '#2563EB',
    bgColor: '#DBEAFE',
    temas: [
      { id: 6, titulo: 'La familia', descripcion: 'Mother, father, brother, sister...', emoji: '👨‍👩‍👧‍👦', lecciones: 5, completado: false },
      { id: 7, titulo: 'Comida y bebidas', descripcion: 'I like, I don\'t like, breakfast...', emoji: '🍎', lecciones: 6, completado: false },
      { id: 8, titulo: 'La casa', descripcion: 'Kitchen, bedroom, living room...', emoji: '🏠', lecciones: 5, completado: false },
      { id: 9, titulo: 'Animales', descripcion: 'Dog, cat, bird, fish...', emoji: '🐶', lecciones: 4, completado: false },
      { id: 10, titulo: 'Verbos regulares', descripcion: 'Work→worked, play→played, talk→talked...', emoji: '📗', lecciones: 7, completado: false },
      { id: 11, titulo: 'El cuerpo humano', descripcion: 'Head, shoulders, knees and toes...', emoji: '🧍', lecciones: 4, completado: false },
    ],
  },
  {
    nivel: 'Nivel A2',
    color: '#9333EA',
    bgColor: '#F3E8FF',
    temas: [
      { id: 12, titulo: 'Presente simple', descripcion: 'I work, she works, do you...?', emoji: '📝', lecciones: 8, completado: false },
      { id: 13, titulo: 'Presente continuo', descripcion: 'I am working, she is running...', emoji: '🔄', lecciones: 7, completado: false },
      { id: 14, titulo: 'Verbos irregulares básicos', descripcion: 'Go→went, have→had, be→was...', emoji: '📘', lecciones: 9, completado: false },
      { id: 15, titulo: 'Verbos modales básicos', descripcion: 'Can, can\'t, could, would...', emoji: '🎯', lecciones: 7, completado: false },
      { id: 16, titulo: 'El tiempo y clima', descripcion: 'Sunny, rainy, hot, cold...', emoji: '🌤️', lecciones: 5, completado: false },
      { id: 17, titulo: 'Transporte y ciudad', descripcion: 'Bus, train, where is the...?', emoji: '🚌', lecciones: 6, completado: false },
      { id: 18, titulo: 'Compras y precios', descripcion: 'How much is this? I\'d like...', emoji: '🛍️', lecciones: 5, completado: false },
    ],
  },
  {
    nivel: 'Nivel B1',
    color: '#D97706',
    bgColor: '#FEF3C7',
    temas: [
      { id: 19, titulo: 'Pasado simple', descripcion: 'I worked, she played, did you...?', emoji: '⏮️', lecciones: 8, completado: false },
      { id: 20, titulo: 'Pasado continuo', descripcion: 'I was working, they were...', emoji: '⏪', lecciones: 7, completado: false },
      { id: 21, titulo: 'Verbos irregulares avanzados', descripcion: 'Know→knew, write→wrote, see→saw...', emoji: '📙', lecciones: 10, completado: false },
      { id: 22, titulo: 'Presente perfecto', descripcion: 'I have been, she has done...', emoji: '✅', lecciones: 8, completado: false },
      { id: 23, titulo: 'Futuro con will', descripcion: 'I will go, she won\'t be...', emoji: '🔮', lecciones: 6, completado: false },
      { id: 24, titulo: 'Futuro con going to', descripcion: 'I\'m going to study, she is going to...', emoji: '📅', lecciones: 6, completado: false },
      { id: 25, titulo: 'Verbos modales avanzados', descripcion: 'Must, should, might, ought to...', emoji: '🧠', lecciones: 8, completado: false },
      { id: 26, titulo: 'Viajes y turismo', descripcion: 'Airport, hotel, reservation...', emoji: '✈️', lecciones: 7, completado: false },
      { id: 27, titulo: 'Salud y cuerpo', descripcion: 'Doctor, symptoms, medicine...', emoji: '🏥', lecciones: 6, completado: false },
    ],
  },
  {
    nivel: 'Nivel B2',
    color: '#DC2626',
    bgColor: '#FEE2E2',
    temas: [
      { id: 28, titulo: 'Pasado perfecto', descripcion: 'I had done, she had gone...', emoji: '⏩', lecciones: 7, completado: false },
      { id: 29, titulo: 'Phrasal verbs', descripcion: 'Give up, look up, turn on...', emoji: '💡', lecciones: 10, completado: false },
      { id: 30, titulo: 'Condicionales 1 y 2', descripcion: 'If it rains, I will... If I had...', emoji: '🤔', lecciones: 8, completado: false },
      { id: 31, titulo: 'Condicional 3', descripcion: 'If I had studied, I would have...', emoji: '💭', lecciones: 7, completado: false },
      { id: 32, titulo: 'Reported speech', descripcion: 'He said that, she told me...', emoji: '🗨️', lecciones: 8, completado: false },
      { id: 33, titulo: 'Voz pasiva', descripcion: 'It was made, they were told...', emoji: '🔀', lecciones: 7, completado: false },
      { id: 34, titulo: 'Expresiones idiomáticas', descripcion: 'Break a leg, hit the road...', emoji: '🗣️', lecciones: 9, completado: false },
      { id: 35, titulo: 'Debates y opiniones', descripcion: 'I believe, in my opinion...', emoji: '💬', lecciones: 8, completado: false },
    ],
  },
  {
    nivel: 'Nivel C1',
    color: '#CA8A04',
    bgColor: '#FEF9C3',
    temas: [
      { id: 36, titulo: 'Inglés de negocios', descripcion: 'Meetings, emails, presentations...', emoji: '💼', lecciones: 10, completado: false },
      { id: 37, titulo: 'Negociación', descripcion: 'Proposals, agreements, deals...', emoji: '🤝', lecciones: 9, completado: false },
      { id: 38, titulo: 'Escritura formal', descripcion: 'Reports, essays, cover letters...', emoji: '✍️', lecciones: 8, completado: false },
      { id: 39, titulo: 'Pronunciación avanzada', descripcion: 'Stress, intonation, accents...', emoji: '🎤', lecciones: 10, completado: false },
      { id: 40, titulo: 'Comprensión auditiva', descripcion: 'Podcasts, news, movies...', emoji: '🎧', lecciones: 10, completado: false },
      { id: 41, titulo: 'Verbos modales perfectos', descripcion: 'Should have, could have, must have...', emoji: '🏅', lecciones: 8, completado: false },
      { id: 42, titulo: 'Subjuntivo e hipótesis', descripcion: 'Were I to, had she known...', emoji: '🌀', lecciones: 9, completado: false },
    ],
  },
];

export default function TemasScreen() {
  const router = useRouter();
  const { nombre, emoji } = useLocalSearchParams();

  const tutorNombre = nombre as string || 'Tu tutor';
  const tutorEmoji = emoji as string || '🎓';

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      <View style={styles.tutorBar}>
        <View style={styles.tutorChip}>
          <Text style={styles.tutorEmoji}>{tutorEmoji}</Text>
          <View>
            <Text style={styles.tutorNombre}>{tutorNombre}</Text>
            <Text style={styles.tutorSub}>Tu tutor personal</Text>
          </View>
        </View>
      </View>

      <Text style={styles.title}>¿Qué quieres aprender?</Text>
      <Text style={styles.subtitle}>Elige un tema para comenzar</Text>

      {temasPorNivel.map((grupo) => (
        <View key={grupo.nivel} style={styles.grupo}>

          <View style={[styles.nivelHeader, { backgroundColor: grupo.bgColor }]}>
            <Text style={[styles.nivelTitulo, { color: grupo.color }]}>{grupo.nivel}</Text>
            <Text style={[styles.nivelCount, { color: grupo.color }]}>
              {grupo.temas.filter(t => t.completado).length}/{grupo.temas.length} completados
            </Text>
          </View>

          {grupo.temas.map((tema) => (
            <TouchableOpacity
              key={tema.id}
              style={styles.card}
              activeOpacity={0.85}
              onPress={() =>
                router.push({
                  pathname: '/leccion',
                  params: { nombre: tutorNombre, emoji: tutorEmoji },
                })
              }
            >
              <View style={[styles.temaIcono, { backgroundColor: grupo.bgColor }]}>
                <Text style={styles.temaEmoji}>{tema.emoji}</Text>
              </View>
              <View style={styles.temaInfo}>
                <Text style={styles.temaTitulo}>{tema.titulo}</Text>
                <Text style={styles.temaDesc}>{tema.descripcion}</Text>
                <View style={styles.temaTags}>
                  <View style={[styles.tag, { backgroundColor: grupo.bgColor }]}>
                    <Text style={[styles.tagTexto, { color: grupo.color }]}>
                      {tema.lecciones} lecciones
                    </Text>
                  </View>
                  {tema.completado && (
                    <View style={styles.tagCompletado}>
                      <Text style={styles.tagCompletadoTexto}>✅ Completado</Text>
                    </View>
                  )}
                </View>
              </View>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  tutorBar: {
    backgroundColor: '#0F172A',
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  tutorChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 14,
    padding: 12,
    gap: 12,
  },
  tutorEmoji: {
    fontSize: 36,
  },
  tutorNombre: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  tutorSub: {
    fontSize: 12,
    color: '#64748B',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
    paddingHorizontal: 16,
    paddingTop: 20,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#94A3B8',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  grupo: {
    marginBottom: 8,
  },
  nivelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 8,
  },
  nivelTitulo: {
    fontSize: 14,
    fontWeight: '700',
  },
  nivelCount: {
    fontSize: 12,
    fontWeight: '500',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 0.5,
    borderColor: '#E2E8F0',
  },
  temaIcono: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  temaEmoji: {
    fontSize: 22,
  },
  temaInfo: {
    flex: 1,
  },
  temaTitulo: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 2,
  },
  temaDesc: {
    fontSize: 11,
    color: '#94A3B8',
    marginBottom: 6,
  },
  temaTags: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  tagTexto: {
    fontSize: 11,
    fontWeight: '600',
  },
  tagCompletado: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  tagCompletadoTexto: {
    fontSize: 11,
    fontWeight: '600',
    color: '#16A34A',
  },
  arrow: {
    fontSize: 20,
    color: '#CBD5E1',
  },
});