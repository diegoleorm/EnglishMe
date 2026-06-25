// app/lib/elevenlabs.ts
// Genera audio con ElevenLabs y retorna un base64 para reproducir con expo-av

const ELEVENLABS_API_KEY = process.env.EXPO_PUBLIC_ELEVENLABS_API_KEY ?? '';

// IDs de voz para cada avatar
export const VOCES_AVATAR: Record<string, string> = {
  Michelle: 'hod33eJyEU4TLqiYFttr', // Belle B
  Esteban:  'C1npRmjB19a6yNkEucvx', // Arthur
  Luciana:  '7YaUDeaStRuoYg3FKsmU', // Callie
  Charley:  'Gubgw9l4dtIoQA9YZHgx', // Brian
};

export async function generarVozBase64(
  texto: string,
  nombreAvatar: string
): Promise<string | null> {
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
      console.error('ElevenLabs error:', response.status, await response.text());
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
    console.error('ElevenLabs fetch error:', e);
    return null;
  }
}