// Contenido real de las lecciones, organizado por el id del tema
// (el mismo id que se usa en app/(tabs)/temas.tsx).
//
// Cómo agregar más temas: copia el bloque de un tema existente, cambia la
// clave (el número) por el id del nuevo tema, y escribe 5 preguntas siguiendo
// el mismo formato. "correcta" es el índice (empezando en 0) de la opción
// correcta dentro del array "opciones".

export interface PreguntaLeccion {
  id: number;
  ingles: string;
  espanol: string;
  opciones: string[];
  correcta: number;
}

export const leccionesPorTema: Record<number, PreguntaLeccion[]> = {
  // Tema 1: Saludos y despedidas
  1: [
    {
      id: 1,
      ingles: 'Hello! How are you?',
      espanol: '¡Hola! ¿Cómo estás?',
      opciones: ["Hello! I'm fine.", 'Goodbye!', 'My name is Diego.'],
      correcta: 0,
    },
    {
      id: 2,
      ingles: 'Good morning!',
      espanol: '¡Buenos días!',
      opciones: ['Good night!', 'Good morning!', 'See you soon!'],
      correcta: 1,
    },
    {
      id: 3,
      ingles: 'Nice to meet you!',
      espanol: '¡Mucho gusto!',
      opciones: ['See you later!', 'Nice to meet you too!', 'I am tired.'],
      correcta: 1,
    },
    {
      id: 4,
      ingles: 'Goodbye, see you tomorrow!',
      espanol: '¡Adiós, hasta mañana!',
      opciones: ['Goodbye, see you tomorrow!', 'Hello there!', 'Thank you very much.'],
      correcta: 0,
    },
    {
      id: 5,
      ingles: 'How was your day?',
      espanol: '¿Cómo estuvo tu día?',
      opciones: ['It was great, thank you!', 'My name is Diego.', 'Good morning!'],
      correcta: 0,
    },
  ],

  // Tema 2: Números y fechas
  2: [
    {
      id: 1,
      ingles: 'How many apples do you have?',
      espanol: '¿Cuántas manzanas tienes?',
      opciones: ['I have three apples.', 'I have blue apples.', 'I have an apple today.'],
      correcta: 0,
    },
    {
      id: 2,
      ingles: 'What day is it today?',
      espanol: '¿Qué día es hoy?',
      opciones: ['It is ten o\'clock.', 'Today is Monday.', 'It is January.'],
      correcta: 1,
    },
    {
      id: 3,
      ingles: 'What is the number after nine?',
      espanol: '¿Cuál es el número después del nueve?',
      opciones: ['Eight', 'Eleven', 'Ten'],
      correcta: 2,
    },
    {
      id: 4,
      ingles: 'When is your birthday?',
      espanol: '¿Cuándo es tu cumpleaños?',
      opciones: ['My birthday is in May.', 'I am five years old.', 'It is Tuesday.'],
      correcta: 0,
    },
    {
      id: 5,
      ingles: 'How old are you?',
      espanol: '¿Cuántos años tienes?',
      opciones: ['I am fine.', 'I am 25 years old.', 'I like music.'],
      correcta: 1,
    },
  ],

  // Tema 3: Colores y formas
  3: [
    {
      id: 1,
      ingles: 'What color is the sky?',
      espanol: '¿De qué color es el cielo?',
      opciones: ['The sky is blue.', 'The sky is square.', 'The sky is fast.'],
      correcta: 0,
    },
    {
      id: 2,
      ingles: 'A stop sign has this shape:',
      espanol: 'Una señal de alto tiene esta forma:',
      opciones: ['Circle', 'Octagon', 'Triangle'],
      correcta: 1,
    },
    {
      id: 3,
      ingles: 'What color do you get mixing blue and yellow?',
      espanol: '¿Qué color se obtiene al mezclar azul y amarillo?',
      opciones: ['Green', 'Purple', 'Orange'],
      correcta: 0,
    },
    {
      id: 4,
      ingles: 'A ball is usually shaped like a...',
      espanol: 'Una pelota usualmente tiene forma de...',
      opciones: ['Square', 'Sphere', 'Rectangle'],
      correcta: 1,
    },
    {
      id: 5,
      ingles: 'What color is grass?',
      espanol: '¿De qué color es el pasto?',
      opciones: ['Green', 'Red', 'Black'],
      correcta: 0,
    },
  ],

  // Tema 4: El alfabeto
  4: [
    {
      id: 1,
      ingles: 'Which letter comes after "B"?',
      espanol: '¿Qué letra viene después de "B"?',
      opciones: ['A', 'C', 'D'],
      correcta: 1,
    },
    {
      id: 2,
      ingles: 'How do you spell "cat"?',
      espanol: '¿Cómo se deletrea "cat"?',
      opciones: ['C-A-T', 'K-A-T', 'C-A-D'],
      correcta: 0,
    },
    {
      id: 3,
      ingles: 'Which letter is a vowel?',
      espanol: '¿Cuál letra es una vocal?',
      opciones: ['B', 'E', 'T'],
      correcta: 1,
    },
    {
      id: 4,
      ingles: 'What is the first letter of the alphabet?',
      espanol: '¿Cuál es la primera letra del alfabeto?',
      opciones: ['A', 'Z', 'M'],
      correcta: 0,
    },
    {
      id: 5,
      ingles: 'What is the last letter of the alphabet?',
      espanol: '¿Cuál es la última letra del alfabeto?',
      opciones: ['Y', 'X', 'Z'],
      correcta: 2,
    },
  ],

  // Tema 5: Verbos básicos
  5: [
    {
      id: 1,
      ingles: 'I ___ a student.',
      espanol: 'Yo ___ un estudiante.',
      opciones: ['am', 'have', 'go'],
      correcta: 0,
    },
    {
      id: 2,
      ingles: 'She ___ two brothers.',
      espanol: 'Ella ___ dos hermanos.',
      opciones: ['is', 'has', 'does'],
      correcta: 1,
    },
    {
      id: 3,
      ingles: 'They ___ to school every day.',
      espanol: 'Ellos ___ a la escuela todos los días.',
      opciones: ['go', 'has', 'am'],
      correcta: 0,
    },
    {
      id: 4,
      ingles: 'What do you ___ for breakfast?',
      espanol: '¿Qué ___ para el desayuno?',
      opciones: ['have', 'go', 'is'],
      correcta: 0,
    },
    {
      id: 5,
      ingles: 'He ___ his homework now.',
      espanol: 'Él ___ su tarea ahora.',
      opciones: ['does', 'go', 'have'],
      correcta: 0,
    },
  ],
};

// Preguntas genéricas que se usan si un tema todavía no tiene contenido
// propio en el objeto de arriba (para que la app nunca se rompa).
export const leccionesPorDefecto: PreguntaLeccion[] = [
  {
    id: 1,
    ingles: 'Hello! How are you?',
    espanol: '¡Hola! ¿Cómo estás?',
    opciones: ["Hello! I'm fine.", 'Goodbye!', 'My name is Diego.'],
    correcta: 0,
  },
  {
    id: 2,
    ingles: 'What is your name?',
    espanol: '¿Cuál es tu nombre?',
    opciones: ['I am from Colombia.', 'My name is Diego.', "I don't know."],
    correcta: 1,
  },
  {
    id: 3,
    ingles: 'Nice to meet you!',
    espanol: '¡Mucho gusto!',
    opciones: ['See you later!', 'Nice to meet you too!', 'I am tired.'],
    correcta: 1,
  },
  {
    id: 4,
    ingles: 'Where are you from?',
    espanol: '¿De dónde eres?',
    opciones: ['I am from Colombia.', 'I am 30 years old.', 'I like coffee.'],
    correcta: 0,
  },
  {
    id: 5,
    ingles: 'How old are you?',
    espanol: '¿Cuántos años tienes?',
    opciones: ['I am fine.', 'I am 25 years old.', 'I like music.'],
    correcta: 1,
  },
];

export function obtenerLeccionesDeTema(temaId: number): PreguntaLeccion[] {
  return leccionesPorTema[temaId] || leccionesPorDefecto;
}