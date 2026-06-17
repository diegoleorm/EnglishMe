import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const avatares = [
  {
    id: 1,
    nombre: 'Michelle',
    descripcion: 'Amigable y paciente',
    emoji: '👩',
    edad: '28 años',
    estilo: 'Casual',
    color: '#DB2777',
    bgColor: '#FCE7F3',
    tagColor: '#9D174D',
  },
  {
    id: 2,
    nombre: 'Esteban',
    descripcion: 'Moderno y dinámico',
    emoji: '👨',
    edad: '25 años',
    estilo: 'Casual',
    color: '#1D4ED8',
    bgColor: '#DBEAFE',
    tagColor: '#1E40AF',
  },
  {
    id: 3,
    nombre: 'Luciana',
    descripcion: 'Formal y experta',
    emoji: '👩‍🏫',
    edad: '33 años',
    estilo: 'Formal',
    color: '#7E22CE',
    bgColor: '#F3E8FF',
    tagColor: '#6B21A8',
  },
  {
    id: 4,
    nombre: 'Charley',
    descripcion: 'Tutor de negocios',
    emoji: '👨‍💼',
    edad: '40 años',
    estilo: 'Formal',
    color: '#C2410C',
    bgColor: '#FFEDD5',
    tagColor: '#9A3412',
  },
];

export default function AvatarScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Elige tu tutor</Text>
        <Text style={styles.subtitle}>¿Con quién quieres aprender inglés?</Text>
      </View>

      {/* Grid de tutores */}
      <View style={styles.grid}>
        {avatares.map((avatar) => (
          <TouchableOpacity
            key={avatar.id}
            style={styles.card}
            activeOpacity={0.85}
            onPress={() =>
              router.push({
                pathname: '/temas',
                params: { nombre: avatar.nombre, emoji: avatar.emoji },
              })
            }
          >
            <View style={[styles.avatarCircle, { backgroundColor: avatar.bgColor }]}>
              <Text style={styles.avatarEmoji}>{avatar.emoji}</Text>
            </View>
            <Text style={[styles.nombre, { color: avatar.color }]}>{avatar.nombre}</Text>
            <Text style={styles.descripcion}>{avatar.descripcion}</Text>
            <View style={styles.tagsRow}>
              <View style={[styles.tag, { backgroundColor: avatar.bgColor }]}>
                <Text style={[styles.tagTexto, { color: avatar.tagColor }]}>{avatar.edad}</Text>
              </View>
              <View style={[styles.tag, { backgroundColor: avatar.bgColor }]}>
                <Text style={[styles.tagTexto, { color: avatar.tagColor }]}>{avatar.estilo}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Botón crear avatar */}
      <TouchableOpacity
        style={styles.crearBtn}
        activeOpacity={0.85}
        onPress={() =>
          router.push({
            pathname: '/temas',
            params: { nombre: 'Mi tutor', emoji: '🤖' },
          })
        }
      >
        <View style={styles.crearIcono}>
          <Text style={styles.crearEmoji}>✨</Text>
        </View>
        <View style={styles.crearTextos}>
          <Text style={styles.crearTitulo}>Crear mi propio avatar</Text>
          <Text style={styles.crearSub}>Elige rasgos, edad y género</Text>
        </View>
        <Text style={styles.crearArrow}>›</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    backgroundColor: '#3B6FE8',
    paddingTop: 60,
    paddingBottom: 28,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.75)',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    gap: 10,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    width: '47.5%',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#E2E8F0',
  },
  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  avatarEmoji: {
    fontSize: 32,
  },
  nombre: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  descripcion: {
    fontSize: 11,
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: 10,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 4,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  tagTexto: {
    fontSize: 10,
    fontWeight: '600',
  },
  crearBtn: {
    backgroundColor: '#0F172A',
    borderRadius: 18,
    marginHorizontal: 12,
    marginBottom: 40,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  crearIcono: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  crearEmoji: {
    fontSize: 24,
  },
  crearTextos: {
    flex: 1,
  },
  crearTitulo: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 3,
  },
  crearSub: {
    fontSize: 12,
    color: '#64748B',
  },
  crearArrow: {
    fontSize: 22,
    color: '#334155',
  },
});