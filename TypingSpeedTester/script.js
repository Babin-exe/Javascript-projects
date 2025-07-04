const words =
  "solitude echo abyss fragile dream dusk ethereal melancholy void whisper silence shimmer broken dawn bloom chaos static gravity orbit silence velvet ruins flicker hollow drift pulse shadow mirror ghost oblivion cosmic relic frost ember haze lucid phantom nostalgia radiant ruins secret tremble unravel vanish reverie stardust myth cradle collapse velvet longing quantum sorrow eclipse muse radiant gravity haunt splinter".split(
    " "
  );

const wordsCount = words.length;
let currentLetterIndex = 0;
let currentWordIndex = 0;
let wordElements;

const gameTime = 30 * 1000;
window.timer = null;
window.gameStart = null;

if (localStorage.getItem("typingFocus") === "true") {
  document.getElementById("game").classList.add("no-error");
}

window.addEventListener("load", () => {
  if (localStorage.getItem("typingFocus") === "true") {
    document.getElementById("game").focus();
  }
});

document.getElementById("game").addEventListener("click", () => {
  localStorage.setItem("typingFocus", "true");
});

document.addEventListener("click", (e) => {
  const game = document.getElementById("game");
  if (!game.contains(e.target)) {
    localStorage.setItem("typingFocus", "false");
  }
});

function randomWord() {
  const randomIndex = Math.floor(Math.random() * wordsCount);
  return words[randomIndex];
}

function addClass(el, name) {
  el?.classList.add(name);
}

function removeClass(el, name) {
  el?.classList.remove(name);
}

function formatWord(word) {
  return `<div class="word">
    ${word
      .split("")
      .map((letter) => `<span class="letter">${letter}</span>`)
      .join("")}
  </div>`;
}

document.querySelector(".newgame").addEventListener("click", () => {
  gameOver();
  newGame();
});

function newGame() {
  clearInterval(window.timer);
  window.timer = null;
  window.gameStart = null;

  document.querySelector("#game").classList.remove("over");
  document.querySelector("#info").innerHTML = "30";
  document.getElementById("words").style.marginTop = "0px";

  const container = document.getElementById("words");
  container.innerHTML = "";

  for (let i = 0; i < 200; i++) {
    container.innerHTML += formatWord(randomWord());
  }

  wordElements = document.querySelectorAll(".word");
  currentLetterIndex = 0;
  currentWordIndex = 0;

  addClass(wordElements[currentWordIndex], "current");
  addClass(
    wordElements[currentWordIndex].children[currentLetterIndex],
    "current"
  );
}

function gameOver() {
  clearInterval(window.timer);
  addClass(document.querySelector("#game"), "over");
  document.getElementById("info").innerHTML = `WPM: ${getWpm()}`;
}

function getWpm() {
  let correctChars = 0;

  wordElements.forEach((wordEl) => {
    Array.from(wordEl.children).forEach((letterEl) => {
      if (letterEl.classList.contains("correct")) {
        correctChars++;
      }
    });
  });

  const timeInMinutes = gameTime / 1000 / 60;
  const wpm = correctChars / 5 / timeInMinutes;

  return Math.round(wpm);
}

document.getElementById("game").addEventListener("keyup", (event) => {
  const currentWord = wordElements[currentWordIndex];
  const currentLetter = currentWord?.children[currentLetterIndex];
  const expected = currentLetter?.innerHTML;
  const isLetter = event.key.length === 1 && event.key !== " ";
  const isSpace = event.key === " ";
  const isBackspace = event.key === "Backspace";

  if (document.querySelector("#game").classList.contains("over")) {
    return;
  }

  if (!window.timer && isLetter) {
    window.timer = setInterval(() => {
      if (!window.gameStart) {
        window.gameStart = new Date().getTime();
      }

      const currentTime = new Date().getTime();
      const msPassed = currentTime - window.gameStart;
      const sPassed = Math.round(msPassed / 1000);
      const sLeft = gameTime / 1000 - sPassed;

      if (sLeft <= 0) {
        gameOver();
        return;
      }

      document.getElementById("info").innerHTML = sLeft + " ";
    }, 1000);
  }

  if (isBackspace) {
    if (currentLetterIndex > 0) {
      removeClass(currentWord.children[currentLetterIndex], "current");

      currentLetterIndex--;

      const prevLetter = currentWord.children[currentLetterIndex];

      removeClass(prevLetter, "correct");
      removeClass(prevLetter, "incorrect");
      addClass(prevLetter, "current");
    } else if (currentLetterIndex === 0 && currentWordIndex > 0) {
      const previousWord = wordElements[currentWordIndex - 1];

      const lastLetter = previousWord.querySelector(".letter:last-child");

      const isLastCorrect = lastLetter.classList.contains("correct");

      if (!isLastCorrect) {
        removeClass(currentWord, "current");
        currentWordIndex--;
        const prevWord = wordElements[currentWordIndex];
        currentLetterIndex = prevWord.children.length - 1;
        addClass(prevWord, "current");

        const prevLetter = prevWord.children[currentLetterIndex];
        removeClass(prevLetter, "correct");
        removeClass(prevLetter, "incorrect");
        addClass(prevLetter, "current");
      }
    }
    Array.from(currentWord.children).forEach((l) => {
      removeClass(l, "current");
    });
    moveCursor();
  }

  if (isLetter && currentLetter) {
    addClass(currentLetter, event.key === expected ? "correct" : "incorrect");
    removeClass(currentLetter, "current");

    currentLetterIndex++;

    Array.from(currentWord.children).forEach((l) => removeClass(l, "current"));

    if (currentLetterIndex < currentWord.children.length) {
      const nextLetter = currentWord.children[currentLetterIndex];
      addClass(nextLetter, "current");
    } else {
    }

    moveCursor();
  }

  if (isSpace) {
    const firstSpace = currentWord.children[0];
    if (
      !firstSpace.classList.contains("correct") &&
      !firstSpace.classList.contains("incorrect")
    ) {
      return;
    }

    const wordCompleted = Array.from(currentWord.children).every((letter) => {
      return (
        letter.classList.contains("correct") ||
        letter.classList.contains("incorrect")
      );
    });

    if (!wordCompleted) {
      for (let i = currentLetterIndex; i < currentWord.children.length; i++) {
        const letter = currentWord.children[i];
        removeClass(letter, "current");
        addClass(letter, "incorrect");
      }
    }

    if (wordCompleted) {
      removeClass(currentWord, "current");

      if (currentWordIndex + 1 < wordElements.length) {
        currentWordIndex++;
        currentLetterIndex = 0;

        const nextWord = wordElements[currentWordIndex];
        addClass(nextWord, "current");
        addClass(nextWord.children[0], "current");
      } else {
        currentLetterIndex = currentWord.children.length - 1;
      }
    }

    moveCursor();
  }

  function moveCursor() {
    const rect = document.querySelector("#game").getBoundingClientRect();

    const cursor = document.querySelector("#cursor");

    const currentWord = wordElements[currentWordIndex];
    const letterSpan = currentWord?.children[currentLetterIndex];

    let left = 0;
    let top = 0;

    if (letterSpan) {
      const letterAt = letterSpan.getBoundingClientRect();
      left = letterAt.left - rect.left;
      top = letterAt.top - rect.top;
    } else {
      const lastLetter = currentWord?.children[currentWord.children.length - 1];
      const lastRect = lastLetter.getBoundingClientRect();
      left = lastRect.right - rect.left;
      top = lastRect.top - rect.top;
    }

    cursor.style.left = left + "px";
    cursor.style.top = top + "px";
  }

  if (currentWord.getBoundingClientRect().top > 200) {
    const words = document.getElementById("words");

    const margin = parseInt(words.style.marginTop || "0px");

    words.style.marginTop = margin - 35 + "px";
    moveCursor();
  }
});

newGame();
