/* =====================================================
   ENTERTAINMENT QUESTIONS
===================================================== */

const questions = [

  {
    type: "mc",
    q: "A lighting fixture is suspended above a performance area. What is the primary purpose of a safety chain?",
    options: [
      "To provide power to the fixture",
      "To act as a secondary restraint",
      "To adjust the beam angle",
      "To control the lighting cue"
    ],
    answer: 1
  },

  {
    type: "short",
    q: "A three-phase lighting system needs to distribute electrical load evenly. What is the purpose of balancing the phases?",
    answers: [
      "distribute",
      "distributed",
      "evenly",
      "load",
      "power"
    ]
  },

  {
    type: "mc",
    q: "Which lantern would generally produce a broad beam with a relatively soft edge?",
    options: [
      "Profile",
      "Fresnel",
      "Followspot",
      "LED strip"
    ],
    answer: 1
  },

  {
    type: "short",
    q: "A microphone signal entering a mixer is too weak. Which control should normally be adjusted first to establish an appropriate input level?",
    answers: [
      "gain",
      "input gain"
    ]
  },

  {
    type: "mc",
    q: "What is the main purpose of a Vision Distribution Amplifier (VDA)?",
    options: [
      "To amplify audio for performers",
      "To distribute one video signal to multiple destinations",
      "To change a video's aspect ratio",
      "To control lighting fixtures"
    ],
    answer: 1
  },

  {
    type: "short",
    q: "A video image appears stretched because the proportions are incorrect. What setting should be checked?",
    answers: [
      "aspect ratio"
    ]
  },

  {
    type: "mc",
    q: "Which control is highest in the hierarchy of controls?",
    options: [
      "PPE",
      "Administrative controls",
      "Engineering controls",
      "Elimination"
    ],
    answer: 3
  },

  {
    type: "short",
    q: "Explain one reason why a dynamic microphone may be suitable for a loud live performance.",
    answers: [
      "rugged",
      "durable",
      "high spl",
      "loud",
      "live"
    ]
  },

  {
    type: "mc",
    q: "Who is primarily responsible for developing the lighting design for a production?",
    options: [
      "Lighting operator",
      "Lighting designer",
      "Audio technician",
      "Stage manager"
    ],
    answer: 1
  },

  {
    type: "short",
    q: "A cable is running across a busy walkway. Give one engineering control that could reduce the trip hazard.",
    answers: [
      "cable cover",
      "cable ramp"
    ]
  },

  {
    type: "mc",
    q: "What is the main purpose of foldback or monitor audio?",
    options: [
      "To allow performers to hear the required audio",
      "To provide lighting control",
      "To record the audience",
      "To distribute video"
    ],
    answer: 0
  },

  {
    type: "short",
    q: "What is the main difference between FOH audio and monitor audio?",
    answers: [
      "audience",
      "performer",
      "performers",
      "foldback",
      "monitor"
    ]
  },

  {
    type: "mc",
    q: "A microphone begins producing feedback during a live performance. Which action would be appropriate?",
    options: [
      "Increase the microphone gain",
      "Move the microphone closer to the speaker",
      "Reduce the gain or reposition the microphone",
      "Increase the monitor volume"
    ],
    answer: 2
  },

  {
    type: "short",
    q: "A scenic truck repeatedly develops a loose wheel during rehearsal. What should the crew do before continuing to use it?",
    answers: [
      "stop",
      "isolate",
      "inspect",
      "repair",
      "check",
      "fix"
    ]
  },

  {
    type: "mc",
    q: "Who represents workers on health and safety matters?",
    options: [
      "Health and Safety Representative",
      "Lighting designer",
      "FOH operator",
      "Customer service officer"
    ],
    answer: 0
  },

  {
    type: "short",
    q: "A patron complains after tripping over a hazard in a venue foyer. What should staff do first?",
    answers: [
      "ask",
      "details",
      "incident",
      "information"
    ]
  },

  {
    type: "mc",
    q: "A projector is displaying a 16:9 image on a 4:3 screen and the image looks distorted. What should be checked?",
    options: [
      "Aspect ratio",
      "Audio gain",
      "Lighting intensity",
      "Microphone type"
    ],
    answer: 0
  },

  {
    type: "short",
    q: "A lighting fixture has damaged electrical insulation. Identify one reason it should be removed from service.",
    answers: [
      "electric",
      "electrical",
      "fire",
      "shock",
      "hazard",
      "danger"
    ]
  },

  {
    type: "mc",
    q: "Which connector is commonly used for balanced microphone audio?",
    options: [
      "HDMI",
      "XLR",
      "RCA",
      "BNC"
    ],
    answer: 1
  },

  {
    type: "short",
    q: "What is one difference between gain and EQ on an audio mixing desk?",
    answers: [
      "gain input",
      "gain signal",
      "eq frequency",
      "frequency",
      "input level"
    ]
  }

];


/* =====================================================
   GAME VARIABLES
===================================================== */

let questionIndex = 0;
let entScore = 0;
let aflScore = 0;

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

const questionType =
  document.getElementById("questionType");

const answerBox =
  document.getElementById("answer");

const feedback =
  document.getElementById("feedback");

const multipleChoice =
  document.getElementById("multipleChoice");

const submitBtn =
  document.getElementById("submitBtn");

const player =
  document.getElementById("player");

const field =
  document.getElementById("field");

const ball =
  document.getElementById("ball");


/* =====================================================
   AFL VARIABLES
===================================================== */

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


/* =====================================================
   LOAD QUESTION
===================================================== */

function loadQuestion() {

  if (questionIndex >= questions.length) {
    finishGame();
    return;
  }

  const currentQuestion =
    questions[questionIndex];

  questionNumber.textContent =
    `Entertainment Question ${questionIndex + 1}`;

  questionText.textContent =
    currentQuestion.q;

  feedback.textContent = "";

  answerBox.value = "";

  multipleChoice.innerHTML = "";


  /* MULTIPLE CHOICE */

  if (currentQuestion.type === "mc") {

    questionType.textContent =
      "MULTIPLE CHOICE";

    answerBox.style.display =
      "none";

    submitBtn.style.display =
      "none";

    multipleChoice.style.display =
      "grid";


    currentQuestion.options.forEach(
      (option, index) => {

        const button =
          document.createElement("button");

        button.textContent =
          `${String.fromCharCode(65 + index)}. ${option}`;

        button.addEventListener(
          "click",
          () => checkMultipleChoice(index)
        );

        multipleChoice.appendChild(button);

      }
    );

  }


  /* SHORT ANSWER */

  else {

    questionType.textContent =
      "SHORT ANSWER";

    multipleChoice.style.display =
      "none";

    answerBox.style.display =
      "block";

    submitBtn.style.display =
      "block";

    setTimeout(() => {

      if (quizScreen.classList.contains("active")) {
        answerBox.focus();
      }

    }, 50);

  }

}


/* =====================================================
   SHORT ANSWER CHECK
===================================================== */

function checkAnswer() {

  const response =
    answerBox.value
      .toLowerCase()
      .trim();

  if (!response) {

    feedback.textContent =
      "Type an answer first.";

    feedback.style.color =
      "#ffd34d";

    return;

  }

  const accepted =
    questions[questionIndex].answers;

  const correct =
    accepted.some(word =>
      response.includes(word)
    );


  if (correct) {

    entScore++;

    document.getElementById(
      "entScore"
    ).textContent = entScore;

    feedback.style.color =
      "#55e37d";

    feedback.textContent =
      "✓ Correct! You have earned an AFL play.";

    setTimeout(
      startAFL,
      900
    );

  }

  else {

    feedback.style.color =
      "#ff6868";

    feedback.textContent =
      "✗ Not quite. Review the concept and try again.";

  }

}


/* =====================================================
   MULTIPLE CHOICE CHECK
===================================================== */

function checkMultipleChoice(
  selectedIndex
) {

  const currentQuestion =
    questions[questionIndex];

  const buttons =
    multipleChoice.querySelectorAll(
      "button"
    );


  buttons.forEach(button => {
    button.disabled = true;
  });


  if (
    selectedIndex ===
    currentQuestion.answer
  ) {

    buttons[selectedIndex]
      .classList.add("correct");

    entScore++;

    document.getElementById(
      "entScore"
    ).textContent = entScore;

    feedback.style.color =
      "#55e37d";

    feedback.textContent =
      "✓ Correct! AFL play unlocked.";

    setTimeout(
      startAFL,
      900
    );

  }

  else {

    buttons[selectedIndex]
      .classList.add("incorrect");

    buttons[
      currentQuestion.answer
    ].classList.add("correct");

    feedback.style.color =
      "#ff6868";

    feedback.textContent =
      "✗ Incorrect. The correct answer is highlighted.";

    setTimeout(() => {

      buttons.forEach(button => {
        button.disabled = false;
      });

    }, 1200);

  }

}


/* =====================================================
   START AFL
===================================================== */

function startAFL() {

  quizScreen.classList.remove(
    "active"
  );

  aflScreen.classList.add(
    "active"
  );

  gameActive = true;

  hasPossession = true;

  playerX = 50;
  playerY = 70;

  updatePositions();

  document.getElementById(
    "playText"
  ).textContent =
    "You're inside attacking range. Read the defenders and make your decision.";

  document.getElementById(
    "gameStatus"
  ).textContent =
    "You have possession — move, evade or dispose of the ball.";

  lastTime =
    performance.now();

  requestAnimationFrame(
    gameLoop
  );

}


/* =====================================================
   UPDATE POSITIONS
===================================================== */

function updatePositions() {

  player.style.left =
    `${playerX}%`;

  player.style.top =
    `${playerY}%`;


  document.querySelector(
    ".cpu1"
  ).style.left =
    `${cpuX1}%`;

  document.querySelector(
    ".cpu1"
  ).style.top =
    `${cpuY1}%`;


  document.querySelector(
    ".cpu2"
  ).style.left =
    `${cpuX2}%`;

  document.querySelector(
    ".cpu2"
  ).style.top =
    `${cpuY2}%`;


  if (hasPossession) {

    ball.style.left =
      `calc(${playerX}% + 18px)`;

    ball.style.top =
      `calc(${playerY}% + 12px)`;

  }

}


/* =====================================================
   AFL GAME LOOP
===================================================== */

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

  requestAnimationFrame(
    gameLoop
  );

}


/* =====================================================
   PLAYER MOVEMENT
===================================================== */

function movePlayer(delta) {

  let speed =
    keys["shift"]
      ? 0.42
      : 0.24;


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
      Math.min(
        97,
        playerX
      )
    );

  playerY =
    Math.max(
      3,
      Math.min(
        97,
        playerY
      )
    );

}


/* =====================================================
   CPU DEFENDERS
===================================================== */

function moveCPU(delta) {

  cpuX1 +=
    (playerX - cpuX1)
    * 0.012
    * delta;

  cpuY1 +=
    (playerY - cpuY1)
    * 0.012
    * delta;


  const targetX =
    playerX +
    (
      keys["d"]
        ? 4
        : keys["a"]
          ? -4
          : 0
    );

  const targetY =
    playerY - 3;


  cpuX2 +=
    (targetX - cpuX2)
    * 0.007
    * delta;

  cpuY2 +=
    (targetY - cpuY2)
    * 0.007
    * delta;

}


/* =====================================================
   DEFENDER PRESSURE
===================================================== */

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

    document.getElementById(
      "gameStatus"
    ).textContent =
      "⚠️ Defender closing! Sprint or evade!";

  }

}


/* =====================================================
   KICK
===================================================== */

function kick() {

  if (
    !gameActive ||
    !hasPossession
  ) return;


  hasPossession = false;

  document.getElementById(
    "gameStatus"
  ).textContent =
    "KICK! The ball is travelling forward...";


  ball.style.left =
    `${playerX}%`;

  ball.style.top =
    `${Math.max(
      2,
      playerY - 20
    )}%`;


  setTimeout(() => {

    const goodKick =
      playerY < 55 &&
      Math.abs(
        playerX - 50
      ) < 35;


    if (goodKick) {

      aflScore++;

      document.getElementById(
        "aflScore"
      ).textContent =
        aflScore;

      document.getElementById(
        "gameStatus"
      ).textContent =
        "🏉 Great kick! Your teammate marks it.";

    }

    else {

      document.getElementById(
        "gameStatus"
      ).textContent =
        "The kick didn't work. The opposition gets the ball.";

    }


    nextQuestion();

  }, 800);

}


/* =====================================================
   HANDPASS
===================================================== */

function handball() {

  if (
    !gameActive ||
    !hasPossession
  ) return;


  hasPossession = false;


  document.getElementById(
    "gameStatus"
  ).textContent =
    "HANDPASS! You release the ball to your teammate.";


  setTimeout(() => {

    aflScore++;

    document.getElementById(
      "aflScore"
    ).textContent =
      aflScore;

    document.getElementById(
      "gameStatus"
    ).textContent =
      "✓ Clean handball! Your teammate keeps possession.";

    nextQuestion();

  }, 700);

}


/* =====================================================
   LEAD KICK
===================================================== */

function leadKick() {

  if (
    !gameActive ||
    !hasPossession
  ) return;


  hasPossession = false;


  document.getElementById(
    "gameStatus"
  ).textContent =
    "LEAD KICK! You kick into space for a teammate.";


  setTimeout(() => {

    aflScore++;

    document.getElementById(
      "aflScore"
    ).textContent =
      aflScore;

    document.getElementById(
      "gameStatus"
    ).textContent =
      "✓ Your teammate runs onto it.";

    nextQuestion();

  }, 700);

}


/* =====================================================
   EVADE
===================================================== */

function evade() {

  if (!gameActive)
    return;


  playerX +=
    keys["d"]
      ? 7
      : keys["a"]
        ? -7
        : 7;


  playerX =
    Math.max(
      3,
      Math.min(
        97,
        playerX
      )
    );


  document.getElementById(
    "gameStatus"
  ).textContent =
    "💨 EVASION! You burst away from the defender.";

}


/* =====================================================
   NEXT QUESTION
===================================================== */

function nextQuestion() {

  gameActive = false;

  questionIndex++;


  setTimeout(() => {

    aflScreen.classList.remove(
      "active"
    );

    quizScreen.classList.add(
      "active"
    );

    loadQuestion();

  }, 1300);

}


/* =====================================================
   FINISH
===================================================== */

function finishGame() {

  quizScreen.classList.remove(
    "active"
  );

  aflScreen.classList.remove(
    "active"
  );

  resultScreen.classList.add(
    "active"
  );


  document.getElementById(
    "finalResult"
  ).innerHTML =

    `Entertainment score:
     <b>${entScore}</b>
     <br>

     AFL score:
     <b>${aflScore}</b>
     <br><br>

     You completed the
     HSC Entertainment × AFL challenge!`;

}


/* =====================================================
   KEYBOARD CONTROLS
   IMPORTANT:
   THESE DO NOT INTERFERE WITH TYPING.
===================================================== */

document.addEventListener(
  "keydown",
  e => {

    const typing =
      document.activeElement === answerBox ||
      document.activeElement?.tagName === "INPUT" ||
      document.activeElement?.tagName === "TEXTAREA" ||
      document.activeElement?.isContentEditable;


    /*
      WHILE TYPING:
      DO NOTHING WITH AFL CONTROLS.
    */

    if (typing) {

      if (
        e.key === "Enter"
      ) {

        e.preventDefault();

        checkAnswer();

      }

      return;

    }


    /*
      AFL CONTROLS ONLY
      WORK DURING AFL.
    */

    if (!gameActive)
      return;


    const key =
      e.key.toLowerCase();


    const aflKeys = [
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
      aflKeys.includes(key)
    ) {

      e.preventDefault();

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

  }
);


/* =====================================================
   KEY RELEASE
===================================================== */

document.addEventListener(
  "keyup",
  e => {

    const typing =
      document.activeElement === answerBox ||
      document.activeElement?.tagName === "INPUT" ||
      document.activeElement?.tagName === "TEXTAREA" ||
      document.activeElement?.isContentEditable;


    if (typing)
      return;


    keys[
      e.key.toLowerCase()
    ] = false;

  }
);


/* =====================================================
   MOBILE BUTTONS
===================================================== */

document.querySelectorAll(
  ".mobile-controls button"
).forEach(button => {

  button.addEventListener(
    "click",
    () => {

      const key =
        button.dataset.key;

      const action =
        button.dataset.action;


      if (key) {

        keys[key] = true;

        setTimeout(() => {
          keys[key] = false;
        }, 200);

      }


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
        }, 800);

      }

    }
  );

});


/* =====================================================
   START
===================================================== */

document
  .getElementById("submitBtn")
  .addEventListener(
    "click",
    checkAnswer
  );


loadQuestion();
