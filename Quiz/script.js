console.log("I will become Candidate Master on Codeforces");

const questions = [
  {
    question: "Which is the best programming platform in the world?",
    answers: [
      { text: "Codeforces", correct: true },
      { text: "LeetCode", correct: false },
      { text: "AtCoder", correct: false },
      { text: "GeeksForGeeks", correct: false },
    ],
  },
  {
    question: "What does Babin want to become on Codeforces, at least?",
    answers: [
      { text: "Grandmaster", correct: false },
      { text: "Newbie", correct: false },
      { text: "Candidate Master", correct: true },
      { text: "International Master", correct: false },
    ],
  },
  {
    question: "Which language does Babin know the most?",
    answers: [
      { text: "JavaScript", correct: false },
      { text: "Java", correct: true },
      { text: "Python", correct: false },
      { text: "C++", correct: false },
    ],
  },
  {
    question:
      "Which of the following best describes the paradox of human existence?",
    answers: [
      {
        text: "We seek meaning in a universe that offers none",
        correct: false,
      },
      { text: "We are driven by instinct but crave freedom", correct: false },
      { text: "We fear death, yet it gives life meaning", correct: false },
      { text: "All of the above", correct: true },
    ],
  },
];

const question = document.getElementById("question");
const nextButton = document.querySelector(".next");
const answerButtons = document.querySelector("#answerButtons");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "next";
  showQuestion();
}

function showQuestion() {
  clearAnswers();
  nextButton.style.display = "none";
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  question.innerHTML = `${questionNo} . ${currentQuestion.question}`;

  //This is working
  currentQuestion.answers.forEach((elem) => {
    console.log(elem);
    const ans = document.createElement("button");
    ans.classList.add("btn");
    ans.innerHTML = elem.text;
    answerButtons.append(ans);
    if (elem.correct) {
      ans.dataset.correct = elem.correct;
    }
    ans.addEventListener("click", selectAnswer);
  });
}

function clearAnswers() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorect = selectedBtn.dataset.correct === "true";
  if (isCorect) {
    selectedBtn.classList.add("correctAns");
    score++;
  } else {
    selectedBtn.classList.add("wrongAnswer");
  }
  Array.from(answerButtons.children).forEach((btn) => {
    if (btn.dataset.correct === "true") {
      btn.classList.add("correctAns");
    }
    btn.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  clearAnswers();
  question.innerHTML = "";
  answerButtons.innerHTML = `You Scored : ${score} out of ${questions.length} Quesitons!`;
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    console.log("Game is restarted");
    startQuiz();
  }
});

startQuiz();
