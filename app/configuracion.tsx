import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useTema } from './theme/ThemeContext';

export default function ConfiguracionScreen() {
  const router = useRouter();
  const { modoTema, colores, alternarTema } = useTema();
  const [sonidoActivado, setSonidoActivado] = useState(true);

  const confirmarReiniciar = () => {
    Alert.alert(
      'Restablecer progreso',
      '¿Estás seguro? Se perderán todas tus lecciones completadas y logros. Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Restablecer', style: 'destructive', onPress: () => {
          Alert.alert('Listo', 'Tu progreso ha sido restablecido.');
        }},
      ]
    );
  };

  const styles = crearEstilos(colores);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backTexto}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Configuración</Text>
        <Text style={styles.subtitle}>Personaliza tu experiencia</Text>
      </View>

      <Text style={styles.seccionTitulo}>Apariencia</Text>
      <View style={styles.card}>
        <View style={styles.itemRow}>
          <View style={styles.itemIcono}>
            <Text style={styles.itemEmoji}>{modoTema === 'oscuro' ? '🌙' : '☀️'}</Text>
          </View>
          <View style={styles.itemInfo}>
            <Text style={styles.itemTitulo}>Modo oscuro</Text>
            <Text style={styles.itemDesc}>
              {modoTema === 'oscuro' ? 'Activado' : 'Desactivado'}
            </Text>
          </View>
          <Switch
            value={modoTema === 'oscuro'}
            onValueChange={alternarTema}
            trackColor={{ false: colores.borde, true: colores.primario }}
            thumbColor="#FFFFFF"
          />
        </View>
      </View>

      <Text style={styles.seccionTitulo}>Sonido</Text>
      <View style={styles.card}>
        <View style={styles.itemRow}>
          <View style={styles.itemIcono}>
            <Text style={styles.itemEmoji}>🔊</Text>
          </View>
          <View style={styles.itemInfo}>
            <Text style={styles.itemTitulo}>Efectos de sonido</Text>
            <Text style={styles.itemDesc}>
              Sonidos al responder en las lecciones
            </Text>
          </View>
          <Switch
            value={sonidoActivado}
            onValueChange={setSonidoActivado}
            trackColor={{ false: colores.borde, true: colores.primario }}
            thumbColor="#FFFFFF"
          />
        </View>
      </View>

      <Text style={styles.seccionTitulo}>Idioma de la app</Text>
      <View style={styles.card}>
        <TouchableOpacity style={styles.itemRow}>
          <View style={styles.itemIcono}>
            <Text style={styles.itemEmoji}>🌐</Text>
          </View>
          <View style={styles.itemInfo}>
            <Text style={styles.itemTitulo}>Español</Text>
            <Text style={styles.itemDesc}>Idioma de menús e interfaz</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.seccionTitulo}>Información</Text>
      <View style={styles.card}>
        <View style={styles.itemRow}>
          <View style={styles.itemIcono}>
            <Text style={styles.itemEmoji}>📱</Text>
          </View>
          <View style={styles.itemInfo}>
            <Text style={styles.itemTitulo}>Versión de la app</Text>
            <Text style={styles.itemDesc}>1.0.0</Text>
          </View>
        </View>
      </View>

      <Text style={styles.seccionTitulo}>Zona de peligro</Text>
      <TouchableOpacity style={styles.btnPeligro} onPress={confirmarReiniciar}>
        <Text style={styles.btnPeligroTexto}>Restablecer progreso</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

function crearEstilos(colores: ReturnType<typeof useTema>['colores']) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colores.fondo,
    },
    header: {
      paddingTop: 56,
      paddingBottom: 28,
      paddingHorizontal: 20,
    },
    backBtn: {
      marginBottom: 16,
    },
    backTexto: {
      color: colores.primario,
      fontSize: 14,
      fontWeight: '600',
    },
    title: {
      fontSize: 24,
      fontWeight: '700',
      color: colores.textoPrimario,
      marginBottom: 6,
    },
    subtitle: {
      fontSize: 14,
      color: colores.textoSecundario,
    },
    seccionTitulo: {
      fontSize: 14,
      fontWeight: '700',
      color: colores.textoSecundario,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      paddingHorizontal: 16,
      marginTop: 20,
      marginBottom: 10,
    },
    card: {
      backgroundColor: colores.fondoTarjeta,
      marginHorizontal: 16,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colores.borde,
    },
    itemRow: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      gap: 14,
    },
    itemIcono: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: colores.fondoInput,
      alignItems: 'center',
      justifyContent: 'center',
    },
    itemEmoji: {
      fontSize: 20,
    },
    itemInfo: {
      flex: 1,
    },
    itemTitulo: {
      fontSize: 14,
      fontWeight: '600',
      color: colores.textoPrimario,
      marginBottom: 2,
    },
    itemDesc: {
      fontSize: 12,
      color: colores.textoTerciario,
    },
    arrow: {
      fontSize: 18,
      color: colores.textoTerciario,
    },
    btnPeligro: {
      backgroundColor: colores.errorFondo,
      marginHorizontal: 16,
      borderRadius: 16,
      paddingVertical: 16,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colores.error,
    },
    btnPeligroTexto: {
      color: colores.error,
      fontSize: 14,
      fontWeight: '700',
    },
  });
}