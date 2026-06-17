import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const avatares = [
  { id: 1, nombre: 'Michelle', descripcion: 'Tutora amigable y paciente', emoji: '👩', edad: '28 años', estilo: 'Casual', color: '#E91E8C' },
  { id: 2, nombre: 'Esteban', descripcion: 'Tutor moderno y dinámico', emoji: '👨', edad: '25 años', estilo: 'Casual', color: '#2196F3' },
  { id: 3, nombre: 'Luciana', descripcion: 'Profesora formal y experta', emoji: '👩‍🏫', edad: '33 años', estilo: 'Formal', color: '#9C27B0' },
  { id: 4, nombre: 'Charley', descripcion: 'Tutor de negocios', emoji: '👨‍💼', edad: '40 años', estilo: 'Formal', color: '#FF5722' },
];

export default function AvatarScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Elige tu tutor</Text>
      <Text style={styles.subtitle}>¿Con quién quieres aprender inglés?</Text>

      <View style={styles.grid}>
        {avatares.map((avatar) => (
          <TouchableOpacity
            key={avatar.id}
            style={[styles.card, { borderTopColor: avatar.color }]}
            onPress={() => router.push({
              pathname: '/temas',
              params: { nombre: avatar.nombre, emoji: avatar.emoji }
            })}
          >
            <Text style={styles.emoji}>{avatar.emoji}</Text>
            <Text style={[styles.nombre, { color: avatar.color }]}>{avatar.nombre}</Text>
            <Text style={styles.descripcion}>{avatar.descripcion}</Text>
            <View style={styles.tags}>
              <Text style={styles.tag}>{avatar.edad}</Text>
              <Text style={styles.tag}>{avatar.estilo}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.crearBtn} onPress={() => router.push({
        pathname: '/temas',
        params: { nombre: 'Mi tutor', emoji: '🤖' }
      })}>
        <Text style={styles.crearEmoji}>✨</Text>
        <Text style={styles.crearTexto}>Crear mi propio avatar</Text>
        <Text style={styles.crearSub}>Elige rasgos, edad y género</Text>
      </TouchableOpacity>
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
    marginBottom: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    width: '48%',
    marginBottom: 16,
    alignItems: 'center',
    borderTopWidth: 4,
    elevation: 3,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  descripcion: {
    fontSize: 12,
    color: '#7F8C8D',
    textAlign: 'center',
    marginBottom: 8,
  },
  tags: {
    flexDirection: 'row',
    gap: 4,
  },
  tag: {
    fontSize: 10,
    backgroundColor: '#ECF0F1',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    color: '#7F8C8D',
  },
  crearBtn: {
    backgroundColor: '#2C3E50',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 40,
  },
  crearEmoji: {
    fontSize: 36,
    marginBottom: 8,
  },
  crearTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  crearSub: {
    fontSize: 13,
    color: '#BDC3C7',
  },
});