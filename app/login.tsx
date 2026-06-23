import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { supabase } from './lib/supabase';
import { useTema } from './theme/ThemeContext';
import type { Tema } from './theme/colors';

export default function LoginScreen() {
  const router = useRouter();
  const { colores } = useTema();
  const styles = crearEstilos(colores);

  const [modo, setModo] = useState<'login' | 'registro'>('login');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cargando, setCargando] = useState(false);
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const handleSubmit = async () => {
    if (modo === 'registro') {
      if (!nombre || !email || !password) {
        Alert.alert('Error', 'Por favor completa todos los campos');
        return;
      }
      if (password.length < 6) {
        Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
        return;
      }
      setCargando(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { nombre } },
      });
      setCargando(false);
      if (error) {
        Alert.alert('Error al crear la cuenta', error.message);
        return;
      }
      Alert.alert('¡Bienvenido!', `Cuenta creada para ${nombre}`, [
        { text: 'Continuar', onPress: () => router.push('/nivel') },
      ]);
    } else {
      if (!email || !password) {
        Alert.alert('Error', 'Por favor completa todos los campos');
        return;
      }
      setCargando(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setCargando(false);
      if (error) {
        Alert.alert('Error al iniciar sesión', error.message);
        return;
      }
      router.push('/nivel');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

        <View style={styles.logoWrap}>
          <View style={styles.logoBox}>
            <Text style={styles.logoEmoji}>🌎</Text>
          </View>
          <Text style={styles.titulo}>EnglishMe</Text>
          <Text style={styles.subtitulo}>Aprende inglés con tu tutor personal</Text>
        </View>

        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, modo === 'login' && styles.tabActivo]}
            onPress={() => setModo('login')}
          >
            <Text style={[styles.tabTexto, modo === 'login' && styles.tabTextoActivo]}>
              Iniciar sesión
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, modo === 'registro' && styles.tabActivo]}
            onPress={() => setModo('registro')}
          >
            <Text style={[styles.tabTexto, modo === 'registro' && styles.tabTextoActivo]}>
              Registrarse
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formulario}>
          {modo === 'registro' && (
            <View style={styles.campo}>
              <Text style={styles.campoLabel}>Nombre</Text>
              <TextInput
                style={styles.input}
                placeholder="Tu nombre completo"
                placeholderTextColor={colores.textoTerciario}
                value={nombre}
                onChangeText={setNombre}
              />
            </View>
          )}

          <View style={styles.campo}>
            <Text style={styles.campoLabel}>Correo electrónico</Text>
            <TextInput
              style={styles.input}
              placeholder="tu@correo.com"
              placeholderTextColor={colores.textoTerciario}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.campoLabel}>Contraseña</Text>
            <View style={styles.inputConIcono}>
              <TextInput
                style={styles.inputConIconoTexto}
                placeholder="Tu contraseña"
                placeholderTextColor={colores.textoTerciario}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!mostrarPassword}
              />
              <TouchableOpacity
                onPress={() => setMostrarPassword(!mostrarPassword)}
                style={styles.iconoOjo}
                activeOpacity={0.7}
              >
                <Text style={styles.iconoOjoTexto}>{mostrarPassword ? '🙈' : '👁️'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {modo === 'login' && (
            <TouchableOpacity style={styles.olvidaste}>
              <Text style={styles.olvidasteTexto}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.btnPrincipal, cargando && { opacity: 0.7 }]}
            onPress={handleSubmit}
            disabled={cargando}
          >
            {cargando ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.btnPrincipalTexto}>
                {modo === 'login' ? 'Entrar' : 'Crear cuenta'}
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.separador}>
          <View style={styles.linea} />
          <Text style={styles.separadorTexto}>o continúa con</Text>
          <View style={styles.linea} />
        </View>

        <TouchableOpacity style={styles.btnGoogle} onPress={() => router.push('/nivel')}>
          <Text style={styles.btnGoogleTexto}>🔵  Continuar con Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnInvitado} onPress={() => router.push('/nivel')}>
          <Text style={styles.btnInvitadoTexto}>Continuar sin cuenta</Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function crearEstilos(colores: Tema) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colores.fondo,
    },
    scroll: {
      flexGrow: 1,
      paddingHorizontal: 24,
      paddingTop: 70,
      paddingBottom: 40,
    },
    logoWrap: {
      alignItems: 'center',
      marginBottom: 36,
    },
    logoBox: {
      width: 72,
      height: 72,
      borderRadius: 20,
      backgroundColor: colores.primario,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 14,
    },
    logoEmoji: {
      fontSize: 36,
    },
    titulo: {
      fontSize: 28,
      fontWeight: '700',
      color: colores.textoPrimario,
      marginBottom: 6,
    },
    subtitulo: {
      fontSize: 14,
      color: colores.textoTerciario,
      textAlign: 'center',
    },
    tabs: {
      flexDirection: 'row',
      backgroundColor: colores.fondoSecundario,
      borderRadius: 12,
      padding: 4,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: colores.borde,
    },
    tab: {
      flex: 1,
      paddingVertical: 10,
      alignItems: 'center',
      borderRadius: 9,
    },
    tabActivo: {
      backgroundColor: colores.primario,
    },
    tabTexto: {
      color: colores.textoTerciario,
      fontSize: 14,
      fontWeight: '600',
    },
    tabTextoActivo: {
      color: '#FFFFFF',
    },
    formulario: {
      marginBottom: 8,
    },
    campo: {
      marginBottom: 16,
    },
    campoLabel: {
      color: colores.textoSecundario,
      fontSize: 13,
      fontWeight: '500',
      marginBottom: 8,
    },
    input: {
      backgroundColor: colores.fondoInput,
      borderRadius: 12,
      padding: 15,
      color: colores.textoPrimario,
      fontSize: 15,
      borderWidth: 1,
      borderColor: colores.borde,
    },
    inputConIcono: {
      backgroundColor: colores.fondoInput,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colores.borde,
      flexDirection: 'row',
      alignItems: 'center',
    },
    inputConIconoTexto: {
      flex: 1,
      padding: 15,
      color: colores.textoPrimario,
      fontSize: 15,
    },
    iconoOjo: {
      paddingHorizontal: 14,
      paddingVertical: 10,
    },
    iconoOjoTexto: {
      fontSize: 18,
    },
    olvidaste: {
      alignSelf: 'flex-end',
      marginBottom: 16,
      marginTop: -8,
    },
    olvidasteTexto: {
      color: colores.primario,
      fontSize: 13,
    },
    btnPrincipal: {
      backgroundColor: colores.primario,
      borderRadius: 14,
      paddingVertical: 16,
      alignItems: 'center',
      marginTop: 4,
    },
    btnPrincipalTexto: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '700',
    },
    separador: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 24,
      gap: 10,
    },
    linea: {
      flex: 1,
      height: 1,
      backgroundColor: colores.borde,
    },
    separadorTexto: {
      color: colores.textoTerciario,
      fontSize: 13,
    },
    btnGoogle: {
      backgroundColor: colores.fondoSecundario,
      borderRadius: 14,
      paddingVertical: 15,
      alignItems: 'center',
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colores.borde,
    },
    btnGoogleTexto: {
      color: colores.textoPrimario,
      fontSize: 15,
    },
    btnInvitado: {
      alignItems: 'center',
      paddingVertical: 12,
    },
    btnInvitadoTexto: {
      color: colores.textoTerciario,
      fontSize: 14,
      textDecorationLine: 'underline',
    },
  });
}