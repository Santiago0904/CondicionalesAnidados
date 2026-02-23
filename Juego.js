const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Función para mostrar el tablero
function mostrarTablero(tablero) {
  console.log('\nTablero actual:');
  console.log('   0   1   2');
  for (let i = 0; i < 3; i++) {
    let fila = `${i} `;
    for (let j = 0; j < 3; j++) {
      fila += ` ${tablero[i][j] || ' '} `;
      if (j < 2) fila += '|';
    }
    console.log(fila);
    if (i < 2) console.log('  -----------');
  }
  console.log('');
}

// Función para verificar si hay un ganador
function verificarGanador(tablero, jugador) {
  // Verificar filas
  for (let i = 0; i < 3; i++) {
    if (tablero[i][0] === jugador && tablero[i][1] === jugador && tablero[i][2] === jugador) {
      return true;
    }
  }
  // Verificar columnas
  for (let j = 0; j < 3; j++) {
    if (tablero[0][j] === jugador && tablero[1][j] === jugador && tablero[2][j] === jugador) {
      return true;
    }
  }
  // Verificar diagonales
  if (tablero[0][0] === jugador && tablero[1][1] === jugador && tablero[2][2] === jugador) {
    return true;
  }
  if (tablero[0][2] === jugador && tablero[1][1] === jugador && tablero[2][0] === jugador) {
    return true;
  }
  return false;
}

// Función para verificar empate
function verificarEmpate(tablero) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (!tablero[i][j]) {
        return false;
      }
    }
  }
  return true;
}

// Función para preguntar al usuario
function pregunta(pregunta) {
  return new Promise((resolve) => {
    rl.question(pregunta, (respuesta) => {
      resolve(respuesta);
    });
  });
}

// Función principal del juego
async function jugarTriqui() {
  console.log('=====================================');
  console.log('       ¡Bienvenido al Triqui!        ');
  console.log('=====================================');
  console.log('Reglas:');
  console.log('- Dos jugadores: X y O.');
  console.log('- Ingresa fila y columna (ej: 0 1) para colocar tu símbolo.');
  console.log('- Gana el primero en alinear 3 en fila, columna o diagonal.');
  console.log('=====================================');

  let tablero = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];

  let jugadorActual = 'X';
  let juegoTerminado = false;

  mostrarTablero(tablero);

  while (!juegoTerminado) {
    console.log(`Turno del jugador ${jugadorActual}.`);
    const respuesta = await pregunta('Ingresa fila y columna (separados por espacio): ');
    const partes = respuesta.trim().split(' ');

    if (partes.length !== 2) {
      console.log('Entrada inválida. Debe ser dos números separados por espacio (ej: 0 1).');
      continue;
    }

    const fila = parseInt(partes[0]);
    const columna = parseInt(partes[1]);

    if (isNaN(fila) || isNaN(columna) || fila < 0 || fila > 2 || columna < 0 || columna > 2) {
      console.log('Posición inválida. Fila y columna deben ser 0, 1 o 2.');
      continue;
    }

    if (tablero[fila][columna]) {
      console.log('Esa posición ya está ocupada. Elige otra.');
      continue;
    }

    tablero[fila][columna] = jugadorActual;
    mostrarTablero(tablero);

    if (verificarGanador(tablero, jugadorActual)) {
      console.log(`¡Felicidades! El jugador ${jugadorActual} ha ganado al alinear 3 en línea.`);
      juegoTerminado = true;
    } else if (verificarEmpate(tablero)) {
      console.log('¡Es un empate! El tablero está lleno y nadie ganó.');
      juegoTerminado = true;
    } else {
      jugadorActual = jugadorActual === 'X' ? 'O' : 'X';
    }
  }

  console.log('=====================================');
  console.log('¡Gracias por jugar Triqui!');
  rl.close();
}

jugarTriqui();
