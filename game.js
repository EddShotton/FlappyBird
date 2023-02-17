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

document.body.onkeyup = function (e) {
  if (e.code == "Space") {
    birdVelocity = FLAP_SPEED;
  }
};

function increaseScore() {
  //TODO
}

function collisionCheck() {
  //TODO
}

function showEndMenu() {
  document.getElementById("end-menu").style.display = "block";
  gameContainer.classList.add("backdrop-blur");
  document.getElementById("endScore").innerHTML = score;
}

function hideEndMenu() {
  document.getElementById("end-menu").style.display = "none";
  gameContainer.classList.remove("backdrop-blur");
}

function resetGame() {
  //TODO
}

function endGame() {
  //TODO
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

  if (pipeX < -50) {
    pipeX = 400;
    pipeY = Math.random() * (canvas.height - PIPE_GAP) + PIPE_WIDTH;
  }

  requestAnimationFrame(loop);
}

loop();
