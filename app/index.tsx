import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTema } from './theme/ThemeContext';
import type { Tema } from './theme/colors';

export default function WelcomeScreen() {
  const router = useRouter();
  const { colores } = useTema();
  const styles = crearEstilos(colores);
  const rotacion = useRef(new Animated.Value(0)).current;
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    verificarOnboarding();

    Animated.loop(
      Animated.timing(rotacion, {
        toValue: 1,
        duration: 8000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const verificarOnboarding = async () => {
    try {
      const visto = await AsyncStorage.getItem('onboarding_visto');
      if (!visto) {
        router.replace('/onboarding');
        return;
      }
    } catch (e) {
      console.log('Error verificando onboarding:', e);
    }
    setCargando(false);
  };

  const spin = rotacion.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  if (cargando) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colores.primario} />
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.perfilBtn} onPress={() => router.push('/(tabs)/perfil')}>
        <Text style={styles.perfilEmoji}>👤</Text>
      </TouchableOpacity>

      <View style={styles.logoWrap}>
        <Animated.Text style={[styles.logoEmoji, { transform: [{ rotate: spin }] }]}>
          🌎
        </Animated.Text>
        <Text style={styles.titulo}>EnglishMe</Text>
        <Text style={styles.subtitulo}>Aprende inglés con tu tutor personal</Text>
      </View>

      <View style={styles.featuresCard}>
        <View style={styles.featureRow}>
          <View style={styles.featureIcono}><Text>🎯</Text></View>
          <Text style={styles.featureTexto}>Niveles desde cero hasta avanzado</Text>
        </View>
        <View style={styles.featureRow}>
          <View style={styles.featureIcono}><Text>🤖</Text></View>
          <Text style={styles.featureTexto}>Elige o crea tu tutor personal</Text>
        </View>
        <View style={styles.featureRow}>
          <View style={styles.featureIcono}><Text>📚</Text></View>
          <Text style={styles.featureTexto}>Gramática, vocabulario y conversación</Text>
        </View>
        <View style={styles.featureRow}>
          <View style={styles.featureIcono}><Text>⚡</Text></View>
          <Text style={styles.featureTexto}>Aprende a tu propio ritmo</Text>
        </View>
      </View>

      <View style={styles.botonesWrap}>
        <TouchableOpacity style={styles.btnPrincipal} onPress={() => router.push('/nivel')}>
          <Text style={styles.btnPrincipalTexto}>¡Comenzar ahora!</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnSecundario} onPress={() => router.push('/login')}>
          <Text style={styles.btnSecundarioTexto}>¿Ya tienes cuenta? Inicia sesión</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

function crearEstilos(colores: Tema) {
  return StyleSheet.create({
    loadingContainer: {
      flex: 1,
      backgroundColor: colores.fondo,
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
      flex: 1,
      backgroundColor: colores.fondo,
      paddingHorizontal: 24,
      paddingTop: 60,
      paddingBottom: 40,
      justifyContent: 'space-between',
    },
    perfilBtn: {
      position: 'absolute',
      top: 56,
      right: 24,
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: colores.fondoSecundario,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10,
      borderWidth: 1,
      borderColor: colores.borde,
    },
    perfilEmoji: {
      fontSize: 20,
    },
    logoWrap: {
      alignItems: 'center',
      paddingTop: 20,
    },
    logoEmoji: {
      fontSize: 100,
      marginBottom: 16,
    },
    titulo: {
      fontSize: 36,
      fontWeight: '700',
      color: colores.textoPrimario,
      marginBottom: 8,
    },
    subtitulo: {
      fontSize: 15,
      color: colores.textoTerciario,
      textAlign: 'center',
    },
    featuresCard: {
      backgroundColor: colores.fondoSecundario,
      borderRadius: 20,
      padding: 20,
      gap: 14,
      borderWidth: 1,
      borderColor: colores.borde,
    },
    featureRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 14,
    },
    featureIcono: {
      width: 36,
      height: 36,
      borderRadius: 10,
      backgroundColor: colores.fondoInput,
      alignItems: 'center',
      justifyContent: 'center',
    },
    featureTexto: {
      fontSize: 14,
      color: colores.textoSecundario,
      flex: 1,
    },
    botonesWrap: {
      gap: 12,
    },
    btnPrincipal: {
      backgroundColor: colores.primario,
      borderRadius: 16,
      paddingVertical: 18,
      alignItems: 'center',
    },
    btnPrincipalTexto: {
      color: '#FFFFFF',
      fontSize: 17,
      fontWeight: '700',
    },
    btnSecundario: {
      alignItems: 'center',
      paddingVertical: 10,
    },
    btnSecundarioTexto: {
      color: colores.textoTerciario,
      fontSize: 14,
      textDecorationLine: 'underline',
    },
  });
}