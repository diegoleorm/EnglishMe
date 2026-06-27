// app/lib/elevenlabs.ts
// Genera audio con ElevenLabs y retorna un base64 para reproducir con expo-av.
// Si ElevenLabs falla o no hay API key, usa expo-speech como fallback gratuito.

import * as Speech from 'expo-speech';

const ELEVENLABS_API_KEY = process.env.EXPO_PUBLIC_ELEVENLABS_API_KEY ?? '';

// IDs de voz para cada avatar (ElevenLabs)
export const VOCES_AVATAR: Record<string, string> = {
  Michelle: 'hod33eJyEU4TLqiYFttr', // Belle B
  Esteban:  'nzFihrBIvB34imQBuxub',  // Josh
  Luciana:  '7YaUDeaStRuoYg3FKsmU',  // Callie
  Charley:  'Gubgw9l4dtIoQA9YZHgx',  // Brian
};

// Configuración de voz nativa por tutor (expo-speech fallback)
// pitch: 1.0 = normal, >1.0 = más agudo, <1.0 = más grave
// rate: 1.0 = normal, <1.0 = más lento
const VOCES_NATIVAS: Record<string, { pitch: number; rate: number }> = {
  Michelle: { pitch: 1.4, rate: 0.9 },  // Aguda, femenina
  Esteban:  { pitch: 0.8, rate: 1.0 },  // Grave, masculina
  Luciana:  { pitch: 1.2, rate: 0.85 }, // Semi-aguda, pausada
  Charley:  { pitch: 0.7, rate: 0.95 }, // Muy grave, formal
};

// Detener cualquier voz en reproducción
export function detenerVoz() {
  Speech.stop();
}

// Hablar con expo-speech (gratuito, voz del sistema)
export function hablarNativo(texto: string, nombreAvatar: string) {
  const config = VOCES_NATIVAS[nombreAvatar] ?? VOCES_NATIVAS['Michelle'];
  Speech.stop();
  Speech.speak(texto, {
    language: 'en-US',
    pitch: config.pitch,
    rate: config.rate,
  });
}

// Intentar ElevenLabs, con fallback automático a expo-speech
export async function generarVozBase64(
  texto: string,
  nombreAvatar: string
): Promise<string | null> {
  // Si no hay API key válida, usar fallback directo
  if (!ELEVENLABS_API_KEY || ELEVENLABS_API_KEY.length < 10) {
    hablarNativo(texto, nombreAvatar);
    return null;
  }

  const voiceId = VOCES_AVATAR[nombreAvatar] ?? VOCES_AVATAR['Michelle'];

  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: 'POST',
        headers: {
          'xi-api-key': ELEVENLABS_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: texto,
          model_id: 'eleven_turbo_v2_5',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
          },
        }),
      }
    );

    if (!response.ok) {
      console.warn('ElevenLabs no disponible, usando voz del sistema.');
      hablarNativo(texto, nombreAvatar);
      return null;
    }

    const arrayBuffer = await response.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  } catch (e) {
    console.warn('ElevenLabs error, usando voz del sistema:', e);
    hablarNativo(texto, nombreAvatar);
    return null;
  }
}
