import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const [modo, setModo] = useState<'login' | 'registro'>('login');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (modo === 'registro') {
      if (!nombre || !email || !password) {
        Alert.alert('Error', 'Por favor completa todos los campos');
        return;
      }
      Alert.alert('¡Bienvenido!', `Cuenta creada para ${nombre}`, [
        { text: 'Continuar', onPress: () => router.push('/nivel') }
      ]);
    } else {
      if (!email || !password) {
        Alert.alert('Error', 'Por favor completa todos los campos');
        return;
      }
      router.push('/nivel');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🌎</Text>
      <Text style={styles.titulo}>EnglishMe</Text>

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
            <Text style={styles.campoLabel}>👤 Nombre</Text>
            <TextInput
              style={styles.input}
              placeholder="Tu nombre"
              placeholderTextColor="#BDC3C7"
              value={nombre}
              onChangeText={setNombre}
            />
          </View>
        )}

        <View style={styles.campo}>
          <Text style={styles.campoLabel}>📧 Correo electrónico</Text>
          <TextInput
            style={styles.input}
            placeholder="tu@correo.com"
            placeholderTextColor="#BDC3C7"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.campo}>
          <Text style={styles.campoLabel}>🔒 Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Tu contraseña"
            placeholderTextColor="#BDC3C7"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
        </View>

        <TouchableOpacity style={styles.btnPrincipal} onPress={handleSubmit}>
          <Text style={styles.btnPrincipalTexto}>
            {modo === 'login' ? '🚀 Entrar' : '✨ Crear cuenta'}
          </Text>
        </TouchableOpacity>

        {modo === 'login' && (
          <TouchableOpacity style={styles.btnOlvide}>
            <Text style={styles.btnOlvideTexto}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
        )}

        <View style={styles.separador}>
          <View style={styles.linea} />
          <Text style={styles.separadorTexto}>o continúa con</Text>
          <View style={styles.linea} />
        </View>

        <TouchableOpacity style={styles.btnGoogle} onPress={() => router.push('/nivel')}>
          <Text style={styles.btnGoogleTexto}>🔵 Continuar con Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnInvitado} onPress={() => router.push('/nivel')}>
          <Text style={styles.btnInvitadoTexto}>Continuar sin cuenta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  logo: {
    fontSize: 60,
    marginBottom: 8,
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 32,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
    width: '100%',
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  tabActivo: {
    backgroundColor: '#4A90D9',
  },
  tabTexto: {
    color: '#7F8C8D',
    fontSize: 15,
    fontWeight: 'bold',
  },
  tabTextoActivo: {
    color: '#FFFFFF',
  },
  formulario: {
    width: '100%',
  },
  campo: {
    marginBottom: 16,
  },
  campoLabel: {
    color: '#BDC3C7',
    fontSize: 14,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 14,
    color: '#FFFFFF',
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#0f3460',
  },
  btnPrincipal: {
    backgroundColor: '#4A90D9',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  btnPrincipalTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  btnOlvide: {
    alignItems: 'center',
    marginBottom: 16,
  },
  btnOlvideTexto: {
    color: '#4A90D9',
    fontSize: 14,
  },
  separador: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  linea: {
    flex: 1,
    height: 1,
    backgroundColor: '#0f3460',
  },
  separadorTexto: {
    color: '#7F8C8D',
    fontSize: 13,
  },
  btnGoogle: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#0f3460',
  },
  btnGoogleTexto: {
    color: '#FFFFFF',
    fontSize: 15,
  },
  btnInvitado: {
    alignItems: 'center',
    padding: 12,
  },
  btnInvitadoTexto: {
    color: '#7F8C8D',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});