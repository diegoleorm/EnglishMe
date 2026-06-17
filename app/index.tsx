import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function WelcomeScreen() {
  const router = useRouter();
  const rotacion = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotacion, {
        toValue: 1,
        duration: 8000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = rotacion.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.perfilBtn} onPress={() => router.push('/perfil')}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
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
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    borderWidth: 1,
    borderColor: '#334155',
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
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
  },
  featuresCard: {
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 20,
    gap: 14,
    borderWidth: 0.5,
    borderColor: '#334155',
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
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureTexto: {
    fontSize: 14,
    color: '#CBD5E1',
    flex: 1,
  },
  botonesWrap: {
    gap: 12,
  },
  btnPrincipal: {
    backgroundColor: '#3B6FE8',
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
    color: '#64748B',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});