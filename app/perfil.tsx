import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const logros = [
  { id: 1, titulo: 'Primera lección', descripcion: 'Completaste tu primera lección', emoji: '🌟', obtenido: true },
  { id: 2, titulo: 'Racha de 3 días', descripcion: 'Aprendiste 3 días seguidos', emoji: '🔥', obtenido: true },
  { id: 3, titulo: 'Perfecto', descripcion: 'Obtuviste 100% en una lección', emoji: '💯', obtenido: true },
  { id: 4, titulo: 'Explorador', descripcion: 'Completaste 5 temas diferentes', emoji: '🗺️', obtenido: false },
  { id: 5, titulo: 'Maestro A1', descripcion: 'Completaste todos los temas A1', emoji: '🎓', obtenido: false },
  { id: 6, titulo: 'Bilingüe', descripcion: 'Completaste el nivel B2', emoji: '🌎', obtenido: false },
];

export default function PerfilScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.avatarEmoji}>👤</Text>
        <Text style={styles.nombre}>Diego</Text>
        <Text style={styles.nivel}>Nivel A1 — Principiante</Text>
        <View style={styles.rachaContainer}>
          <Text style={styles.rachaEmoji}>🔥</Text>
          <Text style={styles.rachaTexto}>3 días de racha</Text>
        </View>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statNumero}>12</Text>
          <Text style={styles.statLabel}>Lecciones</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumero}>89%</Text>
          <Text style={styles.statLabel}>Promedio</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumero}>240</Text>
          <Text style={styles.statLabel}>Puntos</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumero}>3</Text>
          <Text style={styles.statLabel}>Logros</Text>
        </View>
      </View>

      <Text style={styles.seccionTitulo}>Progreso general</Text>
      <View style={styles.progresoContainer}>
        <View style={styles.progresoItem}>
          <Text style={styles.progresoLabel}>Nivel 0</Text>
          <View style={styles.barraFondo}>
            <View style={[styles.barra, { width: '100%', backgroundColor: '#27AE60' }]} />
          </View>
          <Text style={styles.porcentaje}>100%</Text>
        </View>
        <View style={styles.progresoItem}>
          <Text style={styles.progresoLabel}>Nivel A1</Text>
          <View style={styles.barraFondo}>
            <View style={[styles.barra, { width: '45%', backgroundColor: '#2980B9' }]} />
          </View>
          <Text style={styles.porcentaje}>45%</Text>
        </View>
        <View style={styles.progresoItem}>
          <Text style={styles.progresoLabel}>Nivel A2</Text>
          <View style={styles.barraFondo}>
            <View style={[styles.barra, { width: '10%', backgroundColor: '#8E44AD' }]} />
          </View>
          <Text style={styles.porcentaje}>10%</Text>
        </View>
        <View style={styles.progresoItem}>
          <Text style={styles.progresoLabel}>Nivel B1</Text>
          <View style={styles.barraFondo}>
            <View style={[styles.barra, { width: '0%', backgroundColor: '#E67E22' }]} />
          </View>
          <Text style={styles.porcentaje}>0%</Text>
        </View>
      </View>

      <Text style={styles.seccionTitulo}>Mis logros</Text>
      <View style={styles.logrosGrid}>
        {logros.map((logro) => (
          <View key={logro.id} style={[styles.logroCard, !logro.obtenido && styles.logroCardBloqueado]}>
            <Text style={[styles.logroEmoji, !logro.obtenido && styles.emojiBloqueado]}>{logro.emoji}</Text>
            <Text style={[styles.logroTitulo, !logro.obtenido && styles.textoBloqueado]}>{logro.titulo}</Text>
            <Text style={styles.logroDesc}>{logro.descripcion}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.btnVolver} onPress={() => router.back()}>
        <Text style={styles.btnTexto}>← Volver</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  header: {
    backgroundColor: '#2C3E50',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 16,
  },
  avatarEmoji: {
    fontSize: 80,
    marginBottom: 12,
  },
  nombre: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  nivel: {
    fontSize: 15,
    color: '#BDC3C7',
    marginBottom: 12,
  },
  rachaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E67E22',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  rachaEmoji: {
    fontSize: 16,
  },
  rachaTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    width: '47%',
    alignItems: 'center',
    elevation: 2,
  },
  statNumero: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  statLabel: {
    fontSize: 13,
    color: '#7F8C8D',
    marginTop: 4,
  },
  seccionTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    paddingHorizontal: 16,
    marginBottom: 12,
    marginTop: 8,
  },
  progresoContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
  },
  progresoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10,
  },
  progresoLabel: {
    fontSize: 13,
    color: '#2C3E50',
    width: 60,
  },
  barraFondo: {
    flex: 1,
    backgroundColor: '#ECF0F1',
    borderRadius: 10,
    height: 10,
  },
  barra: {
    height: 10,
    borderRadius: 10,
  },
  porcentaje: {
    fontSize: 12,
    color: '#7F8C8D',
    width: 35,
    textAlign: 'right',
  },
  logrosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 20,
  },
  logroCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    width: '47%',
    alignItems: 'center',
    elevation: 2,
  },
  logroCardBloqueado: {
    backgroundColor: '#ECF0F1',
    opacity: 0.6,
  },
  logroEmoji: {
    fontSize: 36,
    marginBottom: 8,
  },
  emojiBloqueado: {
    opacity: 0.3,
  },
  logroTitulo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 4,
  },
  textoBloqueado: {
    color: '#BDC3C7',
  },
  logroDesc: {
    fontSize: 11,
    color: '#7F8C8D',
    textAlign: 'center',
  },
  btnVolver: {
    backgroundColor: '#2C3E50',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    alignItems: 'center',
    marginBottom: 40,
  },
  btnTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});