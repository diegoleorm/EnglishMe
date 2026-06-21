import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import {
    cancelarRecordatorios,
    programarRecordatorioDiario,
    solicitarPermisos,
} from './utils/notifications';

const horasDisponibles = [
  { hora: 7, minuto: 0, label: '7:00 AM', emoji: '🌅' },
  { hora: 12, minuto: 0, label: '12:00 PM', emoji: '☀️' },
  { hora: 18, minuto: 0, label: '6:00 PM', emoji: '🌇' },
  { hora: 20, minuto: 0, label: '8:00 PM', emoji: '🌙' },
  { hora: 21, minuto: 30, label: '9:30 PM', emoji: '✨' },
];

export default function NotificacionesScreen() {
  const router = useRouter();
  const [activado, setActivado] = useState(false);
  const [horaSeleccionada, setHoraSeleccionada] = useState(horasDisponibles[3]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarConfiguracion();
  }, []);

  const cargarConfiguracion = async () => {
    try {
      const estado = await AsyncStorage.getItem('notificaciones_activadas');
      const horaGuardada = await AsyncStorage.getItem('notificaciones_hora');

      if (estado === 'true') {
        setActivado(true);
      }
      if (horaGuardada) {
        const horaParsed = JSON.parse(horaGuardada);
        const encontrada = horasDisponibles.find(
          h => h.hora === horaParsed.hora && h.minuto === horaParsed.minuto
        );
        if (encontrada) setHoraSeleccionada(encontrada);
      }
    } catch (e) {
      console.log('Error cargando configuración:', e);
    }
    setCargando(false);
  };

  const toggleActivado = async (valor: boolean) => {
    if (valor) {
      const permisoConcedido = await solicitarPermisos();
      if (!permisoConcedido) {
        Alert.alert(
          'Permiso necesario',
          'Para recibir recordatorios, activa las notificaciones para EnglishMe en la configuración de tu celular.'
        );
        return;
      }
      await programarRecordatorioDiario(horaSeleccionada.hora, horaSeleccionada.minuto);
      await AsyncStorage.setItem('notificaciones_activadas', 'true');
      setActivado(true);
    } else {
      await cancelarRecordatorios();
      await AsyncStorage.setItem('notificaciones_activadas', 'false');
      setActivado(false);
    }
  };

  const seleccionarHora = async (item: typeof horasDisponibles[0]) => {
    setHoraSeleccionada(item);
    await AsyncStorage.setItem('notificaciones_hora', JSON.stringify(item));
    if (activado) {
      await programarRecordatorioDiario(item.hora, item.minuto);
    }
  };

  if (cargando) {
    return <View style={styles.container} />;
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backTexto}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Notificaciones</Text>
        <Text style={styles.subtitle}>Recibe recordatorios para no perder tu racha</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.toggleRow}>
          <View style={styles.toggleIcono}>
            <Text style={styles.toggleEmoji}>🔔</Text>
          </View>
          <View style={styles.toggleInfo}>
            <Text style={styles.toggleTitulo}>Recordatorio diario</Text>
            <Text style={styles.toggleDesc}>
              {activado ? 'Activado' : 'Desactivado'}
            </Text>
          </View>
          <Switch
            value={activado}
            onValueChange={toggleActivado}
            trackColor={{ false: '#334155', true: '#3B6FE8' }}
            thumbColor="#FFFFFF"
          />
        </View>
      </View>

      {activado && (
        <>
          <Text style={styles.seccionTitulo}>¿A qué hora?</Text>
          <View style={styles.horasCard}>
            {horasDisponibles.map((item) => (
              <TouchableOpacity
                key={item.label}
                style={[
                  styles.horaItem,
                  horaSeleccionada.label === item.label && styles.horaItemActiva,
                ]}
                onPress={() => seleccionarHora(item)}
              >
                <Text style={styles.horaEmoji}>{item.emoji}</Text>
                <Text
                  style={[
                    styles.horaTexto,
                    horaSeleccionada.label === item.label && styles.horaTextoActivo,
                  ]}
                >
                  {item.label}
                </Text>
                {horaSeleccionada.label === item.label && (
                  <Text style={styles.horaCheck}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      <View style={styles.infoBox}>
        <Text style={styles.infoTexto}>
          💡 Te enviaremos un recordatorio amigable solo si aún no has practicado ese día.
        </Text>
      </View>

      <View style={{ height: 40 }} />
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
    paddingTop: 56,
    paddingBottom: 28,
    paddingHorizontal: 20,
  },
  backBtn: {
    marginBottom: 16,
  },
  backTexto: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 14,
    fontWeight: '600',
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
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: -16,
    borderRadius: 16,
    padding: 16,
    borderWidth: 0.5,
    borderColor: '#E2E8F0',
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  toggleIcono: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#EFF4FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleEmoji: {
    fontSize: 24,
  },
  toggleInfo: {
    flex: 1,
  },
  toggleTitulo: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },
  toggleDesc: {
    fontSize: 12,
    color: '#94A3B8',
  },
  seccionTitulo: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
  },
  horasCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: '#E2E8F0',
  },
  horaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  horaItemActiva: {
    backgroundColor: '#EFF4FF',
  },
  horaEmoji: {
    fontSize: 18,
  },
  horaTexto: {
    flex: 1,
    fontSize: 14,
    color: '#0F172A',
    fontWeight: '500',
  },
  horaTextoActivo: {
    color: '#3B6FE8',
    fontWeight: '700',
  },
  horaCheck: {
    color: '#3B6FE8',
    fontSize: 16,
    fontWeight: '700',
  },
  infoBox: {
    backgroundColor: '#EFF4FF',
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 12,
    padding: 14,
  },
  infoTexto: {
    fontSize: 12,
    color: '#3B6FE8',
    lineHeight: 18,
  },
});