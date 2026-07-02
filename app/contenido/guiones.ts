// Guiones conversacionales para el Modo Conversación
// 6 niveles × 4 guiones × 15 turnos = 360 turnos en total

export interface TurnoConversacion {
  avatar: string;
  opciones: string[];
  correcta: number;
}

export interface GuionConversacion {
  id: string;
  contexto: string;
  turnos: TurnoConversacion[];
}

export const guionesPorNivel: Record<number, GuionConversacion[]> = {
  // ── Nivel 0 ──
  0: [

  // ─── GUIÓN 1: Conociendo a alguien nuevo ───────────────────────────────────
  {
    id: 'nivel0_guion1',
    contexto: 'Conociendo a alguien nuevo',
    turnos: [
      {
        avatar: 'Hi! My name is Michelle. What is your name?',
        opciones: ['My name is Diego.', 'I am fine.', 'Goodbye!'],
        correcta: 0,
      },
      {
        avatar: 'Nice to meet you, Diego! How are you today?',
        opciones: ['See you later!', 'I am good, thank you!', 'My name is Diego.'],
        correcta: 1,
      },
      {
        avatar: 'Great! Where are you from?',
        opciones: ['I am from Colombia.', 'I am ten years old.', 'I like pizza.'],
        correcta: 0,
      },
      {
        avatar: 'Colombia! That is wonderful. How old are you?',
        opciones: ['I am from Colombia.', 'I am twenty-five years old.', 'I am happy.'],
        correcta: 1,
      },
      {
        avatar: 'Do you speak English?',
        opciones: ['Yes, a little.', 'I am Colombia.', 'Goodbye!'],
        correcta: 0,
      },
      {
        avatar: 'That is great! Are you a student or do you work?',
        opciones: ['I am hungry.', 'I am a student.', 'My name is Michelle.'],
        correcta: 1,
      },
      {
        avatar: 'Interesting! Do you have any brothers or sisters?',
        opciones: ['Yes, I have one brother.', 'I am twenty years old.', 'I like coffee.'],
        correcta: 0,
      },
      {
        avatar: 'That is nice. What is your favorite color?',
        opciones: ['I am fine.', 'My favorite color is blue.', 'See you later!'],
        correcta: 1,
      },
      {
        avatar: 'Blue is a beautiful color! Do you like music?',
        opciones: ['Yes, I love music!', 'I am from Colombia.', 'I have one brother.'],
        correcta: 0,
      },
      {
        avatar: 'What kind of music do you like?',
        opciones: ['I am hungry.', 'I like pop music.', 'My name is Diego.'],
        correcta: 1,
      },
      {
        avatar: 'Me too! Do you have a pet?',
        opciones: ['Yes, I have a dog.', 'I am twenty-five.', 'I like blue.'],
        correcta: 0,
      },
      {
        avatar: 'How cute! What is your dog\'s name?',
        opciones: ['My dog\'s name is Max.', 'I am fine.', 'I am from Colombia.'],
        correcta: 0,
      },
      {
        avatar: 'Great name! What is your favorite food?',
        opciones: ['I am good.', 'See you later!', 'My favorite food is pizza.'],
        correcta: 2,
      },
      {
        avatar: 'Pizza is delicious! It was so nice meeting you, Diego.',
        opciones: ['Nice to meet you too!', 'I am hungry.', 'My name is Max.'],
        correcta: 0,
      },
      {
        avatar: 'Have a great day! Goodbye!',
        opciones: ['I am from Colombia.', 'Goodbye! Have a great day too!', 'I like pizza.'],
        correcta: 1,
      },
    ],
  },

  // ─── GUIÓN 2: En el salón de clases ────────────────────────────────────────
  {
    id: 'nivel0_guion2',
    contexto: 'En el salón de clases',
    turnos: [
      {
        avatar: 'Good morning, class! Are you ready to learn?',
        opciones: ['Yes, I am ready!', 'I am hungry.', 'Goodbye!'],
        correcta: 0,
      },
      {
        avatar: 'Excellent! Let\'s start. What is this? It is a book.',
        opciones: ['It is a chair.', 'Yes, it is a book.', 'I am fine.'],
        correcta: 1,
      },
      {
        avatar: 'Very good! Now, what color is the book?',
        opciones: ['The book is red.', 'I am from Colombia.', 'My name is Diego.'],
        correcta: 0,
      },
      {
        avatar: 'Correct! Can you spell the word "book" please?',
        opciones: ['B-O-K', 'B-O-O-K', 'B-U-K'],
        correcta: 1,
      },
      {
        avatar: 'Perfect! What is the first letter of the alphabet?',
        opciones: ['B', 'Z', 'A'],
        correcta: 2,
      },
      {
        avatar: 'That\'s right! How many letters are in the English alphabet?',
        opciones: ['There are twenty-six letters.', 'There are thirty letters.', 'There are ten letters.'],
        correcta: 0,
      },
      {
        avatar: 'Excellent! What number comes after seven?',
        opciones: ['Six', 'Nine', 'Eight'],
        correcta: 2,
      },
      {
        avatar: 'Very good! What color is the sky?',
        opciones: ['The sky is green.', 'The sky is blue.', 'The sky is red.'],
        correcta: 1,
      },
      {
        avatar: 'Correct! What shape is a ball?',
        opciones: ['It is a square.', 'It is a circle.', 'It is a triangle.'],
        correcta: 1,
      },
      {
        avatar: 'Well done! What animal says "woof"?',
        opciones: ['A cat says woof.', 'A bird says woof.', 'A dog says woof.'],
        correcta: 2,
      },
      {
        avatar: 'That\'s right! What do you use to write?',
        opciones: ['I use a pencil.', 'I use a table.', 'I use a chair.'],
        correcta: 0,
      },
      {
        avatar: 'Very good! What is the opposite of "big"?',
        opciones: ['Tall', 'Small', 'Fast'],
        correcta: 1,
      },
      {
        avatar: 'Excellent! What day comes after Monday?',
        opciones: ['Sunday', 'Wednesday', 'Tuesday'],
        correcta: 2,
      },
      {
        avatar: 'Correct! You are doing very well today. Are you tired?',
        opciones: ['No, I am not tired!', 'I am a pencil.', 'The sky is blue.'],
        correcta: 0,
      },
      {
        avatar: 'Great! Class is over. See you tomorrow!',
        opciones: ['Goodbye! See you tomorrow!', 'I am hungry.', 'My name is Diego.'],
        correcta: 0,
      },
    ],
  },

  // ─── GUIÓN 3: En casa con la familia ───────────────────────────────────────
  {
    id: 'nivel0_guion3',
    contexto: 'En casa con la familia',
    turnos: [
      {
        avatar: 'Good evening! Welcome home. How was your day?',
        opciones: ['My day was good, thank you!', 'I am a student.', 'Goodbye!'],
        correcta: 0,
      },
      {
        avatar: 'I am glad! Are you hungry?',
        opciones: ['My name is Diego.', 'Yes, I am very hungry!', 'I like blue.'],
        correcta: 1,
      },
      {
        avatar: 'I made dinner! We have rice and chicken. Do you like chicken?',
        opciones: ['Yes, I love chicken!', 'I am fine.', 'The sky is blue.'],
        correcta: 0,
      },
      {
        avatar: 'Great! Who is in your family?',
        opciones: ['I have a mother and a father.', 'I like pizza.', 'I am twenty years old.'],
        correcta: 0,
      },
      {
        avatar: 'Do you have any brothers or sisters?',
        opciones: ['I am hungry.', 'Yes, I have one sister.', 'My name is Diego.'],
        correcta: 1,
      },
      {
        avatar: 'Nice! How old is your sister?',
        opciones: ['She is fifteen years old.', 'She is blue.', 'She is a cat.'],
        correcta: 0,
      },
      {
        avatar: 'Where does your family live?',
        opciones: ['We live in a house.', 'We live in hungry.', 'We live in chicken.'],
        correcta: 0,
      },
      {
        avatar: 'What room do you like the most in your house?',
        opciones: ['I like the kitchen the most.', 'I like the chicken the most.', 'I like the blue the most.'],
        correcta: 0,
      },
      {
        avatar: 'The kitchen is great! What do you eat for breakfast?',
        opciones: ['I eat eggs and bread.', 'I eat a table.', 'I eat a pencil.'],
        correcta: 0,
      },
      {
        avatar: 'Delicious! Do you have a pet at home?',
        opciones: ['Yes, we have a cat.', 'Yes, we have a table.', 'Yes, we have a kitchen.'],
        correcta: 0,
      },
      {
        avatar: 'How cute! What color is your cat?',
        opciones: ['My cat is orange.', 'My cat is hungry.', 'My cat is a house.'],
        correcta: 0,
      },
      {
        avatar: 'Beautiful! What do you do after dinner?',
        opciones: ['I watch television.', 'I eat a table.', 'I am a pencil.'],
        correcta: 0,
      },
      {
        avatar: 'Good! What time do you go to sleep?',
        opciones: ['I go to sleep at ten o\'clock.', 'I go to sleep hungry.', 'I go to sleep blue.'],
        correcta: 0,
      },
      {
        avatar: 'That is a good time! Do you have a good bed?',
        opciones: ['Yes, my bed is very comfortable.', 'Yes, my bed is very hungry.', 'Yes, my bed is very blue.'],
        correcta: 0,
      },
      {
        avatar: 'Wonderful! It was great talking with you. Good night!',
        opciones: ['Good night! Sleep well!', 'I am hungry.', 'I like chicken.'],
        correcta: 0,
      },
    ],
  },

  // ─── GUIÓN 4: En el parque ──────────────────────────────────────────────────
  {
    id: 'nivel0_guion4',
    contexto: 'En el parque',
    turnos: [
      {
        avatar: 'What a beautiful day! Hello! Are you enjoying the park?',
        opciones: ['Yes, the park is very beautiful!', 'I am a table.', 'Goodbye!'],
        correcta: 0,
      },
      {
        avatar: 'Me too! What is the weather like today?',
        opciones: ['It is sunny and warm.', 'It is a pencil.', 'It is my name.'],
        correcta: 0,
      },
      {
        avatar: 'Perfect weather! Do you like animals?',
        opciones: ['Yes, I love animals!', 'I am hungry.', 'My name is Diego.'],
        correcta: 0,
      },
      {
        avatar: 'Look! There is a bird. What color is the bird?',
        opciones: ['The bird is yellow.', 'The bird is hungry.', 'The bird is a table.'],
        correcta: 0,
      },
      {
        avatar: 'Beautiful! Can you count to five in English?',
        opciones: ['One, two, three, four, five!', 'A, B, C, D, E!', 'Red, blue, green, yellow, orange!'],
        correcta: 0,
      },
      {
        avatar: 'Excellent! What shape is the sun?',
        opciones: ['The sun is a triangle.', 'The sun is a circle.', 'The sun is a square.'],
        correcta: 1,
      },
      {
        avatar: 'Correct! What color is the grass?',
        opciones: ['The grass is blue.', 'The grass is red.', 'The grass is green.'],
        correcta: 2,
      },
      {
        avatar: 'Very good! Do you see any dogs in the park?',
        opciones: ['Yes, I see two dogs!', 'Yes, I see two tables!', 'Yes, I see two pencils!'],
        correcta: 0,
      },
      {
        avatar: 'So cute! What sound does a dog make?',
        opciones: ['A dog says meow.', 'A dog says moo.', 'A dog says woof.'],
        correcta: 2,
      },
      {
        avatar: 'That\'s right! Do you like to run in the park?',
        opciones: ['Yes, I love to run!', 'I am hungry.', 'I am a bird.'],
        correcta: 0,
      },
      {
        avatar: 'Great! How many trees do you see?',
        opciones: ['I see hungry trees.', 'I see five trees.', 'I see blue trees.'],
        correcta: 1,
      },
      {
        avatar: 'Do you want some water? It is hot today!',
        opciones: ['Yes, please! I am thirsty.', 'Yes, please! I am a table.', 'Yes, please! I am a bird.'],
        correcta: 0,
      },
      {
        avatar: 'Here you go! What is your favorite outdoor activity?',
        opciones: ['My favorite activity is walking.', 'My favorite activity is hungry.', 'My favorite activity is a pencil.'],
        correcta: 0,
      },
      {
        avatar: 'That is healthy! The sun is going down. What time is it?',
        opciones: ['It is six o\'clock.', 'It is hungry o\'clock.', 'It is blue o\'clock.'],
        correcta: 0,
      },
      {
        avatar: 'Time to go home! It was nice talking with you. Goodbye!',
        opciones: ['I am hungry.', 'Goodbye! It was nice talking with you too!', 'I like green.'],
        correcta: 1,
      },
    ],
  },

],

  // ── Nivel 1 ──
  1: [

  // ─── GUIÓN 1: En el restaurante ────────────────────────────────────────────
  {
    id: 'nivelA1_guion1',
    contexto: 'En el restaurante',
    turnos: [
      {
        avatar: 'Good evening! Welcome to our restaurant. Do you have a reservation?',
        opciones: ['Yes, I have a reservation for two.', 'I am hungry.', 'My name is Diego.'],
        correcta: 0,
      },
      {
        avatar: 'Perfect! Please follow me to your table. Can I get you something to drink first?',
        opciones: ['Yes, a glass of water please.', 'Yes, a glass of table please.', 'Yes, a glass of chair please.'],
        correcta: 0,
      },
      {
        avatar: 'Of course! Here is the menu. Are you ready to order, or do you need more time?',
        opciones: ['I need a little more time, please.', 'I need a little more chair, please.', 'I need a little more window, please.'],
        correcta: 0,
      },
      {
        avatar: 'No problem! Take your time. Do you have any food allergies?',
        opciones: ['Yes, I am allergic to nuts.', 'Yes, I am allergic to chairs.', 'Yes, I am allergic to windows.'],
        correcta: 0,
      },
      {
        avatar: 'Good to know! I will let the kitchen know. What would you like to eat?',
        opciones: ['I would like the grilled chicken, please.', 'I would like the grilled table, please.', 'I would like the grilled window, please.'],
        correcta: 0,
      },
      {
        avatar: 'Excellent choice! Would you like a salad with that?',
        opciones: ['Yes, please. A green salad.', 'Yes, please. A green table.', 'Yes, please. A green chair.'],
        correcta: 0,
      },
      {
        avatar: 'Great! And what would you like for dessert?',
        opciones: ['I would like chocolate cake, please.', 'I would like chocolate chair, please.', 'I would like chocolate window, please.'],
        correcta: 0,
      },
      {
        avatar: 'Good choice! How would you like your chicken cooked?',
        opciones: ['Well done, please.', 'Well table, please.', 'Well window, please.'],
        correcta: 0,
      },
      {
        avatar: 'Perfect! Your food will be ready in about twenty minutes. Is that okay?',
        opciones: ['Yes, that is fine. Thank you!', 'Yes, that is chair. Thank you!', 'Yes, that is window. Thank you!'],
        correcta: 0,
      },
      {
        avatar: 'Here is your food! Enjoy your meal. Does everything look good?',
        opciones: ['Yes, it looks delicious!', 'Yes, it looks like a table!', 'Yes, it looks like a window!'],
        correcta: 0,
      },
      {
        avatar: 'I am glad! Would you like more water?',
        opciones: ['Yes, please. I am thirsty.', 'Yes, please. I am a table.', 'Yes, please. I am a window.'],
        correcta: 0,
      },
      {
        avatar: 'How is the chicken? Is it good?',
        opciones: ['It is very good! Thank you.', 'It is very table! Thank you.', 'It is very window! Thank you.'],
        correcta: 0,
      },
      {
        avatar: 'I am happy to hear that! Are you ready for your dessert?',
        opciones: ['Yes, please! I love chocolate cake.', 'Yes, please! I love chocolate table.', 'Yes, please! I love chocolate window.'],
        correcta: 0,
      },
      {
        avatar: 'Here it is! Can I get you anything else?',
        opciones: ['No, thank you. Can I have the bill?', 'No, thank you. Can I have the table?', 'No, thank you. Can I have the window?'],
        correcta: 0,
      },
      {
        avatar: 'Of course! Here is your bill. Thank you for dining with us tonight!',
        opciones: ['Thank you! The food was excellent!', 'Thank you! The table was excellent!', 'Thank you! The window was excellent!'],
        correcta: 0,
      },
    ],
  },

  // ─── GUIÓN 2: En la tienda de ropa ─────────────────────────────────────────
  {
    id: 'nivelA1_guion2',
    contexto: 'En la tienda de ropa',
    turnos: [
      {
        avatar: 'Hello! Welcome to our store. Can I help you find something?',
        opciones: ['Yes, I am looking for a shirt.', 'Yes, I am looking for a table.', 'Yes, I am looking for a window.'],
        correcta: 0,
      },
      {
        avatar: 'Great! What color are you looking for?',
        opciones: ['I am looking for a blue shirt.', 'I am looking for a table shirt.', 'I am looking for a window shirt.'],
        correcta: 0,
      },
      {
        avatar: 'We have some beautiful blue shirts! What size do you wear?',
        opciones: ['I wear a medium size.', 'I wear a table size.', 'I wear a window size.'],
        correcta: 0,
      },
      {
        avatar: 'Medium, perfect! Here are some options. Do you like this one?',
        opciones: ['Yes, it looks nice! Can I try it on?', 'Yes, it looks table! Can I try it on?', 'Yes, it looks window! Can I try it on?'],
        correcta: 0,
      },
      {
        avatar: 'Of course! The fitting room is right over there.',
        opciones: ['Thank you! I will try it on now.', 'Thank you! I will table it on now.', 'Thank you! I will window it on now.'],
        correcta: 0,
      },
      {
        avatar: 'How does it fit? Is it the right size?',
        opciones: ['It fits perfectly! I love it.', 'It tables perfectly! I love it.', 'It windows perfectly! I love it.'],
        correcta: 0,
      },
      {
        avatar: 'Wonderful! Would you also like to look at some pants?',
        opciones: ['Yes, do you have black pants?', 'Yes, do you have table pants?', 'Yes, do you have window pants?'],
        correcta: 0,
      },
      {
        avatar: 'Yes, we do! We have black pants in many styles. Do you prefer slim or regular fit?',
        opciones: ['I prefer regular fit, please.', 'I prefer table fit, please.', 'I prefer window fit, please.'],
        correcta: 0,
      },
      {
        avatar: 'Great choice! Here are some options. How do you like these?',
        opciones: ['These look great! How much are they?', 'These look table! How much are they?', 'These look window! How much are they?'],
        correcta: 0,
      },
      {
        avatar: 'The pants are thirty dollars and the shirt is twenty-five dollars. Is that okay?',
        opciones: ['Yes, that is a good price!', 'Yes, that is a table price!', 'Yes, that is a window price!'],
        correcta: 0,
      },
      {
        avatar: 'Great! Would you like to pay by cash or card?',
        opciones: ['I would like to pay by card, please.', 'I would like to pay by table, please.', 'I would like to pay by window, please.'],
        correcta: 0,
      },
      {
        avatar: 'Perfect! Do you have a membership card with us?',
        opciones: ['No, I don\'t. Can I get one today?', 'No, I don\'t. Can I get a table today?', 'No, I don\'t. Can I get a window today?'],
        correcta: 0,
      },
      {
        avatar: 'Of course! It is free and gives you ten percent off your next purchase!',
        opciones: ['That sounds great! Yes, please.', 'That sounds table! Yes, please.', 'That sounds window! Yes, please.'],
        correcta: 0,
      },
      {
        avatar: 'Here is your membership card. Would you like a bag for your clothes?',
        opciones: ['Yes, please. A big bag.', 'Yes, please. A table bag.', 'Yes, please. A window bag.'],
        correcta: 0,
      },
      {
        avatar: 'Here you go! Thank you for shopping with us. Come back soon!',
        opciones: ['Thank you! I will definitely come back!', 'Thank you! I will definitely table back!', 'Thank you! I will definitely window back!'],
        correcta: 0,
      },
    ],
  },

  // ─── GUIÓN 3: En el médico ──────────────────────────────────────────────────
  {
    id: 'nivelA1_guion3',
    contexto: 'En el médico',
    turnos: [
      {
        avatar: 'Good morning! Please come in. What brings you in today?',
        opciones: ['I have a headache and a sore throat.', 'I have a table and a sore chair.', 'I have a window and a sore door.'],
        correcta: 0,
      },
      {
        avatar: 'I am sorry to hear that. How long have you had these symptoms?',
        opciones: ['I have had them for two days.', 'I have had them for two tables.', 'I have had them for two windows.'],
        correcta: 0,
      },
      {
        avatar: 'Do you have a fever as well?',
        opciones: ['Yes, I have a slight fever.', 'Yes, I have a slight table.', 'Yes, I have a slight window.'],
        correcta: 0,
      },
      {
        avatar: 'I see. Are you taking any medication at the moment?',
        opciones: ['No, I am not taking any medication.', 'No, I am not taking any table.', 'No, I am not taking any window.'],
        correcta: 0,
      },
      {
        avatar: 'Alright. Let me check your temperature. Can you open your mouth please?',
        opciones: ['Yes, of course. Here you go.', 'Yes, of course. Table you go.', 'Yes, of course. Window you go.'],
        correcta: 0,
      },
      {
        avatar: 'Your temperature is a little high. Are you allergic to any medicine?',
        opciones: ['No, I am not allergic to anything.', 'No, I am not allergic to any table.', 'No, I am not allergic to any window.'],
        correcta: 0,
      },
      {
        avatar: 'Good. Have you been eating and drinking enough water?',
        opciones: ['Yes, but I don\'t have much appetite.', 'Yes, but I table much appetite.', 'Yes, but I window much appetite.'],
        correcta: 0,
      },
      {
        avatar: 'That is common when you feel sick. Are you getting enough rest?',
        opciones: ['Not really. I have been working a lot.', 'Not really. I have been tabling a lot.', 'Not really. I have been windowing a lot.'],
        correcta: 0,
      },
      {
        avatar: 'You need to rest more. Do you have any other symptoms?',
        opciones: ['Yes, my body aches a little.', 'Yes, my table aches a little.', 'Yes, my window aches a little.'],
        correcta: 0,
      },
      {
        avatar: 'It sounds like you have the flu. I will prescribe some medicine. Do you have a pharmacy nearby?',
        opciones: ['Yes, there is one near my house.', 'Yes, there is one near my table.', 'Yes, there is one near my window.'],
        correcta: 0,
      },
      {
        avatar: 'Perfect. Take this medicine twice a day with food. Is that clear?',
        opciones: ['Yes, twice a day with food. I understand.', 'Yes, twice a table with food. I understand.', 'Yes, twice a window with food. I understand.'],
        correcta: 0,
      },
      {
        avatar: 'Also, drink plenty of water and get at least eight hours of sleep. Can you do that?',
        opciones: ['Yes, I will do that. Thank you.', 'Yes, I will table that. Thank you.', 'Yes, I will window that. Thank you.'],
        correcta: 0,
      },
      {
        avatar: 'Good. You should feel better in three to five days. If you don\'t, come back to see me.',
        opciones: ['Okay, I will come back if I don\'t feel better.', 'Okay, I will table back if I don\'t feel better.', 'Okay, I will window back if I don\'t feel better.'],
        correcta: 0,
      },
      {
        avatar: 'Do you have any questions for me before you go?',
        opciones: ['Can I go to work while I am sick?', 'Can I table to work while I am sick?', 'Can I window to work while I am sick?'],
        correcta: 0,
      },
      {
        avatar: 'I recommend you stay home for two days and rest. Take care of yourself!',
        opciones: ['Thank you, doctor! I will rest at home.', 'Thank you, table! I will rest at home.', 'Thank you, window! I will rest at home.'],
        correcta: 0,
      },
    ],
  },

  // ─── GUIÓN 4: En la estación de tren ───────────────────────────────────────
  {
    id: 'nivelA1_guion4',
    contexto: 'En la estación de tren',
    turnos: [
      {
        avatar: 'Hello! Welcome to the train station. How can I help you?',
        opciones: ['I would like to buy a ticket to Medellín.', 'I would like to buy a table to Medellín.', 'I would like to buy a window to Medellín.'],
        correcta: 0,
      },
      {
        avatar: 'Of course! When would you like to travel?',
        opciones: ['I would like to travel tomorrow morning.', 'I would like to travel tomorrow table.', 'I would like to travel tomorrow window.'],
        correcta: 0,
      },
      {
        avatar: 'Great! How many tickets do you need?',
        opciones: ['I need two tickets, please.', 'I need two tables, please.', 'I need two windows, please.'],
        correcta: 0,
      },
      {
        avatar: 'Two tickets! Would you like first class or economy?',
        opciones: ['Economy class, please. It is cheaper.', 'Table class, please. It is cheaper.', 'Window class, please. It is cheaper.'],
        correcta: 0,
      },
      {
        avatar: 'Good choice! The train departs at eight in the morning. Is that okay?',
        opciones: ['Yes, eight in the morning is perfect.', 'Yes, eight in the table is perfect.', 'Yes, eight in the window is perfect.'],
        correcta: 0,
      },
      {
        avatar: 'The tickets cost forty dollars each. That is eighty dollars in total. How would you like to pay?',
        opciones: ['I will pay with my credit card.', 'I will pay with my table card.', 'I will pay with my window card.'],
        correcta: 0,
      },
      {
        avatar: 'Perfect! Can I see your ID please?',
        opciones: ['Yes, here is my passport.', 'Yes, here is my table.', 'Yes, here is my window.'],
        correcta: 0,
      },
      {
        avatar: 'Thank you! Here are your tickets. The train leaves from platform three.',
        opciones: ['Thank you! Which platform did you say?', 'Thank you! Which table did you say?', 'Thank you! Which window did you say?'],
        correcta: 0,
      },
      {
        avatar: 'Platform three! You should arrive at least fifteen minutes early.',
        opciones: ['Okay, fifteen minutes before departure. Got it!', 'Okay, fifteen tables before departure. Got it!', 'Okay, fifteen windows before departure. Got it!'],
        correcta: 0,
      },
      {
        avatar: 'Do you have much luggage to carry?',
        opciones: ['Yes, I have two suitcases.', 'Yes, I have two tables.', 'Yes, I have two windows.'],
        correcta: 0,
      },
      {
        avatar: 'There are lockers in the station if you need to store anything. Do you need a locker?',
        opciones: ['No, thank you. I can manage.', 'No, table you. I can manage.', 'No, window you. I can manage.'],
        correcta: 0,
      },
      {
        avatar: 'Alright! Is there a café near the platform where I can wait?',
        opciones: ['Yes, there is a café near platform two.', 'Yes, there is a table near platform two.', 'Yes, there is a window near platform two.'],
        correcta: 0,
      },
      {
        avatar: 'Great! What time does the train arrive in Medellín?',
        opciones: ['It arrives at noon, at twelve o\'clock.', 'It arrives at table, at twelve o\'clock.', 'It arrives at window, at twelve o\'clock.'],
        correcta: 0,
      },
      {
        avatar: 'Perfect! Is there anything else I can help you with?',
        opciones: ['No, that is everything. Thank you!', 'No, that is table. Thank you!', 'No, that is window. Thank you!'],
        correcta: 0,
      },
      {
        avatar: 'You are welcome! Have a safe and pleasant journey!',
        opciones: ['Thank you! I am sure I will enjoy the trip!', 'Thank you! I am sure I will table the trip!', 'Thank you! I am sure I will window the trip!'],
        correcta: 0,
      },
    ],
  },

],

  // ── Nivel 2 ──
  2: [
  {
    id: 'a2_guion1',
    contexto: 'Pidiendo direcciones en la ciudad',
    turnos: [
      {
        avatar: "Excuse me, can you help me? I'm looking for the train station.",
        opciones: ["Sure, it's two blocks from here.", "I don't like trains.", 'See you tomorrow!'],
        correcta: 0,
      },
      {
        avatar: 'Great! Do you know if it is far from here?',
        opciones: ['I have three brothers.', "It's about ten minutes on foot.", 'The weather is nice today.'],
        correcta: 1,
      },
      {
        avatar: 'Perfect. Should I turn left or right at the corner?',
        opciones: ['I turned off the light.', 'She is my sister.', 'Turn right, then go straight.'],
        correcta: 2,
      },
      {
        avatar: 'Okay, turn right and go straight. What is next?',
        opciones: ["Then you'll see a big supermarket on your left.", 'I bought a new phone yesterday.', 'My favorite color is blue.'],
        correcta: 0,
      },
      {
        avatar: 'A big supermarket, got it. Is the station right after that?',
        opciones: ["No, I don't have any pets.", "Yes, it's just across the street.", 'We watched a movie last night.'],
        correcta: 1,
      },
      {
        avatar: 'That is easy to remember. How long will it take me in total?',
        opciones: ['I usually wake up at seven.', 'This book is very interesting.', 'Probably around fifteen minutes.'],
        correcta: 2,
      },
      {
        avatar: 'Fifteen minutes, perfect. Is there a bus I could take instead?',
        opciones: ['Yes, the number 12 bus stops right there.', "No, I never eat breakfast.", 'My best friend lives in Madrid.'],
        correcta: 0,
      },
      {
        avatar: 'Good to know. Where can I buy a bus ticket?',
        opciones: ['I studied English for two years.', 'You can buy one at that kiosk over there.', 'It rained a lot last winter.'],
        correcta: 1,
      },
      {
        avatar: 'Thank you! How much does a ticket usually cost?',
        opciones: ['I was born in April.', 'He plays soccer every Sunday.', 'It costs about two dollars.'],
        correcta: 2,
      },
      {
        avatar: 'Two dollars, that is cheap. Does the bus come often?',
        opciones: ['Yes, every ten minutes or so.', "No, I haven't seen that movie.", 'They live in a small apartment.'],
        correcta: 0,
      },
      {
        avatar: 'That is convenient. Is the train station open all day?',
        opciones: ["No, I didn't finish my homework.", "Yes, it's open twenty-four hours.", 'She works in a hospital.'],
        correcta: 1,
      },
      {
        avatar: 'Perfect, I will not have any problems then. Are there restrooms inside?',
        opciones: ["No, we don't have any milk.", 'My uncle is a doctor.', "Yes, they're on the second floor."],
        correcta: 2,
      },
      {
        avatar: 'Great, thank you so much for your help.',
        opciones: ["You're welcome! Have a safe trip.", "I'm sorry, I can't hear you.", 'That sounds like a great idea.'],
        correcta: 0,
      },
      {
        avatar: 'I will. By the way, is it going to rain today?',
        opciones: ['Yes, I turned twenty last week.', "I don't think so, the sky looks clear.", 'No, this seat is taken.'],
        correcta: 1,
      },
      {
        avatar: 'That is good news. Thanks again, goodbye!',
        opciones: ['I have two cats at home.', 'The meeting starts at nine.', 'Goodbye! Safe travels.'],
        correcta: 2,
      },
    ],
  },
  {
    id: 'a2_guion2',
    contexto: 'En el aeropuerto (check-in y embarque)',
    turnos: [
      {
        avatar: 'Good morning! Can I see your passport and ticket, please?',
        opciones: ['Sure, here you go.', "I don't have a car.", 'The movie starts soon.'],
        correcta: 0,
      },
      {
        avatar: 'Thank you. How many bags are you checking in today?',
        opciones: ['I have two brothers.', 'Just one suitcase.', "It's very cold today."],
        correcta: 1,
      },
      {
        avatar: 'Okay, please put your suitcase on the scale.',
        opciones: ['I visited Rome last year.', 'She works at a bank.', 'Sure, one moment.'],
        correcta: 2,
      },
      {
        avatar: "It's a bit heavy. Do you have anything you can take out?",
        opciones: ['Yes, I can take out these books.', 'I bought a new laptop.', 'He plays the guitar well.'],
        correcta: 0,
      },
      {
        avatar: "Perfect, that's better now. Would you like a window or aisle seat?",
        opciones: ["I don't like spicy food.", "I'd prefer a window seat, please.", 'They moved last year.'],
        correcta: 1,
      },
      {
        avatar: "Great choice. Here's your boarding pass.",
        opciones: ["No, I've never traveled abroad.", 'The museum is closed on Mondays.', 'Thank you very much.'],
        correcta: 2,
      },
      {
        avatar: 'Your flight boards at gate 22. Do you know where that is?',
        opciones: ['No, could you tell me how to get there?', "No, I don't drink coffee.", 'My cousin is visiting next week.'],
        correcta: 0,
      },
      {
        avatar: 'Sure, go straight and turn left after security.',
        opciones: ['I forgot my umbrella yesterday.', 'Okay, thank you for your help.', 'The train arrives at noon.'],
        correcta: 1,
      },
      {
        avatar: "You're welcome. Do you have any liquids in your carry-on bag?",
        opciones: ['I already watched that show.', 'My apartment is on the third floor.', 'Yes, just a small bottle of water.'],
        correcta: 2,
      },
      {
        avatar: "That's fine, it's under the limit. What time does your flight leave?",
        opciones: ['It leaves at 3:15 in the afternoon.', 'I studied biology in college.', 'She sings in a choir.'],
        correcta: 0,
      },
      {
        avatar: 'Good, you have plenty of time then. Is this your first time flying alone?',
        opciones: ["No, I don't own a bike.", 'Yes, actually it is.', 'He arrived late again.'],
        correcta: 1,
      },
      {
        avatar: "Don't worry, everything will be easy. Do you need any help finding security?",
        opciones: ["I don't like loud music.", 'The library opens at ten.', 'No, I think I can find it.'],
        correcta: 2,
      },
      {
        avatar: 'Great. Have a safe and pleasant flight!',
        opciones: ['Thank you so much, have a nice day too.', 'I have three cats.', 'The exam was difficult.'],
        correcta: 0,
      },
      {
        avatar: 'By the way, is there a place to buy coffee near the gate?',
        opciones: ["I don't have any siblings.", "Yes, there's a café right next to it.", 'The store is closed today.'],
        correcta: 1,
      },
      {
        avatar: 'Perfect, thank you. Enjoy your trip!',
        opciones: ['I work every weekend.', 'My favorite season is winter.', 'Thank you, I will!'],
        correcta: 2,
      },
    ],
  },
  {
    id: 'a2_guion3',
    contexto: 'Planificando un fin de semana con un amigo',
    turnos: [
      {
        avatar: 'Hey! Do you have any plans for this weekend?',
        opciones: ['Not yet, why do you ask?', 'I finished work at six.', 'My sister lives in Canada.'],
        correcta: 0,
      },
      {
        avatar: 'I was thinking we could go hiking on Saturday.',
        opciones: ["I don't have a car.", 'That sounds like a great idea!', "It's raining outside."],
        correcta: 1,
      },
      {
        avatar: 'Great! Have you ever been to Green Mountain?',
        opciones: ['Yes, I ate breakfast already.', 'She works at a bank.', "No, I've never been there."],
        correcta: 2,
      },
      {
        avatar: 'It is beautiful. The trail takes about three hours.',
        opciones: ["Wow, that's a long walk!", 'I bought a new laptop.', 'He plays the guitar well.'],
        correcta: 0,
      },
      {
        avatar: "Don't worry, it's not too difficult. What time should we leave?",
        opciones: ["I don't like spicy food.", "Let's leave around eight in the morning.", 'They moved last year.'],
        correcta: 1,
      },
      {
        avatar: 'Sounds good. Should we bring our own lunch?',
        opciones: ["No, I've never traveled abroad.", 'The museum is closed on Mondays.', "Yes, let's pack some sandwiches."],
        correcta: 2,
      },
      {
        avatar: 'Perfect. Do you think we will need hiking boots?',
        opciones: ['Yes, definitely, the trail can be rocky.', "No, I don't drink coffee.", 'My cousin is visiting next week.'],
        correcta: 0,
      },
      {
        avatar: "Good point, I'll bring mine. Should we invite anyone else?",
        opciones: ['I forgot my umbrella yesterday.', "Sure, let's ask Laura and Tom.", 'The train arrives at noon.'],
        correcta: 1,
      },
      {
        avatar: "Good idea, I'll text them now. What if it rains on Saturday?",
        opciones: ['I already watched that show.', 'My apartment is on the third floor.', 'Then we could go on Sunday instead.'],
        correcta: 2,
      },
      {
        avatar: 'That works for me too. How are we getting there?',
        opciones: ['We can take my car.', 'I studied biology in college.', 'She sings in a choir.'],
        correcta: 0,
      },
      {
        avatar: 'Perfect, that will save us time. Should we bring a camera?',
        opciones: ["No, I don't own a bike.", 'Yes, the view is amazing up there.', 'He arrived late again.'],
        correcta: 1,
      },
      {
        avatar: 'Great idea, I will bring mine too. Do you want to grab breakfast before we go?',
        opciones: ["I don't like loud music.", 'The library opens at ten.', "Sure, there's a nice café near my house."],
        correcta: 2,
      },
      {
        avatar: 'Perfect, let us meet there at seven thirty.',
        opciones: ['Sounds good, see you then!', 'I have three cats.', 'The exam was difficult.'],
        correcta: 0,
      },
      {
        avatar: 'Great, I am really looking forward to this weekend!',
        opciones: ["I don't have any siblings.", "Me too, it's going to be fun!", 'The store is closed today.'],
        correcta: 1,
      },
      {
        avatar: 'Alright, see you Saturday morning. Have a good night!',
        opciones: ['I work every weekend.', 'My favorite season is winter.', 'You too, goodnight!'],
        correcta: 2,
      },
    ],
  },
  {
    id: 'a2_guion4',
    contexto: 'En la peluquería',
    turnos: [
      {
        avatar: 'Hi! Do you have an appointment, or are you a walk-in?',
        opciones: ["I have an appointment for 3 o'clock.", "I don't like shopping.", 'I have a meeting today.'],
        correcta: 0,
      },
      {
        avatar: "Perfect, what's your name, please?",
        opciones: ['I live near the park.', 'My name is Carla.', 'She studies medicine.'],
        correcta: 1,
      },
      {
        avatar: 'Great, please have a seat, Carla. What would you like today?',
        opciones: ['I have two brothers.', "It's very cold today.", "I'd like a haircut, please."],
        correcta: 2,
      },
      {
        avatar: 'Sure. How much would you like me to cut off?',
        opciones: ['Just a few centimeters, please.', "No, I don't have any money.", 'I went to school yesterday.'],
        correcta: 0,
      },
      {
        avatar: 'Okay. Would you like your hair straight or with some layers?',
        opciones: ["I don't understand this question.", 'With layers, please, that would look nice.', 'The movie starts at eight.'],
        correcta: 1,
      },
      {
        avatar: 'That sounds lovely. Do you want to keep the same color?',
        opciones: ['I really enjoy reading books.', 'My father works in a bank.', "Yes, I'd like to keep it the same."],
        correcta: 2,
      },
      {
        avatar: "Perfect. Let's start by washing your hair first.",
        opciones: ['Okay, sounds good.', 'I visited Italy last summer.', 'The bus is always late.'],
        correcta: 0,
      },
      {
        avatar: 'Is the water temperature okay for you?',
        opciones: ["I don't like tea.", "Yes, it's perfect, thank you.", 'She has a new job.'],
        correcta: 1,
      },
      {
        avatar: "Great, I'll start cutting now. Please tell me if it's too short.",
        opciones: ['No, I already had lunch.', 'He is my neighbor.', 'Sure, I will let you know.'],
        correcta: 2,
      },
      {
        avatar: 'How does it look so far?',
        opciones: ['It looks great, I really like it.', "I don't have any pets.", 'The concert was canceled.'],
        correcta: 0,
      },
      {
        avatar: "I'm glad you like it. Would you like me to blow-dry it now?",
        opciones: ["No, I've never been to Peru.", 'Yes, please, that would be great.', 'My sister is getting married.'],
        correcta: 1,
      },
      {
        avatar: 'Perfect, almost done. Do you use any hair products at home?',
        opciones: ['I woke up early today.', 'The weather is nice outside.', 'Yes, I use a special shampoo.'],
        correcta: 2,
      },
      {
        avatar: 'Nice. All finished! What do you think?',
        opciones: ['I love it, thank you so much.', "I don't like the color red.", 'The train was delayed.'],
        correcta: 0,
      },
      {
        avatar: "I'm happy you like it. Would you like to book your next appointment?",
        opciones: ["No, I don't have a car.", 'Yes, could we do it in a month?', 'My favorite sport is basketball.'],
        correcta: 1,
      },
      {
        avatar: 'Perfect, see you then! Have a wonderful day.',
        opciones: ["I'll see you next week.", 'The store closes at nine.', 'Thank you, you too!'],
        correcta: 2,
      },
    ],
  },
],

  // ── Nivel 3 ──
  3: [
  {
    id: 'b1_guion1',
    contexto: 'Entrevista de trabajo',
    turnos: [
      {
        avatar: 'Good morning! Thanks for coming in today. Can you tell me a little about yourself?',
        opciones: ["Sure, I've been working as a graphic designer for five years.", "I don't have a car.", 'The weather is nice today.'],
        correcta: 0,
      },
      {
        avatar: "That's great. What made you apply for this position?",
        opciones: ['I have two brothers.', "I've always admired your company's work.", "It's very cold today."],
        correcta: 1,
      },
      {
        avatar: 'I see. What would you say is your greatest strength?',
        opciones: ['I visited Rome last year.', 'She works at a bank.', "I'm very good at solving problems under pressure."],
        correcta: 2,
      },
      {
        avatar: "That's a valuable skill. Have you ever worked in a team environment before?",
        opciones: ["Yes, I've worked with teams for most of my career.", 'I bought a new laptop.', 'He plays the guitar well.'],
        correcta: 0,
      },
      {
        avatar: 'Good to hear. How would you handle a difficult client?',
        opciones: ["I don't like spicy food.", 'I would listen carefully and try to find a solution.', 'They moved last year.'],
        correcta: 1,
      },
      {
        avatar: "That sounds like a good approach. What's your biggest weakness?",
        opciones: ["No, I've never traveled abroad.", 'The museum is closed on Mondays.', 'Sometimes I spend too much time on details.'],
        correcta: 2,
      },
      {
        avatar: "That's honest of you. Where do you see yourself in five years?",
        opciones: ["I'd like to grow into a leadership role.", "No, I don't drink coffee.", 'My cousin is visiting next week.'],
        correcta: 0,
      },
      {
        avatar: "That's a clear goal. Are you available to start immediately?",
        opciones: ['I forgot my umbrella yesterday.', 'Yes, I could start next Monday.', 'The train arrives at noon.'],
        correcta: 1,
      },
      {
        avatar: 'Perfect. Do you have any questions for me?',
        opciones: ['I already watched that show.', 'My apartment is on the third floor.', 'Yes, what does a typical day look like here?'],
        correcta: 2,
      },
      {
        avatar: "Good question. You'd usually start with a team meeting each morning.",
        opciones: ['That sounds great, I enjoy collaborating.', 'I studied biology in college.', 'She sings in a choir.'],
        correcta: 0,
      },
      {
        avatar: "I'm glad you like the sound of it. What salary range are you expecting?",
        opciones: ["No, I don't own a bike.", "I'm hoping for something around fifty thousand.", 'He arrived late again.'],
        correcta: 1,
      },
      {
        avatar: 'That seems reasonable for this role. When would you be able to provide references?',
        opciones: ["I don't like loud music.", 'The library opens at ten.', 'I could send them to you this week.'],
        correcta: 2,
      },
      {
        avatar: "Perfect, thank you. We'll be in touch by the end of the week.",
        opciones: ['Thank you, I really appreciate the opportunity.', 'I have three cats.', 'The exam was difficult.'],
        correcta: 0,
      },
      {
        avatar: 'It was a pleasure meeting you today.',
        opciones: ["I don't have any siblings.", 'It was a pleasure meeting you too.', 'The store is closed today.'],
        correcta: 1,
      },
      {
        avatar: 'Have a great rest of your day!',
        opciones: ['I work every weekend.', 'My favorite season is winter.', 'Thank you, you too, goodbye!'],
        correcta: 2,
      },
    ],
  },
  {
    id: 'b1_guion2',
    contexto: 'Servicio al cliente: problema con un pedido',
    turnos: [
      {
        avatar: 'Hello, thank you for calling customer service. How can I help you today?',
        opciones: ["I'd like to report a problem with my order.", "I don't like shopping.", 'I have a meeting today.'],
        correcta: 0,
      },
      {
        avatar: 'I am sorry to hear that. Could you give me your order number, please?',
        opciones: ['I live near the park.', "Yes, it's 48213.", 'She studies medicine.'],
        correcta: 1,
      },
      {
        avatar: 'Thank you. What seems to be the issue with your order?',
        opciones: ['I have two brothers.', "It's very cold today.", 'I received the wrong item.'],
        correcta: 2,
      },
      {
        avatar: 'I apologize for the inconvenience. What item did you receive instead?',
        opciones: ['I got a blue jacket instead of the black one I ordered.', "No, I don't have any money.", 'I went to school yesterday.'],
        correcta: 0,
      },
      {
        avatar: 'I understand. Would you like a refund or an exchange?',
        opciones: ["I don't understand this question.", "I'd prefer an exchange, if possible.", 'The movie starts at eight.'],
        correcta: 1,
      },
      {
        avatar: "That's no problem. Do you still have the original packaging?",
        opciones: ['I really enjoy reading books.', 'My father works in a bank.', 'Yes, I kept everything.'],
        correcta: 2,
      },
      {
        avatar: 'Great, that will make the return process easier.',
        opciones: ["That's good to know.", 'I visited Italy last summer.', 'The bus is always late.'],
        correcta: 0,
      },
      {
        avatar: "I'll send you a prepaid return label by email. Is your email address still the same?",
        opciones: ["I don't like tea.", "Yes, it hasn't changed.", 'She has a new job.'],
        correcta: 1,
      },
      {
        avatar: 'Perfect. How soon can you send the item back?',
        opciones: ['No, I already had lunch.', 'He is my neighbor.', 'I can drop it off tomorrow morning.'],
        correcta: 2,
      },
      {
        avatar: "That works well. Once we receive it, we'll ship the correct item right away.",
        opciones: ['Thank you, I appreciate that.', "I don't have any pets.", 'The concert was canceled.'],
        correcta: 0,
      },
      {
        avatar: 'You are welcome. Would you like a discount code for the trouble this has caused?',
        opciones: ["No, I've never been to Peru.", 'Yes, that would be very kind of you.', 'My sister is getting married.'],
        correcta: 1,
      },
      {
        avatar: "I'll send it to your email along with the return label.",
        opciones: ['I woke up early today.', 'The weather is nice outside.', 'Thank you so much for your help.'],
        correcta: 2,
      },
      {
        avatar: 'Is there anything else I can help you with today?',
        opciones: ["No, that's everything, thank you.", "I don't like the color red.", 'The train was delayed.'],
        correcta: 0,
      },
      {
        avatar: 'Alright then. You should receive the correct item within five business days.',
        opciones: ["No, I don't have a car.", "Perfect, I'll keep an eye out for it.", 'My favorite sport is basketball.'],
        correcta: 1,
      },
      {
        avatar: 'Thank you for your patience. Have a great day!',
        opciones: ["I'll see you next week.", 'The store closes at nine.', 'Thank you, you too!'],
        correcta: 2,
      },
    ],
  },
  {
    id: 'b1_guion3',
    contexto: 'Alquilando un apartamento',
    turnos: [
      {
        avatar: 'Hi! Thanks for coming to see the apartment. What are you looking for exactly?',
        opciones: ["I'm looking for a two-bedroom apartment near downtown.", "I don't have a car.", 'The movie starts soon.'],
        correcta: 0,
      },
      {
        avatar: "This one has two bedrooms and it's close to the metro. What's your budget?",
        opciones: ['I have two brothers.', 'I can spend up to eight hundred dollars a month.', "It's very cold today."],
        correcta: 1,
      },
      {
        avatar: 'That works well with this place. Would you like to see the kitchen first?',
        opciones: ['I visited Rome last year.', 'She works at a bank.', 'Sure, that sounds good.'],
        correcta: 2,
      },
      {
        avatar: 'Here it is. It was renovated last year. What do you think?',
        opciones: ['I really like it, it looks very modern.', 'I bought a new laptop.', 'He plays the guitar well.'],
        correcta: 0,
      },
      {
        avatar: "I'm glad you like it. Is the building pet-friendly, by the way?",
        opciones: ["I don't like spicy food.", 'Yes, actually I do have a small dog.', 'They moved last year.'],
        correcta: 1,
      },
      {
        avatar: "That's fine, pets are allowed here. Would you like to see the bathroom next?",
        opciones: ["No, I've never traveled abroad.", 'The museum is closed on Mondays.', 'Yes, please, lead the way.'],
        correcta: 2,
      },
      {
        avatar: 'Here it is. How long have you been looking for an apartment?',
        opciones: ["I've been searching for about a month now.", "No, I don't drink coffee.", 'My cousin is visiting next week.'],
        correcta: 0,
      },
      {
        avatar: "That's a while. Have you seen anything else you liked?",
        opciones: ['I forgot my umbrella yesterday.', 'I saw a few places, but none as nice as this.', 'The train arrives at noon.'],
        correcta: 1,
      },
      {
        avatar: "I'm happy to hear that. What's included in the rent?",
        opciones: ['I already watched that show.', 'My apartment is on the third floor.', "That's actually my question for you."],
        correcta: 2,
      },
      {
        avatar: 'Of course, water and internet are included, but not electricity.',
        opciones: ['That sounds reasonable to me.', 'I studied biology in college.', 'She sings in a choir.'],
        correcta: 0,
      },
      {
        avatar: 'Great. Would you need to move in right away, or later?',
        opciones: ["No, I don't own a bike.", "I'd like to move in by the end of the month.", 'He arrived late again.'],
        correcta: 1,
      },
      {
        avatar: 'That should be possible. Do you have any references from previous landlords?',
        opciones: ["I don't like loud music.", 'The library opens at ten.', 'Yes, I can provide two references.'],
        correcta: 2,
      },
      {
        avatar: 'Perfect, that helps a lot. Do you have any other questions for me?',
        opciones: ['Yes, is parking available nearby?', 'I have three cats.', 'The exam was difficult.'],
        correcta: 0,
      },
      {
        avatar: "There's a parking garage just around the corner.",
        opciones: ["I don't have any siblings.", 'That is very convenient, thank you.', 'The store is closed today.'],
        correcta: 1,
      },
      {
        avatar: "You're welcome. I'll email you the contract details today.",
        opciones: ['I work every weekend.', 'My favorite season is winter.', 'That sounds great, thank you so much.'],
        correcta: 2,
      },
    ],
  },
  {
    id: 'b1_guion4',
    contexto: 'Hablando de experiencias de viaje y planes futuros con un amigo',
    turnos: [
      {
        avatar: 'Hey! I heard you just got back from your trip. How was it?',
        opciones: ['It was amazing, I had such a great time.', "I don't have a car.", 'The movie starts soon.'],
        correcta: 0,
      },
      {
        avatar: 'That is wonderful! Where exactly did you go?',
        opciones: ['I have two brothers.', 'I traveled around Southeast Asia for three weeks.', "It's very cold today."],
        correcta: 1,
      },
      {
        avatar: 'Wow, three weeks! Have you ever traveled that long before?',
        opciones: ['I visited Rome last year.', 'She works at a bank.', 'No, this was actually my longest trip ever.'],
        correcta: 2,
      },
      {
        avatar: 'That must have been an incredible experience. What was your favorite part?',
        opciones: ['I think it was hiking through the mountains in Vietnam.', 'I bought a new laptop.', 'He plays the guitar well.'],
        correcta: 0,
      },
      {
        avatar: 'That sounds beautiful. Did anything unexpected happen during the trip?',
        opciones: ["I don't like spicy food.", 'Yes, we actually got lost for a few hours once.', 'They moved last year.'],
        correcta: 1,
      },
      {
        avatar: 'That sounds a bit scary. How did you find your way back?',
        opciones: ["No, I've never traveled abroad.", 'The museum is closed on Mondays.', 'A local family helped us find the road.'],
        correcta: 2,
      },
      {
        avatar: 'That was lucky! If you could go back, would you do anything differently?',
        opciones: ['I would probably pack lighter next time.', "No, I don't drink coffee.", 'My cousin is visiting next week.'],
        correcta: 0,
      },
      {
        avatar: 'That makes sense. Have you started planning your next trip yet?',
        opciones: ['I forgot my umbrella yesterday.', "Actually, I've been thinking about South America.", 'The train arrives at noon.'],
        correcta: 1,
      },
      {
        avatar: 'That sounds exciting! Which countries are you considering?',
        opciones: ['I already watched that show.', 'My apartment is on the third floor.', "Maybe Peru or Argentina, I haven't decided yet."],
        correcta: 2,
      },
      {
        avatar: 'Both are amazing choices. When are you thinking of going?',
        opciones: ['Probably next summer, if everything goes well.', 'I studied biology in college.', 'She sings in a choir.'],
        correcta: 0,
      },
      {
        avatar: 'That gives you plenty of time to save up. Would you travel alone again?',
        opciones: ["No, I don't own a bike.", "No, I think I'd invite a friend this time.", 'He arrived late again.'],
        correcta: 1,
      },
      {
        avatar: 'That sounds like a good idea. Have you told anyone about your plan yet?',
        opciones: ["I don't like loud music.", 'The library opens at ten.', "Not yet, you're actually the first person I've told."],
        correcta: 2,
      },
      {
        avatar: "I'm honored! I'd love to hear more about it sometime.",
        opciones: ["I'll definitely keep you updated on my plans.", 'I have three cats.', 'The exam was difficult.'],
        correcta: 0,
      },
      {
        avatar: "I'd really appreciate that. By the way, do you have any travel photos?",
        opciones: ["I don't have any siblings.", "Yes, I'll show you some later.", 'The store is closed today.'],
        correcta: 1,
      },
      {
        avatar: "I can't wait to see them! Thanks for sharing your story.",
        opciones: ['I work every weekend.', 'My favorite season is winter.', 'Thank you for listening, it means a lot.'],
        correcta: 2,
      },
    ],
  },
],

  // ── Nivel 4 ──
  4: [
  {
    id: 'b2_guion1',
    contexto: 'Debatiendo sobre sostenibilidad y medio ambiente',
    turnos: [
      {
        avatar: 'I just read an article about how plastic pollution is affecting the oceans. Have you seen it?',
        opciones: ['Yes, I read it too, it was quite shocking.', "I don't have a car.", 'The weather is nice today.'],
        correcta: 0,
      },
      {
        avatar: 'It really was. What do you think we could do to reduce our plastic use?',
        opciones: ['I have two brothers.', 'I think we should start by avoiding single-use plastics.', "It's very cold today."],
        correcta: 1,
      },
      {
        avatar: 'That is a good start. Do you think governments should do more to regulate this?',
        opciones: ['I visited Rome last year.', 'She works at a bank.', 'Definitely, stricter laws would make a real difference.'],
        correcta: 2,
      },
      {
        avatar: "I agree. Although, some people argue that regulations hurt small businesses. What's your take?",
        opciones: ['I understand that concern, but the environment should come first.', 'I bought a new laptop.', 'He plays the guitar well.'],
        correcta: 0,
      },
      {
        avatar: "That's a fair point. Have you made any changes in your own life?",
        opciones: ["I don't like spicy food.", "Yes, I've started using a reusable water bottle.", 'They moved last year.'],
        correcta: 1,
      },
      {
        avatar: "That's a great habit. Do you think individual actions actually make a difference?",
        opciones: ["No, I've never traveled abroad.", 'The museum is closed on Mondays.', 'I believe they do, especially when many people join in.'],
        correcta: 2,
      },
      {
        avatar: "I hope you're right. What about renewable energy, do you think it's the solution?",
        opciones: ["I think it's a big part of the solution, yes.", "No, I don't drink coffee.", 'My cousin is visiting next week.'],
        correcta: 0,
      },
      {
        avatar: 'I agree. Have you ever considered installing solar panels?',
        opciones: ['I forgot my umbrella yesterday.', 'Actually, my family installed some last year.', 'The train arrives at noon.'],
        correcta: 1,
      },
      {
        avatar: "That's impressive! Has it made a noticeable difference in your electricity bill?",
        opciones: ['I already watched that show.', 'My apartment is on the third floor.', "Yes, it's dropped significantly since then."],
        correcta: 2,
      },
      {
        avatar: 'That is great to hear. Do you think companies are doing enough to be sustainable?',
        opciones: ['Honestly, I think many are just doing it for marketing.', 'I studied biology in college.', 'She sings in a choir.'],
        correcta: 0,
      },
      {
        avatar: "That's an interesting point. What would convince you that a company is genuinely sustainable?",
        opciones: ["No, I don't own a bike.", "I'd want to see transparent reports on their impact.", 'He arrived late again.'],
        correcta: 1,
      },
      {
        avatar: 'That makes sense. If you could change one thing about how society handles waste, what would it be?',
        opciones: ["I don't like loud music.", 'The library opens at ten.', "I'd make recycling mandatory everywhere."],
        correcta: 2,
      },
      {
        avatar: 'That would definitely help. Do you think future generations will be better at this than us?',
        opciones: ["I hope so, they're already more aware of the issues.", 'I have three cats.', 'The exam was difficult.'],
        correcta: 0,
      },
      {
        avatar: 'I share that hope. Thanks for such an interesting conversation.',
        opciones: ["I don't have any siblings.", 'Thank you too, I really enjoyed discussing this.', 'The store is closed today.'],
        correcta: 1,
      },
      {
        avatar: "Let's talk again sometime, maybe with some solutions ready!",
        opciones: ['I work every weekend.', 'My favorite season is winter.', "I'd love that, let's plan it soon."],
        correcta: 2,
      },
    ],
  },
  {
    id: 'b2_guion2',
    contexto: 'Negociando una fecha de entrega en el trabajo',
    turnos: [
      {
        avatar: 'Thanks for meeting with me. I wanted to talk about the project deadline.',
        opciones: ["Of course, I've been wanting to discuss that too.", "I don't have a car.", 'The movie starts soon.'],
        correcta: 0,
      },
      {
        avatar: 'As you know, the client is expecting the final draft by Friday.',
        opciones: ['I have two brothers.', 'I am afraid that might be too tight for us.', "It's very cold today."],
        correcta: 1,
      },
      {
        avatar: 'I understand your concern. What exactly is causing the delay?',
        opciones: ['I visited Rome last year.', 'She works at a bank.', "We're still waiting on data from another department."],
        correcta: 2,
      },
      {
        avatar: "That's frustrating. Have you reached out to them about it?",
        opciones: ["Yes, I've sent them two reminders already.", 'I bought a new laptop.', 'He plays the guitar well.'],
        correcta: 0,
      },
      {
        avatar: "Good, at least you've followed up. How much more time do you think you'll need?",
        opciones: ["I don't like spicy food.", "I'd say we need about three extra days.", 'They moved last year.'],
        correcta: 1,
      },
      {
        avatar: 'Three days could work. Would Monday be a realistic deadline for you?',
        opciones: ["No, I've never traveled abroad.", 'The museum is closed on Mondays.', 'Yes, Monday should be manageable.'],
        correcta: 2,
      },
      {
        avatar: "Great, I'll let the client know about the change.",
        opciones: ['Thank you, I appreciate your flexibility.', "No, I don't drink coffee.", 'My cousin is visiting next week.'],
        correcta: 0,
      },
      {
        avatar: 'Not a problem. Is there anything else you need from me to meet that date?',
        opciones: ['I forgot my umbrella yesterday.', 'Actually, could you speed up the review process?', 'The train arrives at noon.'],
        correcta: 1,
      },
      {
        avatar: 'Sure, I can prioritize that starting tomorrow.',
        opciones: ['I already watched that show.', 'My apartment is on the third floor.', 'That would help a lot, thank you.'],
        correcta: 2,
      },
      {
        avatar: "You're welcome. Should we schedule a check-in before Monday?",
        opciones: ['That sounds like a good idea.', 'I studied biology in college.', 'She sings in a choir.'],
        correcta: 0,
      },
      {
        avatar: 'How about Thursday afternoon?',
        opciones: ["No, I don't own a bike.", 'Thursday afternoon works perfectly for me.', 'He arrived late again.'],
        correcta: 1,
      },
      {
        avatar: "Perfect, I'll send a calendar invite. Anything else on your mind?",
        opciones: ["I don't like loud music.", 'The library opens at ten.', 'Just make sure the client is aware of the new timeline.'],
        correcta: 2,
      },
      {
        avatar: "I'll email them right after this meeting.",
        opciones: ['That would put my mind at ease, thanks.', 'I have three cats.', 'The exam was difficult.'],
        correcta: 0,
      },
      {
        avatar: 'No problem at all. Thanks for being so understanding about this.',
        opciones: ["I don't have any siblings.", "Of course, we're all on the same team.", 'The store is closed today.'],
        correcta: 1,
      },
      {
        avatar: "I really appreciate that attitude. Let's talk again on Thursday.",
        opciones: ['I work every weekend.', 'My favorite season is winter.', 'Sounds good, see you then.'],
        correcta: 2,
      },
    ],
  },
  {
    id: 'b2_guion3',
    contexto: 'Club de lectura: discutiendo un libro',
    turnos: [
      {
        avatar: 'So, what did everyone think of the ending of the book?',
        opciones: ['I found it surprisingly emotional, honestly.', "I don't have a car.", 'The weather is nice today.'],
        correcta: 0,
      },
      {
        avatar: 'I felt the same way. Did you expect the main character to make that decision?',
        opciones: ['I have two brothers.', 'Not at all, it completely caught me off guard.', "It's very cold today."],
        correcta: 1,
      },
      {
        avatar: "Same here. What did you think of the author's writing style?",
        opciones: ['I visited Rome last year.', 'She works at a bank.', 'I loved how descriptive it was throughout.'],
        correcta: 2,
      },
      {
        avatar: 'I agree, the imagery was incredible. Which character did you relate to the most?',
        opciones: ['I really connected with the younger sister.', 'I bought a new laptop.', 'He plays the guitar well.'],
        correcta: 0,
      },
      {
        avatar: 'Interesting choice. Why did she stand out to you?',
        opciones: ["I don't like spicy food.", 'She reminded me of my own struggles with change.', 'They moved last year.'],
        correcta: 1,
      },
      {
        avatar: 'That is a powerful connection. Do you think the plot was realistic?',
        opciones: ["No, I've never traveled abroad.", 'The museum is closed on Mondays.', 'Mostly, although a few events felt a bit exaggerated.'],
        correcta: 2,
      },
      {
        avatar: 'I noticed that too. Was there a part you found hard to believe?',
        opciones: ['Yes, the sudden reunion near the end seemed unlikely.', "No, I don't drink coffee.", 'My cousin is visiting next week.'],
        correcta: 0,
      },
      {
        avatar: "That's fair, it did feel rushed. Would you recommend this book to a friend?",
        opciones: ['I forgot my umbrella yesterday.', 'Definitely, despite that one flaw.', 'The train arrives at noon.'],
        correcta: 1,
      },
      {
        avatar: "I'd recommend it too. What do you think the author was trying to say?",
        opciones: ['I already watched that show.', 'My apartment is on the third floor.', 'I think it is about learning to let go of the past.'],
        correcta: 2,
      },
      {
        avatar: 'That is a beautiful theme. Did it remind you of any other books you have read?',
        opciones: ['Yes, it reminded me of another novel about family loss.', 'I studied biology in college.', 'She sings in a choir.'],
        correcta: 0,
      },
      {
        avatar: 'I can see the similarities. What should we read next?',
        opciones: ["No, I don't own a bike.", 'I was thinking we could try something in a different genre.', 'He arrived late again.'],
        correcta: 1,
      },
      {
        avatar: 'That sounds like a nice change. Any suggestions?',
        opciones: ["I don't like loud music.", 'The library opens at ten.', 'Maybe a mystery novel this time.'],
        correcta: 2,
      },
      {
        avatar: 'That could be fun. Has anyone read any good mysteries lately?',
        opciones: ['I actually just finished one last week.', 'I have three cats.', 'The exam was difficult.'],
        correcta: 0,
      },
      {
        avatar: 'Perfect, would you like to suggest that one for next month?',
        opciones: ["I don't have any siblings.", "Sure, I'll bring it up to the group.", 'The store is closed today.'],
        correcta: 1,
      },
      {
        avatar: "Great, let's meet again in a month to discuss it.",
        opciones: ['I work every weekend.', 'My favorite season is winter.', 'Sounds perfect, see you all then.'],
        correcta: 2,
      },
    ],
  },
  {
    id: 'b2_guion4',
    contexto: 'Resolviendo un malentendido con un compañero de trabajo',
    turnos: [
      {
        avatar: "Hey, do you have a minute? I think there's been a misunderstanding between us.",
        opciones: ["Sure, I'd like to clear things up too.", "I don't have a car.", 'The movie starts soon.'],
        correcta: 0,
      },
      {
        avatar: 'I heard you were upset about the comment I made in the meeting.',
        opciones: ['I have two brothers.', 'Yes, it felt a bit dismissive to me.', "It's very cold today."],
        correcta: 1,
      },
      {
        avatar: "I'm sorry you felt that way, that wasn't my intention at all.",
        opciones: ['I visited Rome last year.', 'She works at a bank.', 'I appreciate you saying that.'],
        correcta: 2,
      },
      {
        avatar: 'I was just trying to move the discussion forward, not criticize your idea.',
        opciones: ['I understand now, thanks for explaining.', 'I bought a new laptop.', 'He plays the guitar well.'],
        correcta: 0,
      },
      {
        avatar: 'I should have chosen my words more carefully.',
        opciones: ["I don't like spicy food.", 'It is okay, I probably overreacted a bit too.', 'They moved last year.'],
        correcta: 1,
      },
      {
        avatar: "I don't think you overreacted at all, your feelings were valid.",
        opciones: ["No, I've never traveled abroad.", 'The museum is closed on Mondays.', 'That means a lot, thank you.'],
        correcta: 2,
      },
      {
        avatar: 'Of course. Can we agree to communicate more openly going forward?',
        opciones: ["Absolutely, I'd really like that.", "No, I don't drink coffee.", 'My cousin is visiting next week.'],
        correcta: 0,
      },
      {
        avatar: 'Great. Maybe we could check in with each other after meetings from now on.',
        opciones: ['I forgot my umbrella yesterday.', 'That sounds like a good idea to me.', 'The train arrives at noon.'],
        correcta: 1,
      },
      {
        avatar: 'Perfect. Is there anything else that has been bothering you?',
        opciones: ['I already watched that show.', 'My apartment is on the third floor.', 'Actually, yes, I felt left out of the last decision.'],
        correcta: 2,
      },
      {
        avatar: "I'm sorry to hear that, I didn't realize you felt excluded.",
        opciones: ['I appreciate you listening to me.', 'I studied biology in college.', 'She sings in a choir.'],
        correcta: 0,
      },
      {
        avatar: "I'll make sure to include you in future discussions.",
        opciones: ["No, I don't own a bike.", 'Thank you, that would mean a lot.', 'He arrived late again.'],
        correcta: 1,
      },
      {
        avatar: "You're welcome. I really value working with you.",
        opciones: ["I don't like loud music.", 'The library opens at ten.', 'I feel the same way about you.'],
        correcta: 2,
      },
      {
        avatar: 'I am glad we talked this through.',
        opciones: ['Me too, I feel much better now.', 'I have three cats.', 'The exam was difficult.'],
        correcta: 0,
      },
      {
        avatar: "Let's grab coffee sometime to keep building our working relationship.",
        opciones: ["I don't have any siblings.", "I'd really like that, thank you.", 'The store is closed today.'],
        correcta: 1,
      },
      {
        avatar: "Perfect, I'll message you to set something up.",
        opciones: ['I work every weekend.', 'My favorite season is winter.', 'Sounds great, talk soon.'],
        correcta: 2,
      },
    ],
  },
],

  // ── Nivel 5 ──
  5: [
  {
    id: 'c1_guion1',
    contexto: 'Debate sobre la ética de la inteligencia artificial',
    turnos: [
      {
        avatar: "There's been a lot of debate lately about whether AI systems should be held accountable for their decisions. What's your view?",
        opciones: ["I'd argue that accountability ultimately falls on the developers, not the machine itself.", "I don't have a car.", 'The weather is nice today.'],
        correcta: 0,
      },
      {
        avatar: "That's a compelling stance. But couldn't you say the same logic applies to any tool humans create?",
        opciones: ['I have two brothers.', "To some extent, yes, but AI's autonomy complicates that comparison.", "It's very cold today."],
        correcta: 1,
      },
      {
        avatar: 'Fair enough. Do you think regulation is keeping pace with the technology?',
        opciones: ['I visited Rome last year.', 'She works at a bank.', 'Frankly, I think legislation is lagging significantly behind.'],
        correcta: 2,
      },
      {
        avatar: 'That seems to be a common concern. What would an effective regulatory framework look like, in your opinion?',
        opciones: ['Ideally, it would involve independent audits and transparency requirements.', 'I bought a new laptop.', 'He plays the guitar well.'],
        correcta: 0,
      },
      {
        avatar: 'That sounds reasonable. Who should be responsible for enforcing those audits?',
        opciones: ["I don't like spicy food.", "I'd say an international body would be best suited for that.", 'They moved last year.'],
        correcta: 1,
      },
      {
        avatar: 'Interesting. Do you worry that national interests might undermine such cooperation?',
        opciones: ["No, I've never traveled abroad.", 'The museum is closed on Mondays.', 'Absolutely, geopolitical rivalry could hinder any consensus.'],
        correcta: 2,
      },
      {
        avatar: "That's a valid concern. Shifting gears slightly, what do you make of AI in creative fields, like art or writing?",
        opciones: ['I find it fascinating, though it raises questions about originality.', "No, I don't drink coffee.", 'My cousin is visiting next week.'],
        correcta: 0,
      },
      {
        avatar: "That's an intriguing point. Do you think AI-generated work deserves the same recognition as human-made work?",
        opciones: ['I forgot my umbrella yesterday.', 'Not entirely, since it lacks lived experience behind it.', 'The train arrives at noon.'],
        correcta: 1,
      },
      {
        avatar: "That's a nuanced take. Could that view change as the technology evolves further?",
        opciones: ['I already watched that show.', 'My apartment is on the third floor.', 'It might, though I remain somewhat skeptical for now.'],
        correcta: 2,
      },
      {
        avatar: 'Skepticism seems warranted. Do you think AI will ultimately create more jobs than it eliminates?',
        opciones: ['That is difficult to predict, but history suggests new roles tend to emerge.', 'I studied biology in college.', 'She sings in a choir.'],
        correcta: 0,
      },
      {
        avatar: "That's a fair historical parallel. What sectors do you think are most at risk?",
        opciones: ["No, I don't own a bike.", 'Routine, repetitive tasks seem the most vulnerable to automation.', 'He arrived late again.'],
        correcta: 1,
      },
      {
        avatar: 'That aligns with most forecasts. How should society prepare for that shift?',
        opciones: ["I don't like loud music.", 'The library opens at ten.', 'Investing heavily in reskilling programs would be a sensible start.'],
        correcta: 2,
      },
      {
        avatar: "That's a pragmatic suggestion. Do you think public opinion is shifting toward acceptance of AI?",
        opciones: ["Gradually, though there's still considerable apprehension.", 'I have three cats.', 'The exam was difficult.'],
        correcta: 0,
      },
      {
        avatar: 'That apprehension seems understandable given the pace of change.',
        opciones: ["I don't have any siblings.", 'Indeed, and I think dialogue like this helps address it.', 'The store is closed today.'],
        correcta: 1,
      },
      {
        avatar: 'Well said. This has been a genuinely thought-provoking conversation.',
        opciones: ['I work every weekend.', 'My favorite season is winter.', "Likewise, I've really valued your perspective on this."],
        correcta: 2,
      },
    ],
  },
  {
    id: 'c1_guion2',
    contexto: 'Evaluación de desempeño: dando y recibiendo feedback',
    turnos: [
      {
        avatar: 'Thanks for making time for this review. Overall, how do you feel your quarter went?',
        opciones: ["I'd say it was solid overall, though not without its challenges.", "I don't have a car.", 'The movie starts soon.'],
        correcta: 0,
      },
      {
        avatar: "That's a fair self-assessment. Let's start with what went well.",
        opciones: ['I have two brothers.', "I'm particularly proud of how I handled the client escalation.", "It's very cold today."],
        correcta: 1,
      },
      {
        avatar: "That was indeed impressive. Your composure under pressure didn't go unnoticed.",
        opciones: ['I visited Rome last year.', 'She works at a bank.', 'Thank you, that means a great deal to me.'],
        correcta: 2,
      },
      {
        avatar: "You've earned it. That said, I'd like to touch on an area for growth.",
        opciones: ["Of course, I'm always open to constructive feedback.", 'I bought a new laptop.', 'He plays the guitar well.'],
        correcta: 0,
      },
      {
        avatar: "I appreciate that mindset. I think your delegation skills could use some refinement.",
        opciones: ["I don't like spicy food.", 'That is a fair observation, I do tend to take on too much myself.', 'They moved last year.'],
        correcta: 1,
      },
      {
        avatar: 'Recognizing that is the first step. What do you think is holding you back from delegating more?',
        opciones: ["No, I've never traveled abroad.", 'The museum is closed on Mondays.', "I suppose I worry the outcome won't meet my standards."],
        correcta: 2,
      },
      {
        avatar: "That's an understandable instinct, but it can limit your team's growth as well.",
        opciones: ["That's a good point I hadn't fully considered.", "No, I don't drink coffee.", 'My cousin is visiting next week.'],
        correcta: 0,
      },
      {
        avatar: 'Would you be open to setting some concrete delegation goals for next quarter?',
        opciones: ['I forgot my umbrella yesterday.', "Yes, I'd welcome having something measurable to work toward.", 'The train arrives at noon.'],
        correcta: 1,
      },
      {
        avatar: "Great, let's draft a couple of objectives together before you leave today.",
        opciones: ['I already watched that show.', 'My apartment is on the third floor.', 'That sounds like a productive way to close this out.'],
        correcta: 2,
      },
      {
        avatar: 'Now, shifting to career development, where do you see yourself heading long-term?',
        opciones: ["Ultimately, I'd like to move into a managerial role.", 'I studied biology in college.', 'She sings in a choir.'],
        correcta: 0,
      },
      {
        avatar: "That's a reasonable trajectory given your progress so far. What skills do you feel you still need to develop?",
        opciones: ["No, I don't own a bike.", "I think strategic planning is an area I'd like to strengthen.", 'He arrived late again.'],
        correcta: 1,
      },
      {
        avatar: "That's a great skill to prioritize. I can connect you with a mentor who excels in that area.",
        opciones: ["I don't like loud music.", 'The library opens at ten.', "I'd really appreciate that opportunity."],
        correcta: 2,
      },
      {
        avatar: 'Consider it done. Any final thoughts before we wrap up?',
        opciones: ["Just that I'm grateful for the honest feedback today.", 'I have three cats.', 'The exam was difficult.'],
        correcta: 0,
      },
      {
        avatar: "That's exactly the attitude that will take you far.",
        opciones: ["I don't have any siblings.", "Thank you, I'll keep that in mind going forward.", 'The store is closed today.'],
        correcta: 1,
      },
      {
        avatar: "Great, let's reconvene in three months to check on progress.",
        opciones: ['I work every weekend.', 'My favorite season is winter.', "Sounds good, I'll mark it on my calendar."],
        correcta: 2,
      },
    ],
  },
  {
    id: 'c1_guion3',
    contexto: 'Discusión filosófica sobre la felicidad y el sentido de la vida',
    turnos: [
      {
        avatar: 'Do you think happiness is something we actively pursue, or more of a byproduct of other things?',
        opciones: ["I'd lean toward it being a byproduct, rather than a direct goal.", "I don't have a car.", 'The weather is nice today.'],
        correcta: 0,
      },
      {
        avatar: "That's an interesting stance. What do you think it's a byproduct of?",
        opciones: ['I have two brothers.', 'Meaningful relationships and a sense of purpose, mostly.', "It's very cold today."],
        correcta: 1,
      },
      {
        avatar: 'That resonates with a lot of psychological research, actually.',
        opciones: ['I visited Rome last year.', 'She works at a bank.', "It's reassuring to know intuition and science align there."],
        correcta: 2,
      },
      {
        avatar: 'Indeed. Do you think material success plays any role at all?',
        opciones: ['It plays a role, but arguably a diminishing one past a certain point.', 'I bought a new laptop.', 'He plays the guitar well.'],
        correcta: 0,
      },
      {
        avatar: 'That aligns with the idea of diminishing returns. Have you noticed that in your own life?',
        opciones: ["I don't like spicy food.", 'Honestly, yes, once my basic needs were met.', 'They moved last year.'],
        correcta: 1,
      },
      {
        avatar: 'That is a common realization. Do you think society overemphasizes wealth as a measure of success?',
        opciones: ["No, I've never traveled abroad.", 'The museum is closed on Mondays.', 'Undoubtedly, though that narrative seems slowly shifting.'],
        correcta: 2,
      },
      {
        avatar: 'That shift does seem to be gaining momentum. What would you say gives your life meaning?',
        opciones: ['Primarily, contributing to something larger than myself.', "No, I don't drink coffee.", 'My cousin is visiting next week.'],
        correcta: 0,
      },
      {
        avatar: "That's a noble outlook. Do you think everyone needs a similar sense of purpose to be fulfilled?",
        opciones: ['I forgot my umbrella yesterday.', 'Not necessarily, I think fulfillment looks different for each person.', 'The train arrives at noon.'],
        correcta: 1,
      },
      {
        avatar: "That's a fair distinction. Do you think suffering plays any constructive role in a meaningful life?",
        opciones: ['I already watched that show.', 'My apartment is on the third floor.', 'In some ways, yes, it often deepens our appreciation for joy.'],
        correcta: 2,
      },
      {
        avatar: "That's a compelling perspective. Do you think it's possible to be happy without ever having struggled?",
        opciones: ['I doubt it, contrast seems essential to appreciating happiness.', 'I studied biology in college.', 'She sings in a choir.'],
        correcta: 0,
      },
      {
        avatar: "That's a thought-provoking claim. Do you think this idea applies across all cultures equally?",
        opciones: ["No, I don't own a bike.", 'Not entirely, cultural context shapes how we define happiness.', 'He arrived late again.'],
        correcta: 1,
      },
      {
        avatar: "That's a nuanced way to put it. Has your own definition of happiness changed over the years?",
        opciones: ["I don't like loud music.", 'The library opens at ten.', "Considerably, it's grown far less materialistic with time."],
        correcta: 2,
      },
      {
        avatar: 'That is a natural evolution for many people. Do you think that shift comes with age, or experience?',
        opciones: ["I'd say it's driven more by experience than age itself.", 'I have three cats.', 'The exam was difficult.'],
        correcta: 0,
      },
      {
        avatar: 'That distinction makes sense. This has been a wonderfully reflective conversation.',
        opciones: ["I don't have any siblings.", "I agree, it's rare to discuss these things so openly.", 'The store is closed today.'],
        correcta: 1,
      },
      {
        avatar: 'We should revisit this topic again sometime.',
        opciones: ['I work every weekend.', 'My favorite season is winter.', "I'd genuinely look forward to that."],
        correcta: 2,
      },
    ],
  },
  {
    id: 'c1_guion4',
    contexto: 'Analizando las implicaciones económicas de la automatización laboral',
    turnos: [
      {
        avatar: 'There is growing concern that automation could widen the gap between skilled and unskilled workers. Where do you stand on this?',
        opciones: ['I think that concern is largely justified, unfortunately.', "I don't have a car.", 'The movie starts soon.'],
        correcta: 0,
      },
      {
        avatar: "That's a sobering assessment. What policies do you think could mitigate that gap?",
        opciones: ['I have two brothers.', 'Universal basic income is one proposal worth seriously considering.', "It's very cold today."],
        correcta: 1,
      },
      {
        avatar: "That's certainly a hotly debated solution. What are the main criticisms of it, in your view?",
        opciones: ['I visited Rome last year.', 'She works at a bank.', 'Critics argue it could disincentivize workforce participation.'],
        correcta: 2,
      },
      {
        avatar: 'That is a valid concern raised by economists. Do you think that risk outweighs the potential benefits?',
        opciones: ['Not necessarily, provided the program is well designed.', 'I bought a new laptop.', 'He plays the guitar well.'],
        correcta: 0,
      },
      {
        avatar: 'What would a well-designed program look like, in practical terms?',
        opciones: ["I don't like spicy food.", 'It would likely include gradual phase-outs tied to income.', 'They moved last year.'],
        correcta: 1,
      },
      {
        avatar: 'That seems like a sensible safeguard. Do you think any countries have implemented this successfully so far?',
        opciones: ["No, I've never traveled abroad.", 'The museum is closed on Mondays.', "Finland's pilot program offers some promising, if limited, insights."],
        correcta: 2,
      },
      {
        avatar: "That's a useful case study. Beyond income support, what else should governments prioritize?",
        opciones: ['Substantial investment in lifelong education seems essential.', "No, I don't drink coffee.", 'My cousin is visiting next week.'],
        correcta: 0,
      },
      {
        avatar: "That does seem crucial given how quickly skills become obsolete. Should companies share that responsibility?",
        opciones: ['I forgot my umbrella yesterday.', "Absolutely, they benefit directly from automation's efficiency gains.", 'The train arrives at noon.'],
        correcta: 1,
      },
      {
        avatar: "That's a compelling argument for shared accountability. Do you foresee resistance from the private sector?",
        opciones: ['I already watched that show.', 'My apartment is on the third floor.', 'Undoubtedly, particularly from industries facing thin margins.'],
        correcta: 2,
      },
      {
        avatar: 'That resistance seems predictable. How might policymakers overcome it?',
        opciones: ['Tax incentives could help offset the cost of retraining programs.', 'I studied biology in college.', 'She sings in a choir.'],
        correcta: 0,
      },
      {
        avatar: 'That approach seems politically feasible. Do you think public opinion supports this kind of intervention?',
        opciones: ["No, I don't own a bike.", "Increasingly so, as automation's effects become more visible.", 'He arrived late again.'],
        correcta: 1,
      },
      {
        avatar: 'That shift in sentiment could accelerate reform. What long-term outcome are you hoping for?',
        opciones: ["I don't like loud music.", 'The library opens at ten.', 'Ideally, a smoother transition that leaves fewer workers behind.'],
        correcta: 2,
      },
      {
        avatar: "That's a goal most people could rally behind. Do you think we're moving in that direction currently?",
        opciones: ["Slowly, though there's still considerable ground to cover.", 'I have three cats.', 'The exam was difficult.'],
        correcta: 0,
      },
      {
        avatar: 'Progress often is incremental, unfortunately.',
        opciones: ["I don't have any siblings.", 'True, but incremental progress is still progress.', 'The store is closed today.'],
        correcta: 1,
      },
      {
        avatar: 'Well put. Thanks for such a thoughtful discussion on this.',
        opciones: ['I work every weekend.', 'My favorite season is winter.', 'Thank you as well, this was genuinely insightful.'],
        correcta: 2,
      },
    ],
  },
],

};

export function obtenerGuionesDeNivel(nivelIndex: number): GuionConversacion[] {
  return guionesPorNivel[nivelIndex] || guionesPorNivel[0];
}

export function obtenerGuionAleatorio(nivelIndex: number): GuionConversacion {
  const guiones = obtenerGuionesDeNivel(nivelIndex);
  return guiones[Math.floor(Math.random() * guiones.length)];
}
