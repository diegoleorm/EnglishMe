import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTema } from './theme/ThemeContext';
import type { Tema } from './theme/colors';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: 1,
    emoji: '🤖',
    titulo: 'Elige tu tutor personal',
    descripcion: 'Aprende inglés con Michelle, Esteban, Luciana o Charley. Cada uno con su propio estilo de enseñanza.',
    color: '#3B6FE8',
  },
  {
    id: 2,
    emoji: '📚',
    titulo: 'Lecciones interactivas',
    descripcion: 'Practica gramática, vocabulario y conversación con ejercicios diseñados para que aprendas a tu ritmo.',
    color: '#16A34A',
  },
  {
    id: 3,
    emoji: '🏆',
    titulo: 'Sigue tu progreso',
    descripcion: 'Gana logros, mantén tu racha diaria y observa cómo mejora tu nivel de inglés semana a semana.',
    color: '#CA8A04',
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const { colores } = useTema();
  const styles = crearEstilos(colores);
  const [paginaActual, setPaginaActual] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const finalizarOnboarding = async () => {
    try {
      await AsyncStorage.setItem('onboarding_visto', 'true');
    } catch (e) {
      console.log('Error guardando onboarding:', e);
    }
    router.replace('/');
  };

  const siguientePagina = () => {
    if (paginaActual < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: paginaActual + 1 });
    } else {
      finalizarOnboarding();
    }
  };

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const indice = Math.round(e.nativeEvent.contentOffset.x / width);
    setPaginaActual(indice);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width }]}>
            <View style={[styles.iconoWrap, { backgroundColor: item.color + '22' }]}>
              <Text style={styles.icono}>{item.emoji}</Text>
            </View>
            <Text style={styles.titulo}>{item.titulo}</Text>
            <Text style={styles.descripcion}>{item.descripcion}</Text>
          </View>
        )}
      />

      <View style={styles.puntosWrap}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.punto,
              index === paginaActual && styles.puntoActivo,
            ]}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.btnSiguiente} onPress={siguientePagina}>
        <Text style={styles.btnTexto}>
          {paginaActual === slides.length - 1 ? '¡Comenzar!' : 'Siguiente →'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function crearEstilos(colores: Tema) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colores.fondo,
    },
    slide: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 32,
    },
    iconoWrap: {
      width: 160,
      height: 160,
      borderRadius: 80,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 40,
    },
    icono: {
      fontSize: 80,
    },
    titulo: {
      fontSize: 26,
      fontWeight: '700',
      color: colores.textoPrimario,
      textAlign: 'center',
      marginBottom: 16,
    },
    descripcion: {
      fontSize: 15,
      color: colores.textoSecundario,
      textAlign: 'center',
      lineHeight: 22,
    },
    puntosWrap: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 8,
      marginBottom: 32,
    },
    punto: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colores.fondoSecundario,
    },
    puntoActivo: {
      width: 24,
      backgroundColor: colores.primario,
    },
    btnSiguiente: {
      backgroundColor: colores.primario,
      borderRadius: 16,
      paddingVertical: 18,
      marginHorizontal: 24,
      marginBottom: 40,
      alignItems: 'center',
    },
    btnTexto: {
      color: '#FFFFFF',
      fontSize: 17,
      fontWeight: '700',
    },
  });
}