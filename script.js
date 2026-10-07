const questions = [

  {
    q: "A stage manager notices that a newly installed scenic element blocks an emergency exit. What should happen before the production continues?",
    answers: ["remove", "relocate", "hazard", "risk", "exit", "safety"]
  },

  {
    q: "A technician needs to change the overall tonal balance of a vocalist's microphone. Which mixer function should they use?",
    answers: ["eq", "equalisation", "equalization"]
  },

  {
    q: "A performer is positioned downstage right. From the performer's perspective, which side of the stage are they on?",
    answers: ["right"]
  },

  {
    q: "A lighting designer needs a lantern that can tightly shape and define the beam. Which type would be appropriate?",
    answers: ["profile"]
  },

  {
    q: "A venue wants to physically prevent a cable from becoming a trip hazard across a walkway. Give one suitable control.",
    answers: ["cable cover", "cable ramp", "ramp", "cover"]
  },

  {
    q: "A microphone input is clipping even though the performer has not moved closer to the microphone. Which mixer control should the technician investigate?",
    answers: ["gain", "input gain", "preamp"]
  },

  {
    q: "What is the main purpose of a vision distribution amplifier in a video system?",
    answers: ["distribute", "distribution", "split", "multiple"]
  },

  {
    q: "A lighting state needs a broad beam with softer edges rather than a sharply defined beam. Which lantern is appropriate?",
    answers: ["fresnel"]
  },

  {
    q: "A condenser microphone is being prepared for use. What electrical supply may it require?",
    answers: ["phantom", "48v", "48 v"]
  },

  {
    q: "During a performance, the audience suddenly cannot hear a performer clearly through the main sound system. What should an audio technician first investigate in the signal path?",
    answers: ["signal", "channel", "gain", "mute", "cable"]
  },

  {
    q: "A performer needs to hear their own voice and other musicians while performing on stage. What system provides this?",
    answers: ["foldback", "monitor", "monitoring"]
  },

  {
    q: "A projected image has the correct content but appears distorted because its proportions do not match the display. Which video setting should be checked?",
    answers: ["aspect ratio"]
  },

  {
    q: "A lighting designer wants to create a cool, isolated atmosphere. Give one lighting characteristic that could contribute to this effect.",
    answers: ["blue", "cool", "low intensity", "intensity", "colour", "color"]
  },

  {
    q: "A lighting operator is preparing for a performance. What document or information could they use to know when lighting changes occur?",
    answers: ["cue sheet", "cue", "run sheet", "lighting cues"]
  },

  {
    q: "A heavy scenic item needs to be moved safely through a venue. Give one appropriate method of reducing manual-handling risk.",
    answers: ["trolley", "dolly", "wagon", "mechanical", "team lift", "two people", "lifting equipment"]
  },

  {
    q: "A worker discovers damaged rigging equipment before it is used. What should they do?",
    answers: ["do not use", "tag", "remove", "report", "replace", "isolate"]
  },

  {
    q: "A safety chain is attached to a suspended lighting fixture. What is its main purpose?",
    answers: ["backup", "secondary", "prevent", "fall", "support"]
  },

  {
    q: "What is the main purpose of a risk assessment before technical work begins?",
    answers: ["identify", "hazard", "risk", "control", "safety"]
  },

  {
    q: "A venue replaces a hazardous piece of equipment with a safer alternative that performs the same task. Which level of the Hierarchy of Control is being used?",
    answers: ["substitution"]
  },

  {
    q: "Who is primarily responsible for creating the overall creative lighting design for a production?",
    answers: ["lighting designer"]
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
let lastTime = performance.now();

let playerX = 50;
let playerY = 70;

let cpuX1 = 43;
let cpuY1 = 52;

let cpuX2 = 59;
let cpuY2 = 45;


/* =========================
   QUIZ
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

  setTimeout(() => {
    answerBox.focus();
  }, 100);
}


function normalise(text) {

  return text
    .toLowerCase()
    .replace(/[.,!?;:()[\]{}"'`]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

}


function checkAnswer() {

  const response = normalise(answerBox.value);

  if (!response) {

    feedback.textContent =
      "Type an answer first.";

    feedback.style.color = "#ffd34d";

    return;
  }

  const accepted =
    questions[questionIndex].answers;

  const correct =
    accepted.some(answer => {

      const cleanedAnswer =
        normalise(answer);

      return response.includes(cleanedAnswer);

    });


  if (correct) {

    entScore++;

    document.getElementById("entScore").textContent =
      entScore;

    feedback.style.color =
      "#55e37d";

    feedback.textContent =
      "✓ Correct! AFL play unlocked.";

    answerBox.disabled = true;

    setTimeout(() => {

      answerBox.disabled = false;

      startAFL();

    }, 800);

  } else {

    feedback.style.color =
      "#ff6868";

    feedback.textContent =
      "✗ Not quite. Try again — think about the key terminology.";

  }

}


document
  .getElementById("submitBtn")
  .addEventListener("click", checkAnswer);


answerBox.addEventListener("keydown", event => {

  if (
    event.key === "Enter" &&
    event.ctrlKey
  ) {

    event.preventDefault();
    checkAnswer();

  }

});


/* =========================
   AFL GAME
========================= */

function startAFL() {

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

  document.getElementById("playNumber").textContent =
    questionIndex + 1;

  document.getElementById("playText").textContent =
    "You're inside attacking range. Read the defenders and make your decision.";

  document.getElementById("gameStatus").textContent =
    "You have possession — move, evade or dispose of the ball.";

  updatePositions();

  lastTime = performance.now();

  requestAnimationFrame(gameLoop);

}


function updatePositions() {

  player.style.left =
    `${playerX}%`;

  player.style.top =
    `${playerY}%`;


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
      `calc(${playerY}% + 10px)`;

  }

}


function gameLoop(time) {

  if (!gameActive) return;

  const delta =
    Math.min(
      (time - lastTime) / 16.67,
      2
    );

  lastTime = time;

  movePlayer(delta);
  moveCPU(delta);

  updatePositions();

  checkDefenderPressure();

  requestAnimationFrame(gameLoop);

}


function movePlayer(delta) {

  let speed =
    keys["shift"]
      ? 0.48
      : 0.25;


  if (keys["e"]) {
    speed = 0.65;
  }


  if (keys["w"])
    playerY -= speed * delta;

  if (keys["s"])
    playerY += speed * delta;

  if (keys["a"])
    playerX -= speed * delta;

  if (keys["d"])
    playerX += speed * delta;


  playerX =
    Math.max(
      3,
      Math.min(97, playerX)
    );

  playerY =
    Math.max(
      3,
      Math.min(97, playerY)
    );

}


function moveCPU(delta) {

  /*
    Defender 1 aggressively tracks
    the player.
  */

  cpuX1 +=
    (playerX - cpuX1)
    * 0.014
    * delta;

  cpuY1 +=
    (playerY - cpuY1)
    * 0.014
    * delta;


  /*
    Defender 2 attempts to
    anticipate movement.
  */

  let predictionX = 0;

  if (keys["d"])
    predictionX = 5;

  if (keys["a"])
    predictionX = -5;


  const targetX =
    playerX + predictionX;

  const targetY =
    playerY - 4;


  cpuX2 +=
    (targetX - cpuX2)
    * 0.008
    * delta;

  cpuY2 +=
    (targetY - cpuY2)
    * 0.008
    * delta;

}


function checkDefenderPressure() {

  const distance =
    Math.hypot(
      playerX - cpuX1,
      playerY - cpuY1
    );


  if (
    distance < 5 &&
    !keys["e"]
  ) {

    document
      .getElementById("gameStatus")
      .textContent =
      "⚠️ Defender closing! Sprint or evade!";

  }

}


/* =========================
   AFL ACTIONS
========================= */

function kick() {

  if (
    !gameActive ||
    !hasPossession
  ) return;


  hasPossession = false;


  document
    .getElementById("gameStatus")
    .textContent =
    "KICK! The ball is travelling forward...";


  ball.style.left =
    `${playerX}%`;

  ball.style.top =
    `${Math.max(2, playerY - 20)}%`;


  setTimeout(() => {

    const goodKick =
      playerY < 55 &&
      Math.abs(playerX - 50) < 35;


    if (goodKick) {

      aflScore++;

      document
        .getElementById("aflScore")
        .textContent =
        aflScore;


      document
        .getElementById("gameStatus")
        .textContent =
        "🏉 Great kick! Your teammate marks it.";

    } else {

      document
        .getElementById("gameStatus")
        .textContent =
        "The kick doesn't reach the target.";

    }


    nextQuestion();

  }, 800);

}


function handball() {

  if (
    !gameActive ||
    !hasPossession
  ) return;


  hasPossession = false;


  document
    .getElementById("gameStatus")
    .textContent =
    "HANDPASS! You release the ball to your teammate.";


  setTimeout(() => {

    aflScore++;

    document
      .getElementById("aflScore")
      .textContent =
      aflScore;


    document
      .getElementById("gameStatus")
      .textContent =
      "✓ Clean handball! Your teammate keeps possession.";


    nextQuestion();

  }, 700);

}


function leadKick() {

  if (
    !gameActive ||
    !hasPossession
  ) return;


  hasPossession = false;


  document
    .getElementById("gameStatus")
    .textContent =
    "LEAD KICK! You kick into space for a teammate.";


  setTimeout(() => {

    aflScore++;

    document
      .getElementById("aflScore")
      .textContent =
      aflScore;


    document
      .getElementById("gameStatus")
      .textContent =
      "✓ Your teammate runs onto it.";


    nextQuestion();

  }, 700);

}


function evade() {

  if (!gameActive)
    return;


  const direction =
    keys["a"]
      ? -1
      : 1;


  playerX +=
    8 * direction;


  playerX =
    Math.max(
      3,
      Math.min(97, playerX)
    );


  document
    .getElementById("gameStatus")
    .textContent =
    "💨 EVASION! You burst away from the defender.";

}


/* =========================
   NEXT QUESTION
========================= */

function nextQuestion() {

  gameActive = false;

  questionIndex++;


  setTimeout(() => {

    aflScreen.classList.remove("active");

    quizScreen.classList.add("active");

    loadQuestion();

  }, 1000);

}


/* =========================
   END
========================= */

function finishGame() {

  quizScreen.classList.remove("active");

  aflScreen.classList.remove("active");

  resultScreen.classList.add("active");


  document
    .getElementById("finalResult")
    .innerHTML =
    `
      Entertainment questions correct:
      <b>${entScore}</b>
      <br><br>

      AFL plays completed:
      <b>${aflScore}</b>
      <br><br>

      You completed the HSC Entertainment × AFL Challenge!
    `;

}


/* =========================
   KEYBOARD
========================= */

document.addEventListener("keydown", event => {

  const key =
    event.key.toLowerCase();


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


  if (key === "k")
    kick();

  if (key === "h")
    handball();

  if (key === "l")
    leadKick();

  if (key === "e")
    evade();

});


document.addEventListener("keyup", event => {

  keys[
    event.key.toLowerCase()
  ] = false;

});


/* =========================
   MOBILE BUTTONS
========================= */

document
  .querySelectorAll("[data-key]")
  .forEach(button => {

    const key =
      button.dataset.key;


    button.addEventListener(
      "pointerdown",
      event => {

        event.preventDefault();
        keys[key] = true;

      }
    );


    button.addEventListener(
      "pointerup",
      event => {

        event.preventDefault();
        keys[key] = false;

      }
    );


    button.addEventListener(
      "pointerleave",
      () => {

        keys[key] = false;

      }
    );

  });


document
  .querySelectorAll("[data-action]")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const action =
          button.dataset.action;


        if (action === "kick")
          kick();

        if (action === "handball")
          handball();

        if (action === "lead")
          leadKick();

        if (action === "evade")
          evade();

        if (action === "sprint") {

          keys["shift"] = true;

          setTimeout(() => {
            keys["shift"] = false;
          }, 500);

        }

      }
    );

  });


/* START */

loadQuestion();
