import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function solicitarPermisos(): Promise<boolean> {
  const { status: estadoExistente } = await Notifications.getPermissionsAsync();
  let estadoFinal = estadoExistente;

  if (estadoExistente !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    estadoFinal = status;
  }

  if (estadoFinal !== 'granted') {
    return false;
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('recordatorios', {
      name: 'Recordatorios diarios',
      importance: Notifications.AndroidImportance.DEFAULT,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#3B6FE8',
    });
  }

  return true;
}

export async function programarRecordatorioDiario(hora: number, minuto: number) {
  await Notifications.cancelAllScheduledNotificationsAsync();

  await Notifications.scheduleNotificationAsync({
    content: {
      title: '🌎 ¡Hora de practicar inglés!',
      body: 'Tu tutor te está esperando. Solo toma 5 minutos al día.',
      sound: true,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: hora,
      minute: minuto,
    },
  });
}

export async function cancelarRecordatorios() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}