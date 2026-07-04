// Ejercicios adicionales por nivel
// Tipos: ordenar palabras, verdadero/falso, relacionar

// ── TIPOS ────────────────────────────────────────────────────────────────────
export interface EjercicioOrdenar {
  id: number;
  tipo: 'ordenar';
  palabras: string[];
  frase_correcta: string;
  espanol: string;
}

export interface EjercicioVerdaderoFalso {
  id: number;
  tipo: 'verdadero_falso';
  ingles: string;
  espanol: string;
  correcta: 'True' | 'False';
}

export interface EjercicioRelacionar {
  id: number;
  tipo: 'relacionar';
  pares: { ingles: string; espanol: string }[];
}

export type Ejercicio = EjercicioOrdenar | EjercicioVerdaderoFalso | EjercicioRelacionar;

// ── NIVEL 0 ───────────────────────────────────────────────────────────────────
export const ordenarNivel0: EjercicioOrdenar[] = [
  { id: 1, tipo: 'ordenar', palabras: ['name', 'is', 'My', 'Ana'], frase_correcta: 'My name is Ana', espanol: 'Mi nombre es Ana' },
  { id: 2, tipo: 'ordenar', palabras: ['am', 'happy', 'I'], frase_correcta: 'I am happy', espanol: 'Estoy feliz' },
  { id: 3, tipo: 'ordenar', palabras: ['is', 'my', 'dog', 'This'], frase_correcta: 'This is my dog', espanol: 'Este es mi perro' },
  { id: 4, tipo: 'ordenar', palabras: ['like', 'apples', 'I'], frase_correcta: 'I like apples', espanol: 'Me gustan las manzanas' },
  { id: 5, tipo: 'ordenar', palabras: ['is', 'my', 'mother', 'She'], frase_correcta: 'She is my mother', espanol: 'Ella es mi madre' },
  { id: 6, tipo: 'ordenar', palabras: ['is', 'my', 'father', 'He'], frase_correcta: 'He is my father', espanol: 'Él es mi padre' },
  { id: 7, tipo: 'ordenar', palabras: ['have', 'two', 'brothers', 'I'], frase_correcta: 'I have two brothers', espanol: 'Tengo dos hermanos' },
  { id: 8, tipo: 'ordenar', palabras: ['sky', 'is', 'blue', 'The'], frase_correcta: 'The sky is blue', espanol: 'El cielo es azul' },
  { id: 9, tipo: 'ordenar', palabras: ['am', 'ten', 'years', 'old', 'I'], frase_correcta: 'I am ten years old', espanol: 'Tengo diez años' },
  { id: 10, tipo: 'ordenar', palabras: ['is', 'a', 'book', 'This'], frase_correcta: 'This is a book', espanol: 'Este es un libro' },
  { id: 11, tipo: 'ordenar', palabras: ['see', 'a', 'bird', 'I'], frase_correcta: 'I see a bird', espanol: 'Veo un pájaro' },
  { id: 12, tipo: 'ordenar', palabras: ['cat', 'is', 'black', 'The'], frase_correcta: 'The cat is black', espanol: 'El gato es negro' },
  { id: 13, tipo: 'ordenar', palabras: ['to', 'school', 'go', 'I'], frase_correcta: 'I go to school', espanol: 'Yo voy a la escuela' },
  { id: 14, tipo: 'ordenar', palabras: ['are', 'friends', 'We'], frase_correcta: 'We are friends', espanol: 'Somos amigos' },
  { id: 15, tipo: 'ordenar', palabras: ['are', 'my', 'friend', 'You'], frase_correcta: 'You are my friend', espanol: 'Tú eres mi amigo' },
  { id: 16, tipo: 'ordenar', palabras: ['like', 'ice', 'cream', 'I'], frase_correcta: 'I like ice cream', espanol: 'Me gusta el helado' },
  { id: 17, tipo: 'ordenar', palabras: ['sun', 'is', 'yellow', 'The'], frase_correcta: 'The sun is yellow', espanol: 'El sol es amarillo' },
  { id: 18, tipo: 'ordenar', palabras: ['have', 'a', 'red', 'ball', 'I'], frase_correcta: 'I have a red ball', espanol: 'Tengo una pelota roja' },
  { id: 19, tipo: 'ordenar', palabras: ['is', 'a', 'big', 'house', 'This'], frase_correcta: 'This is a big house', espanol: 'Esta es una casa grande' },
  { id: 20, tipo: 'ordenar', palabras: ['love', 'my', 'family', 'I'], frase_correcta: 'I love my family', espanol: 'Amo a mi familia' },
  { id: 21, tipo: 'ordenar', palabras: ['sister', 'is', 'tall', 'My'], frase_correcta: 'My sister is tall', espanol: 'Mi hermana es alta' },
  { id: 22, tipo: 'ordenar', palabras: ['dog', 'is', 'small', 'The'], frase_correcta: 'The dog is small', espanol: 'El perro es pequeño' },
  { id: 23, tipo: 'ordenar', palabras: ['am', 'a', 'student', 'I'], frase_correcta: 'I am a student', espanol: 'Soy un estudiante' },
  { id: 24, tipo: 'ordenar', palabras: ['are', 'very', 'kind', 'You'], frase_correcta: 'You are very kind', espanol: 'Eres muy amable' },
  { id: 25, tipo: 'ordenar', palabras: ['have', 'three', 'cats', 'I'], frase_correcta: 'I have three cats', espanol: 'Tengo tres gatos' },
  { id: 26, tipo: 'ordenar', palabras: ['is', 'my', 'school', 'This'], frase_correcta: 'This is my school', espanol: 'Esta es mi escuela' },
  { id: 27, tipo: 'ordenar', palabras: ['like', 'blue', 'shoes', 'I'], frase_correcta: 'I like blue shoes', espanol: 'Me gustan los zapatos azules' },
  { id: 28, tipo: 'ordenar', palabras: ['brother', 'is', 'funny', 'My'], frase_correcta: 'My brother is funny', espanol: 'Mi hermano es gracioso' },
  { id: 29, tipo: 'ordenar', palabras: ['bird', 'can', 'fly', 'The'], frase_correcta: 'The bird can fly', espanol: 'El pájaro puede volar' },
  { id: 30, tipo: 'ordenar', palabras: ['am', 'happy', 'today', 'I'], frase_correcta: 'I am happy today', espanol: 'Estoy feliz hoy' },
];

export const verdaderoFalsoNivel0: EjercicioVerdaderoFalso[] = [
  { id: 1, tipo: 'verdadero_falso', ingles: 'A cat can fly.', espanol: 'Un gato puede volar.', correcta: 'False' },
  { id: 2, tipo: 'verdadero_falso', ingles: 'The sun is hot.', espanol: 'El sol es caliente.', correcta: 'True' },
  { id: 3, tipo: 'verdadero_falso', ingles: 'A fish can swim.', espanol: 'Un pez puede nadar.', correcta: 'True' },
  { id: 4, tipo: 'verdadero_falso', ingles: 'A dog can talk.', espanol: 'Un perro puede hablar.', correcta: 'False' },
  { id: 5, tipo: 'verdadero_falso', ingles: 'The sky is green.', espanol: 'El cielo es verde.', correcta: 'False' },
  { id: 6, tipo: 'verdadero_falso', ingles: 'Snow is cold.', espanol: 'La nieve es fría.', correcta: 'True' },
  { id: 7, tipo: 'verdadero_falso', ingles: 'A bird can fly.', espanol: 'Un pájaro puede volar.', correcta: 'True' },
  { id: 8, tipo: 'verdadero_falso', ingles: 'The sun is cold.', espanol: 'El sol es frío.', correcta: 'False' },
  { id: 9, tipo: 'verdadero_falso', ingles: "A cow says 'moo'.", espanol: 'Una vaca dice "moo".', correcta: 'True' },
  { id: 10, tipo: 'verdadero_falso', ingles: "A cat says 'woof'.", espanol: 'Un gato dice "guau".', correcta: 'False' },
  { id: 11, tipo: 'verdadero_falso', ingles: 'Water is wet.', espanol: 'El agua está mojada.', correcta: 'True' },
  { id: 12, tipo: 'verdadero_falso', ingles: 'Fire is cold.', espanol: 'El fuego es frío.', correcta: 'False' },
  { id: 13, tipo: 'verdadero_falso', ingles: 'An elephant is small.', espanol: 'Un elefante es pequeño.', correcta: 'False' },
  { id: 14, tipo: 'verdadero_falso', ingles: 'A mouse is small.', espanol: 'Un ratón es pequeño.', correcta: 'True' },
  { id: 15, tipo: 'verdadero_falso', ingles: 'Grass is blue.', espanol: 'El pasto es azul.', correcta: 'False' },
  { id: 16, tipo: 'verdadero_falso', ingles: 'Bananas are yellow.', espanol: 'Los plátanos son amarillos.', correcta: 'True' },
  { id: 17, tipo: 'verdadero_falso', ingles: "A pig says 'oink'.", espanol: 'Un cerdo dice "oink".', correcta: 'True' },
  { id: 18, tipo: 'verdadero_falso', ingles: 'The moon is a star.', espanol: 'La luna es una estrella.', correcta: 'False' },
  { id: 19, tipo: 'verdadero_falso', ingles: 'A duck can swim.', espanol: 'Un pato puede nadar.', correcta: 'True' },
  { id: 20, tipo: 'verdadero_falso', ingles: 'A rock can walk.', espanol: 'Una roca puede caminar.', correcta: 'False' },
  { id: 21, tipo: 'verdadero_falso', ingles: 'Ice is hot.', espanol: 'El hielo está caliente.', correcta: 'False' },
  { id: 22, tipo: 'verdadero_falso', ingles: 'The ocean has water.', espanol: 'El océano tiene agua.', correcta: 'True' },
  { id: 23, tipo: 'verdadero_falso', ingles: 'A spider has eight legs.', espanol: 'Una araña tiene ocho patas.', correcta: 'True' },
  { id: 24, tipo: 'verdadero_falso', ingles: 'A bird has four legs.', espanol: 'Un pájaro tiene cuatro patas.', correcta: 'False' },
  { id: 25, tipo: 'verdadero_falso', ingles: 'Milk is white.', espanol: 'La leche es blanca.', correcta: 'True' },
  { id: 26, tipo: 'verdadero_falso', ingles: 'The night is bright like day.', espanol: 'La noche es brillante como el día.', correcta: 'False' },
  { id: 27, tipo: 'verdadero_falso', ingles: 'A lion is a big cat.', espanol: 'Un león es un gato grande.', correcta: 'True' },
  { id: 28, tipo: 'verdadero_falso', ingles: 'Fish can breathe air like humans.', espanol: 'Los peces pueden respirar aire como los humanos.', correcta: 'False' },
  { id: 29, tipo: 'verdadero_falso', ingles: 'A bee makes honey.', espanol: 'Una abeja hace miel.', correcta: 'True' },
  { id: 30, tipo: 'verdadero_falso', ingles: 'A tree can run.', espanol: 'Un árbol puede correr.', correcta: 'False' },
];

export const relacionarNivel0: EjercicioRelacionar[] = [
  { id: 1, tipo: 'relacionar', pares: [{ ingles: 'Dog', espanol: 'Perro' }, { ingles: 'Cat', espanol: 'Gato' }, { ingles: 'Fish', espanol: 'Pez' }] },
  { id: 2, tipo: 'relacionar', pares: [{ ingles: 'Red', espanol: 'Rojo' }, { ingles: 'Blue', espanol: 'Azul' }, { ingles: 'Green', espanol: 'Verde' }] },
  { id: 3, tipo: 'relacionar', pares: [{ ingles: 'Mother', espanol: 'Madre' }, { ingles: 'Father', espanol: 'Padre' }, { ingles: 'Sister', espanol: 'Hermana' }] },
  { id: 4, tipo: 'relacionar', pares: [{ ingles: 'One', espanol: 'Uno' }, { ingles: 'Two', espanol: 'Dos' }, { ingles: 'Three', espanol: 'Tres' }] },
  { id: 5, tipo: 'relacionar', pares: [{ ingles: 'Apple', espanol: 'Manzana' }, { ingles: 'Bread', espanol: 'Pan' }, { ingles: 'Milk', espanol: 'Leche' }] },
  { id: 6, tipo: 'relacionar', pares: [{ ingles: 'Eye', espanol: 'Ojo' }, { ingles: 'Hand', espanol: 'Mano' }, { ingles: 'Foot', espanol: 'Pie' }] },
  { id: 7, tipo: 'relacionar', pares: [{ ingles: 'Book', espanol: 'Libro' }, { ingles: 'Pencil', espanol: 'Lápiz' }, { ingles: 'Chair', espanol: 'Silla' }] },
  { id: 8, tipo: 'relacionar', pares: [{ ingles: 'Shirt', espanol: 'Camisa' }, { ingles: 'Shoes', espanol: 'Zapatos' }, { ingles: 'Hat', espanol: 'Sombrero' }] },
  { id: 9, tipo: 'relacionar', pares: [{ ingles: 'Monday', espanol: 'Lunes' }, { ingles: 'Tuesday', espanol: 'Martes' }, { ingles: 'Wednesday', espanol: 'Miércoles' }] },
  { id: 10, tipo: 'relacionar', pares: [{ ingles: 'Sun', espanol: 'Sol' }, { ingles: 'Moon', espanol: 'Luna' }, { ingles: 'Star', espanol: 'Estrella' }] },
  { id: 11, tipo: 'relacionar', pares: [{ ingles: 'House', espanol: 'Casa' }, { ingles: 'Door', espanol: 'Puerta' }, { ingles: 'Window', espanol: 'Ventana' }] },
  { id: 12, tipo: 'relacionar', pares: [{ ingles: 'Happy', espanol: 'Feliz' }, { ingles: 'Sad', espanol: 'Triste' }, { ingles: 'Angry', espanol: 'Enojado' }] },
  { id: 13, tipo: 'relacionar', pares: [{ ingles: 'Big', espanol: 'Grande' }, { ingles: 'Small', espanol: 'Pequeño' }, { ingles: 'Tall', espanol: 'Alto' }] },
  { id: 14, tipo: 'relacionar', pares: [{ ingles: 'Water', espanol: 'Agua' }, { ingles: 'Fire', espanol: 'Fuego' }, { ingles: 'Air', espanol: 'Aire' }] },
  { id: 15, tipo: 'relacionar', pares: [{ ingles: 'Yellow', espanol: 'Amarillo' }, { ingles: 'Black', espanol: 'Negro' }, { ingles: 'White', espanol: 'Blanco' }] },
  { id: 16, tipo: 'relacionar', pares: [{ ingles: 'Brother', espanol: 'Hermano' }, { ingles: 'Baby', espanol: 'Bebé' }, { ingles: 'Grandmother', espanol: 'Abuela' }] },
  { id: 17, tipo: 'relacionar', pares: [{ ingles: 'Car', espanol: 'Carro' }, { ingles: 'Bus', espanol: 'Autobús' }, { ingles: 'Bike', espanol: 'Bicicleta' }] },
  { id: 18, tipo: 'relacionar', pares: [{ ingles: 'Cow', espanol: 'Vaca' }, { ingles: 'Pig', espanol: 'Cerdo' }, { ingles: 'Horse', espanol: 'Caballo' }] },
  { id: 19, tipo: 'relacionar', pares: [{ ingles: 'Table', espanol: 'Mesa' }, { ingles: 'Bed', espanol: 'Cama' }, { ingles: 'Lamp', espanol: 'Lámpara' }] },
  { id: 20, tipo: 'relacionar', pares: [{ ingles: 'Morning', espanol: 'Mañana' }, { ingles: 'Night', espanol: 'Noche' }, { ingles: 'Afternoon', espanol: 'Tarde' }] },
];

// ── NIVEL A1 ──────────────────────────────────────────────────────────────────
export const ordenarA1: EjercicioOrdenar[] = [
  { id: 1, tipo: 'ordenar', palabras: ['wake', 'up', 'at', 'seven', 'I'], frase_correcta: 'I wake up at seven', espanol: 'Me despierto a las siete' },
  { id: 2, tipo: 'ordenar', palabras: ['goes', 'to', 'work', 'by', 'bus', 'She'], frase_correcta: 'She goes to work by bus', espanol: 'Ella va al trabajo en autobús' },
  { id: 3, tipo: 'ordenar', palabras: ['eat', 'breakfast', 'every', 'morning', 'We'], frase_correcta: 'We eat breakfast every morning', espanol: 'Desayunamos todas las mañanas' },
  { id: 4, tipo: 'ordenar', palabras: ['plays', 'soccer', 'on', 'weekends', 'He'], frase_correcta: 'He plays soccer on weekends', espanol: 'Él juega fútbol los fines de semana' },
  { id: 5, tipo: 'ordenar', palabras: ['you', 'like', 'coffee?', 'Do'], frase_correcta: 'Do you like coffee?', espanol: '¿Te gusta el café?' },
  { id: 6, tipo: 'ordenar', palabras: ["don't", 'like', 'spicy', 'food', 'I'], frase_correcta: "I don't like spicy food", espanol: 'No me gusta la comida picante' },
  { id: 7, tipo: 'ordenar', palabras: ['is', 'reading', 'a', 'book', 'She'], frase_correcta: 'She is reading a book', espanol: 'Ella está leyendo un libro' },
  { id: 8, tipo: 'ordenar', palabras: ['are', 'watching', 'TV', 'now', 'They'], frase_correcta: 'They are watching TV now', espanol: 'Ellos están viendo televisión ahora' },
  { id: 9, tipo: 'ordenar', palabras: ['time', 'is', 'it?', 'What'], frase_correcta: 'What time is it?', espanol: '¿Qué hora es?' },
  { id: 10, tipo: 'ordenar', palabras: ['father', 'works', 'in', 'a', 'hospital', 'My'], frase_correcta: 'My father works in a hospital', espanol: 'Mi padre trabaja en un hospital' },
  { id: 11, tipo: 'ordenar', palabras: ['visited', 'my', 'grandmother', 'yesterday', 'I'], frase_correcta: 'I visited my grandmother yesterday', espanol: 'Visité a mi abuela ayer' },
  { id: 12, tipo: 'ordenar', palabras: ['went', 'to', 'the', 'park', 'We'], frase_correcta: 'We went to the park', espanol: 'Fuimos al parque' },
  { id: 13, tipo: 'ordenar', palabras: ['you', 'help', 'me,', 'please?', 'Can'], frase_correcta: 'Can you help me, please?', espanol: '¿Puedes ayudarme, por favor?' },
  { id: 14, tipo: 'ordenar', palabras: ['is', 'a', 'cat', 'under', 'the', 'table', 'There'], frase_correcta: 'There is a cat under the table', espanol: 'Hay un gato debajo de la mesa' },
  { id: 15, tipo: 'ordenar', palabras: ['usually', 'study', 'in', 'the', 'evening', 'I'], frase_correcta: 'I usually study in the evening', espanol: 'Normalmente estudio en la tarde' },
  { id: 16, tipo: 'ordenar', palabras: ['never', 'eats', 'meat', 'She'], frase_correcta: 'She never eats meat', espanol: 'Ella nunca come carne' },
  { id: 17, tipo: 'ordenar', palabras: ['are', 'going', 'to', 'the', 'beach', 'We'], frase_correcta: 'We are going to the beach', espanol: 'Vamos a ir a la playa' },
  { id: 18, tipo: 'ordenar', palabras: ['was', 'tired', 'yesterday', 'He'], frase_correcta: 'He was tired yesterday', espanol: 'Él estaba cansado ayer' },
  { id: 19, tipo: 'ordenar', palabras: ['need', 'to', 'buy', 'some', 'milk', 'I'], frase_correcta: 'I need to buy some milk', espanol: 'Necesito comprar leche' },
  { id: 20, tipo: 'ordenar', palabras: ['best', 'friend', 'lives', 'in', 'Madrid', 'My'], frase_correcta: 'My best friend lives in Madrid', espanol: 'Mi mejor amigo vive en Madrid' },
  { id: 21, tipo: 'ordenar', palabras: ['have', 'two', 'children', 'They'], frase_correcta: 'They have two children', espanol: 'Ellos tienen dos hijos' },
  { id: 22, tipo: 'ordenar', palabras: ['is', 'taller', 'than', 'me', 'She'], frase_correcta: 'She is taller than me', espanol: 'Ella es más alta que yo' },
  { id: 23, tipo: 'ordenar', palabras: ['finished', 'my', 'homework', 'already', 'I'], frase_correcta: 'I finished my homework already', espanol: 'Ya terminé mi tarea' },
  { id: 24, tipo: 'ordenar', palabras: ['will', 'travel', 'next', 'summer', 'We'], frase_correcta: 'We will travel next summer', espanol: 'Viajaremos el próximo verano' },
  { id: 25, tipo: 'ordenar', palabras: ['is', 'a', 'very', 'good', 'teacher', 'He'], frase_correcta: 'He is a very good teacher', espanol: 'Él es un muy buen maestro' },
  { id: 26, tipo: 'ordenar', palabras: ['am', 'cooking', 'dinner', 'right', 'now', 'I'], frase_correcta: 'I am cooking dinner right now', espanol: 'Estoy cocinando la cena ahora mismo' },
  { id: 27, tipo: 'ordenar', palabras: ['do', 'you', 'live?', 'Where'], frase_correcta: 'Where do you live?', espanol: '¿Dónde vives?' },
  { id: 28, tipo: 'ordenar', palabras: ['bought', 'a', 'new', 'dress', 'She'], frase_correcta: 'She bought a new dress', espanol: 'Ella compró un vestido nuevo' },
  { id: 29, tipo: 'ordenar', palabras: ['parents', 'are', 'very', 'nice', 'My'], frase_correcta: 'My parents are very nice', espanol: 'Mis padres son muy amables' },
  { id: 30, tipo: 'ordenar', palabras: ['have', 'never', 'been', 'to', 'Peru', 'I'], frase_correcta: 'I have never been to Peru', espanol: 'Nunca he estado en Perú' },
];

export const verdaderoFalsoA1: EjercicioVerdaderoFalso[] = [
  { id: 1, tipo: 'verdadero_falso', ingles: 'Paris is the capital of France.', espanol: 'París es la capital de Francia.', correcta: 'True' },
  { id: 2, tipo: 'verdadero_falso', ingles: 'The Earth is bigger than the sun.', espanol: 'La Tierra es más grande que el sol.', correcta: 'False' },
  { id: 3, tipo: 'verdadero_falso', ingles: 'Ice melts when it gets hot.', espanol: 'El hielo se derrite cuando hace calor.', correcta: 'True' },
  { id: 4, tipo: 'verdadero_falso', ingles: 'Fish live in the desert.', espanol: 'Los peces viven en el desierto.', correcta: 'False' },
  { id: 5, tipo: 'verdadero_falso', ingles: 'There are seven days in a week.', espanol: 'Hay siete días en una semana.', correcta: 'True' },
  { id: 6, tipo: 'verdadero_falso', ingles: 'A year has ten months.', espanol: 'Un año tiene diez meses.', correcta: 'False' },
  { id: 7, tipo: 'verdadero_falso', ingles: 'The Great Wall is in China.', espanol: 'La Gran Muralla está en China.', correcta: 'True' },
  { id: 8, tipo: 'verdadero_falso', ingles: 'Penguins live in the desert.', espanol: 'Los pingüinos viven en el desierto.', correcta: 'False' },
  { id: 9, tipo: 'verdadero_falso', ingles: 'Humans need water to survive.', espanol: 'Los humanos necesitan agua para sobrevivir.', correcta: 'True' },
  { id: 10, tipo: 'verdadero_falso', ingles: 'Spiders are insects.', espanol: 'Las arañas son insectos.', correcta: 'False' },
  { id: 11, tipo: 'verdadero_falso', ingles: 'The Pacific is the largest ocean.', espanol: 'El Pacífico es el océano más grande.', correcta: 'True' },
  { id: 12, tipo: 'verdadero_falso', ingles: 'Bananas grow underground.', espanol: 'Los plátanos crecen bajo tierra.', correcta: 'False' },
  { id: 13, tipo: 'verdadero_falso', ingles: 'A triangle has three sides.', espanol: 'Un triángulo tiene tres lados.', correcta: 'True' },
  { id: 14, tipo: 'verdadero_falso', ingles: 'Whales are fish.', espanol: 'Las ballenas son peces.', correcta: 'False' },
  { id: 15, tipo: 'verdadero_falso', ingles: 'Coffee comes from beans.', espanol: 'El café viene de granos.', correcta: 'True' },
  { id: 16, tipo: 'verdadero_falso', ingles: 'The moon is closer to Earth than the sun.', espanol: 'La luna está más cerca de la Tierra que el sol.', correcta: 'True' },
  { id: 17, tipo: 'verdadero_falso', ingles: 'Sharks live in trees.', espanol: 'Los tiburones viven en los árboles.', correcta: 'False' },
  { id: 18, tipo: 'verdadero_falso', ingles: 'Winter is usually colder than summer.', espanol: 'El invierno suele ser más frío que el verano.', correcta: 'True' },
  { id: 19, tipo: 'verdadero_falso', ingles: 'Chocolate is made from cocoa.', espanol: 'El chocolate se hace con cacao.', correcta: 'True' },
  { id: 20, tipo: 'verdadero_falso', ingles: 'Kangaroos live in Canada.', espanol: 'Los canguros viven en Canadá.', correcta: 'False' },
  { id: 21, tipo: 'verdadero_falso', ingles: 'The human body has two hearts.', espanol: 'El cuerpo humano tiene dos corazones.', correcta: 'False' },
  { id: 22, tipo: 'verdadero_falso', ingles: 'Rainbows appear after rain.', espanol: 'Los arcoíris aparecen después de la lluvia.', correcta: 'True' },
  { id: 23, tipo: 'verdadero_falso', ingles: 'Bats are birds.', espanol: 'Los murciélagos son aves.', correcta: 'False' },
  { id: 24, tipo: 'verdadero_falso', ingles: 'English is spoken in the United Kingdom.', espanol: 'El inglés se habla en el Reino Unido.', correcta: 'True' },
  { id: 25, tipo: 'verdadero_falso', ingles: 'A week has five days.', espanol: 'Una semana tiene cinco días.', correcta: 'False' },
  { id: 26, tipo: 'verdadero_falso', ingles: 'Honey never goes bad.', espanol: 'La miel nunca se echa a perder.', correcta: 'True' },
  { id: 27, tipo: 'verdadero_falso', ingles: 'The heart pumps blood.', espanol: 'El corazón bombea sangre.', correcta: 'True' },
  { id: 28, tipo: 'verdadero_falso', ingles: 'Plants need sunlight to grow.', espanol: 'Las plantas necesitan luz solar para crecer.', correcta: 'True' },
  { id: 29, tipo: 'verdadero_falso', ingles: 'Antarctica is a hot continent.', espanol: 'La Antártida es un continente caliente.', correcta: 'False' },
  { id: 30, tipo: 'verdadero_falso', ingles: 'Tomatoes are a type of fruit.', espanol: 'Los tomates son un tipo de fruta.', correcta: 'True' },
];

export const relacionarA1: EjercicioRelacionar[] = [
  { id: 1, tipo: 'relacionar', pares: [{ ingles: 'Doctor', espanol: 'Médico' }, { ingles: 'Teacher', espanol: 'Maestro' }, { ingles: 'Engineer', espanol: 'Ingeniero' }] },
  { id: 2, tipo: 'relacionar', pares: [{ ingles: 'Hospital', espanol: 'Hospital' }, { ingles: 'School', espanol: 'Escuela' }, { ingles: 'Airport', espanol: 'Aeropuerto' }] },
  { id: 3, tipo: 'relacionar', pares: [{ ingles: 'Run', espanol: 'Correr' }, { ingles: 'Swim', espanol: 'Nadar' }, { ingles: 'Jump', espanol: 'Saltar' }] },
  { id: 4, tipo: 'relacionar', pares: [{ ingles: 'Rainy', espanol: 'Lluvioso' }, { ingles: 'Sunny', espanol: 'Soleado' }, { ingles: 'Cloudy', espanol: 'Nublado' }] },
  { id: 5, tipo: 'relacionar', pares: [{ ingles: 'Yesterday', espanol: 'Ayer' }, { ingles: 'Today', espanol: 'Hoy' }, { ingles: 'Tomorrow', espanol: 'Mañana' }] },
  { id: 6, tipo: 'relacionar', pares: [{ ingles: 'Expensive', espanol: 'Caro' }, { ingles: 'Cheap', espanol: 'Barato' }, { ingles: 'Fast', espanol: 'Rápido' }] },
  { id: 7, tipo: 'relacionar', pares: [{ ingles: 'Restaurant', espanol: 'Restaurante' }, { ingles: 'Supermarket', espanol: 'Supermercado' }, { ingles: 'Bank', espanol: 'Banco' }] },
  { id: 8, tipo: 'relacionar', pares: [{ ingles: 'Breakfast', espanol: 'Desayuno' }, { ingles: 'Lunch', espanol: 'Almuerzo' }, { ingles: 'Dinner', espanol: 'Cena' }] },
  { id: 9, tipo: 'relacionar', pares: [{ ingles: 'Airplane', espanol: 'Avión' }, { ingles: 'Train', espanol: 'Tren' }, { ingles: 'Ship', espanol: 'Barco' }] },
  { id: 10, tipo: 'relacionar', pares: [{ ingles: 'Winter', espanol: 'Invierno' }, { ingles: 'Summer', espanol: 'Verano' }, { ingles: 'Spring', espanol: 'Primavera' }] },
  { id: 11, tipo: 'relacionar', pares: [{ ingles: 'Kitchen', espanol: 'Cocina' }, { ingles: 'Bedroom', espanol: 'Dormitorio' }, { ingles: 'Bathroom', espanol: 'Baño' }] },
  { id: 12, tipo: 'relacionar', pares: [{ ingles: 'Read', espanol: 'Leer' }, { ingles: 'Write', espanol: 'Escribir' }, { ingles: 'Listen', espanol: 'Escuchar' }] },
  { id: 13, tipo: 'relacionar', pares: [{ ingles: 'Nurse', espanol: 'Enfermera' }, { ingles: 'Police officer', espanol: 'Policía' }, { ingles: 'Firefighter', espanol: 'Bombero' }] },
  { id: 14, tipo: 'relacionar', pares: [{ ingles: 'Early', espanol: 'Temprano' }, { ingles: 'Late', espanol: 'Tarde' }, { ingles: 'Now', espanol: 'Ahora' }] },
  { id: 15, tipo: 'relacionar', pares: [{ ingles: 'Strong', espanol: 'Fuerte' }, { ingles: 'Weak', espanol: 'Débil' }, { ingles: 'Brave', espanol: 'Valiente' }] },
  { id: 16, tipo: 'relacionar', pares: [{ ingles: 'Museum', espanol: 'Museo' }, { ingles: 'Library', espanol: 'Biblioteca' }, { ingles: 'Park', espanol: 'Parque' }] },
  { id: 17, tipo: 'relacionar', pares: [{ ingles: 'Buy', espanol: 'Comprar' }, { ingles: 'Sell', espanol: 'Vender' }, { ingles: 'Pay', espanol: 'Pagar' }] },
  { id: 18, tipo: 'relacionar', pares: [{ ingles: 'Weekend', espanol: 'Fin de semana' }, { ingles: 'Holiday', espanol: 'Feriado' }, { ingles: 'Vacation', espanol: 'Vacaciones' }] },
  { id: 19, tipo: 'relacionar', pares: [{ ingles: 'Farmer', espanol: 'Granjero' }, { ingles: 'Chef', espanol: 'Cocinero' }, { ingles: 'Waiter', espanol: 'Mesero' }] },
  { id: 20, tipo: 'relacionar', pares: [{ ingles: 'Loud', espanol: 'Ruidoso' }, { ingles: 'Quiet', espanol: 'Silencioso' }, { ingles: 'Soft', espanol: 'Suave' }] },
];

// ── Función para obtener ejercicios por nivel y tipo ──────────────────────────
export function obtenerEjerciciosPorNivel(nivelIndex: number): {
  ordenar: EjercicioOrdenar[];
  verdaderoFalso: EjercicioVerdaderoFalso[];
  relacionar: EjercicioRelacionar[];
} {
  if (nivelIndex === 0) {
    return { ordenar: ordenarNivel0, verdaderoFalso: verdaderoFalsoNivel0, relacionar: relacionarNivel0 };
  }
  if (nivelIndex === 1) {
    return { ordenar: ordenarA1, verdaderoFalso: verdaderoFalsoA1, relacionar: relacionarA1 };
  }
  // Para niveles sin ejercicios aún, usar Nivel 0 como fallback
  return { ordenar: ordenarNivel0, verdaderoFalso: verdaderoFalsoNivel0, relacionar: relacionarNivel0 };
}
