/* =========================================================
   HSC ENTERTAINMENT × AFL
   ========================================================= */


/* =========================================================
   ENTERTAINMENT QUESTIONS

   These are based on the same syllabus/topic areas as the
   past paper you provided, but are reworded into different
   scenarios.
   ========================================================= */

const questions = [

  {
    q: "A production team identifies several hazards before bump-in. Explain why a risk assessment should be completed before technical work begins.",
    answers: ["risk assessment", "identify", "hazard", "control"]
  },

  {
    q: "A technician notices that an extension lead has damaged insulation. What should they do before the equipment is used?",
    answers: ["isolate", "remove", "do not use", "replace", "tag"]
  },

  {
    q: "A cable must cross a walkway used by performers and crew. Name one control that reduces the trip hazard.",
    answers: ["cable ramp", "cable cover", "cover", "ramp"]
  },

  {
    q: "A venue is selecting controls for a hazard. Which level of the Hierarchy of Control is the most effective?",
    answers: ["elimination"]
  },

  {
    q: "A lighting fixture is suspended above a performance area. What is the purpose of a safety chain?",
    answers: ["backup", "secondary", "prevent", "fall"]
  },

  {
    q: "A C-clamp is being used to attach a lighting fixture to a suitable rigging structure. What is the purpose of the clamp?",
    answers: ["secure", "attach", "fixture", "rigging"]
  },

  {
    q: "A technician needs to increase the level of a weak microphone signal entering a mixing console. Which control should they adjust?",
    answers: ["gain", "input gain", "preamp"]
  },

  {
    q: "A sound operator changes the balance between bass, mid and treble frequencies. What type of processing are they using?",
    answers: ["eq", "equalisation", "equalization"]
  },

  {
    q: "A live microphone begins producing a loud repeating sound through the speakers. What is this problem called?",
    answers: ["feedback"]
  },

  {
    q: "Explain one way a sound operator could reduce the likelihood of microphone feedback.",
    answers: ["speaker", "monitor", "gain", "position", "microphone"]
  },

  {
    q: "A school musical requires microphones that can withstand regular handling and loud stage conditions. Why might a dynamic microphone be suitable?",
    answers: ["rugged", "durable", "robust", "live", "loud"]
  },

  {
    q: "A condenser microphone is being connected for a performance. What electrical feature may it require from the mixing console?",
    answers: ["phantom power", "48v", "48 v"]
  },

  {
    q: "A sound technician prepares two mixes: one for the audience and one for performers on stage. What are these two mixes commonly called?",
    answers: ["foh", "front of house", "monitor", "foldback"]
  },

  {
    q: "A lighting designer wants a broad beam with relatively soft edges to cover a performance area. Which lantern would be appropriate?",
    answers: ["fresnel"]
  },

  {
    q: "A lighting designer needs a focused beam with a defined edge that can project a shape. Which lantern would be suitable?",
    answers: ["profile"]
  },

  {
    q: "A lighting operator changes the brightness of a lantern during a scene. Which lighting characteristic are they changing?",
    answers: ["intensity", "brightness"]
  },

  {
    q: "A lighting designer uses coloured transparent material in front of a lantern to change the colour of the light. What is this commonly called?",
    answers: ["gel", "colour filter", "color filter"]
  },

  {
    q: "A scenic element is moved during a performance. Which lighting role would normally determine how the lighting design should respond?",
    answers: ["lighting designer"]
  },

  {
    q: "Who is primarily responsible for executing lighting cues during a performance?",
    answers: ["lighting operator", "operator"]
  },

  {
    q: "A venue needs to send one video signal to several display destinations. What type of device could distribute the signal?",
    answers: ["distribution amplifier", "vda", "video distribution amplifier"]
  },

  {
    q: "A projector displays an image with the wrong proportions. Which setting should the technician check?",
    answers: ["aspect ratio"]
  },

  {
    q: "An image is being displayed at a lower quality than expected. Name one specification that affects the detail of the displayed image.",
    answers: ["resolution"]
  },

  {
    q: "A technician is planning the path of a video signal from a source to a projector. What is this overall pathway commonly referred to as?",
    answers: ["signal flow", "vda", "video signal flow"]
  },

  {
    q: "A performer is standing with their back to the audience. Which direction is stage left from the performer's perspective?",
    answers: ["performer left", "left"]
  },

  {
    q: "What is the difference between upstage and downstage?",
    answers: ["audience", "closer", "farther", "away", "upstage", "downstage"]
  },

  {
    q: "A production is preparing to move equipment into the venue before rehearsals. What is this process commonly called?",
    answers: ["bump in", "bump-in", "bump in"]
  },

  {
    q: "At the end of a production, equipment is packed away and removed from the venue. What is this process called?",
    answers: ["bump out", "bump-out", "bumpout"]
  },

  {
    q: "A customer makes a complaint about a venue service. What should the staff member generally do first?",
    answers: ["listen", "understand", "acknowledge", "customer"]
  },

  {
    q: "A customer asks, 'What seating arrangement would work best for this event?' What type of question is this?",
    answers: ["open"]
  },

  {
    q: "A customer asks, 'Is the event starting at 7 pm?' What type of question is this?",
    answers: ["closed"]
  },

  {
    q: "A workplace representative is elected to represent workers on health and safety matters. What is this role commonly known as?",
    answers: ["hsr", "health and safety representative"]
  },

  {
    q: "A lighting system uses three-phase electrical power. Why is it important to balance the electrical load across the phases?",
    answers: ["balance", "load", "even", "distribution", "power"]
  },

  {
    q: "A production uses automated scenery that moves between positions during a performance. What type of system could control this movement?",
    answers: ["motorised", "automated", "automation", "motorized"]
  },

  {
    q: "A theatre is recording customer information so staff can access it when dealing with future enquiries. What type of system could be used?",
    answers: ["database", "customer database", "crm"]
  },

  {
    q: "A theatre uses recorded music, video and other creative material in a production. What Australian legislation is relevant to copyright protection?",
    answers: ["copyright act", "copyright"]
  },

  {
    q: "A venue is installing a large scenic structure that will move during the performance. Why should the movement path be considered during technical planning?",
    answers: ["hazard", "clearance", "safety", "movement", "risk"]
  },

  {
    q: "A technician is troubleshooting a piece of equipment that has stopped operating. What should they check before replacing major components?",
    answers: ["power", "connection", "cable", "signal", "settings"]
  },

  {
    q: "Why is clear communication important when multiple technicians are moving or installing large technical equipment?",
    answers: ["safety", "coordination", "communication", "instructions"]
  },

  {
    q: "A venue hires equipment from an external supplier. Give one consideration when preparing the equipment for return.",
    answers: ["check", "condition", "pack", "clean", "inventory", "damage"]
  }

];


/* =========================================================
   GAME VARIABLES
   ========================================================= */

let questionIndex = 0;

let entScore = 0;
let aflScore = 0;

let keys = {};

let gameActive = false;
let hasPossession = true;

let lastTime = performance.now();

let playerX = 50;
let playerY = 72;

let cpuX1 = 43;
let cpuY1 = 52;

let cpuX2 = 58;
let cpuY2 = 45;

let cpuX3 = 38;
let cpuY3 = 38;

let ballX = 50;
let ballY = 72;

let playFinished = false;


/* =========================================================
   DOM
   ========================================================= */

const quizScreen =
  document.getElementById("quizScreen");

const aflScreen =
  document.getElementById("aflScreen");

const resultScreen =
  document.getElementById("resultScreen");

const questionNumber =
  document.getElementById("questionNumber");

const questionText =
  document.getElementById("question");

const answerBox =
  document.getElementById("answer");

const feedback =
  document.getElementById("feedback");

const player =
  document.getElementById("player");

const field =
  document.getElementById("field");

const ball =
  document.getElementById("ball");

const gameStatus =
  document.getElementById("gameStatus");

const playText =
  document.getElementById("playText");


/* =========================================================
   QUESTION LOADING
   ========================================================= */

function loadQuestion() {

  if (questionIndex >= questions.length) {
    finishGame();
    return;
  }

  questionNumber.textContent =
    `Entertainment Question ${questionIndex + 1} / ${questions.length}`;

  questionText.textContent =
    questions[questionIndex].q;

  answerBox.value = "";

  feedback.textContent = "";

  answerBox.focus();
}


/* =========================================================
   ANSWER CHECKING
   ========================================================= */

function checkAnswer() {

  const response =
    answerBox.value.toLowerCase().trim();

  if (!response) {

    feedback.style.color = "#ffd34d";

    feedback.textContent =
      "Type an answer first.";

    return;
  }

  const accepted =
    questions[questionIndex].answers;

  const correct =
    accepted.some(keyword =>
      response.includes(keyword)
    );

  if (correct) {

    entScore++;

    document.getElementById("entScore")
      .textContent = entScore;

    feedback.style.color =
      "#55e37d";

    feedback.textContent =
      "✓ Correct! AFL possession unlocked.";

    setTimeout(() => {
      startAFL();
    }, 800);

  } else {

    feedback.style.color =
      "#ff6868";

    feedback.textContent =
      "✗ Not quite. Think about the specific HSC technical concept and try again.";
  }
}


document
  .getElementById("submitBtn")
  .addEventListener(
    "click",
    checkAnswer
  );


/* =========================================================
   START AFL
   ========================================================= */

function startAFL() {

  quizScreen.classList.remove("active");

  aflScreen.classList.add("active");

  gameActive = true;
  hasPossession = true;
  playFinished = false;

  playerX = 50;
  playerY = 72;

  ballX = playerX;
  ballY = playerY;

  /*
    Defenders reset into different positions
    each possession.
  */

  cpuX1 = 43 + Math.random() * 8;
  cpuY1 = 54 + Math.random() * 7;

  cpuX2 = 58 + Math.random() * 8;
  cpuY2 = 43 + Math.random() * 8;

  cpuX3 = 35 + Math.random() * 10;
  cpuY3 = 32 + Math.random() * 10;

  playText.textContent =
    "You're in possession. Read the defenders, create space and choose your disposal.";

  gameStatus.textContent =
    "🏉 You have possession — move before deciding.";

  updatePositions();

  lastTime = performance.now();

  requestAnimationFrame(gameLoop);
}


/* =========================================================
   POSITION UPDATE
   ========================================================= */

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


  document.querySelector(".cpu3").style.left =
    `${cpuX3}%`;

  document.querySelector(".cpu3").style.top =
    `${cpuY3}%`;


  document.querySelector(".teammate1").style.left =
    `${35 + Math.sin(Date.now() / 1000) * 4}%`;

  document.querySelector(".teammate1").style.top =
    `${62 + Math.cos(Date.now() / 1300) * 5}%`;


  document.querySelector(".teammate2").style.left =
    `${62 + Math.cos(Date.now() / 1100) * 5}%`;

  document.querySelector(".teammate2").style.top =
    `${58 + Math.sin(Date.now() / 900) * 5}%`;


  document.querySelector(".teammate3").style.left =
    `${50 + Math.sin(Date.now() / 1400) * 12}%`;

  document.querySelector(".teammate3").style.top =
    `${38 + Math.cos(Date.now() / 1200) * 5}%`;


  if (hasPossession) {

    ball.style.left =
      `calc(${playerX}% + 18px)`;

    ball.style.top =
      `calc(${playerY}% + 10px)`;

  } else {

    ball.style.left =
      `${ballX}%`;

    ball.style.top =
      `${ballY}%`;
  }
}


/* =========================================================
   MAIN GAME LOOP
   ========================================================= */

function gameLoop(time) {

  if (!gameActive) {
    return;
  }

  const delta =
    Math.min(
      (time - lastTime) / 16.67,
      2
    );

  lastTime = time;


  movePlayer(delta);

  moveDefenders(delta);

  updatePositions();

  checkDefenderPressure();

  requestAnimationFrame(gameLoop);
}


/* =========================================================
   PLAYER MOVEMENT
   ========================================================= */

function movePlayer(delta) {

  let speed =
    keys["shift"] ? 0.48 : 0.25;


  if (keys["w"]) {
    playerY -= speed * delta;
  }

  if (keys["s"]) {
    playerY += speed * delta;
  }

  if (keys["a"]) {
    playerX -= speed * delta;
  }

  if (keys["d"]) {
    playerX += speed * delta;
  }


  playerX =
    Math.max(
      8,
      Math.min(92, playerX)
    );

  playerY =
    Math.max(
      8,
      Math.min(92, playerY)
    );
}


/* =========================================================
   DEFENDER AI

   Defenders continuously react to the player's position.
   ========================================================= */

function moveDefenders(delta) {

  /*
    Defender 1:
    Direct pressure defender.
  */

  const d1Speed =
    0.018 * delta;

  cpuX1 +=
    (playerX - cpuX1) *
    d1Speed;

  cpuY1 +=
    (playerY - cpuY1) *
    d1Speed;


  /*
    Defender 2:
    Tries to predict the player's movement.
  */

  let predictedX =
    playerX;

  let predictedY =
    playerY;


  if (keys["d"]) {
    predictedX += 8;
  }

  if (keys["a"]) {
    predictedX -= 8;
  }

  if (keys["w"]) {
    predictedY -= 8;
  }

  if (keys["s"]) {
    predictedY += 8;
  }


  cpuX2 +=
    (predictedX - cpuX2) *
    0.011 *
    delta;

  cpuY2 +=
    (predictedY - cpuY2) *
    0.011 *
    delta;


  /*
    Defender 3:
    Protects the central attacking channel.
  */

  const targetX =
    50 +
    (playerX - 50) * 0.45;

  const targetY =
    36 +
    (playerY - 36) * 0.25;


  cpuX3 +=
    (targetX - cpuX3) *
    0.008 *
    delta;

  cpuY3 +=
    (targetY - cpuY3) *
    0.008 *
    delta;


  /*
    Keep defenders on the field.
  */

  cpuX1 =
    Math.max(8, Math.min(92, cpuX1));

  cpuY1 =
    Math.max(8, Math.min(92, cpuY1));

  cpuX2 =
    Math.max(8, Math.min(92, cpuX2));

  cpuY2 =
    Math.max(8, Math.min(92, cpuY2));

  cpuX3 =
    Math.max(8, Math.min(92, cpuX3));

  cpuY3 =
    Math.max(8, Math.min(92, cpuY3));
}


/* =========================================================
   DISTANCE CALCULATION
   ========================================================= */

function distanceTo(x1, y1, x2, y2) {

  return Math.hypot(
    x1 - x2,
    y1 - y2
  );
}


/* =========================================================
   DEFENDER PRESSURE
   ========================================================= */

function checkDefenderPressure() {

  if (!gameActive || !hasPossession) {
    return;
  }


  const d1 =
    distanceTo(
      playerX,
      playerY,
      cpuX1,
      cpuY1
    );


  const d2 =
    distanceTo(
      playerX,
      playerY,
      cpuX2,
      cpuY2
    );


  const closest =
    Math.min(d1, d2);


  if (closest < 5) {

    gameStatus.textContent =
      "🔴 HEAVY PRESSURE! Evade or dispose of the ball!";

    player.style.transform =
      "translate(-50%, -50%) scale(1.15)";

  }

  else if (closest < 9) {

    gameStatus.textContent =
      "🟠 Defender closing — create space or make a decision.";

    player.style.transform =
      "translate(-50%, -50%) scale(1.08)";

  }

  else {

    gameStatus.textContent =
      "🟢 You have some space. Scan the field.";

    player.style.transform =
      "translate(-50%, -50%) scale(1)";
  }
}


/* =========================================================
   KICK
   ========================================================= */

function kick() {

  if (!gameActive || !hasPossession) {
    return;
  }

  playFinished = true;
  hasPossession = false;


  gameStatus.textContent =
    "🏉 KICK! Ball travelling forward...";


  ballX = playerX;
  ballY = Math.max(
    5,
    playerY - 25
  );


  ball.style.left =
    `${ballX}%`;

  ball.style.top =
    `${ballY}%`;


  setTimeout(() => {

    /*
      Good kick conditions:
      - player is moving toward attacking end
      - reasonable horizontal position
      - defenders aren't extremely close
    */

    const pressure =
      Math.min(
        distanceTo(playerX, playerY, cpuX1, cpuY1),
        distanceTo(playerX, playerY, cpuX2, cpuY2)
      );


    const goodKick =
      playerY < 60 &&
      Math.abs(playerX - 50) < 42 &&
      pressure > 4;


    if (goodKick) {

      aflScore++;

      document.getElementById("aflScore")
        .textContent = aflScore;


      gameStatus.textContent =
        "✅ Great kick! Your teammate marks the ball.";

    }

    else {

      gameStatus.textContent =
        "❌ The kick was pressured and the opposition gets possession.";

    }


    endPlay();

  }, 850);
}


/* =========================================================
   HANDBALL
   ========================================================= */

function handball() {

  if (!gameActive || !hasPossession) {
    return;
  }


  const nearest =
    Math.min(
      distanceTo(playerX, playerY, cpuX1, cpuY1),
      distanceTo(playerX, playerY, cpuX2, cpuY2)
    );


  /*
    Handball is strongest when a defender is nearby
    but there is still enough space.
  */

  if (nearest < 10 && nearest > 4) {

    playFinished = true;
    hasPossession = false;

    aflScore++;

    document.getElementById("aflScore")
      .textContent = aflScore;

    gameStatus.textContent =
      "🟢 SMART HANDBALL! You released the ball before the pressure arrived.";

    setTimeout(endPlay, 850);

  }

  else if (nearest <= 4) {

    playFinished = true;
    hasPossession = false;

    gameStatus.textContent =
      "🔴 Too much pressure! The handball was smothered.";

    setTimeout(endPlay, 850);

  }

  else {

    playFinished = true;
    hasPossession = false;

    aflScore++;

    document.getElementById("aflScore")
      .textContent = aflScore;

    gameStatus.textContent =
      "✅ Clean handball to a teammate.";

    setTimeout(endPlay, 850);
  }
}


/* =========================================================
   LEAD KICK
   ========================================================= */

function leadKick() {

  if (!gameActive || !hasPossession) {
    return;
  }


  playFinished = true;
  hasPossession = false;


  gameStatus.textContent =
    "🏉 LEAD KICK! You're kicking into space for a teammate.";


  /*
    Send ball toward the attacking space.
  */

  ballX =
    50 +
    (Math.random() * 30 - 15);

  ballY =
    Math.max(
      8,
      playerY - 32
    );


  ball.style.left =
    `${ballX}%`;

  ball.style.top =
    `${ballY}%`;


  setTimeout(() => {

    const successful =
      playerY < 65;


    if (successful) {

      aflScore++;

      document.getElementById("aflScore")
        .textContent = aflScore;

      gameStatus.textContent =
        "✅ Excellent lead kick! Your teammate runs onto the ball.";

    }

    else {

      gameStatus.textContent =
        "❌ The lead kick did not gain enough territory.";

    }


    endPlay();

  }, 900);
}


/* =========================================================
   EVADE
   ========================================================= */

function evade() {

  if (!gameActive || !hasPossession) {
    return;
  }


  const nearest =
    Math.min(
      distanceTo(playerX, playerY, cpuX1, cpuY1),
      distanceTo(playerX, playerY, cpuX2, cpuY2)
    );


  /*
    Choose direction based on available movement.
  */

  let direction = 1;


  if (keys["a"]) {
    direction = -1;
  }

  else if (keys["d"]) {
    direction = 1;
  }

  else {

    direction =
      playerX > 50 ? -1 : 1;
  }


  playerX +=
    direction * 8;


  playerX =
    Math.max(
      8,
      Math.min(92, playerX)
    );


  /*
    Reward a good evade when pressure is close.
  */

  if (nearest < 9) {

    gameStatus.textContent =
      "💨 SUCCESSFUL EVADE! You created separation.";

  }

  else {

    gameStatus.textContent =
      "💨 You change direction and create a little space.";
  }


  updatePositions();
}


/* =========================================================
   END AFL PLAY
   ========================================================= */

function endPlay() {

  gameActive = false;

  setTimeout(() => {

    nextQuestion();

  }, 1100);
}


/* =========================================================
   NEXT QUESTION
   ========================================================= */

function nextQuestion() {

  questionIndex++;

  if (questionIndex >= questions.length) {

    finishGame();

    return;
  }


  aflScreen.classList.remove("active");

  quizScreen.classList.add("active");


  loadQuestion();
}


/* =========================================================
   FINISH GAME
   ========================================================= */

function finishGame() {

  gameActive = false;

  quizScreen.classList.remove("active");

  aflScreen.classList.remove("active");

  resultScreen.classList.add("active");


  const percentage =
    Math.round(
      (entScore / questions.length) * 100
    );


  document.getElementById("finalResult").innerHTML =

    `
      Entertainment score:
      <b>${entScore}/${questions.length}</b>
      <br>

      HSC accuracy:
      <b>${percentage}%</b>
      <br>

      AFL score:
      <b>${aflScore}</b>
      <br><br>

      ${getFinalMessage(percentage)}
    `;
}


/* =========================================================
   FINAL MESSAGE
   ========================================================= */

function getFinalMessage(score) {

  if (score >= 90) {

    return "🔥 Excellent! Your Entertainment Industry knowledge is at a very strong level.";

  }

  if (score >= 75) {

    return "🟢 Strong work. Focus on adding more specific technical terminology.";

  }

  if (score >= 60) {

    return "🟡 Solid foundation. Revise the concepts you found difficult.";

  }

  return "🔴 Keep practising. Focus on understanding the technical concepts rather than memorising isolated words.";
}


/* =========================================================
   KEYBOARD CONTROLS

   IMPORTANT:
   These controls DO NOT interfere with the Entertainment
   answer box.
   ========================================================= */

document.addEventListener(
  "keydown",
  function(e) {

    const typing =
      e.target.tagName === "INPUT" ||
      e.target.tagName === "TEXTAREA" ||
      e.target.isContentEditable;


    /*
      If the player is typing an Entertainment answer,
      don't intercept WASD/E/K/H/L.
    */

    if (typing) {

      if (
        e.key === "Enter" &&
        e.ctrlKey
      ) {

        e.preventDefault();

        checkAnswer();
      }

      return;
    }


    const key =
      e.key.toLowerCase();


    const gameKeys = [
      "w",
      "a",
      "s",
      "d",
      "shift",
      "e",
      "k",
      "h",
      "l"
    ];


    if (
      gameKeys.includes(key)
    ) {

      e.preventDefault();
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

  }
);


/* =========================================================
   KEY RELEASE
   ========================================================= */

document.addEventListener(
  "keyup",
  function(e) {

    const typing =
      e.target.tagName === "INPUT" ||
      e.target.tagName === "TEXTAREA" ||
      e.target.isContentEditable;


    if (typing) {
      return;
    }


    keys[
      e.key.toLowerCase()
    ] = false;

  }
);


/* =========================================================
   START
   ========================================================= */

loadQuestion();
