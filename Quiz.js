const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Función para preguntar al usuario
function pregunta(pregunta) {
  return new Promise((resolve) => {
    rl.question(pregunta, (respuesta) => {
      resolve(respuesta.trim().toUpperCase());
    });
  });
}

// Preguntas del quiz
const preguntas = [
  {
    pregunta: "¿Cuál es la traducción de 'Hello' en español?",
    opciones: { A: "Hola", B: "Adiós", C: "Gracias", D: "Por favor" },
    correcta: "A",
    explicacion: "'Hello' significa 'Hola' en español."
  },
  {
    pregunta: "¿Cómo se dice 'Thank you' en español?",
    opciones: { A: "Hola", B: "Adiós", C: "Gracias", D: "Por favor" },
    correcta: "C",
    explicacion: "'Thank you' significa 'Gracias'."
  },
  {
    pregunta: "¿Cuál es el plural de 'book'?",
    opciones: { A: "Books", B: "Bookes", C: "Bookies", D: "Booker" },
    correcta: "A",
    explicacion: "El plural de 'book' es 'books'."
  },
  {
    pregunta: "¿Qué significa 'Goodbye'?",
    opciones: { A: "Hola", B: "Adiós", C: "Gracias", D: "Perdón" },
    correcta: "B",
    explicacion: "'Goodbye' significa 'Adiós'."
  },
  {
    pregunta: "¿Cuál es la forma correcta: 'I am' o 'I is'?",
    opciones: { A: "I am", B: "I is", C: "Am I", D: "Is I" },
    correcta: "A",
    explicacion: "La forma correcta es 'I am'."
  },
  {
    pregunta: "¿Cómo se dice 'Please' en español?",
    opciones: { A: "Hola", B: "Adiós", C: "Gracias", D: "Por favor" },
    correcta: "D",
    explicacion: "'Please' significa 'Por favor'."
  },
  {
    pregunta: "¿Cuál es el opuesto de 'big'?",
    opciones: { A: "Small", B: "Large", C: "Tall", D: "Short" },
    correcta: "A",
    explicacion: "El opuesto de 'big' es 'small'."
  },
  {
    pregunta: "¿Qué tiempo verbal es 'I eat'?",
    opciones: { A: "Pasado", B: "Presente", C: "Futuro", D: "Condicional" },
    correcta: "B",
    explicacion: "'I eat' es presente simple."
  },
  {
    pregunta: "¿Cómo se dice 'Excuse me' en español?",
    opciones: { A: "Hola", B: "Adiós", C: "Perdón", D: "Gracias" },
    correcta: "C",
    explicacion: "'Excuse me' significa 'Perdón'."
  },
  {
    pregunta: "¿Cuál es la traducción de 'Water'?",
    opciones: { A: "Fuego", B: "Agua", C: "Tierra", D: "Aire" },
    correcta: "B",
    explicacion: "'Water' significa 'Agua'."
  }
];

// Función principal del quiz
async function jugarQuiz() {
  console.log('=====================================');
  console.log('       ¡Bienvenido al Quiz de Inglés!     ');
  console.log('=====================================');
  console.log('Responde las 10 preguntas de selección múltiple.');
  console.log('Elige A, B, C o D. ¡Buena suerte!');
  console.log('=====================================\n');

  let puntuacion = 0;

  for (let i = 0; i < preguntas.length; i++) {
    const q = preguntas[i];
    console.log(`Pregunta ${i + 1} de ${preguntas.length}:`);
    console.log(q.pregunta);
    console.log(`A) ${q.opciones.A}`);
    console.log(`B) ${q.opciones.B}`);
    console.log(`C) ${q.opciones.C}`);
    console.log(`D) ${q.opciones.D}\n`);

    let respuestaValida = false;
    while (!respuestaValida) {
      const respuesta = await pregunta('Tu respuesta (A/B/C/D): ');
      if (['A', 'B', 'C', 'D'].includes(respuesta)) {
        respuestaValida = true;
        if (respuesta === q.correcta) {
          console.log('¡Correcto! 🎉');
          puntuacion++;
        } else {
          console.log(`Incorrecto. La respuesta correcta es ${q.correcta}) ${q.opciones[q.correcta]}.`);
        }
        console.log(q.explicacion);
        console.log('---\n');
      } else {
        console.log('Respuesta inválida. Por favor, elige A, B, C o D.\n');
      }
    }
  }

  console.log('=====================================');
  console.log('       ¡Quiz terminado!     ');
  console.log('=====================================');
  console.log(`Tu puntuación final: ${puntuacion} de ${preguntas.length}`);
  if (puntuacion === preguntas.length) {
    console.log('¡Excelente! ¡100%! Eres un maestro del inglés básico.');
  } else if (puntuacion >= preguntas.length * 0.8) {
    console.log('¡Muy bien! Casi perfecto.');
  } else if (puntuacion >= preguntas.length * 0.5) {
    console.log('Bien hecho. Sigue practicando.');
  } else {
    console.log('Necesitas estudiar más. ¡No te rindas!');
  }
  console.log('=====================================');
  rl.close();
}

jugarQuiz();
