const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const startBtn = document.querySelector("#startBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "white";
const snakeColor = "saddlebrown";
const snakeBorder = "black";
const foodColor = "red";
const foodBorder = "black";
const unitSize = 25;
const btnUp = document.getElementById("btnUp");
const btnRight = document.getElementById("btnRight");
const btnDown = document.getElementById("btnDown");
const btnLeft = document.getElementById("btnLeft");
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
  { x: unitSize * 4, y: 0 },
  { x: unitSize * 3, y: 0 },
  { x: unitSize * 2, y: 0 },
  { x: unitSize, y: 0 },
  { x: 0, y: 0 },
];
let speed = 120;

window.addEventListener("keydown", changeDirection);
btnUp.addEventListener("click", changeDirection);
btnLeft.addEventListener("click", changeDirection);
btnDown.addEventListener("click", changeDirection);
btnRight.addEventListener("click", changeDirection);

function gameStart() {
  running = true;
  scoreText.textContent = score;
  startBtn.style.display = "none";
  createFood();
  drawFood();
  nextTick();
}
function nextTick() {
  if (running) {
    setTimeout(() => {
      clearBoard();
      drawFood();
      moveSnake();
      drawSnake();
      checkGameOver();
      nextTick();
    }, speed);
  } else {
    displayGameOver();
  }
}
function clearBoard() {
  ctx.fillStyle = boardBackground;
  ctx.fillRect(0, 0, gameWidth, gameHeight);
}
function createFood() {
  function randomFood(min, max) {
    const randNum =
      Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
    return randNum;
  }
  foodX = randomFood(0, gameWidth - unitSize);
  foodY = randomFood(0, gameWidth - unitSize);
}
function drawFood() {
  ctx.fillStyle = foodColor;
  ctx.strokeStyle = foodBorder;
  ctx.fillRect(foodX, foodY, unitSize, unitSize);
  ctx.strokeRect(foodX, foodY, unitSize, unitSize);
}
function moveSnake() {
  const head = { x: snake[0].x + xVelocity, y: snake[0].y + yVelocity };
  snake.unshift(head);
  if (snake[0].x == foodX && snake[0].y == foodY) {
    score += 1;
    scoreText.textContent = score;
    speed -= 2;
    createFood();
  } else {
    snake.pop();
  }
}
function drawSnake() {
  ctx.fillStyle = snakeColor;
  ctx.strokeStyle = snakeBorder;
  snake.forEach((snakePart) => {
    ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
    ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
  });
}
function changeDirection(event) {
  const keyPressed = event.keyCode;
  const btnPressed = event.target.id;
  const LEFT = 37;
  const UP = 38;
  const RIGHT = 39;
  const DOWN = 40;

  const W = 87;
  const A = 65;
  const S = 83;
  const D = 68;

  const goingUp = yVelocity == -unitSize;
  const goingDown = yVelocity == unitSize;
  const goingRight = xVelocity == unitSize;
  const goingLeft = xVelocity == -unitSize;

  switch (true) {
    case (keyPressed == LEFT || keyPressed == A || btnPressed == "btnLeft") &&
      !goingRight:
      xVelocity = -unitSize;
      yVelocity = 0;
      break;
    case (keyPressed == UP || keyPressed == W || btnPressed == "btnUp") &&
      !goingDown:
      xVelocity = 0;
      yVelocity = -unitSize;
      break;
    case (keyPressed == RIGHT || keyPressed == D || btnPressed == "btnRight") &&
      !goingLeft:
      xVelocity = unitSize;
      yVelocity = 0;
      break;
    case (keyPressed == DOWN || keyPressed == S || btnPressed == "btnDown") &&
      !goingUp:
      xVelocity = 0;
      yVelocity = unitSize;
      break;
  }
}
function checkGameOver() {
  switch (true) {
    case snake[0].x < 0:
      running = false;
      break;
    case snake[0].x >= gameWidth:
      running = false;
      break;
    case snake[0].y < 0:
      running = false;
      break;
    case snake[0].y >= gameHeight:
      running = false;
      break;
  }
  for (let i = 1; i < snake.length; i += 1) {
    if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
      running = false;
    }
  }
}
function displayGameOver() {
  ctx.font = "50px arial";
  ctx.fillStyle = "Black";
  ctx.textAlign = "center";
  ctx.fillText("GAME OVER!", gameWidth / 2, gameHeight / 2);
  if (running == false) {
    startBtn.style.display = "block";
    startBtn.style.background = "blue";
    startBtn.style.marginTop = "50px";
    startBtn.textContent = "Reset";
    startBtn.addEventListener("click", resetGame);
  }
  running = false;
}
function resetGame() {
  location.reload();
}
