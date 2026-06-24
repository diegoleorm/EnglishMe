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

  // Tema 12: Presente simple
  12: [
    {
      id: 1,
      ingles: 'She ___ to work every day.',
      espanol: 'Ella ___ al trabajo todos los días.',
      opciones: ['go', 'goes', 'going'],
      correcta: 1,
    },
    {
      id: 2,
      ingles: 'Do you like coffee?',
      espanol: '¿Te gusta el café?',
      opciones: ['Yes, I like it.', 'Yes, I am liking it.', 'Yes, I liked it.'],
      correcta: 0,
    },
    {
      id: 3,
      ingles: 'He ___ not speak French.',
      espanol: 'Él no habla francés.',
      opciones: ['do', 'does', 'is'],
      correcta: 1,
    },
    {
      id: 4,
      ingles: 'What time does the store open?',
      espanol: '¿A qué hora abre la tienda?',
      opciones: ['It opens at nine.', 'It opened at nine.', 'It is opening now.'],
      correcta: 0,
    },
    {
      id: 5,
      ingles: 'They ___ in Bogotá.',
      espanol: 'Ellos viven en Bogotá.',
      opciones: ['live', 'lives', 'living'],
      correcta: 0,
    },
  ],

  // Tema 13: Presente continuo
  13: [
    {
      id: 1,
      ingles: 'What are you doing right now?',
      espanol: '¿Qué estás haciendo en este momento?',
      opciones: ["I'm studying English.", 'I study English.', 'I studied English.'],
      correcta: 0,
    },
    {
      id: 2,
      ingles: 'She ___ a book at the moment.',
      espanol: 'Ella está leyendo un libro en este momento.',
      opciones: ['reads', 'is reading', 'read'],
      correcta: 1,
    },
    {
      id: 3,
      ingles: 'They ___ dinner right now.',
      espanol: 'Ellos están preparando la cena ahora mismo.',
      opciones: ['are cooking', 'cook', 'cooked'],
      correcta: 0,
    },
    {
      id: 4,
      ingles: 'Look! It ___ outside.',
      espanol: '¡Mira! Está lloviendo afuera.',
      opciones: ['rains', 'is raining', 'rained'],
      correcta: 1,
    },
    {
      id: 5,
      ingles: 'Why are you laughing?',
      espanol: '¿Por qué te estás riendo?',
      opciones: ['That joke was funny.', 'That joke is funny tomorrow.', 'That joke laughs.'],
      correcta: 0,
    },
  ],

  // Tema 14: Verbos irregulares básicos
  14: [
    {
      id: 1,
      ingles: 'Yesterday I ___ to the park.',
      espanol: 'Ayer fui al parque.',
      opciones: ['go', 'went', 'goes'],
      correcta: 1,
    },
    {
      id: 2,
      ingles: 'She ___ a great time at the party.',
      espanol: 'Ella tuvo un gran momento en la fiesta.',
      opciones: ['have', 'has', 'had'],
      correcta: 2,
    },
    {
      id: 3,
      ingles: 'We ___ a movie last night.',
      espanol: 'Vimos una película anoche.',
      opciones: ['saw', 'see', 'seen'],
      correcta: 0,
    },
    {
      id: 4,
      ingles: 'I ___ my keys this morning.',
      espanol: 'Perdí mis llaves esta mañana.',
      opciones: ['lose', 'lost', 'losed'],
      correcta: 1,
    },
    {
      id: 5,
      ingles: 'He ___ very happy when he heard the news.',
      espanol: 'Él se sintió muy feliz cuando escuchó la noticia.',
      opciones: ['feel', 'feeled', 'felt'],
      correcta: 2,
    },
  ],

  // Tema 15: Verbos modales básicos
  15: [
    {
      id: 1,
      ingles: 'I ___ swim very well.',
      espanol: 'Puedo nadar muy bien.',
      opciones: ['can', 'must', 'will'],
      correcta: 0,
    },
    {
      id: 2,
      ingles: 'She ___ speak Japanese.',
      espanol: 'Ella no puede hablar japonés.',
      opciones: ["can't", "isn't", "doesn't"],
      correcta: 0,
    },
    {
      id: 3,
      ingles: '___ you help me with this bag?',
      espanol: '¿Podrías ayudarme con esta bolsa?',
      opciones: ['Could', 'Am', 'Do'],
      correcta: 0,
    },
    {
      id: 4,
      ingles: 'If I had more time, I ___ travel more.',
      espanol: 'Si tuviera más tiempo, viajaría más.',
      opciones: ['would', 'can', 'must'],
      correcta: 0,
    },
    {
      id: 5,
      ingles: 'You ___ be quiet, the baby is sleeping.',
      espanol: 'Debes estar callado, el bebé está durmiendo.',
      opciones: ['must', 'can', 'would'],
      correcta: 0,
    },
  ],

  // Tema 16: El tiempo y clima
  16: [
    {
      id: 1,
      ingles: "What's the weather like today?",
      espanol: '¿Cómo está el clima hoy?',
      opciones: ["It's sunny.", "It's Monday.", "It's blue."],
      correcta: 0,
    },
    {
      id: 2,
      ingles: 'Bring an umbrella, it might...',
      espanol: 'Trae una sombrilla, podría...',
      opciones: ['rain.', 'shine.', 'snow you.'],
      correcta: 0,
    },
    {
      id: 3,
      ingles: "It's very ___ today, wear a coat.",
      espanol: 'Está muy frío hoy, usa un abrigo.',
      opciones: ['cold', 'hot', 'sunny'],
      correcta: 0,
    },
    {
      id: 4,
      ingles: 'What season comes after winter?',
      espanol: '¿Qué estación viene después del invierno?',
      opciones: ['Spring', 'Summer', 'Fall'],
      correcta: 0,
    },
    {
      id: 5,
      ingles: 'I love walking in the snow.',
      espanol: 'Me encanta caminar en la nieve.',
      opciones: ['That sounds fun!', 'That sounds hungry!', 'That sounds tall!'],
      correcta: 0,
    },
  ],

  // Tema 17: Transporte y ciudad
  17: [
    {
      id: 1,
      ingles: 'Excuse me, where is the bus stop?',
      espanol: 'Disculpe, ¿dónde está la parada de autobús?',
      opciones: ["It's two blocks away.", "It's blue.", "It's Tuesday."],
      correcta: 0,
    },
    {
      id: 2,
      ingles: 'How do you get to work?',
      espanol: '¿Cómo llegas al trabajo?',
      opciones: ['I take the train.', 'I am the train.', 'I have a train.'],
      correcta: 0,
    },
    {
      id: 3,
      ingles: 'Is there a subway station nearby?',
      espanol: '¿Hay una estación de metro cerca?',
      opciones: ['Yes, right around the corner.', 'Yes, I am tired.', 'No, I like trains.'],
      correcta: 0,
    },
    {
      id: 4,
      ingles: "I'm lost. Can you help me?",
      espanol: 'Estoy perdido. ¿Puedes ayudarme?',
      opciones: ['Sure, where do you want to go?', 'Sure, what time is it?', 'Sure, I am hungry.'],
      correcta: 0,
    },
    {
      id: 5,
      ingles: 'The taxi will arrive in ten minutes.',
      espanol: 'El taxi llegará en diez minutos.',
      opciones: ['Great, I will wait outside.', 'Great, I ate breakfast.', 'Great, it is raining.'],
      correcta: 0,
    },
  ],

  // Tema 18: Compras y precios
  18: [
    {
      id: 1,
      ingles: 'How much is this shirt?',
      espanol: '¿Cuánto cuesta esta camisa?',
      opciones: ["It's twenty dollars.", "It's blue.", "It's Monday."],
      correcta: 0,
    },
    {
      id: 2,
      ingles: "I'd like to buy this, please.",
      espanol: 'Quisiera comprar esto, por favor.',
      opciones: ['Sure, follow me to the register.', 'Sure, I am tired.', 'Sure, it rains today.'],
      correcta: 0,
    },
    {
      id: 3,
      ingles: 'Do you accept credit cards?',
      espanol: '¿Aceptan tarjetas de crédito?',
      opciones: ['Yes, we do.', 'Yes, I am.', 'Yes, it does.'],
      correcta: 0,
    },
    {
      id: 4,
      ingles: 'This is too expensive for me.',
      espanol: 'Esto es muy caro para mí.',
      opciones: ['We have a cheaper option.', 'We have a blue option.', 'We have a tall option.'],
      correcta: 0,
    },
    {
      id: 5,
      ingles: 'Can I get a discount?',
      espanol: '¿Puedo obtener un descuento?',
      opciones: ['Yes, 10% off today.', 'Yes, I am happy.', 'Yes, it is raining.'],
      correcta: 0,
    },
  ],

  // ── NIVEL B1 ─────────────────────────────────────────────────────────────

  // Tema 19: Pasado simple vs. continuo
  19: [
    {
      id: 1,
      ingles: 'What were you doing when I called?',
      espanol: '¿Qué estabas haciendo cuando llamé?',
      opciones: ['I was watching a movie.', 'I watched a movie.', 'I watch a movie.'],
      correcta: 0,
    },
    {
      id: 2,
      ingles: 'She ___ when the lights went out.',
      espanol: 'Ella estaba leyendo cuando se fue la luz.',
      opciones: ['read', 'was reading', 'reads'],
      correcta: 1,
    },
    {
      id: 3,
      ingles: 'While he ___, the phone rang.',
      espanol: 'Mientras él dormía, sonó el teléfono.',
      opciones: ['slept', 'was sleeping', 'sleeps'],
      correcta: 1,
    },
    {
      id: 4,
      ingles: 'They arrived while we ___ dinner.',
      espanol: 'Llegaron mientras nosotros estábamos cenando.',
      opciones: ['had', 'were having', 'have'],
      correcta: 1,
    },
    {
      id: 5,
      ingles: 'I ___ a great book when you interrupted me.',
      espanol: 'Estaba leyendo un gran libro cuando me interrumpiste.',
      opciones: ['read', 'was reading', 'am reading'],
      correcta: 1,
    },
  ],

  // Tema 20: Presente perfecto
  20: [
    {
      id: 1,
      ingles: 'I ___ never been to Japan.',
      espanol: 'Nunca he estado en Japón.',
      opciones: ['have', 'had', 'has'],
      correcta: 0,
    },
    {
      id: 2,
      ingles: 'She has already ___ her homework.',
      espanol: 'Ella ya ha terminado su tarea.',
      opciones: ['finish', 'finished', 'finishing'],
      correcta: 1,
    },
    {
      id: 3,
      ingles: 'Have you ever tried sushi?',
      espanol: '¿Alguna vez has probado el sushi?',
      opciones: ['Yes, I have tried it once.', 'Yes, I tried it tomorrow.', 'Yes, I try it now.'],
      correcta: 0,
    },
    {
      id: 4,
      ingles: 'They ___ just arrived at the hotel.',
      espanol: 'Ellos acaban de llegar al hotel.',
      opciones: ['have', 'had', 'are'],
      correcta: 0,
    },
    {
      id: 5,
      ingles: 'How long have you lived in Bogotá?',
      espanol: '¿Cuánto tiempo llevas viviendo en Bogotá?',
      opciones: ['I have lived here for five years.', 'I live here tomorrow.', 'I lived here yesterday.'],
      correcta: 0,
    },
  ],

  // Tema 21: Futuro (will / going to)
  21: [
    {
      id: 1,
      ingles: 'I think it ___ rain tomorrow.',
      espanol: 'Creo que mañana va a llover.',
      opciones: ['will', 'is', 'was'],
      correcta: 0,
    },
    {
      id: 2,
      ingles: 'We ___ going to visit my grandparents this weekend.',
      espanol: 'Vamos a visitar a mis abuelos este fin de semana.',
      opciones: ['are', 'were', 'have'],
      correcta: 0,
    },
    {
      id: 3,
      ingles: 'Look at those clouds! It ___ going to rain.',
      espanol: '¡Mira esas nubes! Va a llover.',
      opciones: ['is', 'was', 'will'],
      correcta: 0,
    },
    {
      id: 4,
      ingles: 'I promise I ___ call you later.',
      espanol: 'Te prometo que te llamaré más tarde.',
      opciones: ['will', 'am going to', 'would'],
      correcta: 0,
    },
    {
      id: 5,
      ingles: 'She ___ going to study medicine next year.',
      espanol: 'Ella va a estudiar medicina el próximo año.',
      opciones: ['is', 'are', 'was'],
      correcta: 0,
    },
  ],

  // Tema 22: Condicionales (tipo 1 y 2)
  22: [
    {
      id: 1,
      ingles: 'If it rains, we ___ stay home.',
      espanol: 'Si llueve, nos quedaremos en casa.',
      opciones: ['will', 'would', 'are'],
      correcta: 0,
    },
    {
      id: 2,
      ingles: 'If I won the lottery, I ___ travel the world.',
      espanol: 'Si ganara la lotería, viajaría por el mundo.',
      opciones: ['would', 'will', 'am going to'],
      correcta: 0,
    },
    {
      id: 3,
      ingles: 'She will pass the exam if she ___.',
      espanol: 'Ella pasará el examen si estudia.',
      opciones: ['studies', 'studied', 'would study'],
      correcta: 0,
    },
    {
      id: 4,
      ingles: 'If I ___ you, I would apologize.',
      espanol: 'Si yo fuera tú, pediría disculpas.',
      opciones: ['were', 'am', 'was'],
      correcta: 0,
    },
    {
      id: 5,
      ingles: 'What would you do if you ___ a superpower?',
      espanol: '¿Qué harías si tuvieras un superpoder?',
      opciones: ['had', 'have', 'will have'],
      correcta: 0,
    },
  ],

  // Tema 23: Vocabulario de trabajo y profesiones
  23: [
    {
      id: 1,
      ingles: 'What do you do for a living?',
      espanol: '¿A qué te dedicas?',
      opciones: ['I am a software engineer.', 'I am a software.', 'I do a software.'],
      correcta: 0,
    },
    {
      id: 2,
      ingles: 'A person who treats sick people is a...',
      espanol: 'Una persona que trata a enfermos es un...',
      opciones: ['doctor', 'lawyer', 'chef'],
      correcta: 0,
    },
    {
      id: 3,
      ingles: 'I have a job interview tomorrow.',
      espanol: 'Tengo una entrevista de trabajo mañana.',
      opciones: ['Good luck, I hope it goes well!', 'Good luck, I am hungry!', 'Good luck, it is raining!'],
      correcta: 0,
    },
    {
      id: 4,
      ingles: 'She works ___ a teacher at a local school.',
      espanol: 'Ella trabaja como maestra en una escuela local.',
      opciones: ['as', 'like', 'for'],
      correcta: 0,
    },
    {
      id: 5,
      ingles: 'My boss gave me a promotion last month.',
      espanol: 'Mi jefe me dio un ascenso el mes pasado.',
      opciones: ['That is great news!', 'That is very cold!', 'That is very blue!'],
      correcta: 0,
    },
  ],

  // Tema 24: Salud y el médico
  24: [
    {
      id: 1,
      ingles: "I don't feel well. I have a headache.",
      espanol: 'No me siento bien. Tengo dolor de cabeza.',
      opciones: ['You should rest and drink water.', 'You should go dancing.', 'You should eat more sugar.'],
      correcta: 0,
    },
    {
      id: 2,
      ingles: 'What are your symptoms?',
      espanol: '¿Cuáles son tus síntomas?',
      opciones: ['I have a fever and a sore throat.', 'I have a car and a house.', 'I have a pen and a book.'],
      correcta: 0,
    },
    {
      id: 3,
      ingles: 'The doctor ___ me to take this medicine twice a day.',
      espanol: 'El médico me dijo que tomara este medicamento dos veces al día.',
      opciones: ['told', 'said', 'asked'],
      correcta: 0,
    },
    {
      id: 4,
      ingles: 'I need to make an appointment with the dentist.',
      espanol: 'Necesito hacer una cita con el dentista.',
      opciones: ['I can help you find their number.', 'I can help you find their car.', 'I can help you find their dog.'],
      correcta: 0,
    },
    {
      id: 5,
      ingles: 'How long have you had this pain?',
      espanol: '¿Hace cuánto tiempo tienes este dolor?',
      opciones: ['Since yesterday morning.', 'Since I am hungry.', 'Since it is blue.'],
      correcta: 0,
    },
  ],

  // Tema 25: Viajes y turismo
  25: [
    {
      id: 1,
      ingles: 'I would like to book a room for two nights.',
      espanol: 'Quisiera reservar una habitación por dos noches.',
      opciones: ['Of course! Single or double?', 'Of course! Hot or cold?', 'Of course! Big or blue?'],
      correcta: 0,
    },
    {
      id: 2,
      ingles: 'Where is the nearest tourist information center?',
      espanol: '¿Dónde está el centro de información turística más cercano?',
      opciones: ["It's just down the street.", "It's just down the river.", "It's very hungry."],
      correcta: 0,
    },
    {
      id: 3,
      ingles: 'My flight was delayed by two hours.',
      espanol: 'Mi vuelo se retrasó dos horas.',
      opciones: ['That is frustrating. Did you get a voucher?', 'That is delicious. Did you eat?', 'That is blue. Did you see?'],
      correcta: 0,
    },
    {
      id: 4,
      ingles: 'Do I need a visa to travel to Canada?',
      espanol: '¿Necesito visa para viajar a Canadá?',
      opciones: ['It depends on your passport.', 'It depends on your food.', 'It depends on your color.'],
      correcta: 0,
    },
    {
      id: 5,
      ingles: 'What is the most popular attraction here?',
      espanol: '¿Cuál es la atracción más popular aquí?',
      opciones: ['The old cathedral is a must-see.', 'The old cathedral is very hungry.', 'The old cathedral is very fast.'],
      correcta: 0,
    },
  ],

  // Tema 26: Emociones y sentimientos
  26: [
    {
      id: 1,
      ingles: 'How do you feel when you achieve a goal?',
      espanol: '¿Cómo te sientes cuando logras una meta?',
      opciones: ['I feel proud and happy.', 'I feel blue and square.', 'I feel hungry and tall.'],
      correcta: 0,
    },
    {
      id: 2,
      ingles: 'She looked ___ when she heard the bad news.',
      espanol: 'Ella se veía devastada cuando escuchó las malas noticias.',
      opciones: ['devastated', 'delicious', 'fast'],
      correcta: 0,
    },
    {
      id: 3,
      ingles: 'I get nervous when I have to speak in public.',
      espanol: 'Me pongo nervioso cuando tengo que hablar en público.',
      opciones: ['That is very common, you can practice!', 'That is very cold, wear a coat!', 'That is very tall, be careful!'],
      correcta: 0,
    },
    {
      id: 4,
      ingles: 'He was ___ because he missed the bus.',
      espanol: 'Él estaba frustrado porque perdió el autobús.',
      opciones: ['frustrated', 'delighted', 'excited'],
      correcta: 0,
    },
    {
      id: 5,
      ingles: 'What makes you feel anxious?',
      espanol: '¿Qué te hace sentir ansioso?',
      opciones: ['Exams and tight deadlines make me anxious.', 'Exams and pizza make me tall.', 'Exams and weather make me blue.'],
      correcta: 0,
    },
  ],

  // Tema 27: Medio ambiente
  27: [
    {
      id: 1,
      ingles: 'We should recycle to protect the environment.',
      espanol: 'Debemos reciclar para proteger el medio ambiente.',
      opciones: ['I totally agree, every little bit helps.', 'I totally agree, it is very cold.', 'I totally agree, it is very blue.'],
      correcta: 0,
    },
    {
      id: 2,
      ingles: 'Climate change is causing more extreme weather events.',
      espanol: 'El cambio climático está causando eventos climáticos más extremos.',
      opciones: ['That is why we need to reduce emissions.', 'That is why we need to eat more.', 'That is why we need to sleep more.'],
      correcta: 0,
    },
    {
      id: 3,
      ingles: 'What can we do to save water at home?',
      espanol: '¿Qué podemos hacer para ahorrar agua en casa?',
      opciones: ['We can take shorter showers.', 'We can take longer naps.', 'We can take more food.'],
      correcta: 0,
    },
    {
      id: 4,
      ingles: 'Deforestation is destroying natural habitats.',
      espanol: 'La deforestación está destruyendo los hábitats naturales.',
      opciones: ['We need to plant more trees to help.', 'We need to eat more trees to help.', 'We need to paint more trees to help.'],
      correcta: 0,
    },
    {
      id: 5,
      ingles: 'Solar energy is a clean ___ of power.',
      espanol: 'La energía solar es una fuente limpia de energía.',
      opciones: ['source', 'color', 'flavor'],
      correcta: 0,
    },
  ],

  // ── NIVEL B2 ─────────────────────────────────────────────────────────────

  // Tema 28: Pasado perfecto
  28: [
    {
      id: 1,
      ingles: 'By the time she arrived, we ___ already eaten.',
      espanol: 'Cuando ella llegó, ya habíamos comido.',
      opciones: ['had', 'have', 'were'],
      correcta: 0,
    },
    {
      id: 2,
      ingles: 'He failed the exam because he ___ not studied.',
      espanol: 'Reprobó el examen porque no había estudiado.',
      opciones: ['had', 'has', 'was'],
      correcta: 0,
    },
    {
      id: 3,
      ingles: 'They realized they ___ taken the wrong train.',
      espanol: 'Se dieron cuenta de que habían tomado el tren equivocado.',
      opciones: ['had', 'have', 'did'],
      correcta: 0,
    },
    {
      id: 4,
      ingles: 'I was tired because I ___ worked all night.',
      espanol: 'Estaba cansado porque había trabajado toda la noche.',
      opciones: ['had', 'have', 'did'],
      correcta: 0,
    },
    {
      id: 5,
      ingles: 'She looked familiar. I felt I ___ seen her before.',
      espanol: 'Ella me parecía conocida. Sentía que la había visto antes.',
      opciones: ['had', 'have', 'was'],
      correcta: 0,
    },
  ],

  // Tema 29: Voz pasiva
  29: [
    {
      id: 1,
      ingles: 'The report ___ written by the manager.',
      espanol: 'El informe fue escrito por el gerente.',
      opciones: ['was', 'is', 'were'],
      correcta: 0,
    },
    {
      id: 2,
      ingles: 'English ___ spoken all over the world.',
      espanol: 'El inglés se habla en todo el mundo.',
      opciones: ['is', 'was', 'are'],
      correcta: 0,
    },
    {
      id: 3,
      ingles: 'The windows ___ cleaned yesterday.',
      espanol: 'Las ventanas fueron limpiadas ayer.',
      opciones: ['were', 'are', 'have'],
      correcta: 0,
    },
    {
      id: 4,
      ingles: 'The new building ___ being constructed right now.',
      espanol: 'El nuevo edificio está siendo construido ahora mismo.',
      opciones: ['is', 'was', 'were'],
      correcta: 0,
    },
    {
      id: 5,
      ingles: 'The package will ___ delivered tomorrow.',
      espanol: 'El paquete será entregado mañana.',
      opciones: ['be', 'been', 'being'],
      correcta: 0,
    },
  ],

  // Tema 30: Discurso indirecto
  30: [
    {
      id: 1,
      ingles: 'She said she ___ tired.',
      espanol: 'Ella dijo que estaba cansada.',
      opciones: ['was', 'is', 'were'],
      correcta: 0,
    },
    {
      id: 2,
      ingles: 'He told me he ___ call me the next day.',
      espanol: 'Él me dijo que me llamaría al día siguiente.',
      opciones: ['would', 'will', 'could'],
      correcta: 0,
    },
    {
      id: 3,
      ingles: 'They said they ___ been to Paris before.',
      espanol: 'Dijeron que habían estado en París antes.',
      opciones: ['had', 'have', 'were'],
      correcta: 0,
    },
    {
      id: 4,
      ingles: 'The teacher told us ___ quiet during the test.',
      espanol: 'La maestra nos dijo que estuviéramos callados durante el examen.',
      opciones: ['to be', 'being', 'be'],
      correcta: 0,
    },
    {
      id: 5,
      ingles: 'She asked me where I ___.',
      espanol: 'Ella me preguntó dónde vivía.',
      opciones: ['lived', 'live', 'was living'],
      correcta: 0,
    },
  ],

  // Tema 31: Conectores y cohesión
  31: [
    {
      id: 1,
      ingles: 'I wanted to go out; ___, it was raining hard.',
      espanol: 'Quería salir; sin embargo, llovía mucho.',
      opciones: ['however', 'therefore', 'besides'],
      correcta: 0,
    },
    {
      id: 2,
      ingles: 'She studied hard. ___, she passed the exam.',
      espanol: 'Estudió mucho. Por lo tanto, pasó el examen.',
      opciones: ['Therefore', 'Although', 'Unless'],
      correcta: 0,
    },
    {
      id: 3,
      ingles: '___ he is rich, he is not happy.',
      espanol: 'Aunque es rico, no es feliz.',
      opciones: ['Although', 'Therefore', 'Besides'],
      correcta: 0,
    },
    {
      id: 4,
      ingles: 'You will fail ___ you study more.',
      espanol: 'Vas a reprobar a menos que estudies más.',
      opciones: ['unless', 'although', 'however'],
      correcta: 0,
    },
    {
      id: 5,
      ingles: 'He is smart. ___, he works very hard.',
      espanol: 'Es inteligente. Además, trabaja muy duro.',
      opciones: ['Moreover', 'Unless', 'Although'],
      correcta: 0,
    },
  ],

  // Tema 32: Tecnología y redes sociales
  32: [
    {
      id: 1,
      ingles: 'How often do you use social media?',
      espanol: '¿Con qué frecuencia usas las redes sociales?',
      opciones: ['I check it several times a day.', 'I check it with food.', 'I check it with rain.'],
      correcta: 0,
    },
    {
      id: 2,
      ingles: 'My phone ___ out of battery. Can I charge it here?',
      espanol: 'Mi teléfono se quedó sin batería. ¿Puedo cargarlo aquí?',
      opciones: ['ran', 'run', 'runs'],
      correcta: 0,
    },
    {
      id: 3,
      ingles: 'You should update your password regularly for security.',
      espanol: 'Deberías actualizar tu contraseña regularmente por seguridad.',
      opciones: ['That is good advice, I will do it now.', 'That is good food, I will eat now.', 'That is good weather, I will go now.'],
      correcta: 0,
    },
    {
      id: 4,
      ingles: 'Artificial intelligence is changing many industries.',
      espanol: 'La inteligencia artificial está cambiando muchas industrias.',
      opciones: ['It is both exciting and challenging.', 'It is both hungry and cold.', 'It is both blue and tall.'],
      correcta: 0,
    },
    {
      id: 5,
      ingles: 'Can you ___ me that file by email?',
      espanol: '¿Puedes enviarme ese archivo por correo electrónico?',
      opciones: ['send', 'say', 'tell'],
      correcta: 0,
    },
  ],

  // Tema 33: Cultura y arte
  33: [
    {
      id: 1,
      ingles: 'What kind of music do you enjoy?',
      espanol: '¿Qué tipo de música disfrutas?',
      opciones: ['I enjoy jazz and classical music.', 'I enjoy cars and buildings.', 'I enjoy rain and cold.'],
      correcta: 0,
    },
    {
      id: 2,
      ingles: 'This painting was created in the Renaissance period.',
      espanol: 'Esta pintura fue creada en el período del Renacimiento.',
      opciones: ['That is fascinating. Who painted it?', 'That is fascinating. Who ate it?', 'That is fascinating. Who drove it?'],
      correcta: 0,
    },
    {
      id: 3,
      ingles: 'The film received excellent ___ from critics.',
      espanol: 'La película recibió excelentes críticas.',
      opciones: ['reviews', 'recipes', 'weather'],
      correcta: 0,
    },
    {
      id: 4,
      ingles: 'Literature helps us understand different ___ of life.',
      espanol: 'La literatura nos ayuda a entender diferentes perspectivas de vida.',
      opciones: ['perspectives', 'ingredients', 'temperatures'],
      correcta: 0,
    },
    {
      id: 5,
      ingles: 'She plays the piano and also ___ in a choir.',
      espanol: 'Ella toca el piano y también canta en un coro.',
      opciones: ['sings', 'cooks', 'drives'],
      correcta: 0,
    },
  ],

  // Tema 34: Economía y finanzas personales
  34: [
    {
      id: 1,
      ingles: 'It is important to save a portion of your income every month.',
      espanol: 'Es importante ahorrar una parte de tus ingresos cada mes.',
      opciones: ['I agree, it helps for emergencies.', 'I agree, it helps for swimming.', 'I agree, it helps for painting.'],
      correcta: 0,
    },
    {
      id: 2,
      ingles: 'I need to pay my rent by the end of the month.',
      espanol: 'Necesito pagar mi alquiler al final del mes.',
      opciones: ['Set a reminder so you do not forget.', 'Set a color so you do not eat.', 'Set a rain so you do not sleep.'],
      correcta: 0,
    },
    {
      id: 3,
      ingles: 'What is the difference between a debit card and a credit card?',
      espanol: '¿Cuál es la diferencia entre una tarjeta débito y una de crédito?',
      opciones: ['A debit card uses your own money; credit is borrowed.', 'A debit card is blue; credit is red.', 'A debit card is hot; credit is cold.'],
      correcta: 0,
    },
    {
      id: 4,
      ingles: 'Investing early allows your money to ___ over time.',
      espanol: 'Invertir temprano permite que tu dinero crezca con el tiempo.',
      opciones: ['grow', 'sleep', 'fly'],
      correcta: 0,
    },
    {
      id: 5,
      ingles: 'I am trying to ___ my spending this month.',
      espanol: 'Estoy intentando reducir mis gastos este mes.',
      opciones: ['reduce', 'increase', 'paint'],
      correcta: 0,
    },
  ],

  // Tema 35: Argumentación y debate
  35: [
    {
      id: 1,
      ingles: 'In my opinion, education should be free for everyone.',
      espanol: 'En mi opinión, la educación debería ser gratuita para todos.',
      opciones: ['That is a valid point. What are your reasons?', 'That is a valid food. What do you eat?', 'That is a valid color. What do you see?'],
      correcta: 0,
    },
    {
      id: 2,
      ingles: 'I see your point, ___ I still disagree.',
      espanol: 'Entiendo tu punto, pero aún no estoy de acuerdo.',
      opciones: ['but', 'so', 'and'],
      correcta: 0,
    },
    {
      id: 3,
      ingles: 'On the one hand, technology saves time. On the other hand, it can be ___ .',
      espanol: 'Por un lado, la tecnología ahorra tiempo. Por otro lado, puede ser adictiva.',
      opciones: ['addictive', 'delicious', 'colorful'],
      correcta: 0,
    },
    {
      id: 4,
      ingles: 'Could you ___ your point with an example?',
      espanol: '¿Podrías apoyar tu punto con un ejemplo?',
      opciones: ['support', 'eat', 'paint'],
      correcta: 0,
    },
    {
      id: 5,
      ingles: 'To sum up, both sides have valid arguments.',
      espanol: 'En resumen, ambos lados tienen argumentos válidos.',
      opciones: ['That is a balanced conclusion.', 'That is a balanced recipe.', 'That is a balanced color.'],
      correcta: 0,
    },
  ],

  // ── NIVEL C1 ─────────────────────────────────────────────────────────────

  // Tema 36: Condicional tipo 3
  36: [
    {
      id: 1,
      ingles: 'If she had studied harder, she ___ passed the exam.',
      espanol: 'Si ella hubiera estudiado más, habría pasado el examen.',
      opciones: ['would have', 'would', 'had'],
      correcta: 0,
    },
    {
      id: 2,
      ingles: 'I ___ called you if I had known you were there.',
      espanol: 'Te habría llamado si hubiera sabido que estabas ahí.',
      opciones: ['would have', 'will have', 'had'],
      correcta: 0,
    },
    {
      id: 3,
      ingles: 'They would have won ___ they had practiced more.',
      espanol: 'Habrían ganado si hubieran practicado más.',
      opciones: ['if', 'unless', 'although'],
      correcta: 0,
    },
    {
      id: 4,
      ingles: 'If he had taken the job, his life ___ completely different.',
      espanol: 'Si hubiera aceptado el trabajo, su vida habría sido completamente diferente.',
      opciones: ['would have been', 'would be', 'had been'],
      correcta: 0,
    },
    {
      id: 5,
      ingles: 'She ___ gotten lost if she had brought a map.',
      espanol: 'Ella no se habría perdido si hubiera traído un mapa.',
      opciones: ["wouldn't have", "wouldn't", "hadn't"],
      correcta: 0,
    },
  ],

  // Tema 37: Inversión y énfasis
  37: [
    {
      id: 1,
      ingles: 'Never ___ I seen such a beautiful sunset.',
      espanol: 'Nunca había visto un atardecer tan hermoso.',
      opciones: ['have', 'had', 'has'],
      correcta: 0,
    },
    {
      id: 2,
      ingles: 'Not only ___ she win, but she also broke the record.',
      espanol: 'No solo ganó, sino que también rompió el récord.',
      opciones: ['did', 'does', 'had'],
      correcta: 0,
    },
    {
      id: 3,
      ingles: 'Hardly ___ he sat down when the phone rang.',
      espanol: 'Apenas se había sentado cuando sonó el teléfono.',
      opciones: ['had', 'has', 'did'],
      correcta: 0,
    },
    {
      id: 4,
      ingles: 'What ___ impressed me was her confidence.',
      espanol: 'Lo que realmente me impresionó fue su confianza.',
      opciones: ['really', 'very', 'quite'],
      correcta: 0,
    },
    {
      id: 5,
      ingles: 'It was ___ the presentation that changed their minds.',
      espanol: 'Fue precisamente la presentación lo que cambió sus mentes.',
      opciones: ['precisely', 'barely', 'nearly'],
      correcta: 0,
    },
  ],

  // Tema 38: Verbos modales avanzados
  38: [
    {
      id: 1,
      ingles: 'She must ___ forgotten about the meeting.',
      espanol: 'Ella debe de haberse olvidado de la reunión.',
      opciones: ['have', 'had', 'be'],
      correcta: 0,
    },
    {
      id: 2,
      ingles: 'He can\'t ___ done it on purpose.',
      espanol: 'No puede haberlo hecho a propósito.',
      opciones: ['have', 'had', 'be'],
      correcta: 0,
    },
    {
      id: 3,
      ingles: 'You should ___ told me earlier.',
      espanol: 'Deberías haberme dicho antes.',
      opciones: ['have', 'had', 'be'],
      correcta: 0,
    },
    {
      id: 4,
      ingles: 'They might ___ already left by the time we arrive.',
      espanol: 'Puede que ya hayan salido cuando lleguemos.',
      opciones: ['have', 'had', 'be'],
      correcta: 0,
    },
    {
      id: 5,
      ingles: 'I needn\'t ___ worried; everything worked out fine.',
      espanol: 'No tenía que haberme preocupado; todo salió bien.',
      opciones: ['have', 'had', 'be'],
      correcta: 0,
    },
  ],

  // Tema 39: Lenguaje académico y formal
  39: [
    {
      id: 1,
      ingles: 'The results ___ that further research is needed.',
      espanol: 'Los resultados sugieren que se necesita más investigación.',
      opciones: ['suggest', 'say', 'tell'],
      correcta: 0,
    },
    {
      id: 2,
      ingles: 'This essay will ___ the main causes of climate change.',
      espanol: 'Este ensayo examinará las principales causas del cambio climático.',
      opciones: ['examine', 'eat', 'build'],
      correcta: 0,
    },
    {
      id: 3,
      ingles: '___ to the data, unemployment has decreased this year.',
      espanol: 'Según los datos, el desempleo ha disminuido este año.',
      opciones: ['According', 'Despite', 'Although'],
      correcta: 0,
    },
    {
      id: 4,
      ingles: 'The study ___ a strong correlation between sleep and productivity.',
      espanol: 'El estudio revela una fuerte correlación entre el sueño y la productividad.',
      opciones: ['reveals', 'cooks', 'drives'],
      correcta: 0,
    },
    {
      id: 5,
      ingles: 'In ___, the evidence supports the original hypothesis.',
      espanol: 'En conclusión, la evidencia apoya la hipótesis original.',
      opciones: ['conclusion', 'addition', 'contrast'],
      correcta: 0,
    },
  ],

  // Tema 40: Expresiones idiomáticas avanzadas
  40: [
    {
      id: 1,
      ingles: 'He really bit off more than he could chew with that project.',
      espanol: 'Él realmente asumió más de lo que podía con ese proyecto.',
      opciones: ['He took on too much responsibility.', 'He ate too much at lunch.', 'He bit someone at work.'],
      correcta: 0,
    },
    {
      id: 2,
      ingles: 'Let\'s not beat around the bush — what do you really mean?',
      espanol: 'No andemos con rodeos, ¿qué quieres decir realmente?',
      opciones: ['Be direct and say what you mean.', 'Stop walking near the bushes.', 'Do not hit the plants outside.'],
      correcta: 0,
    },
    {
      id: 3,
      ingles: 'She has a lot on her plate right now.',
      espanol: 'Ella tiene muchas cosas de qué preocuparse ahora.',
      opciones: ['She is very busy with many things.', 'She has a very full dinner plate.', 'She dropped her food on the floor.'],
      correcta: 0,
    },
    {
      id: 4,
      ingles: 'The new policy is just a drop in the ocean.',
      espanol: 'La nueva política es solo una gota en el océano.',
      opciones: ['It is too small to make a real difference.', 'It fell into the water by accident.', 'It is related to ocean pollution.'],
      correcta: 0,
    },
    {
      id: 5,
      ingles: 'They went back to the drawing board after the plan failed.',
      espanol: 'Volvieron al punto de partida después de que el plan falló.',
      opciones: ['They started the planning process over again.', 'They went to an art class together.', 'They repainted the office whiteboard.'],
      correcta: 0,
    },
  ],

  // Tema 41: Escritura profesional y correos
  41: [
    {
      id: 1,
      ingles: 'Which opening is most appropriate for a formal email?',
      espanol: '¿Cuál es la apertura más apropiada para un correo formal?',
      opciones: ['Dear Mr. Smith,', 'Hey Smith!', 'Yo Smith,'],
      correcta: 0,
    },
    {
      id: 2,
      ingles: 'I am writing ___ to the job advertisement posted on your website.',
      espanol: 'Le escribo en referencia al anuncio de empleo publicado en su sitio web.',
      opciones: ['with reference', 'with food', 'with color'],
      correcta: 0,
    },
    {
      id: 3,
      ingles: 'Please find ___ my updated resume.',
      espanol: 'Adjunto encontrará mi currículum actualizado.',
      opciones: ['attached', 'below', 'inside'],
      correcta: 0,
    },
    {
      id: 4,
      ingles: 'I would ___ the opportunity to discuss this further.',
      espanol: 'Agradecería la oportunidad de discutir esto más a fondo.',
      opciones: ['appreciate', 'eat', 'paint'],
      correcta: 0,
    },
    {
      id: 5,
      ingles: 'Which closing is most appropriate for a formal letter?',
      espanol: '¿Cuál es el cierre más apropiado para una carta formal?',
      opciones: ['Yours sincerely,', 'See ya!', 'Bye bye,'],
      correcta: 0,
    },
  ],

  // Tema 42: Fluidez y conversación avanzada
  42: [
    {
      id: 1,
      ingles: 'Could you elaborate on that point?',
      espanol: '¿Podrías ampliar ese punto?',
      opciones: ['Sure, what I meant was that the results were unexpected.', 'Sure, I am very hungry today.', 'Sure, the weather is quite cold.'],
      correcta: 0,
    },
    {
      id: 2,
      ingles: 'I tend to ___ when I am under pressure.',
      espanol: 'Tiendo a bloquearme cuando estoy bajo presión.',
      opciones: ['freeze up', 'warm up', 'slow down'],
      correcta: 0,
    },
    {
      id: 3,
      ingles: 'That is an interesting perspective. Have you considered the other side?',
      espanol: 'Esa es una perspectiva interesante. ¿Has considerado el otro lado?',
      opciones: ['Yes, and I think both views have merit.', 'Yes, and I think both views are cold.', 'Yes, and I think both views are blue.'],
      correcta: 0,
    },
    {
      id: 4,
      ingles: 'What I find ___ about learning languages is the cultural insight.',
      espanol: 'Lo que encuentro más gratificante de aprender idiomas es el conocimiento cultural.',
      opciones: ['most rewarding', 'most delicious', 'most colorful'],
      correcta: 0,
    },
    {
      id: 5,
      ingles: 'To wrap things up, what is your main takeaway from today?',
      espanol: 'Para concluir, ¿cuál es tu principal aprendizaje de hoy?',
      opciones: ['My main takeaway is that consistency is key to fluency.', 'My main takeaway is that the food was good.', 'My main takeaway is that it was very cold today.'],
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
