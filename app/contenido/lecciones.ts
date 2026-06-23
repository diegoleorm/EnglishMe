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
      ingles: 'What do you say when you leave?',
      espanol: '¿Qué dices cuando te vas?',
      opciones: ['Goodbye, see you tomorrow!', 'How are you?', 'Nice to meet you!'],
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
      opciones: ["It is ten o'clock.", 'Today is Monday.', 'It is January.'],
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

  // Tema 6: La familia
  6: [
    {
      id: 1,
      ingles: "What do you call your father's wife?",
      espanol: '¿Cómo le llamas a la esposa de tu padre?',
      opciones: ['My mother.', 'My sister.', 'My friend.'],
      correcta: 0,
    },
    {
      id: 2,
      ingles: "My father's brother is my...",
      espanol: 'El hermano de mi padre es mi...',
      opciones: ['cousin', 'uncle', 'grandfather'],
      correcta: 1,
    },
    {
      id: 3,
      ingles: 'How many siblings do you have?',
      espanol: '¿Cuántos hermanos tienes?',
      opciones: ['I have two siblings.', 'I am ten years old.', 'I live in Bogotá.'],
      correcta: 0,
    },
    {
      id: 4,
      ingles: "My parents' parents are my...",
      espanol: 'Los padres de mis padres son mis...',
      opciones: ['parents', 'grandparents', 'cousins'],
      correcta: 1,
    },
    {
      id: 5,
      ingles: "My sister's daughter is my...",
      espanol: 'La hija de mi hermana es mi...',
      opciones: ['niece', 'aunt', 'sister'],
      correcta: 0,
    },
  ],

  // Tema 7: Comida y bebidas
  7: [
    {
      id: 1,
      ingles: 'What is your favorite food?',
      espanol: '¿Cuál es tu comida favorita?',
      opciones: ['I like pizza.', 'I am pizza.', 'I have a chair.'],
      correcta: 0,
    },
    {
      id: 2,
      ingles: "I don't like vegetables.",
      espanol: 'No me gustan los vegetales.',
      opciones: ['I like vegetables a lot.', "I don't like vegetables.", 'I eat vegetables.'],
      correcta: 1,
    },
    {
      id: 3,
      ingles: 'What do you want to drink?',
      espanol: '¿Qué quieres tomar?',
      opciones: ['I want water, please.', 'I want a chair.', 'I am hungry.'],
      correcta: 0,
    },
    {
      id: 4,
      ingles: 'What did you have for breakfast?',
      espanol: '¿Qué desayunaste?',
      opciones: ['I had eggs and bread.', 'I go to school.', 'I am thirsty.'],
      correcta: 0,
    },
    {
      id: 5,
      ingles: 'How does the soup taste?',
      espanol: '¿Cómo sabe la sopa?',
      opciones: ['It is delicious!', 'It is fast!', 'It is tall!'],
      correcta: 0,
    },
  ],

  // Tema 8: La casa
  8: [
    {
      id: 1,
      ingles: 'Where do you cook your food?',
      espanol: '¿Dónde cocinas tu comida?',
      opciones: ['In the kitchen.', 'In the bedroom.', 'In the bathroom.'],
      correcta: 0,
    },
    {
      id: 2,
      ingles: 'Where do you sleep?',
      espanol: '¿Dónde duermes?',
      opciones: ['I sleep in the bedroom.', 'I sleep in the kitchen.', 'I sleep in the garage.'],
      correcta: 0,
    },
    {
      id: 3,
      ingles: 'We watch TV in the living room.',
      espanol: 'Vemos TV en la sala.',
      opciones: ['We watch TV in the bathroom.', 'We watch TV in the living room.', 'We eat in the bedroom.'],
      correcta: 1,
    },
    {
      id: 4,
      ingles: 'Is there a garden in your house?',
      espanol: '¿Hay un jardín en tu casa?',
      opciones: ['Yes, there is a garden.', 'Yes, I am hungry.', 'No, I sleep well.'],
      correcta: 0,
    },
    {
      id: 5,
      ingles: 'How many bedrooms does your house have?',
      espanol: '¿Cuántas habitaciones tiene tu casa?',
      opciones: ['My house has three bedrooms.', 'My house is blue.', 'My house is big.'],
      correcta: 0,
    },
  ],

  // Tema 9: Animales
  9: [
    {
      id: 1,
      ingles: 'What is the dog doing?',
      espanol: '¿Qué está haciendo el perro?',
      opciones: ['It is sleeping.', 'It is flying.', 'It is swimming.'],
      correcta: 0,
    },
    {
      id: 2,
      ingles: 'Which animal says "meow"?',
      espanol: '¿Qué animal dice "miau"?',
      opciones: ['Dog', 'Cat', 'Bird'],
      correcta: 1,
    },
    {
      id: 3,
      ingles: 'Which animal can fly?',
      espanol: '¿Qué animal puede volar?',
      opciones: ['Bird', 'Fish', 'Cow'],
      correcta: 0,
    },
    {
      id: 4,
      ingles: 'Do you have any pets?',
      espanol: '¿Tienes alguna mascota?',
      opciones: ['Yes, I have a dog.', 'Yes, I am tired.', 'No, I am happy.'],
      correcta: 0,
    },
    {
      id: 5,
      ingles: 'Which animal lives in water?',
      espanol: '¿Qué animal vive en el agua?',
      opciones: ['Fish', 'Horse', 'Bird'],
      correcta: 0,
    },
  ],

  // Tema 10: Verbos regulares
  10: [
    {
      id: 1,
      ingles: 'Yesterday, I ___ (work) all day.',
      espanol: 'Ayer, yo ___ (trabajé) todo el día.',
      opciones: ['worked', 'work', 'working'],
      correcta: 0,
    },
    {
      id: 2,
      ingles: 'They ___ (play) soccer last weekend.',
      espanol: 'Ellos ___ (jugaron) fútbol el fin de semana pasado.',
      opciones: ['play', 'played', 'plays'],
      correcta: 1,
    },
    {
      id: 3,
      ingles: 'She ___ (talk) to her friend yesterday.',
      espanol: 'Ella ___ (habló) con su amiga ayer.',
      opciones: ['talk', 'talks', 'talked'],
      correcta: 2,
    },
    {
      id: 4,
      ingles: 'We ___ (watch) a movie last night.',
      espanol: 'Nosotros ___ (vimos) una película anoche.',
      opciones: ['watched', 'watch', 'watching'],
      correcta: 0,
    },
    {
      id: 5,
      ingles: 'I ___ (clean) my room this morning.',
      espanol: 'Yo ___ (limpié) mi cuarto esta mañana.',
      opciones: ['clean', 'cleaned', 'cleans'],
      correcta: 1,
    },
  ],

  // Tema 11: El cuerpo humano
  11: [
    {
      id: 1,
      ingles: 'What do you use to see?',
      espanol: '¿Qué usas para ver?',
      opciones: ['My eyes.', 'My hands.', 'My ears.'],
      correcta: 0,
    },
    {
      id: 2,
      ingles: 'What hurts?',
      espanol: '¿Qué te duele?',
      opciones: ['My head.', 'My foot is happy.', 'My hand is blue.'],
      correcta: 0,
    },
    {
      id: 3,
      ingles: 'I have ten ___ on my hands.',
      espanol: 'Tengo diez ___ en mis manos.',
      opciones: ['feet', 'fingers', 'ears'],
      correcta: 1,
    },
    {
      id: 4,
      ingles: 'I hear with my...',
      espanol: 'Escucho con mis...',
      opciones: ['ears', 'eyes', 'nose'],
      correcta: 0,
    },
    {
      id: 5,
      ingles: 'I walk with my...',
      espanol: 'Camino con mis...',
      opciones: ['hands', 'feet', 'ears'],
      correcta: 1,
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