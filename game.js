const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const gameContainer = document.getElementById("game-container");

const flappyImg = new Image();
flappyImg.src = "assets/flappy_dunk.png";

// Game Constants

const BIRD_WIDTH = 40;
const BIRD_HEIGHT = 30;
const FLAP_SPEED = -5;
const PIPE_WIDTH = 50;
const PIPE_GAP = 120;

// Bird Variables

let birdX = 50;
let birdY = 50;
let birdVelocity = 0;
let birdAcceleration = 0.1;

//Pipe Variables

let pipeX = 400;
let pipeY = canvas.height - 200;

// Score and Highscore Variables

let scoreDiv = document.getElementById("score-display");
let score = 0;
let highScore = 0;

// Bird Input
document.body.onkeyup = function (e) {
  if (e.code == "Space") {
    birdVelocity = FLAP_SPEED;
  }
};

// Reset The Game If You Reach game-over
document
  .getElementById("restart-button")
  .addEventListener("click", function () {
    hideEndMenu();
    resetGame();
    loop();
  });

function increaseScore() {
  if (
    birdX > pipeX + PIPE_WIDTH &&
    (birdY < pipeY + PIPE_GAP || birdY + BIRD_HEIGHT > pipeY + PIPE_GAP)
  ) {
    score++;
    scoreDiv.innerHTML = score;
  }
}

function collisionCheck() {
  const birdBox = {
    x: birdX,
    y: birdY,
    height: BIRD_HEIGHT,
    width: BIRD_WIDTH,
  };

  const topPipeBox = {
    x: pipeX,
    y: pipeY - PIPE_GAP + BIRD_HEIGHT,
    width: PIPE_WIDTH,
    height: pipeY,
  };

  const bottomPipeBox = {
    x: pipeX,
    y: pipeY + PIPE_GAP + BIRD_HEIGHT,
    width: PIPE_WIDTH,
    height: canvas.height - pipeY + PIPE_GAP,
  };

  // Check For Collision With Upper Pipe
  if (
    birdBox.x + birdBox.width > topPipeBox.x &&
    birdBox.x < topPipeBox.x + topPipeBox.width &&
    birdBox.y < topPipeBox.y
  ) {
    return true;
  }

  // Check For Collision With Bottom Pipe
  if (
    birdBox.x + birdBox.width > bottomPipeBox.x &&
    birdBox.x < bottomPipeBox.x + bottomPipeBox.width &&
    birdBox.y + birdBox.height > bottomPipeBox.y
  ) {
    return true;
  }

  // Check For Collision With Boundries
  if (birdY < 0 || birdY + BIRD_HEIGHT > canvas.height) {
    return true;
  }
  return false;
}

function showEndMenu() {
  document.getElementById("end-menu").style.display = "block";
  gameContainer.classList.add("backdrop-blur");
  document.getElementById("end-score").innerHTML = score;

  if (highScore < score) {
    highScore = score;
  }
  document.getElementById("best-score").innerHTML = highScore;
}

function hideEndMenu() {
  document.getElementById("end-menu").style.display = "none";
  gameContainer.classList.remove("backdrop-blur");
}

// This Will Reset The Values Of The Score And the Bird
function resetGame() {
  birdX = 50;
  birdY = 50;
  birdVelocity = 0;
  birdAcceleration = 0.1;

  pipeX = 400;
  pipeY = canvas.height - 200;

  score = 0;
}

function endGame() {
  showEndMenu();
}

function loop() {
  // This will reset the ctx after each loop iteration
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw Flappy Bird
  ctx.drawImage(flappyImg, birdX, birdY);

  // Bird Gravity
  birdVelocity += birdAcceleration;
  birdY += birdVelocity;

  //Draw Pipes
  ctx.fillStyle = "#333";
  ctx.fillRect(pipeX, -100, PIPE_WIDTH, pipeY);
  ctx.fillRect(pipeX, pipeY + PIPE_GAP, PIPE_WIDTH, canvas.height - pipeY);
  pipeX -= 1.5;

  // Creates New Pipes With Random Heights
  if (pipeX < -50) {
    pipeX = 400;
    pipeY = Math.random() * (canvas.height - PIPE_GAP) + PIPE_WIDTH;
  }

  if (collisionCheck()) {
    endGame();
    return;
  }

  increaseScore();
  requestAnimationFrame(loop);
}

loop();
