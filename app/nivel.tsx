import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const niveles = [
  { id: 0, nombre: 'Nivel 0', descripcion: 'Absoluto principiante', emoji: '🌱', color: '#16A34A', bgColor: '#DCFCE7', dotColors: [] },
  { id: 1, nombre: 'Nivel A1', descripcion: 'Principiante', emoji: '⭐', color: '#2563EB', bgColor: '#DBEAFE', dotColors: [] },
  { id: 2, nombre: 'Nivel A2', descripcion: 'Básico', emoji: '⭐⭐', color: '#9333EA', bgColor: '#F3E8FF', dotColors: [] },
  { id: 3, nombre: 'Nivel B1', descripcion: 'Intermedio', emoji: '⭐⭐⭐', color: '#D97706', bgColor: '#FEF3C7', dotColors: [] },
  { id: 4, nombre: 'Nivel B2', descripcion: 'Intermedio alto', emoji: '⭐⭐⭐⭐', color: '#DC2626', bgColor: '#FEE2E2', dotColors: [] },
  { id: 5, nombre: 'Nivel C1', descripcion: 'Avanzado', emoji: '🏆', color: '#CA8A04', bgColor: '#FEF9C3', dotColors: ['#CA8A04', '#CA8A04', '#CA8A04'] },
];

function Shield({ emoji, color, bgColor, dotColors }: { emoji: string; color: string; bgColor: string; dotColors: string[] }) {
  return (
    <View style={[styles.shieldOuter, { borderColor: color }]}>
      <View style={[styles.shieldInner, { backgroundColor: bgColor }]}>
        {dotColors.length > 0 && (
          <View style={styles.dotsRow}>
            {dotColors.map((c, i) => (
              <View key={i} style={[styles.dot, { backgroundColor: c }]} />
            ))}
          </View>
        )}
        <Text style={styles.shieldEmoji}>{emoji}</Text>
      </View>
    </View>
  );
}

export default function NivelScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>¿Cuál es tu nivel?</Text>
        <Text style={styles.subtitle}>Selecciona el nivel para comenzar</Text>
      </View>

      <View style={styles.cards}>
        {niveles.map((nivel) => (
          <TouchableOpacity
            key={nivel.id}
            style={styles.card}
            onPress={() => router.push('/avatar')}
            activeOpacity={0.85}
          >
            <Shield
              emoji={nivel.emoji}
              color={nivel.color}
              bgColor={nivel.bgColor}
              dotColors={nivel.dotColors}
            />
            <View style={styles.cardText}>
              <Text style={[styles.cardNombre, { color: nivel.color }]}>{nivel.nombre}</Text>
              <Text style={styles.cardDesc}>{nivel.descripcion}</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        ))}
      </View>
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
  cards: {
    padding: 16,
    gap: 10,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderWidth: 0.5,
    borderColor: '#E2E8F0',
  },
  shieldOuter: {
    width: 48,
    height: 56,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  shieldInner: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 3,
    position: 'absolute',
    top: 5,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  shieldEmoji: {
    fontSize: 22,
  },
  cardText: {
    flex: 1,
  },
  cardNombre: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 3,
  },
  cardDesc: {
    fontSize: 12,
    color: '#94A3B8',
  },
  arrow: {
    fontSize: 20,
    color: '#CBD5E1',
  },
});