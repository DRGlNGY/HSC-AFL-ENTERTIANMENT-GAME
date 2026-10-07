const questions = [
  {
    q: "A venue is preparing for a production. Explain why a risk assessment should be completed before technical work begins.",
    answers: ["risk assessment", "hazard", "risk", "safety"]
  },
  {
    q: "A three-phase lighting system needs to distribute electrical load evenly. What is the purpose of balancing the phases?",
    answers: ["power", "distributed", "even", "load"]
  },
  {
    q: "A customer asks a venue worker, 'Could you explain the different seating options?' What type of question is this?",
    answers: ["open"]
  },
  {
    q: "A production needs a lantern that can produce a broad, relatively soft-edged beam. Which lantern would be suitable?",
    answers: ["fresnel"]
  },
  {
    q: "A technician needs to send one video source to several destinations. What type of device could be used to distribute the video signal?",
    answers: ["distribution amplifier", "vda"]
  },
  {
    q: "A microphone produces a signal that is too weak at the mixer. Which mixer control should normally be adjusted first to establish an appropriate input level?",
    answers: ["gain", "input gain"]
  },
  {
    q: "A video is displayed with the wrong proportions. Which setting should be checked first?",
    answers: ["aspect ratio"]
  },
  {
    q: "Explain one reason why a dynamic microphone may be appropriate for a loud live performance.",
    answers: ["rugged", "loud", "durable", "live"]
  },
  {
    q: "A new scenic element is introduced during rehearsal. Which lighting role would decide how it should be incorporated into the lighting design?",
    answers: ["lighting designer"]
  },
  {
    q: "A cable creates a trip hazard in a busy work area. Give one control that physically reduces the hazard.",
    answers: ["cable cover", "cable ramp", "cover"]
  },
  {
    q: "What is the main purpose of a safety chain when suspending a lighting fixture?",
    answers: ["backup", "prevent", "fall"]
  },
  {
    q: "What is the difference between FOH audio and monitor audio?",
    answers: ["audience", "performer", "performers", "foldback", "monitor"]
  }
];

let questionIndex = 0;
let entScore = 0;
let aflScore = 0;

const quizScreen = document.getElementById("quizScreen");
const aflScreen = document.getElementById("aflScreen");
const resultScreen = document.getElementById("resultScreen");

const questionNumber = document.getElementById("questionNumber");
const questionText = document.getElementById("question");
const answerBox = document.getElementById("answer");
const feedback = document.getElementById("feedback");

const player = document.getElementById("player");
const field = document.getElementById("field");
const ball = document.getElementById("ball");

let keys = {};
let gameActive = false;
let hasPossession = true;
let lastTime = performance.now();

let playerX = 50;
let playerY = 70;

let cpuX1 = 43;
let cpuY1 = 52;

let cpuX2 = 59;
let cpuY2 = 45;

function loadQuestion() {
  if (questionIndex >= questions.length) {
    finishGame();
    return;
  }

  questionNumber.textContent =
    `Entertainment Question ${questionIndex + 1}`;

  questionText.textContent = questions[questionIndex].q;

  answerBox.value = "";
  feedback.textContent = "";
  answerBox.focus();
}

function checkAnswer() {
  const response = answerBox.value.toLowerCase().trim();

  if (!response) {
    feedback.textContent = "Type an answer first.";
    feedback.style.color = "#ffd34d";
    return;
  }

  const accepted = questions[questionIndex].answers;

  const correct = accepted.some(word =>
    response.includes(word)
  );

  if (correct) {
    entScore++;
    document.getElementById("entScore").textContent = entScore;

    feedback.style.color = "#55e37d";
    feedback.textContent =
      "✓ Correct! You have earned an AFL play.";

    setTimeout(startAFL, 900);
  } else {
    feedback.style.color = "#ff6868";
    feedback.textContent =
      "✗ Not quite. Review the concept and try again.";
  }
}

document.getElementById("submitBtn").addEventListener("click", checkAnswer);

answerBox.addEventListener("keydown", e => {
  if (e.key === "Enter" && e.ctrlKey) {
    checkAnswer();
  }
});

function startAFL() {
  quizScreen.classList.remove("active");
  aflScreen.classList.add("active");

  gameActive = true;
  hasPossession = true;

  playerX = 50;
  playerY = 70;

  updatePositions();

  document.getElementById("playText").textContent =
    "You're inside attacking range. Read the defenders and make your decision.";

  document.getElementById("gameStatus").textContent =
    "You have possession — move, evade or dispose of the ball.";

  lastTime = performance.now();

  requestAnimationFrame(gameLoop);
}

function updatePositions() {
  player.style.left = `${playerX}%`;
  player.style.top = `${playerY}%`;

  document.querySelector(".cpu1").style.left = `${cpuX1}%`;
  document.querySelector(".cpu1").style.top = `${cpuY1}%`;

  document.querySelector(".cpu2").style.left = `${cpuX2}%`;
  document.querySelector(".cpu2").style.top = `${cpuY2}%`;

  if (hasPossession) {
    ball.style.left = `calc(${playerX}% + 18px)`;
    ball.style.top = `calc(${playerY}% + 12px)`;
  }
}

function gameLoop(time) {
  if (!gameActive) return;

  const delta = Math.min((time - lastTime) / 16.67, 2);
  lastTime = time;

  movePlayer(delta);
  moveCPU(delta);

  updatePositions();

  checkDefenderPressure();

  requestAnimationFrame(gameLoop);
}

function movePlayer(delta) {
  let speed = keys["shift"] ? 0.42 : 0.24;

  if (keys["e"]) {
    speed = 0.65;
  }

  if (keys["w"]) playerY -= speed * delta;
  if (keys["s"]) playerY += speed * delta;
  if (keys["a"]) playerX -= speed * delta;
  if (keys["d"]) playerX += speed * delta;

  playerX = Math.max(3, Math.min(97, playerX));
  playerY = Math.max(3, Math.min(97, playerY));
}

function moveCPU(delta) {
  // Defender 1 tracks the player.
  cpuX1 += (playerX - cpuX1) * 0.012 * delta;
  cpuY1 += (playerY - cpuY1) * 0.012 * delta;

  // Defender 2 anticipates slightly.
  const targetX = playerX + (keys["d"] ? 4 : keys["a"] ? -4 : 0);
  const targetY = playerY - 3;

  cpuX2 += (targetX - cpuX2) * 0.007 * delta;
  cpuY2 += (targetY - cpuY2) * 0.007 * delta;
}

function checkDefenderPressure() {
  const distance = Math.hypot(
    playerX - cpuX1,
    playerY - cpuY1
  );

  if (distance < 5 && !keys["e"]) {
    document.getElementById("gameStatus").textContent =
      "⚠️ Defender closing! Sprint or evade!";
  }
}

function kick() {
  if (!gameActive || !hasPossession) return;

  hasPossession = false;

  document.getElementById("gameStatus").textContent =
    "KICK! The ball is travelling forward...";

  ball.style.left = `${playerX}%`;
  ball.style.top = `${Math.max(2, playerY - 20)}%`;

  setTimeout(() => {
    const goodKick =
      playerY < 55 &&
      Math.abs(playerX - 50) < 35;

    if (goodKick) {
      aflScore++;
      document.getElementById("aflScore").textContent = aflScore;

      document.getElementById("gameStatus").textContent =
        "🏉 Great kick! Your teammate marks it.";

      nextQuestion();
    } else {
      document.getElementById("gameStatus").textContent =
        "The kick didn't work. The opposition gets the ball.";

      nextQuestion();
    }
  }, 800);
}

function handball() {
  if (!gameActive || !hasPossession) return;

  hasPossession = false;

  document.getElementById("gameStatus").textContent =
    "HANDPASS! You release the ball to your teammate.";

  setTimeout(() => {
    aflScore++;

    document.getElementById("aflScore").textContent = aflScore;

    document.getElementById("gameStatus").textContent =
      "✓ Clean handball! Your teammate keeps possession.";

    nextQuestion();
  }, 700);
}

function leadKick() {
  if (!gameActive || !hasPossession) return;

  hasPossession = false;

  document.getElementById("gameStatus").textContent =
    "LEAD KICK! You kick into space for a teammate.";

  setTimeout(() => {
    aflScore++;

    document.getElementById("aflScore").textContent = aflScore;

    document.getElementById("gameStatus").textContent =
      "✓ Your teammate runs onto it.";

    nextQuestion();
  }, 700);
}

function evade() {
  if (!gameActive) return;

  playerX += keys["d"] ? 7 : keys["a"] ? -7 : 7;

  playerX = Math.max(3, Math.min(97, playerX));

  document.getElementById("gameStatus").textContent =
    "💨 EVASION! You burst away from the defender.";
}

function nextQuestion() {
  gameActive = false;
  questionIndex++;

  setTimeout(() => {
    aflScreen.classList.remove("active");
    quizScreen.classList.add("active");

    loadQuestion();
  }, 1300);
}

function finishGame() {
  quizScreen.classList.remove("active");
  aflScreen.classList.remove("active");
  resultScreen.classList.add("active");

  document.getElementById("finalResult").innerHTML =
    `Entertainment score: <b>${entScore}</b><br>
     AFL score: <b>${aflScore}</b><br><br>
     You completed the HSC Entertainment × AFL challenge!`;
}

document.addEventListener("keydown", e => {
  const key = e.key.toLowerCase();

  if (
    ["w", "a", "s", "d", "shift", "e", "k", "h", "l"].includes(key)
  ) {
    e.preventDefault();
  }

  keys[key] = true;

  if (key === "k") kick();
  if (key === "h") handball();
  if (key === "l") leadKick();
  if (key === "e") evade();
});

document.addEventListener("keyup", e => {
  keys[e.key.toLowerCase()] = false;
});

loadQuestion();
