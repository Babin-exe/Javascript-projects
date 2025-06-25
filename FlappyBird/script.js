document.addEventListener("DOMContentLoaded", () => {
  let bird = document.querySelector(".bird");
  let container = document.querySelector(".container");

  let birdHeight = 200;
  let gravity = 1;
  let score = 0;

  const pipeGap = 180;
  let pipecreation;
  let previousUpperHeight = 150;
  const MAX_CHANGE = 80;

  let isGameOver = false;

  let jumpAudio = new Audio("jump.mp3");
  let pointAudio = new Audio("pointscored.mp3");
  let diedAudio = new Audio("die.mp3");

  document.addEventListener("keydown", (e) => {
    if (!isGameOver && (e.key === " " || e.key === "ArrowUp")) {
      jumpAudio.currentTime = 0;
      jumpAudio.play();
      birdHeight -= 70;

      bird.style.top = birdHeight + "px";
    }
  });

  function movee() {
    if (!isGameOver) {
      jumpAudio.currentTime = 0;
      jumpAudio.play();
      birdHeight -= 70;
      if (birdHeight < 0) birdHeight = 0;
      bird.style.top = birdHeight + "px";
    }
  }
  window.movee = movee;
  document.getElementById("jumpBtn").addEventListener("click", movee);

  function gameOver() {
    clearInterval(gameInterval);
    clearInterval(pipecreation);
    isGameOver = true;
    console.log("The game is over");
    container.innerHTML = "";
    let div = document.createElement("div");
    div.classList.add("game_over");
    div.innerHTML = `Game Over<br>  Score: ${score}`;
    container.append(div);
  }

  function createPipe() {
    const uppipe = document.createElement("div");
    const downpipe = document.createElement("div");

    uppipe.classList.add("pipe", "pipe-up");
    downpipe.classList.add("pipe", "pipe-down");

    const minheight = 50;
    const maxPipeHeight = container.offsetHeight - pipeGap - minheight;

    let newHeight = Math.floor(
      Math.random() * (maxPipeHeight - minheight) + minheight
    );

    if (Math.abs(newHeight - previousUpperHeight) > MAX_CHANGE) {
      if (newHeight > previousUpperHeight) {
        newHeight = previousUpperHeight + MAX_CHANGE;
      } else {
        newHeight = previousUpperHeight - MAX_CHANGE;
      }
    }

    previousUpperHeight = newHeight;

    const upperHeight = newHeight;
    const lowerHeight = container.offsetHeight - upperHeight - pipeGap;

    uppipe.style.height = upperHeight + "px";
    downpipe.style.height = lowerHeight + "px";

    const pipeLeft = container.offsetWidth;

    uppipe.style.left = pipeLeft + "px";
    uppipe.style.top = "0px";

    downpipe.style.left = pipeLeft + "px";
    downpipe.style.bottom = "0px";

    container.appendChild(uppipe);
    container.appendChild(downpipe);
  }

  function movePipe() {
    const pipes = document.querySelectorAll(".pipe");

    pipes.forEach((pipe) => {
      let taker = parseInt(pipe.style.left);
      pipe.style.left = taker - 2 + "px";
      if (taker + pipe.offsetWidth <= 0) {
        pipe.remove();
      }

      if (!pipe.passed && pipe.classList.contains("pipe-up")) {
        if (parseInt(pipe.style.left) + pipe.offsetWidth < bird.offsetLeft) {
          score++;
          pointAudio.currentTime = 0;
          pointAudio.play();
          pipe.passed = true;
        }
      }
    });
  }

  function collision() {
    const getpipes = document.querySelectorAll(".pipe");
    if (getpipes.length === 0) return;

    const birdRect = bird.getBoundingClientRect();
    const padding = 5;

    getpipes.forEach((pipe) => {
      const pipeRect = pipe.getBoundingClientRect();

      if (
        birdRect.right - padding > pipeRect.left &&
        birdRect.left + padding < pipeRect.right &&
        birdRect.top + padding < pipeRect.bottom &&
        birdRect.bottom - padding > pipeRect.top
      ) {
        diedAudio.currentTime = 0;
        diedAudio.play();
        gameOver();
      }
    });
  }

  let gameInterval;
  function startGame() {
    gameInterval = setInterval(() => {
      birdHeight += gravity;
      if (birdHeight + bird.offsetHeight > container.offsetHeight) {
        birdHeight = container.offsetHeight - bird.offsetHeight;
      }

      if (
        birdHeight <= 0 ||
        birdHeight + bird.offsetHeight >= container.offsetHeight
      ) {
        diedAudio.currentTime = 0;
        diedAudio.play();
        gameOver();
      }

      bird.style.top = birdHeight + "px";

      movePipe();
      collision();
    }, 11);

    pipecreation = setInterval(createPipe, 1500);
  }

  startGame();
});
