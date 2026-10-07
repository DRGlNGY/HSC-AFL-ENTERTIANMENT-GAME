* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background:
    radial-gradient(circle at top, #18233d, #070b14 70%);
  color: white;
  min-height: 100vh;
}

header {
  text-align: center;
  padding: 25px 15px 15px;
  border-bottom: 1px solid #28334e;
}

header h1 {
  margin: 0;
  font-size: clamp(24px, 4vw, 42px);
}

header p {
  color: #aeb9cf;
  margin: 8px 0 18px;
}

.scores {
  display: flex;
  justify-content: center;
  gap: 35px;
  font-size: 18px;
}

.scores span:first-child b {
  color: #48a8ff;
}

.scores span:last-child b {
  color: #55e37d;
}

main {
  width: 100%;
}

.screen {
  display: none;
  padding: 35px 15px;
}

.screen.active {
  display: block;
}

.card {
  max-width: 800px;
  margin: auto;
  background: rgba(20, 28, 47, 0.95);
  border: 1px solid #35415e;
  border-radius: 18px;
  padding: 35px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.35);
}

.tag {
  display: inline-block;
  background: #24314f;
  color: #6db9ff;
  padding: 7px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
}

.card h2 {
  font-size: 30px;
}

#question {
  font-size: 21px;
  line-height: 1.5;
  min-height: 80px;
}

textarea {
  width: 100%;
  min-height: 140px;
  resize: vertical;
  background: #0b101c;
  color: white;
  border: 2px solid #34405c;
  border-radius: 12px;
  padding: 15px;
  font-size: 17px;
  outline: none;
}

textarea:focus {
  border-color: #4da8ff;
}

button {
  width: 100%;
  margin-top: 18px;
  padding: 15px;
  border: none;
  border-radius: 10px;
  background: linear-gradient(90deg, #1688ff, #6b5cff);
  color: white;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  filter: brightness(1.15);
}

#feedback {
  min-height: 30px;
  font-weight: bold;
  line-height: 1.5;
}

.afl-header {
  max-width: 1100px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  padding: 10px 5px 18px;
  font-size: 18px;
}

.afl-header span {
  margin-left: 20px;
  color: #aeb9cf;
}

.game-wrapper {
  max-width: 1100px;
  margin: auto;
}

.field {
  position: relative;
  width: 100%;
  height: min(70vh, 650px);
  min-height: 500px;
  overflow: hidden;

  background:
    repeating-linear-gradient(
      90deg,
      rgba(255,255,255,0.025) 0px,
      rgba(255,255,255,0.025) 2px,
      transparent 2px,
      transparent 40px
    ),
    linear-gradient(90deg, #187d39, #24994a, #187d39);

  border: 8px solid white;
  border-radius: 48% / 10%;
  box-shadow:
    inset 0 0 50px rgba(0,0,0,0.25),
    0 20px 50px rgba(0,0,0,0.4);
}

.field::before,
.field::after {
  content: "";
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 65%;
  height: 30%;
  border: 3px solid rgba(255,255,255,0.75);
  border-radius: 50%;
  pointer-events: none;
}

.field::before {
  top: -12%;
}

.field::after {
  bottom: -12%;
}

.centre-circle {
  position: absolute;
  width: 110px;
  height: 110px;
  border: 3px solid white;
  border-radius: 50%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.goal {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 55px;
  border: 4px solid white;
}

.goal-top {
  top: -8px;
}

.goal-bottom {
  bottom: -8px;
}

.player {
  position: absolute;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8px;
  font-weight: bold;
  z-index: 5;
  transition: transform 0.08s linear;
}

.user-player {
  background: #198cff;
  border: 3px solid white;
  box-shadow: 0 0 20px #198cff;
  left: 50%;
  top: 70%;
}

.cpu {
  background: #e93232;
  border: 3px solid white;
  box-shadow: 0 0 15px rgba(255,0,0,0.5);
}

.cpu1 {
  left: 43%;
  top: 52%;
}

.cpu2 {
  left: 59%;
  top: 45%;
}

.teammate {
  background: #ffc400;
  border: 3px solid white;
  position: absolute;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 7px;
  font-weight: bold;
}

.teammate1 {
  left: 68%;
  top: 30%;
}

.ball {
  position: absolute;
  width: 15px;
  height: 24px;
  border-radius: 50%;
  background: #c77a35;
  border: 2px solid #633914;
  left: 52%;
  top: 67%;
  z-index: 6;
  transform: rotate(-25deg);
}

.controls {
  margin-top: 15px;
  background: rgba(10,15,25,0.92);
  border: 1px solid #33405b;
  border-radius: 14px;
  padding: 18px;
}

.controls h3 {
  margin: 0 0 5px;
}

.control-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
  margin-top: 15px;
}

.control-grid div {
  background: #1a2337;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  font-size: 12px;
}

.control-grid b {
  color: #6db9ff;
}

.status {
  color: #ffd34d;
  font-weight: bold;
}

@media (max-width: 700px) {
  .card {
    padding: 22px;
  }

  .field {
    min-height: 430px;
  }

  .control-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .afl-header {
    font-size: 14px;
  }
}
