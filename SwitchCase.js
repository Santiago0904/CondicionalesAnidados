const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Array de preguntas
const preguntas = [
  {
    pregunta: "What is the color of the sky on a clear day?",
    opciones: ["a) Red", "b) Blue", "c) Green", "d) Yellow"],
    correcta: "b"
  },
  {
    pregunta: "How many legs does a cat have?",
    opciones: ["a) 2", "b) 4", "c) 6", "d) 8"],
    correcta: "b"
  },
  {
    pregunta: "What do we use to drink water?",
    opciones: ["a) Fork", "b) Glass", "c) Shoe", "d) Book"],
    correcta: "b"
  },
  {
    pregunta: "Which animal says 'meow'?",
    opciones: ["a) Dog", "b) Cat", "c) Cow", "d) Duck"],
    correcta: "b"
  },
  {
    pregunta: "What is 2 + 2?",
    opciones: ["a) 3", "b) 4", "c) 5", "d) 6"],
    correcta: "b"
  },
  {
    pregunta: "What color is a banana?",
    opciones: ["a) Red", "b) Yellow", "c) Blue", "d) Green"],
    correcta: "b"
  },
  {
    pregunta: "How many fingers do you have on one hand?",
    opciones: ["a) 3", "b) 5", "c) 7", "d) 10"],
    correcta: "b"
  },
  {
    pregunta: "What do bees make?",
    opciones: ["a) Milk", "b) Honey", "c) Bread", "d) Juice"],
    correcta: "b"
  },
  {
    pregunta: "Which is bigger, the sun or the moon?",
    opciones: ["a) Moon", "b) Sun", "c) Both same", "d) None"],
    correcta: "b"
  },
  {
    pregunta: "What do we wear on our feet?",
    opciones: ["a) Hat", "b) Shoes", "c) Gloves", "d) Belt"],
    correcta: "b"
  }
];

// Función para preguntar al usuario
function pregunta(pregunta) {
  return new Promise((resolve) => {
    rl.question(pregunta, (respuesta) => {
      resolve(respuesta.trim().toLowerCase());
    });
  });
}

// Función para dar feedback usando switch case
function darFeedback(respuesta, correcta, preguntaActual) {
  switch (respuesta) {
    case correcta:
      console.log("¡Correcto! 🎉");
      return true;
    case "a":
    case "b":
    case "c":
    case "d":
      console.log(`Incorrecto. 😔 La respuesta correcta es: ${correcta}) ${preguntaActual.opciones.find(opt => opt.startsWith(correcta)).slice(3)}`);
      return false;
    default:
      console.log("Respuesta inválida. Debes elegir a, b, c o d.");
      return null; // Indicar que es inválida
  }
}

// Función principal del quiz
async function jugarQuiz() {
  console.log('=====================================');
  console.log('     ¡Bienvenido al Quiz de Inglés!   ');
  console.log('=====================================');
  console.log('Instrucciones:');
  console.log('- Responde 10 preguntas básicas de inglés.');
  console.log('- Elige la opción correcta: a, b, c o d.');
  console.log('- Gana puntos por cada respuesta correcta.');
  console.log('- ¡Buena suerte!');
  console.log('=====================================');

  let puntaje = 0;
  const totalPreguntas = preguntas.length;

  for (let i = 0; i < totalPreguntas; i++) {
    const preguntaActual = preguntas[i];
    console.log(`\nPregunta ${i + 1}/${totalPreguntas}:`);
    console.log(preguntaActual.pregunta);
    preguntaActual.opciones.forEach(opcion => console.log(opcion));

    let respuestaValida = false;
    while (!respuestaValida) {
      const respuesta = await pregunta('Tu respuesta (a/b/c/d): ');
      const esCorrecta = darFeedback(respuesta, preguntaActual.correcta, preguntaActual);
      if (esCorrecta === true) {
        puntaje++;
        respuestaValida = true;
      } else if (esCorrecta === false) {
        respuestaValida = true;
      } // Si null, repetir
    }

    console.log(`Puntaje actual: ${puntaje}/${i + 1}`);
  }

  console.log('\n=====================================');
  console.log('         ¡Quiz Terminado!            ');
  console.log('=====================================');
  console.log(`Tu puntaje final: ${puntaje}/${totalPreguntas}`);

  // Feedback final usando switch case
  const porcentaje = (puntaje / totalPreguntas) * 100;
  switch (true) {
    case porcentaje === 100:
      console.log('¡Excelente! 100% correcto. ¡Eres un maestro del inglés!');
      break;
    case porcentaje >= 80:
      console.log('¡Muy bien! Tienes un buen conocimiento básico.');
      break;
    case porcentaje >= 60:
      console.log('¡Bien hecho! Pero puedes mejorar un poco más.');
      break;
    case porcentaje >= 40:
      console.log('Regular. Sigue practicando.');
      break;
    default:
      console.log('Necesitas estudiar más. ¡No te desanimes!');
  }

  console.log('=====================================');
  console.log('¡Gracias por jugar el Quiz de Inglés!');
  rl.close();
}

jugarQuiz();
