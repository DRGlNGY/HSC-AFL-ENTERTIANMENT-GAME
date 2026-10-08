const questions = [
  {
    q: "A venue is preparing for a production. Explain why a risk assessment should be completed before technical work begins.",
    answers: ["risk assessment"]
  },
  {
    q: "A three-phase lighting system needs to distribute electrical load evenly. What is the purpose of balancing the phases?",
    answers: ["distribute", "distributed", "evenly", "load", "power"]
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
    q: "A technician needs to send one video source to several destinations. What device could distribute the video signal?",
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
    answers: ["rugged", "durable", "high spl", "live"]
  },
  {
    q: "A new scenic element is introduced during rehearsal. Which lighting role would decide how it should be incorporated into the lighting design?",
    answers: ["lighting designer"]
  },
  {
    q: "A cable creates a trip hazard in a busy work area. Give one control that physically reduces the hazard.",
    answers: ["cable cover", "cable ramp"]
  },
  {
    q: "What is the main purpose of a safety chain when suspending a lighting fixture?",
    answers: ["backup", "secondary", "prevent falling", "fall"]
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
const ball = document.getElementById("ball");

let keys = {};
let gameActive = false;
let hasPossession = true;
let lastTime = 0;

let playerX = 50;
let playerY = 70;

let cpuX1 = 43;
let cpuY1 = 52;

let cpuX2 = 59;
let cpuY2 = 45;


/* =========================
   ENTERTAINMENT QUIZ
========================= */

function loadQuestion() {
  if (questionIndex >= questions.length) {
    finishGame();
    return;
  }

  questionNumber.textContent =
    `Entertainment Question ${questionIndex + 1}`;

  questionText.textContent =
    questions[questionIndex].q;

  answerBox.value = "";
  feedback.textContent = "";

  // This is safe because no AFL keyboard controls
  // are active while the quiz screen is showing.
  setTimeout(() => {
    if (quizScreen.classList.contains("active")) {
      answerBox.focus();
    }
  }, 50);
}


function checkAnswer() {
  // Make absolutely sure we're checking the answer box.
  const response = answerBox.value.trim().toLowerCase();

  if (response === "") {
    feedback.textContent = "Type an answer first.";
    feedback.style.color = "#ffd34d";
    return;
  }

  const accepted = questions[questionIndex].answers;

  const correct = accepted.some(answer =>
    response.includes(answer.toLowerCase())
  );

  if (correct) {
    entScore++;

    document.getElementById("entScore").textContent =
      entScore;

    feedback.style.color = "#55e37d";
    feedback.textContent =
      "✓ Correct! AFL play unlocked.";

    setTimeout(() => {
      startAFL();
    }, 900);

  } else {

    feedback.style.color = "#ff6868";
    feedback.textContent =
      "✗ Not quite. Try again.";
  }
}


/* SUBMIT BUTTON */

document
  .getElementById("submitBtn")
  .addEventListener("click", function () {
    checkAnswer();
  });


/*
   ENTER KEY

   IMPORTANT:
   This listener ONLY belongs to the textarea.

   AFL keyboard controls cannot interfere with it.
*/

answerBox.addEventListener("keydown", function (event) {

  if (event.key === "Enter") {

    // Shift+Enter gives a new line.
    if (event.shiftKey) {
      return;
    }

    event.preventDefault();

    checkAnswer();
  }

});


/* =========================
   AFL GAME
========================= */

function startAFL() {

  // Stop any old keyboard state.
  keys = {};

  quizScreen.classList.remove("active");
  aflScreen.classList.add("active");

  gameActive = true;
  hasPossession = true;

  playerX = 50;
  playerY = 70;

  cpuX1 = 43;
  cpuY1 = 52;

  cpuX2 = 59;
  cpuY2 = 45;

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

  document.querySelector(".cpu1").style.left =
    `${cpuX1}%`;

  document.querySelector(".cpu1").style.top =
    `${cpuY1}%`;

  document.querySelector(".cpu2").style.left =
    `${cpuX2}%`;

  document.querySelector(".cpu2").style.top =
    `${cpuY2}%`;

  if (hasPossession) {

    ball.style.left =
      `calc(${playerX}% + 18px)`;

    ball.style.top =
      `calc(${playerY}% + 12px)`;
  }
}


/* =========================
   GAME LOOP
========================= */

function gameLoop(time) {

  if (!gameActive) {
    return;
  }

  const delta =
    Math.min((time - lastTime) / 16.67, 2);

  lastTime = time;

  movePlayer(delta);
  moveCPU(delta);

  updatePositions();
  checkDefenderPressure();

  requestAnimationFrame(gameLoop);
}


/* =========================
   PLAYER MOVEMENT
========================= */

function movePlayer(delta) {

  let speed = keys.shift ? 0.42 : 0.24;

  if (keys.e) {
    speed = 0.65;
  }

  if (keys.w) playerY -= speed * delta;
  if (keys.s) playerY += speed * delta;
  if (keys.a) playerX -= speed * delta;
  if (keys.d) playerX += speed * delta;

  playerX =
    Math.max(3, Math.min(97, playerX));

  playerY =
    Math.max(3, Math.min(97, playerY));
}


/* =========================
   DEFENDER AI
========================= */

function moveCPU(delta) {

  cpuX1 +=
    (playerX - cpuX1) *
    0.012 *
    delta;

  cpuY1 +=
    (playerY - cpuY1) *
    0.012 *
    delta;


  const targetX =
    playerX +
    (keys.d ? 4 : keys.a ? -4 : 0);

  const targetY =
    playerY - 3;


  cpuX2 +=
    (targetX - cpuX2) *
    0.007 *
    delta;

  cpuY2 +=
    (targetY - cpuY2) *
    0.007 *
    delta;
}


/* =========================
   DEFENDER PRESSURE
========================= */

function checkDefenderPressure() {

  const distance =
    Math.hypot(
      playerX - cpuX1,
      playerY - cpuY1
    );

  if (distance < 5 && !keys.e) {

    document.getElementById("gameStatus").textContent =
      "⚠️ Defender closing! Sprint or evade!";
  }
}


/* =========================
   KICK
========================= */

function kick() {

  if (!gameActive || !hasPossession) {
    return;
  }

  hasPossession = false;

  document.getElementById("gameStatus").textContent =
    "KICK! The ball is travelling forward...";

  ball.style.left =
    `${playerX}%`;

  ball.style.top =
    `${Math.max(2, playerY - 20)}%`;


  setTimeout(() => {

    if (!gameActive) {
      return;
    }

    const goodKick =
      playerY < 55 &&
      Math.abs(playerX - 50) < 35;


    if (goodKick) {

      aflScore++;

      document.getElementById("aflScore").textContent =
        aflScore;

      document.getElementById("gameStatus").textContent =
        "🏉 Great kick! Your teammate marks it.";

    } else {

      document.getElementById("gameStatus").textContent =
        "The kick didn't work. The opposition gets the ball.";
    }

    nextQuestion();

  }, 800);
}


/* =========================
   HANDPASS
========================= */

function handball() {

  if (!gameActive || !hasPossession) {
    return;
  }

  hasPossession = false;

  document.getElementById("gameStatus").textContent =
    "HANDPASS! You release the ball to your teammate.";


  setTimeout(() => {

    if (!gameActive) {
      return;
    }

    aflScore++;

    document.getElementById("aflScore").textContent =
      aflScore;

    document.getElementById("gameStatus").textContent =
      "✓ Clean handball! Your teammate keeps possession.";

    nextQuestion();

  }, 700);
}


/* =========================
   LEAD KICK
========================= */

function leadKick() {

  if (!gameActive || !hasPossession) {
    return;
  }

  hasPossession = false;

  document.getElementById("gameStatus").textContent =
    "LEAD KICK! You kick into space for a teammate.";


  setTimeout(() => {

    if (!gameActive) {
      return;
    }

    aflScore++;

    document.getElementById("aflScore").textContent =
      aflScore;

    document.getElementById("gameStatus").textContent =
      "✓ Your teammate runs onto it.";

    nextQuestion();

  }, 700);
}


/* =========================
   EVADE
========================= */

function evade() {

  if (!gameActive) {
    return;
  }

  if (keys.d) {
    playerX += 7;
  } else if (keys.a) {
    playerX -= 7;
  } else {
    playerX += 7;
  }

  playerX =
    Math.max(3, Math.min(97, playerX));

  document.getElementById("gameStatus").textContent =
    "💨 EVASION! You burst away from the defender.";
}


/* =========================
   NEXT QUESTION
========================= */

function nextQuestion() {

  gameActive = false;

  // Clear all AFL keys.
  keys = {};

  questionIndex++;

  setTimeout(() => {

    aflScreen.classList.remove("active");
    quizScreen.classList.add("active");

    loadQuestion();

  }, 1300);
}


/* =========================
   FINISH
========================= */

function finishGame() {

  gameActive = false;
  keys = {};

  quizScreen.classList.remove("active");
  aflScreen.classList.remove("active");

  resultScreen.classList.add("active");

  document.getElementById("finalResult").innerHTML =
    `Entertainment score: <b>${entScore}</b><br>
     AFL score: <b>${aflScore}</b><br><br>
     You completed the HSC Entertainment × AFL challenge!`;
}


/* ==================================================
   AFL KEYBOARD CONTROLS

   THIS IS THE IMPORTANT PART.

   There is NO document-wide keyboard listener.

   We only listen for AFL controls when:
   1. AFL game is active
   2. AFL screen is visible

   Therefore typing in the Entertainment box
   cannot trigger W/A/S/D/E/K/H/L.
================================================== */


/* KEY DOWN */

window.addEventListener("keydown", function(event) {

  // NEVER interfere with typing.
  if (
    document.activeElement === answerBox ||
    document.activeElement?.tagName === "TEXTAREA" ||
    document.activeElement?.tagName === "INPUT" ||
    document.activeElement?.isContentEditable
  ) {
    return;
  }

  // AFL controls only work during AFL.
  if (
    !gameActive ||
    !aflScreen.classList.contains("active")
  ) {
    return;
  }


  const key =
    event.key.toLowerCase();


  /*
     Prevent browser scrolling ONLY for AFL controls.
  */

  if (
    [
      "w",
      "a",
      "s",
      "d",
      "shift",
      "e",
      "k",
      "h",
      "l"
    ].includes(key)
  ) {

    event.preventDefault();
  }


  keys[key] = true;


  if (key === "k") {
    kick();
  }

  if (key === "h") {
    handball();
  }

  if (key === "l") {
    leadKick();
  }

  if (key === "e") {
    evade();
  }

});


/* KEY UP */

window.addEventListener("keyup", function(event) {

  // Never interfere with typing.
  if (
    document.activeElement === answerBox ||
    document.activeElement?.tagName === "TEXTAREA" ||
    document.activeElement?.tagName === "INPUT" ||
    document.activeElement?.isContentEditable
  ) {
    return;
  }

  // Only relevant during AFL.
  if (
    !gameActive ||
    !aflScreen.classList.contains("active")
  ) {
    return;
  }

  const key =
    event.key.toLowerCase();

  keys[key] = false;
});


/* =========================
   MOBILE BUTTONS
========================= */

document.querySelectorAll("[data-key]").forEach(button => {

  button.addEventListener("click", () => {

    if (!gameActive) {
      return;
    }

    const key =
      button.dataset.key;

    keys[key] = true;

    setTimeout(() => {
      keys[key] = false;
    }, 150);

  });

});


document.querySelectorAll("[data-action]").forEach(button => {

  button.addEventListener("click", () => {

    if (!gameActive) {
      return;
    }

    const action =
      button.dataset.action;

    if (action === "sprint") {
      keys.shift = true;

      setTimeout(() => {
        keys.shift = false;
      }, 500);
    }

    if (action === "evade") {
      evade();
    }

    if (action === "kick") {
      kick();
    }

    if (action === "handball") {
      handball();
    }

    if (action === "lead") {
      leadKick();
    }

  });

});


/* =========================
   START GAME
========================= */

loadQuestion();
