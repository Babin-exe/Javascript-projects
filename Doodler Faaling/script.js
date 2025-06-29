document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const doodler = document.createElement("div");
  const doodlerWidth = 60;
  const platformWidth = 85;
  const platformHeight = 15;
  const platformCount = 5;
  const gridHeight = 600;

  let doodlerBottomSpace = 150;
  let doodlerLeftSpace = 50;
  let startPoint = doodlerBottomSpace;

  let isJumping = true;
  let isGoingLeft = false;
  let isGoingRight = false;
  let isGameOver = false;

  let score = 0;

  let platforms = [];
  let upTimerId, downTimerId, leftTimerId, rightTimerId;

  // Create Doodler
  function createDoodler() {
    grid.appendChild(doodler);
    doodler.classList.add("doodler");
    doodlerLeftSpace = platforms[2].left;
    doodler.style.left = doodlerLeftSpace + "px";
    doodler.style.bottom = doodlerBottomSpace + "px";
  }

  // Platform Class
  class Platform {
    constructor(bottom) {
      this.bottom = bottom;
      this.left = Math.random() * (grid.offsetWidth - platformWidth);
      this.visual = document.createElement("div");
      this.visual.classList.add("platform");
      this.visual.style.left = this.left + "px";
      this.visual.style.bottom = this.bottom + "px";
      grid.appendChild(this.visual);
    }
  }

  // Create platforms
  function createPlatforms() {
    for (let i = 0; i < platformCount; i++) {
      const gap = gridHeight / platformCount;
      const bottom = 100 + i * gap;
      platforms.push(new Platform(bottom));
    }
  }

  // Move platforms down
  function movePlatforms() {
    if (doodlerBottomSpace > 200) {
      platforms.forEach((platform, index) => {
        platform.bottom -= 4;
        platform.visual.style.bottom = platform.bottom + "px";

        if (platform.bottom < 0) {
          grid.removeChild(platform.visual);
          platforms.splice(index, 1);
          const newPlatform = new Platform(gridHeight);
          platforms.push(newPlatform);
          score++;

        }
      });
    }
  }

  // Jump
  function jump() {
    clearInterval(downTimerId);
    isJumping = true;
    upTimerId = setInterval(() => {
      doodlerBottomSpace += 20;
      doodler.style.bottom = doodlerBottomSpace + "px";
      if (doodlerBottomSpace > startPoint + 200) {
        fall();
      }
    }, 30);
  }

  // Fall
  function fall() {
    clearInterval(upTimerId);
    isJumping = false;
    downTimerId = setInterval(() => {
      doodlerBottomSpace -= 5;
      doodler.style.bottom = doodlerBottomSpace + "px";

      if (doodlerBottomSpace <= 0) {
        gameOver();
      }

      platforms.forEach((platform) => {
        if (
          doodlerBottomSpace >= platform.bottom &&
          doodlerBottomSpace <= platform.bottom + platformHeight &&
          doodlerLeftSpace + doodlerWidth >= platform.left &&
          doodlerLeftSpace <= platform.left + platformWidth &&
          !isJumping
        ) {
          startPoint = doodlerBottomSpace;
          jump();
        }
      });
    }, 30);
  }

  // Game over
  function gameOver() {
    isGameOver = true;
    clearInterval(upTimerId);
    clearInterval(downTimerId);
    clearInterval(leftTimerId);
    clearInterval(rightTimerId);
    document.removeEventListener("keydown", control);
    grid.innerHTML = `<h1>${score}</h1>`;
  }

  // Movement
  function moveLeft() {
    if (isGoingLeft || isGameOver) return;
    clearInterval(rightTimerId);
    isGoingRight = false;

    isGoingLeft = true;
    leftTimerId = setInterval(() => {
      if (doodlerLeftSpace > 0) {
        doodlerLeftSpace -= 5;
        doodler.style.left = doodlerLeftSpace + "px";
      }
    }, 20);
  }

  function moveRight() {
    if (isGoingRight || isGameOver) return;
    clearInterval(leftTimerId);
    isGoingLeft = false;

    isGoingRight = true;
    rightTimerId = setInterval(() => {
      if (doodlerLeftSpace < grid.offsetWidth - doodlerWidth) {
        doodlerLeftSpace += 5;
        doodler.style.left = doodlerLeftSpace + "px";
      }
    }, 20);
  }

  function moveStraight() {
    isGoingLeft = false;
    isGoingRight = false;
    clearInterval(leftTimerId);
    clearInterval(rightTimerId);
  }

  // Controls
  function control(e) {
    if (e.key === "ArrowLeft") {
      moveLeft();
    } else if (e.key === "ArrowRight") {
      moveRight();
    } else if (e.key === "ArrowUp") {
      moveStraight();
    }
  }

  // Start game
  function start() {
    if (!isGameOver) {
      createPlatforms();
      createDoodler();
      document.addEventListener("keydown", control);
      setInterval(movePlatforms, 30);
      jump();
    }
  }

  start();
});
