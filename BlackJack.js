const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Emojis para palos
const emojisPalos = {
  'Corazones': '♥',
  'Diamantes': '♦',
  'Tréboles': '♣',
  'Picas': '♠'
};

// Función para crear una baraja de cartas
function crearBaraja() {
  const palos = ['Corazones', 'Diamantes', 'Tréboles', 'Picas'];
  const valores = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  const baraja = [];
  for (let palo of palos) {
    for (let valor of valores) {
      baraja.push({ valor, palo });
    }
  }
  return baraja;
}

// Función para mezclar la baraja
function mezclarBaraja(baraja) {
  for (let i = baraja.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [baraja[i], baraja[j]] = [baraja[j], baraja[i]];
  }
  return baraja;
}

// Función para calcular el valor de una mano
function calcularValor(mano) {
  let valor = 0;
  let ases = 0;
  for (let carta of mano) {
    if (carta.valor === 'A') {
      ases++;
      valor += 11;
    } else if (['J', 'Q', 'K'].includes(carta.valor)) {
      valor += 10;
    } else {
      valor += parseInt(carta.valor);
    }
  }
  while (valor > 21 && ases > 0) {
    valor -= 10;
    ases--;
  }
  return valor;
}

// Función para mostrar la mano
function mostrarMano(mano, ocultarPrimera = false) {
  if (ocultarPrimera && mano.length > 1) {
    return `Carta oculta ${emojisPalos[mano[0].palo]}, ${mano[1].valor}${emojisPalos[mano[1].palo]}`;
  }
  return mano.map(carta => `${carta.valor}${emojisPalos[carta.palo]}`).join(', ');
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
async function jugarBlackjack() {
  console.log('=====================================');
  console.log('       ¡Bienvenido al Blackjack!     ');
  console.log('=====================================');
  console.log('Reglas básicas:');
  console.log('- Trata de llegar lo más cerca posible a 21 sin pasarte.');
  console.log('- Las figuras valen 10, el As vale 11 o 1.');
  console.log('- El dealer pide cartas hasta 17.');
  console.log('=====================================');

  let baraja = crearBaraja();
  baraja = mezclarBaraja(baraja);

  console.log('Mezclando la baraja...');
  console.log('Repartiendo cartas iniciales...\n');

  let manoJugador = [baraja.pop(), baraja.pop()];
  let manoDealer = [baraja.pop(), baraja.pop()];

  console.log(`Tu mano: ${mostrarMano(manoJugador)} (Valor total: ${calcularValor(manoJugador)})`);
  console.log(`Mano del dealer: ${mostrarMano(manoDealer, true)}\n`);

  // Turno del jugador
  let turnoJugador = true;
  while (turnoJugador) {
    const valorActual = calcularValor(manoJugador);
    if (valorActual > 21) {
      console.log(`¡Oh no! Tu mano suma ${valorActual}, te has pasado de 21.`);
      console.log('Pierdes esta ronda.');
      rl.close();
      return;
    }
    if (valorActual === 21) {
      console.log('¡Blackjack! Tienes 21. ¡Excelente!');
      turnoJugador = false;
      break;
    }
    const respuesta = await pregunta('¿Quieres pedir otra carta (h) o plantarte (s)? ');
    if (respuesta.toLowerCase() === 'h') {
      const nuevaCarta = baraja.pop();
      manoJugador.push(nuevaCarta);
      console.log(`Pediste una carta: ${nuevaCarta.valor}${emojisPalos[nuevaCarta.palo]}`);
      console.log(`Tu mano ahora: ${mostrarMano(manoJugador)} (Valor total: ${calcularValor(manoJugador)})\n`);
    } else if (respuesta.toLowerCase() === 's') {
      console.log('Te plantas con tu mano actual.');
      turnoJugador = false;
    } else {
      console.log('Opción inválida. Por favor, elige "h" para pedir carta o "s" para plantarte.\n');
    }
  }

  // Turno del dealer
  console.log('\n--- Turno del Dealer ---');
  console.log(`Mano del dealer revelada: ${mostrarMano(manoDealer)} (Valor total: ${calcularValor(manoDealer)})`);
  while (calcularValor(manoDealer) < 17) {
    const nuevaCarta = baraja.pop();
    manoDealer.push(nuevaCarta);
    console.log(`El dealer pide una carta: ${nuevaCarta.valor}${emojisPalos[nuevaCarta.palo]}`);
    console.log(`Mano del dealer: ${mostrarMano(manoDealer)} (Valor total: ${calcularValor(manoDealer)})`);
  }
  if (calcularValor(manoDealer) >= 17) {
    console.log('El dealer se planta.');
  }

  // Determinar ganador
  console.log('\n--- Resultado Final ---');
  const valorJugador = calcularValor(manoJugador);
  const valorDealer = calcularValor(manoDealer);
  console.log(`Tu mano final: ${mostrarMano(manoJugador)} (Valor: ${valorJugador})`);
  console.log(`Mano del dealer final: ${mostrarMano(manoDealer)} (Valor: ${valorDealer})`);

  if (valorDealer > 21) {
    console.log('¡El dealer se pasó de 21! ¡Tú ganas!');
  } else if (valorJugador > 21) {
    console.log('Te pasaste de 21. Pierdes.');
  } else if (valorJugador > valorDealer) {
    console.log('¡Tu mano es mejor! ¡Ganas!');
  } else if (valorJugador < valorDealer) {
    console.log('La mano del dealer es mejor. Pierdes.');
  } else {
    console.log('¡Empate! Ambos tienen el mismo valor.');
  }
  console.log('=====================================');
  rl.close();
}

jugarBlackjack();
