import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useProgreso } from '../theme/ProgresoContext';
import { useTema } from '../theme/ThemeContext';
import type { Tema } from '../theme/colors';

const temasPorNivel = [
  {
    nivel: 'Nivel 0',
    nivelIndex: 0,
    color: '#16A34A',
    bgColor: '#DCFCE7',
    temas: [
      { id: 1, titulo: 'Saludos y despedidas', descripcion: 'Hello, goodbye, nice to meet you...', emoji: '👋', lecciones: 5 },
      { id: 2, titulo: 'Números y fechas', descripcion: 'One, two, three, days, months...', emoji: '🔢', lecciones: 6 },
      { id: 3, titulo: 'Colores y formas', descripcion: 'Red, blue, circle, square...', emoji: '🎨', lecciones: 4 },
      { id: 4, titulo: 'El alfabeto', descripcion: 'A, B, C... pronunciación correcta', emoji: '🔤', lecciones: 3 },
      { id: 5, titulo: 'Verbos básicos', descripcion: 'Be, have, do, go, come...', emoji: '⚡', lecciones: 5 },
    ],
  },
  {
    nivel: 'Nivel A1',
    nivelIndex: 1,
    color: '#2563EB',
    bgColor: '#DBEAFE',
    temas: [
      { id: 6, titulo: 'La familia', descripcion: 'Mother, father, brother, sister...', emoji: '👨‍👩‍👧‍👦', lecciones: 5 },
      { id: 7, titulo: 'Comida y bebidas', descripcion: "I like, I don't like, breakfast...", emoji: '🍎', lecciones: 6 },
      { id: 8, titulo: 'La casa', descripcion: 'Kitchen, bedroom, living room...', emoji: '🏠', lecciones: 5 },
      { id: 9, titulo: 'Animales', descripcion: 'Dog, cat, bird, fish...', emoji: '🐶', lecciones: 4 },
      { id: 10, titulo: 'Verbos regulares', descripcion: 'Work→worked, play→played, talk→talked...', emoji: '📗', lecciones: 7 },
      { id: 11, titulo: 'El cuerpo humano', descripcion: 'Head, shoulders, knees and toes...', emoji: '🧍', lecciones: 4 },
    ],
  },
  {
    nivel: 'Nivel A2',
    nivelIndex: 2,
    color: '#9333EA',
    bgColor: '#F3E8FF',
    temas: [
      { id: 12, titulo: 'Presente simple', descripcion: 'I work, she works, do you...?', emoji: '📝', lecciones: 8 },
      { id: 13, titulo: 'Presente continuo', descripcion: 'I am working, she is running...', emoji: '🔄', lecciones: 7 },
      { id: 14, titulo: 'Verbos irregulares básicos', descripcion: 'Go→went, have→had, be→was...', emoji: '📘', lecciones: 9 },
      { id: 15, titulo: 'Verbos modales básicos', descripcion: "Can, can't, could, would...", emoji: '🎯', lecciones: 7 },
      { id: 16, titulo: 'El tiempo y clima', descripcion: 'Sunny, rainy, hot, cold...', emoji: '🌤️', lecciones: 5 },
      { id: 17, titulo: 'Transporte y ciudad', descripcion: 'Bus, train, where is the...?', emoji: '🚌', lecciones: 6 },
      { id: 18, titulo: 'Compras y precios', descripcion: "How much is this? I'd like...", emoji: '🛍️', lecciones: 5 },
    ],
  },
  {
    nivel: 'Nivel B1',
    nivelIndex: 3,
    color: '#D97706',
    bgColor: '#FEF3C7',
    temas: [
      { id: 19, titulo: 'Pasado simple', descripcion: 'I worked, she played, did you...?', emoji: '⏮️', lecciones: 8 },
      { id: 20, titulo: 'Pasado continuo', descripcion: 'I was working, they were...', emoji: '⏪', lecciones: 7 },
      { id: 21, titulo: 'Verbos irregulares avanzados', descripcion: 'Know→knew, write→wrote, see→saw...', emoji: '📙', lecciones: 10 },
      { id: 22, titulo: 'Presente perfecto', descripcion: 'I have been, she has done...', emoji: '✅', lecciones: 8 },
      { id: 23, titulo: 'Futuro con will', descripcion: "I will go, she won't be...", emoji: '🔮', lecciones: 6 },
      { id: 24, titulo: 'Futuro con going to', descripcion: "I'm going to study, she is going to...", emoji: '📅', lecciones: 6 },
      { id: 25, titulo: 'Verbos modales avanzados', descripcion: 'Must, should, might, ought to...', emoji: '🧠', lecciones: 8 },
      { id: 26, titulo: 'Viajes y turismo', descripcion: 'Airport, hotel, reservation...', emoji: '✈️', lecciones: 7 },
      { id: 27, titulo: 'Salud y cuerpo', descripcion: 'Doctor, symptoms, medicine...', emoji: '🏥', lecciones: 6 },
    ],
  },
  {
    nivel: 'Nivel B2',
    nivelIndex: 4,
    color: '#DC2626',
    bgColor: '#FEE2E2',
    temas: [
      { id: 28, titulo: 'Pasado perfecto', descripcion: 'I had done, she had gone...', emoji: '⏩', lecciones: 7 },
      { id: 29, titulo: 'Phrasal verbs', descripcion: 'Give up, look up, turn on...', emoji: '💡', lecciones: 10 },
      { id: 30, titulo: 'Condicionales 1 y 2', descripcion: 'If it rains, I will... If I had...', emoji: '🤔', lecciones: 8 },
      { id: 31, titulo: 'Condicional 3', descripcion: 'If I had studied, I would have...', emoji: '💭', lecciones: 7 },
      { id: 32, titulo: 'Reported speech', descripcion: 'He said that, she told me...', emoji: '🗨️', lecciones: 8 },
      { id: 33, titulo: 'Voz pasiva', descripcion: 'It was made, they were told...', emoji: '🔀', lecciones: 7 },
      { id: 34, titulo: 'Expresiones idiomáticas', descripcion: 'Break a leg, hit the road...', emoji: '🗣️', lecciones: 9 },
      { id: 35, titulo: 'Debates y opiniones', descripcion: 'I believe, in my opinion...', emoji: '💬', lecciones: 8 },
    ],
  },
  {
    nivel: 'Nivel C1',
    nivelIndex: 5,
    color: '#CA8A04',
    bgColor: '#FEF9C3',
    temas: [
      { id: 36, titulo: 'Inglés de negocios', descripcion: 'Meetings, emails, presentations...', emoji: '💼', lecciones: 10 },
      { id: 37, titulo: 'Negociación', descripcion: 'Proposals, agreements, deals...', emoji: '🤝', lecciones: 9 },
      { id: 38, titulo: 'Escritura formal', descripcion: 'Reports, essays, cover letters...', emoji: '✍️', lecciones: 8 },
      { id: 39, titulo: 'Pronunciación avanzada', descripcion: 'Stress, intonation, accents...', emoji: '🎤', lecciones: 10 },
      { id: 40, titulo: 'Comprensión auditiva', descripcion: 'Podcasts, news, movies...', emoji: '🎧', lecciones: 10 },
      { id: 41, titulo: 'Verbos modales perfectos', descripcion: 'Should have, could have, must have...', emoji: '🏅', lecciones: 8 },
      { id: 42, titulo: 'Subjuntivo e hipótesis', descripcion: 'Were I to, had she known...', emoji: '🌀', lecciones: 9 },
    ],
  },
];

export default function TemasScreen() {
  const router = useRouter();
  const { nombre, emoji } = useLocalSearchParams();
  const { colores } = useTema();
  const { nivelId, estaTemaCompletado } = useProgreso();
  const styles = crearEstilos(colores);

  const tutorNombre = nombre as string || 'Tu tutor';
  const tutorEmoji = emoji as string || '🎓';

  // El nivel actual del usuario (por defecto 0 si no ha elegido)
  const nivelUsuario = nivelId ?? 0;

  // El nivel que se está viendo ahora (puede navegar entre niveles)
  const [nivelViendo, setNivelViendo] = useState(nivelUsuario);

  const grupoActual = temasPorNivel[nivelViendo];
  const completadosEnGrupo = grupoActual.temas.filter(t => estaTemaCompletado(t.id)).length;
  const nivelCompletado = completadosEnGrupo === grupoActual.temas.length;

  // Un nivel está desbloqueado si el usuario ya llegó a ese nivel o si completó el anterior
  const estaDesbloqueado = (idx: number): boolean => {
    if (idx === 0) return true;
    if (idx <= nivelUsuario) return true;
    // También se desbloquea si todos los temas del nivel anterior están completados
    const grupoAnterior = temasPorNivel[idx - 1];
    const completadosAnterior = grupoAnterior.temas.filter(t => estaTemaCompletado(t.id)).length;
    return completadosAnterior === grupoAnterior.temas.length;
  };

  const puedeIrAnterior = nivelViendo > 0;
  const puedeIrSiguiente = nivelViendo < temasPorNivel.length - 1;
  const siguienteDesbloqueado = puedeIrSiguiente && estaDesbloqueado(nivelViendo + 1);

  return (
    <View style={styles.wrapper}>
      {/* Cabecera fija con tutor y navegación de nivel */}
      <View style={styles.header}>
        <View style={styles.tutorChip}>
          <Text style={styles.tutorEmoji}>{tutorEmoji}</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.tutorNombre}>{tutorNombre}</Text>
            <Text style={styles.tutorSub}>Tu tutor personal</Text>
          </View>
        </View>

        {/* Navegación de nivel */}
        <View style={styles.navNivel}>
          <TouchableOpacity
            style={[styles.navBtn, !puedeIrAnterior && styles.navBtnDisabled]}
            onPress={() => puedeIrAnterior && setNivelViendo(nivelViendo - 1)}
            disabled={!puedeIrAnterior}
          >
            <Text style={[styles.navBtnTexto, !puedeIrAnterior && styles.navBtnTextoDisabled]}>‹</Text>
          </TouchableOpacity>

          <View style={[styles.nivelPill, { backgroundColor: grupoActual.bgColor }]}>
            <Text style={[styles.nivelPillTexto, { color: grupoActual.color }]}>
              {grupoActual.nivel}
            </Text>
            <Text style={[styles.nivelPillCount, { color: grupoActual.color }]}>
              {completadosEnGrupo}/{grupoActual.temas.length} completados
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.navBtn, !puedeIrSiguiente && styles.navBtnDisabled]}
            onPress={() => {
              if (!puedeIrSiguiente) return;
              if (siguienteDesbloqueado) {
                setNivelViendo(nivelViendo + 1);
              }
              // Si está bloqueado no hace nada (el botón se ve deshabilitado)
            }}
            disabled={!puedeIrSiguiente}
          >
            <Text style={[styles.navBtnTexto, !puedeIrSiguiente && styles.navBtnTextoDisabled]}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Mensaje si el siguiente nivel está bloqueado */}
        {puedeIrSiguiente && !siguienteDesbloqueado && (
          <View style={styles.bloqueadoAviso}>
            <Text style={styles.bloqueadoAvisoTexto}>
              🔒 Completa todos los temas de este nivel para desbloquear el siguiente
            </Text>
          </View>
        )}

        {/* Mensaje de nivel completado */}
        {nivelCompletado && puedeIrSiguiente && siguienteDesbloqueado && (
          <View style={styles.completadoAviso}>
            <Text style={styles.completadoAvisoTexto}>
              🎉 ¡Nivel completado! Ya puedes avanzar al siguiente
            </Text>
          </View>
        )}
      </View>

      {/* Lista de temas del nivel actual */}
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>¿Qué quieres aprender?</Text>
        <Text style={styles.subtitle}>Elige un tema para comenzar</Text>

        {grupoActual.temas.map((tema) => {
          const completado = estaTemaCompletado(tema.id);
          return (
            <TouchableOpacity
              key={tema.id}
              style={styles.card}
              activeOpacity={0.85}
              onPress={() =>
                router.push({
                  pathname: '/leccion',
                  params: {
                    nombre: tutorNombre,
                    emoji: tutorEmoji,
                    temaId: tema.id.toString(),
                    temaTitulo: tema.titulo,
                  },
                })
              }
            >
              <View style={[styles.temaIcono, { backgroundColor: grupoActual.bgColor }]}>
                <Text style={styles.temaEmoji}>{tema.emoji}</Text>
              </View>
              <View style={styles.temaInfo}>
                <Text style={styles.temaTitulo}>{tema.titulo}</Text>
                <Text style={styles.temaDesc}>{tema.descripcion}</Text>
                <View style={styles.temaTags}>
                  <View style={[styles.tag, { backgroundColor: grupoActual.bgColor }]}>
                    <Text style={[styles.tagTexto, { color: grupoActual.color }]}>
                      {tema.lecciones} lecciones
                    </Text>
                  </View>
                  {completado && (
                    <View style={styles.tagCompletado}>
                      <Text style={styles.tagCompletadoTexto}>✅ Completado</Text>
                    </View>
                  )}
                </View>
              </View>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          );
        })}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

// Necesitamos useState, importarlo arriba
import { useState } from 'react';

function crearEstilos(colores: Tema) {
  return StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: colores.fondo,
    },
    header: {
      backgroundColor: colores.fondoSecundario,
      paddingTop: 56,
      paddingBottom: 12,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: colores.borde,
    },
    tutorChip: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colores.fondoTarjeta,
      borderRadius: 14,
      padding: 12,
      gap: 12,
      borderWidth: 1,
      borderColor: colores.borde,
      marginBottom: 12,
    },
    tutorEmoji: {
      fontSize: 36,
    },
    tutorNombre: {
      fontSize: 16,
      fontWeight: '700',
      color: colores.textoPrimario,
    },
    tutorSub: {
      fontSize: 12,
      color: colores.textoTerciario,
    },
    navNivel: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    navBtn: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: colores.fondoTarjeta,
      borderWidth: 1,
      borderColor: colores.borde,
      alignItems: 'center',
      justifyContent: 'center',
    },
    navBtnDisabled: {
      opacity: 0.3,
    },
    navBtnTexto: {
      fontSize: 22,
      color: colores.textoPrimario,
      lineHeight: 26,
    },
    navBtnTextoDisabled: {
      color: colores.textoTerciario,
    },
    nivelPill: {
      flex: 1,
      borderRadius: 12,
      paddingHorizontal: 14,
      paddingVertical: 8,
      alignItems: 'center',
    },
    nivelPillTexto: {
      fontSize: 15,
      fontWeight: '700',
    },
    nivelPillCount: {
      fontSize: 11,
      fontWeight: '500',
      marginTop: 1,
    },
    bloqueadoAviso: {
      marginTop: 10,
      backgroundColor: '#FEF3C7',
      borderRadius: 10,
      padding: 10,
    },
    bloqueadoAvisoTexto: {
      fontSize: 12,
      color: '#92400E',
      textAlign: 'center',
    },
    completadoAviso: {
      marginTop: 10,
      backgroundColor: '#DCFCE7',
      borderRadius: 10,
      padding: 10,
    },
    completadoAvisoTexto: {
      fontSize: 12,
      color: '#166534',
      textAlign: 'center',
    },
    scroll: {
      flex: 1,
    },
    title: {
      fontSize: 22,
      fontWeight: '700',
      color: colores.textoPrimario,
      paddingHorizontal: 16,
      paddingTop: 20,
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 13,
      color: colores.textoTerciario,
      paddingHorizontal: 16,
      marginBottom: 16,
    },
    card: {
      backgroundColor: colores.fondoTarjeta,
      borderRadius: 14,
      marginHorizontal: 16,
      marginBottom: 8,
      padding: 14,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      borderWidth: 1,
      borderColor: colores.borde,
    },
    temaIcono: {
      width: 44,
      height: 44,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },
    temaEmoji: {
      fontSize: 22,
    },
    temaInfo: {
      flex: 1,
    },
    temaTitulo: {
      fontSize: 14,
      fontWeight: '600',
      color: colores.textoPrimario,
      marginBottom: 2,
    },
    temaDesc: {
      fontSize: 11,
      color: colores.textoTerciario,
      marginBottom: 6,
    },
    temaTags: {
      flexDirection: 'row',
      gap: 6,
      flexWrap: 'wrap',
    },
    tag: {
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 8,
    },
    tagTexto: {
      fontSize: 11,
      fontWeight: '600',
    },
    tagCompletado: {
      backgroundColor: colores.exitoFondo,
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 8,
    },
    tagCompletadoTexto: {
      fontSize: 11,
      fontWeight: '600',
      color: colores.exito,
    },
    arrow: {
      fontSize: 20,
      color: colores.textoTerciario,
    },
  });
}
