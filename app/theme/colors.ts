// GoMilo — Identidad visual única (sin modo claro/oscuro), estilo pirata
// vivo inspirado en juegos como Royal Kingdom: azul rey, borgoña y oro
// brillante, con pares de degradado para dar profundidad en botones/tarjetas.
export const temaPirata = {
  // Fondos
  fondo: '#153E90',            // azul rey (fondo general de pantallas)
  fondoSecundario: '#0D2B6B',  // azul rey más profundo (headers, secciones)
  fondoTarjeta: '#9B2242',     // borgoña (tarjetas, burbujas, botones secundarios)
  fondoInput: '#6B1830',       // borgoña oscuro (campos de texto)

  // Textos
  textoPrimario: '#FFFFFF',    // blanco (texto principal, máximo contraste)
  textoSecundario: '#FFD700',  // oro brillante (texto secundario/acento)
  textoTerciario: '#F4C430',   // oro cálido (texto terciario/detalles)

  // Bordes — el oro grueso es la firma visual de la app
  borde: '#FFD700',            // oro brillante
  bordeSutil: '#B8860B',       // bronce (bordes discretos)

  // Color principal — azul rey vivo (botones, barras de progreso)
  primario: '#2563EB',
  primarioClaro: '#60A5FA',

  // Feedback
  exito: '#16A34A',
  exitoFondo: '#052E16',
  error: '#DC2626',
  errorFondo: '#450A0A',
  advertencia: '#F59E0B',

  // Pares de degradado (para expo-linear-gradient) — mismo tono, más claro
  // arriba y más oscuro abajo, simulando luz/volumen en vez de color plano.
  gradientePrimario: ['#3B82F6', '#1230AE'] as [string, string],
  gradienteTarjeta: ['#C0335A', '#7A1530'] as [string, string],
  gradienteExito: ['#22C55E', '#0F5132'] as [string, string],
  gradienteDorado: ['#FFE066', '#D4A017'] as [string, string],
};

export type Tema = typeof temaPirata;

// Se conservan estos nombres por compatibilidad con código existente que
// aún pueda importarlos directamente — ambos apuntan a la misma paleta
// pirata, ya que GoMilo no tiene modo claro/oscuro.
export const temaOscuro = temaPirata;
export const temaClaro = temaPirata;
