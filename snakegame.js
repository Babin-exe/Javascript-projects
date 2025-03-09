const canvas = document.querySelector("#gamecanvas");
const ctx = canvas.getContext("2d");
const canvasHeight = canvas.height;
const canvasWidth = canvas.width;
const foodSize = 20;
const snakeSize = 20;
const playerscoresound = new Audio("scored.mp3");
const keypresssound = new Audio("keypress.mp3");
const gameoversound = new Audio("gameover.mp3");
let gamescore = 0;
let foodX;
let foodY;
let direction = "RIGHT";
let checker = true;
let timeout;

const scoredisplay = document.querySelector(".scoredisplay");
document.querySelector("#resetbutton").addEventListener("click", resetGame);
const snake = [{ x: 100, y: 100 }];
document.addEventListener("keydown", changeDirection);

function generateFood() {
  do {
    foodX = Math.floor(Math.random() * (canvasWidth / snakeSize)) * snakeSize;
    foodY = Math.floor(Math.random() * (canvasHeight / snakeSize)) * snakeSize;
  } while (foodOverlaps(foodX, foodY));
}
function displayFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(foodX, foodY, foodSize, foodSize);
}

function createSnake() {
  const head = snake[0];
  let newHead;

  if (direction == "UP") {
    newHead = { x: head.x, y: head.y - snakeSize };
  } else if (direction == "DOWN") {
    newHead = { x: head.x, y: head.y + snakeSize };
  } else if (direction == "RIGHT") {
    newHead = { x: head.x + snakeSize, y: head.y };
  } else if (direction == "LEFT") {
    newHead = { x: head.x - snakeSize, y: head.y };
  }

  if (head.x === foodX && head.y === foodY) {
    gamescore++;
    playerscoresound
      .play()
      .catch((error) => console.log("Score sound error:", error));

    scoredisplay.textContent = gamescore;
    generateFood();
  } else {
    snake.pop();
  }

  snake.unshift(newHead);
}
function changeDirection(event) {
  keypresssound
    .play()
    .catch((error) => console.log("Score sound error:", error));
  if (event.key === "ArrowRight" && direction != "LEFT") {
    direction = "RIGHT";
  } else if (event.key === "ArrowLeft" && direction != "RIGHT") {
    direction = "LEFT";
  } else if (event.key === "ArrowUp" && direction != "DOWN") {
    direction = "UP";
  } else if (event.key === "ArrowDown" && direction != "UP") {
    direction = "DOWN";
  }
}

function displaySnake() {
  ctx.fillStyle = "green";
  ctx.strokeStyle = "black";
  snake.forEach((hehe) => {
    ctx.fillRect(hehe.x, hehe.y, snakeSize, snakeSize);
    ctx.strokeRect(hehe.x, hehe.y, snakeSize, snakeSize);
  });
}

function gameLoop() {
  if (checker) {
    ctx.fillStyle = "white";
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    createSnake();
    displaySnake();
    collisionDetection();
    displayFood();
    timeout = setTimeout(gameLoop, 100);
  }
}
function resetGame() {
  direction = "RIGHT";
  gamescore = 0;
  scoredisplay.textContent = gamescore;
  snake.length = 0;
  snake.push({ x: 100, y: 100 });

  generateFood();
  checker = true;
  clearTimeout(timeout);
  gameLoop();
}
function collisionDetection() {
  const head = snake[0];
  // check if the head crosses the canvas
  if (
    head.x < 0 ||
    head.x >= canvasWidth ||
    head.y < 0 ||
    head.y >= canvasHeight
  ) {
    gameOver();
    return;
  }
  // now check if the head collides with the body part
  for (let i = 1; i < snake.length; i++) {
    if (head.x == snake[i].x && head.y == snake[i].y) {
      gameOver();
      return;
    }
  }
}

function gameOver() {
  checker = false;
  gameoversound.play();
  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.fillStyle = "red";
  ctx.font = "30px Arial";
  ctx.fillText("Game Over", canvas.width / 2 - 70, canvas.height / 2);
}

function foodOverlaps(a, b) {
  for (let i = 0; i < snake.length; i++) {
    if (snake.x == a && snake.y == b) {
      return true;
    } else {
      return false;
    }
  }
}

generateFood();
gameLoop();
//this is it for the game i am not making it any better.
