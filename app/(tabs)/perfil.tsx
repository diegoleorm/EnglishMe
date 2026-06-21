import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const logros = [
  { id: 1, titulo: 'Primera lección', descripcion: 'Completaste tu primera lección', emoji: '🌟', obtenido: true },
  { id: 2, titulo: 'Racha de 3 días', descripcion: 'Aprendiste 3 días seguidos', emoji: '🔥', obtenido: true },
  { id: 3, titulo: 'Perfecto', descripcion: '100% en una lección', emoji: '💯', obtenido: true },
  { id: 4, titulo: 'Explorador', descripcion: 'Completa 5 temas diferentes', emoji: '🗺️', obtenido: false },
  { id: 5, titulo: 'Maestro A1', descripcion: 'Completa todos los temas A1', emoji: '🎓', obtenido: false },
  { id: 6, titulo: 'Racha de 7 días', descripcion: 'Aprendiste 7 días seguidos', emoji: '⚡', obtenido: false },
  { id: 7, titulo: 'Bilingüe', descripcion: 'Completaste el nivel B2', emoji: '🌎', obtenido: false },
  { id: 8, titulo: 'Velocista', descripcion: 'Completa una lección en menos de 1 min', emoji: '🏃', obtenido: false },
];

export default function PerfilScreen() {
  const router = useRouter();

  const logrosObtenidos = logros.filter(l => l.obtenido).length;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      <View style={styles.header}>
        <View style={styles.avatarWrap}>
          <Text style={styles.avatarEmoji}>👤</Text>
        </View>
        <Text style={styles.nombre}>Diego</Text>
        <Text style={styles.nivelTexto}>Nivel A1 — Principiante</Text>
        <View style={styles.rachaChip}>
          <Text style={styles.rachaEmoji}>🔥</Text>
          <Text style={styles.rachaTexto}>3 días de racha</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statNumero}>12</Text>
          <Text style={styles.statLabel}>Lecciones</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumero}>240</Text>
          <Text style={styles.statLabel}>Puntos</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumero}>{logrosObtenidos}/{logros.length}</Text>
          <Text style={styles.statLabel}>Logros</Text>
        </View>
      </View>

      <Text style={styles.seccionTitulo}>Mis logros</Text>
      <View style={styles.logrosGrid}>
        {logros.map((logro) => (
          <View
            key={logro.id}
            style={[styles.logroCard, !logro.obtenido && styles.logroCardBloqueado]}
          >
            {!logro.obtenido && (
              <View style={styles.lockBadge}>
                <Text style={styles.lockTexto}>🔒</Text>
              </View>
            )}
            <Text style={[styles.logroEmoji, !logro.obtenido && { opacity: 0.3 }]}>
              {logro.emoji}
            </Text>
            <Text style={[styles.logroTitulo, !logro.obtenido && styles.textoBloqueado]}>
              {logro.titulo}
            </Text>
            <Text style={styles.logroDesc}>{logro.descripcion}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.seccionTitulo}>Cuenta</Text>
      <View style={styles.opcionesCard}>
        <TouchableOpacity style={styles.opcionItem}>
          <Text style={styles.opcionIcono}>✏️</Text>
          <Text style={styles.opcionTexto}>Editar perfil</Text>
          <Text style={styles.opcionArrow}>›</Text>
        </TouchableOpacity>
        <View style={styles.opcionLinea} />
        <TouchableOpacity style={styles.opcionItem} onPress={() => router.push('/notificaciones')}>
          <Text style={styles.opcionIcono}>🔔</Text>
          <Text style={styles.opcionTexto}>Notificaciones</Text>
          <Text style={styles.opcionArrow}>›</Text>
        </TouchableOpacity>
        <View style={styles.opcionLinea} />
        <TouchableOpacity style={styles.opcionItem} onPress={() => router.push('/configuracion')}>
          <Text style={styles.opcionIcono}>⚙️</Text>
          <Text style={styles.opcionTexto}>Configuración</Text>
          <Text style={styles.opcionArrow}>›</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.btnCerrar} onPress={() => router.push('/login')}>
        <Text style={styles.btnCerrarTexto}>Cerrar sesión</Text>
      </TouchableOpacity>

      <View style={{ height: 20 }} />
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
    alignItems: 'center',
  },
  avatarWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 2.5,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  avatarEmoji: {
    fontSize: 40,
  },
  nombre: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  nivelTexto: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 12,
  },
  rachaChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EA580C',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  rachaEmoji: {
    fontSize: 15,
  },
  rachaTexto: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  statsRow: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: -16,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#E2E8F0',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: '#E2E8F0',
  },
  statNumero: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
  },
  statLabel: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
  },
  seccionTitulo: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
  },
  logrosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 10,
  },
  logroCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    width: '47.5%',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#E2E8F0',
    position: 'relative',
  },
  logroCardBloqueado: {
    backgroundColor: '#F8FAFC',
    opacity: 0.6,
  },
  lockBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  lockTexto: {
    fontSize: 12,
  },
  logroEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  logroTitulo: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 4,
  },
  textoBloqueado: {
    color: '#CBD5E1',
  },
  logroDesc: {
    fontSize: 10,
    color: '#94A3B8',
    textAlign: 'center',
  },
  opcionesCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: '#E2E8F0',
  },
  opcionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  opcionIcono: {
    fontSize: 18,
  },
  opcionTexto: {
    flex: 1,
    fontSize: 14,
    color: '#0F172A',
    fontWeight: '500',
  },
  opcionArrow: {
    fontSize: 18,
    color: '#CBD5E1',
  },
  opcionLinea: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginLeft: 46,
  },
  btnCerrar: {
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  btnCerrarTexto: {
    color: '#DC2626',
    fontSize: 15,
    fontWeight: '600',
  },
});