const numberContainer = document.getElementById("number-container");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");

const totalNumbers = 20;
let numbers = [];
let currentNumber = 1;
let score = 0;
let timer;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

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

function startTimer() {
  let time = 25;
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

function resetGame() {
  clearInterval(timer);
  numberContainer.innerHTML = "";
  currentNumber = 1;
  score = 0;
  scoreElement.textContent = score;
  timerElement.textContent = "";
  createNumbers();
}

createNumbers();