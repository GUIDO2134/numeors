const numberContainer = document.getElementById("number-container");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");

const totalNumbers = 30;
let numbers = [];
let currentNumber = 1;
let score = 0;
let timer;

// Función para desordenar los números en el arreglo
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Crear los números del juego y agregarlos al contenedor
function createNumbers() {
  numbers = Array.from({ length: totalNumbers }, (_, index) => index + 1);
  shuffleArray(numbers);

  for (let i = 0; i < totalNumbers; i++) {
    const number = document.createElement("div");
    number.textContent = numbers[i];
    number.classList.add("number");
    number.addEventListener("click", onNumberClick);
    numberContainer.appendChild(number);
  }
}

// Manejador de evento para cuando se hace clic en un número
function onNumberClick(event) {
  const clickedNumber = event.target;
  const numberValue = parseInt(clickedNumber.textContent);

  if (numberValue === currentNumber) {
    clickedNumber.classList.add("clicked");
    currentNumber++;
    score++;

    if (score === totalNumbers) {
      setTimeout(function() {
        alert("¡Has ganado! ¡Has contado todos los números correctamente!");
        resetGame();
      }, 100);
    }
  } else {
    clickedNumber.classList.add("clicked-wrong");
    setTimeout(function() {
      clickedNumber.classList.remove("clicked-wrong");
    }, 500);
  }

  scoreElement.textContent = score;

  if (score === 1) {
    startTimer();
  }
}

// Iniciar el temporizador
function startTimer() {
  let time = 20;
  timerElement.textContent = time;

  timer = setInterval(function() {
    time--;
    timerElement.textContent = time;

    if (time === 0) {
      clearInterval(timer);
      setTimeout(function() {
        alert("¡Se acabó el tiempo! Has perdido.");
        resetGame();
      }, 100);
    }
  }, 1000);
}

// Reiniciar el juego
function resetGame() {
  clearInterval(timer);
  numberContainer.innerHTML = "";
  currentNumber = 1;
  score = 0;
  scoreElement.textContent = score;
  timerElement.textContent = "";
  createNumbers();
}
// Inicializar el juego al cargar la página
createNumbers();