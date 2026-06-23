import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useProgreso } from './theme/ProgresoContext';
import { useTema } from './theme/ThemeContext';
import type { Tema } from './theme/colors';

const avatares = [
  {
    id: 1,
    nombre: 'Michelle',
    descripcion: 'Amigable y paciente',
    emoji: '👩',
    edad: '28 años',
    estilo: 'Casual',
    color: '#DB2777',
    bgColor: '#FCE7F3',
    tagColor: '#9D174D',
  },
  {
    id: 2,
    nombre: 'Esteban',
    descripcion: 'Moderno y dinámico',
    emoji: '👨',
    edad: '25 años',
    estilo: 'Casual',
    color: '#1D4ED8',
    bgColor: '#DBEAFE',
    tagColor: '#1E40AF',
  },
  {
    id: 3,
    nombre: 'Luciana',
    descripcion: 'Formal y experta',
    emoji: '👩‍🏫',
    edad: '33 años',
    estilo: 'Formal',
    color: '#7E22CE',
    bgColor: '#F3E8FF',
    tagColor: '#6B21A8',
  },
  {
    id: 4,
    nombre: 'Charley',
    descripcion: 'Tutor de negocios',
    emoji: '👨‍💼',
    edad: '40 años',
    estilo: 'Formal',
    color: '#C2410C',
    bgColor: '#FFEDD5',
    tagColor: '#9A3412',
  },
];

export default function AvatarScreen() {
  const router = useRouter();
  const { colores } = useTema();
  const { elegirAvatar } = useProgreso();
  const styles = crearEstilos(colores);

  const seleccionarAvatar = async (nombre: string, emoji: string) => {
    await elegirAvatar({ nombre, emoji });
    router.push({
      pathname: '/(tabs)/temas',
      params: { nombre, emoji },
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      <View style={styles.header}>
        <Text style={styles.title}>Elige tu tutor</Text>
        <Text style={styles.subtitle}>¿Con quién quieres aprender inglés?</Text>
      </View>

      <View style={styles.grid}>
        {avatares.map((avatar) => (
          <TouchableOpacity
            key={avatar.id}
            style={styles.card}
            activeOpacity={0.85}
            onPress={() => seleccionarAvatar(avatar.nombre, avatar.emoji)}
          >
            <View style={[styles.avatarCircle, { backgroundColor: avatar.bgColor }]}>
              <Text style={styles.avatarEmoji}>{avatar.emoji}</Text>
            </View>
            <Text style={[styles.nombre, { color: avatar.color }]}>{avatar.nombre}</Text>
            <Text style={styles.descripcion}>{avatar.descripcion}</Text>
            <View style={styles.tagsRow}>
              <View style={[styles.tag, { backgroundColor: avatar.bgColor }]}>
                <Text style={[styles.tagTexto, { color: avatar.tagColor }]}>{avatar.edad}</Text>
              </View>
              <View style={[styles.tag, { backgroundColor: avatar.bgColor }]}>
                <Text style={[styles.tagTexto, { color: avatar.tagColor }]}>{avatar.estilo}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.crearBtn}
        activeOpacity={0.85}
        onPress={() => seleccionarAvatar('Mi tutor', '🤖')}
      >
        <View style={styles.crearIcono}>
          <Text style={styles.crearEmoji}>✨</Text>
        </View>
        <View style={styles.crearTextos}>
          <Text style={styles.crearTitulo}>Crear mi propio avatar</Text>
          <Text style={styles.crearSub}>Elige rasgos, edad y género</Text>
        </View>
        <Text style={styles.crearArrow}>›</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

function crearEstilos(colores: Tema) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colores.fondo,
    },
    header: {
      backgroundColor: colores.primario,
      paddingTop: 60,
      paddingBottom: 28,
      paddingHorizontal: 20,
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
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: 12,
      gap: 10,
    },
    card: {
      backgroundColor: colores.fondoTarjeta,
      borderRadius: 18,
      padding: 16,
      width: '47.5%',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colores.borde,
    },
    avatarCircle: {
      width: 64,
      height: 64,
      borderRadius: 32,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
    },
    avatarEmoji: {
      fontSize: 32,
    },
    nombre: {
      fontSize: 15,
      fontWeight: '700',
      marginBottom: 4,
    },
    descripcion: {
      fontSize: 11,
      color: colores.textoTerciario,
      textAlign: 'center',
      marginBottom: 10,
    },
    tagsRow: {
      flexDirection: 'row',
      gap: 4,
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    tag: {
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 20,
    },
    tagTexto: {
      fontSize: 10,
      fontWeight: '600',
    },
    crearBtn: {
      backgroundColor: colores.fondoSecundario,
      borderRadius: 18,
      marginHorizontal: 12,
      marginBottom: 40,
      padding: 18,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 14,
      borderWidth: 1,
      borderColor: colores.borde,
    },
    crearIcono: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: colores.fondoInput,
      alignItems: 'center',
      justifyContent: 'center',
    },
    crearEmoji: {
      fontSize: 24,
    },
    crearTextos: {
      flex: 1,
    },
    crearTitulo: {
      fontSize: 15,
      fontWeight: '700',
      color: colores.textoPrimario,
      marginBottom: 3,
    },
    crearSub: {
      fontSize: 12,
      color: colores.textoTerciario,
    },
    crearArrow: {
      fontSize: 22,
      color: colores.textoTerciario,
    },
  });
}