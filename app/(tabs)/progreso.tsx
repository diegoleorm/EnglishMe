import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTema } from '../theme/ThemeContext';
import type { Tema } from '../theme/colors';

const progresoPorNivel = [
  { nivel: 'Nivel 0', porcentaje: 100, color: '#16A34A', temas: 5, completados: 5 },
  { nivel: 'Nivel A1', porcentaje: 45, color: '#2563EB', temas: 6, completados: 3 },
  { nivel: 'Nivel A2', porcentaje: 10, color: '#9333EA', temas: 7, completados: 1 },
  { nivel: 'Nivel B1', porcentaje: 0, color: '#D97706', temas: 9, completados: 0 },
  { nivel: 'Nivel B2', porcentaje: 0, color: '#DC2626', temas: 8, completados: 0 },
  { nivel: 'Nivel C1', porcentaje: 0, color: '#CA8A04', temas: 7, completados: 0 },
];

const actividadSemana = [
  { dia: 'L', activo: true },
  { dia: 'M', activo: true },
  { dia: 'M', activo: true },
  { dia: 'J', activo: false },
  { dia: 'V', activo: false },
  { dia: 'S', activo: false },
  { dia: 'D', activo: false },
];

export default function ProgresoScreen() {
  const { colores } = useTema();
  const styles = crearEstilos(colores);

  const totalTemas = progresoPorNivel.reduce((acc, n) => acc + n.temas, 0);
  const totalCompletados = progresoPorNivel.reduce((acc, n) => acc + n.completados, 0);
  const progresoGlobal = Math.round((totalCompletados / totalTemas) * 100);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      <View style={styles.header}>
        <Text style={styles.title}>Tu progreso</Text>
        <Text style={styles.subtitle}>Sigue así, vas muy bien</Text>
      </View>

      <View style={styles.globalCard}>
        <View style={styles.globalCirculo}>
          <Text style={styles.globalPorcentaje}>{progresoGlobal}%</Text>
        </View>
        <View style={styles.globalInfo}>
          <Text style={styles.globalTitulo}>Progreso total</Text>
          <Text style={styles.globalSub}>{totalCompletados} de {totalTemas} temas completados</Text>
        </View>
      </View>

      <Text style={styles.seccionTitulo}>Esta semana</Text>
      <View style={styles.semanaCard}>
        {actividadSemana.map((dia, i) => (
          <View key={i} style={styles.diaWrap}>
            <View style={[styles.diaCirculo, dia.activo && styles.diaCirculoActivo]}>
              {dia.activo && <Text style={styles.diaCheck}>✓</Text>}
            </View>
            <Text style={styles.diaLabel}>{dia.dia}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.seccionTitulo}>Progreso por nivel</Text>
      <View style={styles.nivelesCard}>
        {progresoPorNivel.map((item) => (
          <View key={item.nivel} style={styles.nivelItem}>
            <View style={styles.nivelHeader}>
              <Text style={styles.nivelNombre}>{item.nivel}</Text>
              <Text style={[styles.nivelPorcentaje, { color: item.color }]}>
                {item.porcentaje}%
              </Text>
            </View>
            <View style={styles.barraFondo}>
              <View
                style={[
                  styles.barra,
                  { width: `${item.porcentaje}%`, backgroundColor: item.color },
                ]}
              />
            </View>
            <Text style={styles.nivelDetalle}>
              {item.completados} de {item.temas} temas
            </Text>
          </View>
        ))}
      </View>

      <View style={{ height: 20 }} />
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
    globalCard: {
      backgroundColor: colores.fondoTarjeta,
      marginHorizontal: 16,
      marginTop: -16,
      borderRadius: 18,
      padding: 18,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
      borderWidth: 1,
      borderColor: colores.borde,
    },
    globalCirculo: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: colores.fondoInput,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 3,
      borderColor: colores.primario,
    },
    globalPorcentaje: {
      fontSize: 16,
      fontWeight: '700',
      color: colores.primario,
    },
    globalInfo: {
      flex: 1,
    },
    globalTitulo: {
      fontSize: 15,
      fontWeight: '700',
      color: colores.textoPrimario,
      marginBottom: 2,
    },
    globalSub: {
      fontSize: 12,
      color: colores.textoTerciario,
    },
    seccionTitulo: {
      fontSize: 17,
      fontWeight: '700',
      color: colores.textoPrimario,
      paddingHorizontal: 16,
      marginTop: 24,
      marginBottom: 12,
    },
    semanaCard: {
      backgroundColor: colores.fondoTarjeta,
      marginHorizontal: 16,
      borderRadius: 16,
      padding: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderWidth: 1,
      borderColor: colores.borde,
    },
    diaWrap: {
      alignItems: 'center',
      gap: 6,
    },
    diaCirculo: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: colores.fondoInput,
      alignItems: 'center',
      justifyContent: 'center',
    },
    diaCirculoActivo: {
      backgroundColor: '#16A34A',
    },
    diaCheck: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: '700',
    },
    diaLabel: {
      fontSize: 11,
      color: colores.textoTerciario,
      fontWeight: '600',
    },
    nivelesCard: {
      backgroundColor: colores.fondoTarjeta,
      marginHorizontal: 16,
      borderRadius: 16,
      padding: 18,
      gap: 18,
      borderWidth: 1,
      borderColor: colores.borde,
    },
    nivelItem: {
      gap: 6,
    },
    nivelHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    nivelNombre: {
      fontSize: 14,
      fontWeight: '600',
      color: colores.textoPrimario,
    },
    nivelPorcentaje: {
      fontSize: 14,
      fontWeight: '700',
    },
    barraFondo: {
      height: 8,
      backgroundColor: colores.fondoInput,
      borderRadius: 4,
    },
    barra: {
      height: 8,
      borderRadius: 4,
      minWidth: 4,
    },
    nivelDetalle: {
      fontSize: 11,
      color: colores.textoTerciario,
    },
  });
}