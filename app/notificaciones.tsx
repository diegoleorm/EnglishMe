import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import {
  cancelarRecordatorios,
  programarRecordatorioDiario,
  solicitarPermisos,
} from './utils/notifications';

export default function NotificacionesScreen() {
  const router = useRouter();
  const [activado, setActivado] = useState(false);
  const [hora, setHora] = useState(new Date(new Date().setHours(20, 0, 0, 0)));
  const [mostrarPicker, setMostrarPicker] = useState(false);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarConfiguracion();
  }, []);

  const cargarConfiguracion = async () => {
    try {
      const estado = await AsyncStorage.getItem('notificaciones_activadas');
      const horaGuardada = await AsyncStorage.getItem('notificaciones_hora_iso');

      if (estado === 'true') {
        setActivado(true);
      }
      if (horaGuardada) {
        setHora(new Date(horaGuardada));
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
      await programarRecordatorioDiario(hora.getHours(), hora.getMinutes());
      await AsyncStorage.setItem('notificaciones_activadas', 'true');
      setActivado(true);
    } else {
      await cancelarRecordatorios();
      await AsyncStorage.setItem('notificaciones_activadas', 'false');
      setActivado(false);
    }
  };

  const onCambiarHora = async (event: any, fechaSeleccionada?: Date) => {
    setMostrarPicker(Platform.OS === 'ios');

    if (event.type === 'dismissed' || !fechaSeleccionada) {
      return;
    }

    setHora(fechaSeleccionada);
    await AsyncStorage.setItem('notificaciones_hora_iso', fechaSeleccionada.toISOString());

    if (activado) {
      await programarRecordatorioDiario(fechaSeleccionada.getHours(), fechaSeleccionada.getMinutes());
    }
  };

  const horaFormateada = hora.toLocaleTimeString('es-CO', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

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
          <TouchableOpacity
            style={styles.horaCard}
            onPress={() => setMostrarPicker(true)}
            activeOpacity={0.8}
          >
            <Text style={styles.horaEmoji}>🕐</Text>
            <View style={styles.horaInfo}>
              <Text style={styles.horaLabel}>Hora del recordatorio</Text>
              <Text style={styles.horaValor}>{horaFormateada}</Text>
            </View>
            <Text style={styles.horaArrow}>›</Text>
          </TouchableOpacity>

          {mostrarPicker && (
            <DateTimePicker
              value={hora}
              mode="time"
              is24Hour={false}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onCambiarHora}
            />
          )}

          {Platform.OS === 'ios' && mostrarPicker && (
            <TouchableOpacity
              style={styles.btnConfirmarIOS}
              onPress={() => setMostrarPicker(false)}
            >
              <Text style={styles.btnConfirmarTexto}>Confirmar</Text>
            </TouchableOpacity>
          )}
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
  horaCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: '#E2E8F0',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  horaEmoji: {
    fontSize: 28,
  },
  horaInfo: {
    flex: 1,
  },
  horaLabel: {
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 2,
  },
  horaValor: {
    fontSize: 22,
    fontWeight: '700',
    color: '#3B6FE8',
  },
  horaArrow: {
    fontSize: 20,
    color: '#CBD5E1',
  },
  btnConfirmarIOS: {
    backgroundColor: '#3B6FE8',
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  btnConfirmarTexto: {
    color: '#FFFFFF',
    fontSize: 15,
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