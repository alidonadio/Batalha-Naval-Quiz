const board = document.getElementById("enemy-board");
const message = document.getElementById("message");
const quizModal = document.getElementById("quiz-modal");
const quizQuestion = document.getElementById("quiz-question");
const quizOptions = document.getElementById("quiz-options");

const BOARD_SIZE = 5;
const SHIP_COUNT = 3;
let ships = [];
let questions = [
  {
    q: "Qual é o resultado de 8 + 5?",
    options: ["12", "13", "14", "15"],
    correct: "13"
  },
  {
    q: "Quanto é 7 x 6?",
    options: ["42", "36", "48", "40"],
    correct: "42"
  },
  {
    q: "Qual é a metade de 100?",
    options: ["25", "30", "50", "60"],
    correct: "50"
  },
  {
    q: "Qual é 25% de 80?",
    options: ["20", "15", "30", "25"],
    correct: "20"
  },
  {
    q: "Quanto é 3²?",
    options: ["6", "9", "8", "12"],
    correct: "9"
  },
  {
    q: "Se x = 5, quanto é 2x + 1?",
    options: ["10", "11", "12", "13"],
    correct: "11"
  },
  {
    q: "Quanto é 100 ÷ 4?",
    options: ["20", "30", "25", "40"],
    correct: "25"
  },
  {
    q: "Quanto é 10% de 200?",
    options: ["10", "15", "20", "25"],
    correct: "20"
  },
  {
    q: "Quantos segundos há em 5 minutos?",
    options: ["300", "150", "250", "60"],
    correct: "300"
  },
  {
    q: "Quanto é 12 - 7?",
    options: ["3", "4", "5", "6"],
    correct: "5"
  },
  {
    q: "Quanto é 9 x 9?",
    options: ["81", "72", "99", "91"],
    correct: "81"
  },
  {
    q: "Se um livro custa R$ 40 e está com 25% de desconto, qual o novo preço?",
    options: ["R$ 30", "R$ 32", "R$ 35", "R$ 28"],
    correct: "R$ 30"
  },
  {
    q: "Qual é o valor de 15 + (3 x 2)?",
    options: ["21", "18", "19", "20"],
    correct: "21"
  }
];

let currentCellIndex = null;

function createBoard() {
  for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", () => handleCellClick(i));
    board.appendChild(cell);
  }
}

function placeShips() {
  let positions = new Set();
  while (positions.size < SHIP_COUNT) {
    positions.add(Math.floor(Math.random() * BOARD_SIZE * BOARD_SIZE));
  }
  ships = [...positions];
}

function handleCellClick(index) {
  if (board.children[index].classList.contains("hit") || board.children[index].classList.contains("miss")) {
    message.textContent = "Você já tentou aqui!";
    return;
  }

  currentCellIndex = index;
  showQuestionModal();
}

function showQuestionModal() {
  let q = questions[Math.floor(Math.random() * questions.length)];
  quizQuestion.textContent = q.q;
  quizOptions.innerHTML = "";
  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => handleAnswer(opt === q.correct);
    quizOptions.appendChild(btn);
  });
  quizModal.style.display = "flex";
}

function handleAnswer(correct) {
  quizModal.style.display = "none";
  questions = questions.filter(q => q.q !== quizQuestion.textContent);

  if (correct) {
    if (ships.includes(currentCellIndex)) {
      board.children[currentCellIndex].classList.add("hit");
      message.textContent = "Acertou um navio!";
    } else {
      board.children[currentCellIndex].classList.add("miss");
      message.textContent = "Resposta certa, mas errou o alvo!";
    }
  } else {
    board.children[currentCellIndex].classList.add("miss");
    message.textContent = "Resposta errada! Tiro perdido.";
  }

  checkWin();
}

function checkWin() {
  const hits = [...board.children].filter(c => c.classList.contains("hit")).length;
  if (hits === SHIP_COUNT) {
    message.textContent = "Você afundou todos os navios! Vitória!";
    board.querySelectorAll(".cell").forEach(c => c.style.pointerEvents = "none");
  }
}

function init() {
  createBoard();
  placeShips();
}

init();