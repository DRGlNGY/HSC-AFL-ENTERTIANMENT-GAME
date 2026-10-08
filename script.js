/* =========================================================
   ENTERTAINMENT × AFL
   3D AFL PROTOTYPE
========================================================= */


/* =========================================================
   HSC QUESTIONS
========================================================= */

const questions = [

  {
    type: "mcq",

    question:
      "A technician discovers a damaged power cable during bump-in. What should happen FIRST?",

    options: [
      "Increase the load on the cable",
      "Remove the damaged cable from service",
      "Cover the damaged section with tape",
      "Continue using it at reduced power"
    ],

    correct: 1
  },

  {
    type: "mcq",

    question:
      "Which lighting instrument generally produces a broad beam with a relatively soft edge?",

    options: [
      "Profile",
      "Fresnel",
      "Followspot",
      "PAR can"
    ],

    correct: 1
  },

  {
    type: "mcq",

    question:
      "A projector displays an image with incorrect proportions. Which setting should be checked?",

    options: [
      "Gain",
      "Aspect ratio",
      "EQ",
      "Phase"
    ],

    correct: 1
  },

  {
    type: "short",

    question:
      "Explain the difference between a hazard and a risk.",

    answers: [
      "hazard",
      "risk",
      "harm",
      "chance"
    ]
  },

  {
    type: "mcq",

    question:
      "What is the primary purpose of a safety chain when suspending a lighting fixture?",

    options: [
      "To improve the colour of the light",
      "To act as a secondary safety restraint",
      "To increase brightness",
      "To control the dimmer"
    ],

    correct: 1
  },

  {
    type: "mcq",

    question:
      "Which role is primarily responsible for developing the artistic lighting design in consultation with the director?",

    options: [
      "Lighting operator",
      "Audio technician",
      "Lighting designer",
      "Stagehand"
    ],

    correct: 2
  },

  {
    type: "short",

    question:
      "A microphone signal is too weak at the mixing desk. What control would normally be adjusted to establish an appropriate input level?",

    answers: [
      "gain",
      "input gain",
      "preamp"
    ]
  },

  {
    type: "mcq",

    question:
      "A venue wants to record a customer enquiry so other staff can access the information later. What is the most appropriate method?",

    options: [
      "Tell another employee verbally",
      "Write it on loose paper",
      "Record it in the venue's database",
      "Ignore the enquiry"
    ],

    correct: 2
  },

  {
    type: "mcq",

    question:
      "What is one major purpose of a vision distribution amplifier?",

    options: [
      "To amplify a microphone",
      "To distribute a video signal to multiple destinations",
      "To change stage lighting colour",
      "To balance audio phases"
    ],

    correct: 1
  },

  {
    type: "short",

    question:
      "Give ONE control measure that could reduce the trip hazard created by an audio cable across a walkway.",

    answers: [
      "cable cover",
      "cable ramp",
      "secure",
      "reroute",
      "remove"
    ]
  },

  {
    type: "mcq",

    question:
      "Who does a Health and Safety Representative primarily represent?",

    options: [
      "Customers",
      "Workers",
      "Venue owners",
      "Performers only"
    ],

    correct: 1
  },

  {
    type: "short",

    question:
      "What is the main difference between FOH audio and monitor audio?",

    answers: [
      "audience",
      "performer",
      "performers",
      "foldback",
      "monitor"
    ]
  }

];


/* =========================================================
   GAME VARIABLES
========================================================= */

let questionIndex = 0;

let entScore = 0;
let aflScore = 0;

let selectedAnswer = null;

let gameActive = false;

let selectedPlayer = null;

let dragging = false;

let dragStart = null;

let ball = null;

let players = [];

let opponents = [];

let scene;
let camera;
let renderer;

let raycaster;
let mouse;

let fieldGroup;

let animationTime = 0;


/* =========================================================
   DOM
========================================================= */

const quizScreen =
  document.getElementById("quizScreen");

const gameScreen =
  document.getElementById("gameScreen");

const resultScreen =
  document.getElementById("resultScreen");

const questionNumber =
  document.getElementById("questionNumber");

const questionText =
  document.getElementById("question");

const answersContainer =
  document.getElementById("answers");

const shortAnswer =
  document.getElementById("shortAnswer");

const submitAnswer =
  document.getElementById("submitAnswer");

const feedback =
  document.getElementById("feedback");

const entScoreDisplay =
  document.getElementById("entScore");

const aflScoreDisplay =
  document.getElementById("aflScore");

const gameMessage =
  document.getElementById("gameMessage");

const aflGameScore =
  document.getElementById("aflGameScore");

const canvas =
  document.getElementById("gameCanvas");


/* =========================================================
   QUESTIONS
========================================================= */

function loadQuestion() {

  if (questionIndex >= questions.length) {

    finishGame();

    return;
  }

  const q = questions[questionIndex];

  questionNumber.textContent =
    `Entertainment Question ${questionIndex + 1}`;

  questionText.textContent =
    q.question;

  answersContainer.innerHTML = "";

  shortAnswer.style.display = "none";

  selectedAnswer = null;

  feedback.textContent = "";

  if (q.type === "mcq") {

    answersContainer.style.display =
      "grid";

    q.options.forEach((option, index) => {

      const button =
        document.createElement("button");

      button.className =
        "answer-button";

      button.textContent =
        `${String.fromCharCode(65 + index)}. ${option}`;

      button.addEventListener(
        "click",
        () => selectAnswer(index, button)
      );

      answersContainer.appendChild(button);

    });

  } else {

    answersContainer.style.display =
      "none";

    shortAnswer.style.display =
      "block";

    setTimeout(() => {
      shortAnswer.focus();
    }, 100);

  }

}


function selectAnswer(index, button) {

  selectedAnswer = index;

  document
    .querySelectorAll(".answer-button")
    .forEach(b => {
      b.classList.remove("selected");
    });

  button.classList.add("selected");
}


function checkAnswer() {

  const q =
    questions[questionIndex];

  let correct = false;


  /* MCQ */

  if (q.type === "mcq") {

    if (selectedAnswer === null) {

      feedback.textContent =
        "Select an answer first.";

      feedback.style.color =
        "#ffd34d";

      return;
    }

    correct =
      selectedAnswer === q.correct;

  }


  /* SHORT ANSWER */

  else {

    const response =
      shortAnswer.value
        .toLowerCase()
        .trim();

    if (!response) {

      feedback.textContent =
        "Type an answer first.";

      feedback.style.color =
        "#ffd34d";

      return;
    }

    correct =
      q.answers.some(
        word =>
          response.includes(word)
      );

  }


  /* CORRECT */

  if (correct) {

    entScore++;

    entScoreDisplay.textContent =
      entScore;

    feedback.textContent =
      "✓ Correct! AFL play unlocked.";

    feedback.style.color =
      "#55e37d";

    submitAnswer.disabled =
      true;

    setTimeout(() => {

      submitAnswer.disabled =
        false;

      startAFL();

    }, 900);

  }


  /* INCORRECT */

  else {

    feedback.textContent =
      "✗ Not quite. Try again.";

    feedback.style.color =
      "#ff6b6b";

  }

}


submitAnswer.addEventListener(
  "click",
  checkAnswer
);


/* =========================================================
   ENTER KEY
========================================================= */

shortAnswer.addEventListener(
  "keydown",
  event => {

    if (event.key === "Enter" && !event.shiftKey) {

      event.preventDefault();

      checkAnswer();

    }

  }
);


/* =========================================================
   THREE.JS INITIALISATION
========================================================= */

function init3D() {

  scene =
    new THREE.Scene();

  scene.background =
    new THREE.Color(
      0x82b5df
    );


  /* CAMERA */

  camera =
    new THREE.PerspectiveCamera(
      45,
      window.innerWidth /
        window.innerHeight,
      0.1,
      3000
    );

  camera.position.set(
    0,
    220,
    300
  );

  camera.lookAt(
    0,
    0,
    0
  );


  /* RENDERER */

  renderer =
    new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true
    });

  renderer.setPixelRatio(
    Math.min(
      window.devicePixelRatio,
      2
    )
  );

  renderer.setSize(
    window.innerWidth,
    window.innerHeight -
      90
  );


  /* LIGHTING */

  const ambient =
    new THREE.HemisphereLight(
      0xffffff,
      0x315a35,
      2.5
    );

  scene.add(ambient);


  const sunlight =
    new THREE.DirectionalLight(
      0xffffff,
      2
    );

  sunlight.position.set(
    100,
    300,
    100
  );

  scene.add(sunlight);


  createField();

  createTeams();

  createBall();


  raycaster =
    new THREE.Raycaster();

  mouse =
    new THREE.Vector2();


  canvas.addEventListener(
    "pointerdown",
    pointerDown
  );

  canvas.addEventListener(
    "pointermove",
    pointerMove
  );

  canvas.addEventListener(
    "pointerup",
    pointerUp
  );


  window.addEventListener(
    "resize",
    resizeGame
  );


  animate();

}


/* =========================================================
   AFL FIELD
========================================================= */

function createField() {

  fieldGroup =
    new THREE.Group();

  scene.add(
    fieldGroup
  );


  /* GROUND */

  const groundGeometry =
    new THREE.CylinderGeometry(
      190,
      190,
      2,
      64
    );

  const groundMaterial =
    new THREE.MeshStandardMaterial({
      color: 0x18733b
    });

  const ground =
    new THREE.Mesh(
      groundGeometry,
      groundMaterial
    );

  ground.scale.z =
    1.45;

  ground.position.y =
    -2;

  fieldGroup.add(
    ground
  );


  /* OVAL LINES */

  const lineMaterial =
    new THREE.LineBasicMaterial({
      color: 0xffffff
    });


  createOvalLine(
    170,
    245,
    lineMaterial
  );


  /* CENTRE CIRCLE */

  const circleGeometry =
    new THREE.RingGeometry(
      38,
      40,
      64
    );

  const circle =
    new THREE.Mesh(
      circleGeometry,
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide
      })
    );

  circle.rotation.x =
    -Math.PI / 2;

  circle.position.y =
    0.2;

  fieldGroup.add(
    circle
  );


  /* CENTRE LINE */

  const centreGeometry =
    new THREE.BoxGeometry(
      2,
      0.5,
      490
    );

  const centreLine =
    new THREE.Mesh(
      centreGeometry,
      new THREE.MeshBasicMaterial({
        color: 0xffffff
      })
    );

  centreLine.position.y =
    0.2;

  fieldGroup.add(
    centreLine
  );


  /* GOAL POSTS */

  createGoal(
    -245
  );

  createGoal(
    245
  );

}


/* =========================================================
   OVAL LINE
========================================================= */

function createOvalLine(
  radiusX,
  radiusZ,
  material
) {

  const points = [];

  for (
    let i = 0;
    i <= 128;
    i++
  ) {

    const angle =
      (i / 128) *
      Math.PI *
      2;

    points.push(
      new THREE.Vector3(
        Math.cos(angle) *
          radiusX,

        0.3,

        Math.sin(angle) *
          radiusZ
      )
    );

  }

  const geometry =
    new THREE.BufferGeometry()
      .setFromPoints(points);

  const line =
    new THREE.Line(
      geometry,
      material
    );

  fieldGroup.add(
    line
  );

}


/* =========================================================
   GOALS — 4 POSTS EACH END
========================================================= */

function createGoal(z) {

  const postMaterial =
    new THREE.MeshStandardMaterial({
      color: 0xffffff
    });


  /*
     AFL goal layout:

       behind post
       goal post
       goal post
       behind post
  */

  const positions = [
    -15,
    -5,
    5,
    15
  ];


  positions.forEach(
    x => {

      const height =
        Math.abs(x) <= 5
          ? 22
          : 12;


      const geometry =
        new THREE.CylinderGeometry(
          1.3,
          1.3,
          height,
          16
        );


      const post =
        new THREE.Mesh(
          geometry,
          postMaterial
        );


      post.position.set(
        x,
        height / 2,
        z
      );


      fieldGroup.add(
        post
      );

    }
  );

}


/* =========================================================
   PLAYERS
========================================================= */

function createTeams() {

  players = [];

  opponents = [];


  /*
     18 PLAYER AFL FORMATION

     These positions are approximate
     starting positions.
  */

  const bluePositions = [

    [-70, -150],
    [0, -160],
    [70, -150],

    [-110, -100],
    [-35, -105],
    [35, -105],
    [110, -100],

    [-130, -35],
    [-60, -40],
    [0, -20],
    [60, -40],
    [130, -35],

    [-100, 45],
    [-35, 60],
    [35, 60],
    [100, 45],

    [-45, 120],
    [45, 120]

  ];


  const redPositions =
    bluePositions.map(
      p => [-p[0], -p[1]]
    );


  bluePositions.forEach(
    (position, index) => {

      const player =
        createPlayer(
          0x1476ff,
          position[0],
          position[1],
          index
        );

      players.push(
        player
      );

    }
  );


  redPositions.forEach(
    (position, index) => {

      const player =
        createPlayer(
          0xe53935,
          position[0],
          position[1],
          index
        );

      opponents.push(
        player
      );

    }
  );

}


/* =========================================================
   PLAYER MODEL
========================================================= */

function createPlayer(
  colour,
  x,
  z,
  index
) {

  const group =
    new THREE.Group();


  /* BODY */

  const bodyGeometry =
    new THREE.CapsuleGeometry(
      4,
      8,
      6,
      12
    );

  const bodyMaterial =
    new THREE.MeshStandardMaterial({
      color: colour
    });

  const body =
    new THREE.Mesh(
      bodyGeometry,
      bodyMaterial
    );

  body.position.y =
    7;

  group.add(
    body
  );


  /* HEAD */

  const headGeometry =
    new THREE.SphereGeometry(
      3.2,
      16,
      16
    );

  const head =
    new THREE.Mesh(
      headGeometry,
      new THREE.MeshStandardMaterial({
        color: 0xd49b78
      })
    );

  head.position.y =
    17;

  group.add(
    head
  );


  group.position.set(
    x,
    0,
    z
  );


  group.userData = {

    team:
      colour === 0x1476ff
        ? "blue"
        : "red",

    index:
      index,

    speed:
      0.25 +
      Math.random() *
      0.15

  };


  scene.add(
    group
  );


  return group;

}


/* =========================================================
   BALL
========================================================= */

function createBall() {

  const geometry =
    new THREE.SphereGeometry(
      2.8,
      16,
      16
    );

  const material =
    new THREE.MeshStandardMaterial({
      color: 0x8a451c
    });

  ball =
    new THREE.Mesh(
      geometry,
      material
    );

  ball.position.set(
    0,
    5,
    0
  );

  scene.add(
    ball
  );

}


/* =========================================================
   START AFL PLAY
========================================================= */

function startAFL() {

  quizScreen.classList.remove(
    "active"
  );

  gameScreen.classList.add(
    "active"
  );

  gameActive = true;

  selectedPlayer = null;

  gameMessage.textContent =
    "Select one of your players.";

  positionBallWithPlayer();

}


/* =========================================================
   SELECT PLAYER
========================================================= */

function pointerDown(event) {

  if (!gameActive)
    return;


  const rect =
    canvas.getBoundingClientRect();


  mouse.x =
    ((event.clientX - rect.left) /
      rect.width) *
      2 -
    1;


  mouse.y =
    -(
      (event.clientY - rect.top) /
        rect.height
    ) *
      2 +
    1;


  raycaster.setFromCamera(
    mouse,
    camera
  );


  const objects = [];

  players.forEach(
    p => {

      p.traverse(
        child => {

          if (
            child.isMesh
          )
            objects.push(child);

        }
      );

    }
  );


  const hits =
    raycaster.intersectObjects(
      objects
    );


  if (hits.length === 0)
    return;


  let object =
    hits[0].object;


  while (
    object.parent &&
    !players.includes(object)
  ) {

    object =
      object.parent;

  }


  if (
    players.includes(object)
  ) {

    selectedPlayer =
      object;

    dragging = true;

    dragStart = {
      x: event.clientX,
      y: event.clientY
    };


    gameMessage.textContent =
      "Drag toward a teammate to pass the ball.";

  }

}


function pointerMove(event) {

  if (
    !dragging ||
    !selectedPlayer
  )
    return;


  drawAim(
    event.clientX,
    event.clientY
  );

}


function pointerUp(event) {

  if (
    !dragging ||
    !selectedPlayer
  )
    return;


  dragging = false;


  clearAim();


  performPass(
    event.clientX,
    event.clientY
  );

}


/* =========================================================
   PASSING
========================================================= */

function performPass(
  x,
  y
) {

  if (!selectedPlayer)
    return;


  /*
     Work out direction from
     mouse movement.
  */

  const dx =
    x -
    dragStart.x;

  const dy =
    y -
    dragStart.y;


  if (
    Math.abs(dx) < 15 &&
    Math.abs(dy) < 15
  ) {

    gameMessage.textContent =
      "Drag further to make a pass.";

    return;

  }


  /*
     Find teammate in the
     direction of the drag.
  */

  const direction =
    new THREE.Vector2(
      dx,
      dy
    ).normalize();


  let bestPlayer =
    null;

  let bestScore =
    Infinity;


  players.forEach(
    teammate => {

      if (
        teammate ===
        selectedPlayer
      )
        return;


      const diff =
        new THREE.Vector3()
          .subVectors(
            teammate.position,
            selectedPlayer.position
          );


      const distance =
        diff.length();


      if (
        distance > 180
      )
        return;


      /*
         Approximate screen
         direction.
      */

      const score =
        Math.abs(
          diff.x -
          direction.x *
            distance
        ) +
        Math.abs(
          diff.z +
          direction.y *
            distance
        );


      if (
        score <
        bestScore
      ) {

        bestScore =
          score;

        bestPlayer =
          teammate;

      }

    }
  );


  if (!bestPlayer) {

    gameMessage.textContent =
      "No teammate in that direction.";

    return;

  }


  kickBallTo(
    bestPlayer
  );

}


/* =========================================================
   BALL MOVEMENT
========================================================= */

function kickBallTo(
  target
) {

  const start =
    selectedPlayer.position.clone();

  const end =
    target.position.clone();


  end.y = 5;


  const duration =
    700;


  const startTime =
    performance.now();


  gameMessage.textContent =
    "PASS!";


  function animatePass(
    now
  ) {

    const progress =
      Math.min(
        (now - startTime) /
          duration,
        1
      );


    ball.position.lerpVectors(
      start,
      end,
      progress
    );


    ball.position.y =
      5 +
      Math.sin(
        progress *
          Math.PI
      ) *
      18;


    if (
      progress <
      1
    ) {

      requestAnimationFrame(
        animatePass
      );

    } else {

      ball.position.copy(
        end
      );

      receiveBall(
        target
      );

    }

  }


  requestAnimationFrame(
    animatePass
  );

}


/* =========================================================
   RECEIVE
========================================================= */

function receiveBall(
  player
) {

  selectedPlayer =
    player;

  aflScore++;

  aflScoreDisplay.textContent =
    aflScore;

  document.getElementById(
    "aflScore"
  ).textContent =
    aflScore;


  gameMessage.textContent =
    "✓ Clean possession!";


  /*
     After a successful play,
     return to the HSC question.
  */

  setTimeout(
    nextQuestion,
    900
  );

}


/* =========================================================
   CALL FOR BALL
========================================================= */

document.addEventListener(
  "keydown",
  event => {

    /*
       IMPORTANT:
       Ignore game keyboard
       controls while typing
       HSC answers.
    */

    if (
      document.activeElement ===
      shortAnswer
    ) {

      return;

    }


    if (
      event.code ===
      "Space" &&
      gameActive
    ) {

      event.preventDefault();


      if (
        selectedPlayer
      ) {

        gameMessage.textContent =
          "📢 You called for the ball!";

      }

    }

  }
);


/* =========================================================
   AIM LINE
========================================================= */

function drawAim(
  x,
  y
) {

  const dx =
    x -
    dragStart.x;

  const dy =
    y -
    dragStart.y;


  const length =
    Math.min(
      Math.sqrt(
        dx * dx +
        dy * dy
      ),
      250
    );


  const angle =
    Math.atan2(
      dy,
      dx
    );


  const line =
    document.getElementById(
      "aimLine"
    );


  line.style.display =
    "block";


  line.style.left =
    `${dragStart.x}px`;

  line.style.top =
    `${dragStart.y}px`;

  line.style.width =
    `${length}px`;

  line.style.transform =
    `rotate(${angle}rad)`;

}


function clearAim() {

  document.getElementById(
    "aimLine"
  ).style.display =
    "none";

}


/* =========================================================
   BALL POSITION
========================================================= */

function positionBallWithPlayer() {

  if (
    selectedPlayer
  ) {

    ball.position.set(
      selectedPlayer.position.x,
      5,
      selectedPlayer.position.z
    );

  }

}


/* =========================================================
   AI
========================================================= */

function updateAI() {

  if (!gameActive)
    return;


  opponents.forEach(
    opponent => {

      if (
        !selectedPlayer
      )
        return;


      const target =
        selectedPlayer.position;


      const direction =
        new THREE.Vector3()
          .subVectors(
            target,
            opponent.position
          );


      const distance =
        direction.length();


      if (
        distance >
        35
      ) {

        direction.normalize();


        opponent.position.x +=
          direction.x *
          opponent.userData.speed;

        opponent.position.z +=
          direction.z *
          opponent.userData.speed;

      }

    }
  );


  /*
     Other teammates
     reposition naturally.
  */

  players.forEach(
    (player, index) => {

      if (
        player ===
        selectedPlayer
      )
        return;


      const time =
        animationTime *
        0.001;


      player.position.x +=
        Math.sin(
          time +
          index
        ) *
        0.03;

      player.position.z +=
        Math.cos(
          time * 0.8 +
          index
        ) *
        0.03;

    }
  );

}


/* =========================================================
   NEXT QUESTION
========================================================= */

function nextQuestion() {

  gameActive = false;

  questionIndex++;


  setTimeout(
    () => {

      gameScreen.classList.remove(
        "active"
      );

      quizScreen.classList.add(
        "active"
      );

      loadQuestion();

    },
    800
  );

}


/* =========================================================
   RESULTS
========================================================= */

function finishGame() {

  gameScreen.classList.remove(
    "active"
  );

  quizScreen.classList.remove(
    "active"
  );

  resultScreen.classList.add(
    "active"
  );


  document.getElementById(
    "finalResult"
  ).innerHTML = `

    <p>
      Entertainment:
      <strong>${entScore}</strong>
    </p>

    <p>
      AFL:
      <strong>${aflScore}</strong>
    </p>

    <p>
      You completed the
      Entertainment × AFL
      HSC challenge!
    </p>

  `;

}


/* =========================================================
   ANIMATION
========================================================= */

function animate() {

  requestAnimationFrame(
    animate
  );


  animationTime =
    performance.now();


  updateAI();


  if (
    selectedPlayer &&
    gameActive
  ) {

    /*
       Slight camera follow.
    */

    const target =
      selectedPlayer.position;


    camera.position.x +=
      (
        target.x -
        camera.position.x
      ) *
      0.02;


    camera.position.z +=
      (
        target.z +
        300 -
        camera.position.z
      ) *
      0.02;


    camera.lookAt(
      target.x,
      0,
      target.z
    );

  }


  renderer.render(
    scene,
    camera
  );

}


/* =========================================================
   RESIZE
========================================================= */

function resizeGame() {

  if (!renderer)
    return;


  camera.aspect =
    window.innerWidth /
    (
      window.innerHeight -
      90
    );


  camera.updateProjectionMatrix();


  renderer.setSize(
    window.innerWidth,
    window.innerHeight -
      90
  );

}


/* =========================================================
   START
========================================================= */

init3D();

loadQuestion();
