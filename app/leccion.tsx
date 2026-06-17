import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';

const SIMLI_API_KEY = process.env.EXPO_PUBLIC_SIMLI_API_KEY;

const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { margin: 0; background: #1a1a2e; display: flex; justify-content: center; align-items: center; height: 100vh; }
    #avatar-container { width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; }
    video { width: 100%; height: 100%; object-fit: cover; border-radius: 20px; }
    #status { color: white; font-size: 18px; font-family: Arial; text-align: center; }
  </style>
</head>
<body>
  <div id="avatar-container">
    <p id="status">🎓 Tutor cargando...</p>
  </div>
  <script>
    async function startAvatar() {
      try {
        const response = await fetch('https://api.simli.ai/startAudioToVideoSession', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'X-API-KEY': '${SIMLI_API_KEY}'
          },
          body: JSON.stringify({
            faceId: 'tmp9i8bbq7c',
            isJPG: false,
            syncAudio: true
          })
        });
        const data = await response.json();
        document.getElementById('status').textContent = '✅ Tutor listo';
        console.log('Simli response:', JSON.stringify(data));
      } catch(e) {
        document.getElementById('status').textContent = '⚠️ Conectando tutor...';
      }
    }
    startAvatar();
  </script>
</body>
</html>
`;

export default function LeccionScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <WebView
          source={{ html: htmlContent }}
          style={styles.webview}
          javaScriptEnabled={true}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
        />
      </View>

      <View style={styles.dialogo}>
        <Text style={styles.tutorNombre}>Sara — Tu tutora</Text>
        <Text style={styles.mensaje}>
          "Hello! My name is Sara. Today we are going to learn basic greetings in English. Ready?"
        </Text>
        <Text style={styles.traduccion}>
          "¡Hola! Me llamo Sara. Hoy vamos a aprender saludos básicos en inglés. ¿Listos?"
        </Text>
      </View>

      <ScrollView horizontal style={styles.opciones} showsHorizontalScrollIndicator={false}>
        <TouchableOpacity style={styles.opcion}>
          <Text style={styles.opcionTexto}>Yes, I'm ready! ✅</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.opcion}>
          <Text style={styles.opcionTexto}>Repeat please 🔄</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.opcion}>
          <Text style={styles.opcionTexto}>Too fast 🐢</Text>
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity style={styles.siguiente} onPress={() => router.back()}>
        <Text style={styles.siguienteTexto}>← Volver</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  avatarContainer: {
    height: 300,
    margin: 16,
    borderRadius: 20,
    overflow: 'hidden',
  },
  webview: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  dialogo: {
    backgroundColor: '#16213e',
    margin: 16,
    borderRadius: 16,
    padding: 16,
  },
  tutorNombre: {
    fontSize: 14,
    color: '#4A90D9',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  mensaje: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 8,
    lineHeight: 24,
  },
  traduccion: {
    fontSize: 14,
    color: '#A0A0B0',
    fontStyle: 'italic',
  },
  opciones: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  opcion: {
    backgroundColor: '#0f3460',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  opcionTexto: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  siguiente: {
    margin: 16,
    padding: 16,
    backgroundColor: '#4A90D9',
    borderRadius: 12,
    alignItems: 'center',
  },
  siguienteTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});