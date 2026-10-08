/* =====================================================
   HSC ENTERTAINMENT × AFL
   SCORE HERO STYLE VERSION
===================================================== */


/* =====================================================
   ENTERTAINMENT QUESTIONS

   These are based on the same syllabus areas as the
   NESA material you provided, but are reworded.
===================================================== */

const questions = [

  {
    question:
      "A technician notices a power cable with damaged insulation during bump-in. What should happen first?",

    options: [
      "Continue using it at low power",
      "Remove it from service and report/tag it",
      "Cover the damage with paper",
      "Move it somewhere less visible"
    ],

    correct: 1
  },

  {
    question:
      "A video image is being displayed wider than intended. Which setting should the technician check?",

    options: [
      "Gain",
      "Aspect ratio",
      "Compression",
      "Fader level"
    ],

    correct: 1
  },

  {
    question:
      "Which lighting lantern is generally suited to producing a broad beam with a softer edge?",

    options: [
      "Fresnel",
      "Profile",
      "Followspot",
      "LED strip"
    ],

    correct: 0
  },

  {
    question:
      "A lighting designer creates the intended colours, mood and appearance of a production. What is the operator's main role during the performance?",

    options: [
      "Write the script",
      "Operate the lighting system according to the cues",
      "Sell tickets",
      "Build the scenery"
    ],

    correct: 1
  },

  {
    question:
      "Why is a safety chain used when suspending a lighting fixture?",

    options: [
      "To change the colour",
      "To provide secondary protection if the primary attachment fails",
      "To increase brightness",
      "To transmit audio"
    ],

    correct: 1
  },

  {
    question:
      "A technician needs to send one video signal to several destinations. Which device is appropriate?",

    options: [
      "Vision distribution amplifier",
      "Dynamic microphone",
      "Dimmer",
      "Compressor"
    ],

    correct: 0
  },

  {
    question:
      "A microphone signal is very quiet at the mixing desk. Which control is normally adjusted to establish an appropriate input level?",

    options: [
      "Gain",
      "Pan",
      "EQ high shelf",
      "Master mute"
    ],

    correct: 0
  },

  {
    question:
      "What is the primary purpose of EQ in an audio system?",

    options: [
      "Change the frequency balance of a signal",
      "Move a lighting fixture",
      "Change the aspect ratio",
      "Secure a cable"
    ],

    correct: 0
  },

  {
    question:
      "A venue employee records a customer's enquiry so that other staff can access the information later. Which method is most appropriate?",

    options: [
      "Tell a friend",
      "Write it on scrap paper",
      "Record it in the organisation's customer/database system",
      "Ignore it"
    ],

    correct: 2
  },

  {
    question:
      "What is the main purpose of a risk assessment before technical work begins?",

    options: [
      "To identify hazards and assess associated risks",
      "To choose the show's music",
      "To sell tickets",
      "To determine audience seating only"
    ],

    correct: 0
  },

  {
    question:
      "Who does a Health and Safety Representative primarily represent in the workplace?",

    options: [
      "Workers",
      "Audience members",
      "Ticket sellers",
      "Equipment suppliers"
    ],

    correct: 0
  },

  {
    question:
      "What is one important consideration when moving large scenery during a production?",

    options: [
      "Ignore the surrounding area",
      "Ensure workers understand the procedure and hazards",
      "Move it as quickly as possible",
      "Remove all communication"
    ],

    correct: 1
  },

  {
    question:
      "Which connector is commonly associated with balanced professional audio connections?",

    options: [
      "XLR",
      "HDMI",
      "RCA",
      "VGA"
    ],

    correct: 0
  },

  {
    question:
      "What does downstage mean?",

    options: [
      "Closer to the audience",
      "Further away from the audience",
      "Behind the lighting desk",
      "Outside the venue"
    ],

    correct: 0
  },

  {
    question:
      "What does upstage mean?",

    options: [
      "Closer to the audience",
      "Further from the audience",
      "Behind the audience",
      "Under the stage"
    ],

    correct: 1
  },

  {
    question:
      "Why might a cable ramp be used during an event?",

    options: [
      "To protect cables and reduce trip hazards",
      "To increase microphone gain",
      "To focus a Fresnel",
      "To change an image's aspect ratio"
    ],

    correct: 0
  }

];


/* =====================================================
   GAME STATE
===================================================== */

let questionIndex = 0;

let entertainmentScore = 0;

let aflScore = 0;

let playNumber = 1;

let currentPlayer = 0;

let gameActive = false;

let dragStart = null;

let seconds = 92;

let timer;


/* =====================================================
   DOM
===================================================== */

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

const answersContainer =
  document.getElementById("answers");

const feedback =
  document.getElementById("feedback");

const entScoreElement =
  document.getElementById("entScore");

const aflScoreElement =
  document.getElementById("aflScore");

const liveScore =
  document.getElementById("liveScore");

const ball =
  document.getElementById("ball");

const field =
  document.getElementById("aflField");

const passLine =
  document.getElementById("passLine");

const gameStatus =
  document.getElementById("gameStatus");

const playMessage =
  document.getElementById("playMessage");


/* =====================================================
   TEAM POSITIONS

   Coordinates are percentages of the oval.
===================================================== */

const teamPositions = [

  [50, 50],
  [42, 45],
  [58, 45],
  [35, 35],
  [65, 35],
  [27, 50],
  [73, 50],
  [38, 60],
  [62, 60],
  [22, 67],
  [78, 67],
  [32, 75],
  [68, 75],
  [42, 84],
  [58, 84],
  [50, 30],
  [45, 67],
  [55, 67]

];


/* Opposition positions */

const oppositionPositions = [

  [50, 35],
  [42, 40],
  [58, 40],
  [34, 45],
  [66, 45],
  [25, 55],
  [75, 55],
  [37, 58],
  [63, 58],
  [18, 65],
  [82, 65],
  [30, 70],
  [70, 70],
  [40, 78],
  [60, 78],
  [47, 60],
  [53, 60],
  [50, 70]

];


/* =====================================================
   LOAD QUESTION
===================================================== */

function loadQuestion() {

  if (questionIndex >= questions.length) {

    finishGame();

    return;
  }

  const q = questions[questionIndex];

  questionNumber.textContent =
    questionIndex + 1;

  questionText.textContent =
    q.question;

  answersContainer.innerHTML = "";

  feedback.textContent = "";

  q.options.forEach((option, index) => {

    const button =
      document.createElement("button");

    button.className =
      "answer-button";

    button.textContent =
      `${String.fromCharCode(65 + index)}. ${option}`;

    button.addEventListener(
      "click",
      () => checkAnswer(index, button)
    );

    answersContainer.appendChild(button);

  });

}


/* =====================================================
   CHECK ANSWER
===================================================== */

function checkAnswer(selected, clickedButton) {

  const q =
    questions[questionIndex];

  const buttons =
    document.querySelectorAll(".answer-button");

  buttons.forEach(button => {
    button.disabled = true;
  });


  if (selected === q.correct) {

    entertainmentScore++;

    entScoreElement.textContent =
      entertainmentScore;

    clickedButton.classList.add("correct");

    feedback.style.color =
      "#55e37d";

    feedback.textContent =
      "✓ CORRECT — AFL PLAY UNLOCKED!";

    setTimeout(() => {

      startAFL();

    }, 900);

  } else {

    clickedButton.classList.add("wrong");

    buttons[q.correct].classList.add("correct");

    feedback.style.color =
      "#ff6969";

    feedback.textContent =
      "✗ Not quite. The correct answer is highlighted.";

    setTimeout(() => {

      questionIndex++;

      loadQuestion();

    }, 1700);

  }

}


/* =====================================================
   START AFL
===================================================== */

function startAFL() {

  quizScreen.classList.remove("active");

  aflScreen.classList.add("active");

  gameActive = true;

  currentPlayer =
    Math.floor(Math.random() * 18);

  positionPlayers();

  giveBallTo(currentPlayer);

  document.getElementById("playNumber").textContent =
    playNumber;

  playMessage.textContent =
    "You have possession. Drag from the ball carrier to a teammate — or toward the goals to kick.";

  gameStatus.textContent =
    "Choose your next move.";

  startClock();

}


/* =====================================================
   POSITION PLAYERS
===================================================== */

function positionPlayers() {

  teamPositions.forEach((position, index) => {

    const player =
      document.querySelector(
        `.p${index + 1}`
      );

    player.style.left =
      `${position[0]}%`;

    player.style.top =
      `${position[1]}%`;

  });


  oppositionPositions.forEach((position, index) => {

    const player =
      document.querySelector(
        `.o${index + 1}`
      );

    player.style.left =
      `${position[0]}%`;

    player.style.top =
      `${position[1]}%`;

  });

}


/* =====================================================
   GIVE BALL
===================================================== */

function giveBallTo(index) {

  currentPlayer =
    index;

  document
    .querySelectorAll(".blue")
    .forEach(player => {

      player.classList.remove("selected");

    });


  const player =
    document.querySelector(
      `.p${index + 1}`
    );

  player.classList.add("selected");

  moveBallToPlayer(player);

}


/* =====================================================
   MOVE BALL
===================================================== */

function moveBallToPlayer(player) {

  const rect =
    field.getBoundingClientRect();

  const playerRect =
    player.getBoundingClientRect();

  const x =
    ((playerRect.left + playerRect.width / 2 - rect.left)
      / rect.width) * 100;

  const y =
    ((playerRect.top + playerRect.height / 2 - rect.top)
      / rect.height) * 100;

  ball.style.left =
    `${x}%`;

  ball.style.top =
    `${y}%`;

}


/* =====================================================
   DRAG PASS SYSTEM
===================================================== */

document
  .querySelectorAll(".blue")
  .forEach(player => {

    player.addEventListener(
      "pointerdown",
      startDrag
    );

  });


function startDrag(event) {

  if (!gameActive) return;

  const player =
    event.currentTarget;

  const playerNumber =
    Number(
      player.dataset.player
    ) - 1;

  if (playerNumber !== currentPlayer) {

    gameStatus.textContent =
      "That player doesn't have the ball.";

    return;

  }


  event.preventDefault();

  dragStart =
    player;

  player.setPointerCapture(
    event.pointerId
  );

  passLine.style.display =
    "block";

  updatePassLine(
    event.clientX,
    event.clientY
  );


  player.addEventListener(
    "pointermove",
    dragMove
  );

  player.addEventListener(
    "pointerup",
    endDrag,
    { once: true }
  );

}


/* =====================================================
   DRAG MOVE
===================================================== */

function dragMove(event) {

  updatePassLine(
    event.clientX,
    event.clientY
  );

}


/* =====================================================
   DRAW PASS LINE
===================================================== */

function updatePassLine(
  clientX,
  clientY
) {

  if (!dragStart) return;

  const fieldRect =
    field.getBoundingClientRect();

  const startRect =
    dragStart.getBoundingClientRect();

  const x1 =
    startRect.left +
    startRect.width / 2 -
    fieldRect.left;

  const y1 =
    startRect.top +
    startRect.height / 2 -
    fieldRect.top;

  const x2 =
    clientX -
    fieldRect.left;

  const y2 =
    clientY -
    fieldRect.top;

  const dx =
    x2 - x1;

  const dy =
    y2 - y1;

  const distance =
    Math.sqrt(
      dx * dx +
      dy * dy
    );

  const angle =
    Math.atan2(dy, dx) *
    180 /
    Math.PI;

  passLine.style.left =
    `${x1}px`;

  passLine.style.top =
    `${y1}px`;

  passLine.style.width =
    `${distance}px`;

  passLine.style.transform =
    `rotate(${angle}deg)`;

}


/* =====================================================
   END DRAG
===================================================== */

function endDrag(event) {

  if (!dragStart) return;

  const player =
    dragStart;

  player.removeEventListener(
    "pointermove",
    dragMove
  );

  passLine.style.display =
    "none";


  const fieldRect =
    field.getBoundingClientRect();

  const targetX =
    ((event.clientX - fieldRect.left)
      / fieldRect.width) * 100;

  const targetY =
    ((event.clientY - fieldRect.top)
      / fieldRect.height) * 100;


  dragStart = null;


  /* Check whether player dragged to a teammate */

  const target =
    findClosestTeammate(
      targetX,
      targetY
    );


  if (target !== null) {

    makePass(target);

    return;

  }


  /* Otherwise kick */

  kickBall(
    targetX,
    targetY
  );

}


/* =====================================================
   FIND TEAMMATE
===================================================== */

function findClosestTeammate(
  x,
  y
) {

  let closest = null;

  let closestDistance = 8;


  teamPositions.forEach(
    (position, index) => {

      if (index === currentPlayer)
        return;

      const distance =
        Math.hypot(
          x - position[0],
          y - position[1]
        );

      if (
        distance < closestDistance
      ) {

        closestDistance =
          distance;

        closest =
          index;

      }

    }
  );


  return closest;

}


/* =====================================================
   PASS
===================================================== */

function makePass(target) {

  gameStatus.textContent =
    "PASS AWAY!";

  playMessage.textContent =
    "Your teammate receives the ball. The defence is reacting.";

  const success =
    calculatePassSuccess(
      target
    );


  if (success) {

    aflScore += 1;

    liveScore.textContent =
      `${Math.floor(aflScore / 6)}.${aflScore % 6}`;

    gameStatus.textContent =
      "✓ Clean pass!";

    moveDefenders();

    setTimeout(() => {

      giveBallTo(target);

      continuePlay();

    }, 650);

  } else {

    gameStatus.textContent =
      "✗ Intercepted!";

    setTimeout(() => {

      oppositionWinsBall();

    }, 700);

  }

}


/* =====================================================
   PASS SUCCESS
===================================================== */

function calculatePassSuccess(
  target
) {

  const targetPosition =
    teamPositions[target];

  let nearestDefender =
    100;


  oppositionPositions.forEach(
    defender => {

      const distance =
        Math.hypot(
          targetPosition[0] - defender[0],
          targetPosition[1] - defender[1]
        );

      nearestDefender =
        Math.min(
          nearestDefender,
          distance
        );

    }
  );


  return nearestDefender > 7;

}


/* =====================================================
   DEFENDERS REACT
===================================================== */

function moveDefenders() {

  const defenders =
    document.querySelectorAll(".red");


  defenders.forEach(
    (defender, index) => {

      const target =
        teamPositions[
          (currentPlayer + index + 1)
          % teamPositions.length
        ];


      if (
        Math.random() < .7
      ) {

        defender.style.left =
          `${target[0] + (Math.random() * 5 - 2.5)}%`;

        defender.style.top =
          `${target[1] + (Math.random() * 5 - 2.5)}%`;

      }

    }
  );

}


/* =====================================================
   KICK
===================================================== */

function kickBall(
  targetX,
  targetY
) {

  const attackingGoal =
    targetY < 20 ||
    targetY > 80;


  if (!attackingGoal) {

    gameStatus.textContent =
      "Try dragging toward the goals to kick.";

    return;

  }


  gameStatus.textContent =
    "KICK!";

  playMessage.textContent =
    "The ball is travelling toward goal...";


  ball.style.left =
    `${targetX}%`;

  ball.style.top =
    `${targetY}%`;


  setTimeout(() => {

    const central =
      Math.abs(
        targetX - 50
      ) < 18;


    if (central) {

      aflScore += 6;

      liveScore.textContent =
        `${Math.floor(aflScore / 6)}.${aflScore % 6}`;

      gameStatus.textContent =
        "🏉 GOAL! SIX POINTS!";

    } else {

      aflScore += 1;

      liveScore.textContent =
        `${Math.floor(aflScore / 6)}.${aflScore % 6}`;

      gameStatus.textContent =
        "1 POINT — BEHIND!";

    }


    setTimeout(
      continuePlay,
      1000
    );

  }, 700);

}


/* =====================================================
   OPPOSITION WINS BALL
===================================================== */

function oppositionWinsBall() {

  gameStatus.textContent =
    "The opposition has won possession.";

  playMessage.textContent =
    "Turnover! Get ready for the next contest.";

  setTimeout(() => {

    continuePlay();

  }, 1200);

}


/* =====================================================
   CONTINUE PLAY
===================================================== */

function continuePlay() {

  gameActive = false;

  clearInterval(timer);

  playNumber++;

  questionIndex++;

  setTimeout(() => {

    aflScreen.classList.remove("active");

    quizScreen.classList.add("active");

    gameActive = false;

    loadQuestion();

  }, 500);

}


/* =====================================================
   GAME CLOCK
===================================================== */

function startClock() {

  clearInterval(timer);

  seconds = 92;

  updateClock();


  timer =
    setInterval(() => {

      if (!gameActive)
        return;

      seconds--;

      updateClock();


      if (seconds <= 0) {

        clearInterval(timer);

        gameStatus.textContent =
          "Time!";

        continuePlay();

      }

    }, 1000);

}


function updateClock() {

  const minutes =
    Math.floor(seconds / 60);

  const remaining =
    seconds % 60;

  document.getElementById(
    "gameTime"
  ).textContent =
    `${String(minutes).padStart(2, "0")}:${String(remaining).padStart(2, "0")}`;

}


/* =====================================================
   FINISH
===================================================== */

function finishGame() {

  clearInterval(timer);

  quizScreen.classList.remove(
    "active"
  );

  aflScreen.classList.remove(
    "active"
  );

  resultScreen.classList.add(
    "active"
  );


  const goals =
    Math.floor(aflScore / 6);

  const behinds =
    aflScore % 6;


  document.getElementById(
    "finalResult"
  ).innerHTML = `

    <p>
      Entertainment questions correct:
      <strong>${entertainmentScore}</strong>
    </p>

    <p>
      AFL score:
      <strong>${goals}.${behinds}</strong>
    </p>

    <p>
      Total AFL points:
      <strong>${aflScore}</strong>
    </p>

    <p>
      You completed the
      <strong>HSC Entertainment × AFL Challenge!</strong>
    </p>

  `;

}


/* =====================================================
   START
===================================================== */

loadQuestion();
