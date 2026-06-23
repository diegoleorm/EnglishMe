import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useProgreso } from './theme/ProgresoContext';
import { useTema } from './theme/ThemeContext';
import type { Tema } from './theme/colors';

const niveles = [
  { id: 0, nombre: 'Nivel 0', descripcion: 'Absoluto principiante', emoji: '🌱', color: '#16A34A', bgColor: '#DCFCE7', dotColors: [] },
  { id: 1, nombre: 'Nivel A1', descripcion: 'Principiante', emoji: '⭐', color: '#2563EB', bgColor: '#DBEAFE', dotColors: [] },
  { id: 2, nombre: 'Nivel A2', descripcion: 'Básico', emoji: '⭐⭐', color: '#9333EA', bgColor: '#F3E8FF', dotColors: [] },
  { id: 3, nombre: 'Nivel B1', descripcion: 'Intermedio', emoji: '⭐⭐⭐', color: '#D97706', bgColor: '#FEF3C7', dotColors: [] },
  { id: 4, nombre: 'Nivel B2', descripcion: 'Intermedio alto', emoji: '⭐⭐⭐⭐', color: '#DC2626', bgColor: '#FEE2E2', dotColors: [] },
  { id: 5, nombre: 'Nivel C1', descripcion: 'Avanzado', emoji: '🏆', color: '#CA8A04', bgColor: '#FEF9C3', dotColors: ['#CA8A04', '#CA8A04', '#CA8A04'] },
];

function Shield({ emoji, color, bgColor, dotColors }: {
  emoji: string;
  color: string;
  bgColor: string;
  dotColors: string[];
}) {
  return (
    <View style={[shieldStyles.outer, { borderColor: color, backgroundColor: bgColor }]}>
      {dotColors.length > 0 && (
        <View style={shieldStyles.dotsRow}>
          {dotColors.map((c, i) => (
            <View key={i} style={[shieldStyles.dot, { backgroundColor: c }]} />
          ))}
        </View>
      )}
      <Text style={shieldStyles.emoji}>{emoji}</Text>
    </View>
  );
}

const shieldStyles = StyleSheet.create({
  outer: {
    width: 52,
    height: 52,
    borderRadius: 14,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 3,
    position: 'absolute',
    top: 6,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  emoji: {
    fontSize: 22,
  },
});

export default function NivelScreen() {
  const router = useRouter();
  const { colores } = useTema();
  const { elegirNivel } = useProgreso();
  const styles = crearEstilos(colores);

  const seleccionarNivel = async (nivelId: number, nivelNombre: string) => {
    await elegirNivel(nivelId, nivelNombre);
    router.push('/avatar');
  };

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
            onPress={() => seleccionarNivel(nivel.id, nivel.nombre)}
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

function crearEstilos(colores: Tema) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colores.fondo,
    },
    header: {
      backgroundColor: colores.primario,
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
      backgroundColor: colores.fondoTarjeta,
      borderRadius: 16,
      padding: 14,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 14,
      borderWidth: 1,
      borderColor: colores.borde,
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
      color: colores.textoTerciario,
    },
    arrow: {
      fontSize: 20,
      color: colores.textoTerciario,
    },
  });
}