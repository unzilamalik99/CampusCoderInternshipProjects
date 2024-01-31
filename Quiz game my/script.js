let currentQuestionIndex = 0;
let score = 0;
let timer;
const answerButtonsContainer = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");
const questionContainer = document.getElementById("question-container");
const timerContainer = document.getElementById("timer-container");
const scoreContainer = document.getElementById("score-container");

// startButton.addEventListener("click", startGame);

// Function to shuffle an array using Fisher-Yates algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Array of 10 questions with answer choices
const questions = [
  {
    question: "What is the largest mammal in the world?",
    answers: [
      { text: "Elephant", correct: false },
      { text: "Blue Whale", correct: true },
      { text: "Giraffe", correct: false },
      { text: "Hippopotamus", correct: false },
    ],
  },
  {
    question: "Which country is known as the Land of the Rising Sun?",
    answers: [
      { text: "China", correct: false },
      { text: "South Korea", correct: false },
      { text: "Japan", correct: true },
      { text: "Vietnam", correct: false },
    ],
  },
  {
    question: "What is the capital of Australia?",
    answers: [
      { text: "Sydney", correct: false },
      { text: "Melbourne", correct: false },
      { text: "Canberra", correct: true },
      { text: "Brisbane", correct: false },
    ],
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    answers: [
      { text: "Charles Dickens", correct: false },
      { text: "William Shakespeare", correct: true },
      { text: "Jane Austen", correct: false },
      { text: "Mark Twain", correct: false },
    ],
  },
  {
    question: "What is the capital of Brazil?",
    answers: [
      { text: "Rio de Janeiro", correct: false },
      { text: "Brasília", correct: true },
      { text: "São Paulo", correct: false },
      { text: "Salvador", correct: false },
    ],
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    answers: [
      { text: "Oxygen", correct: true },
      { text: "Gold", correct: false },
      { text: "Silver", correct: false },
      { text: "Carbon", correct: false },
    ],
  },
  {
    question: "In what year did the Titanic sink?",
    answers: [
      { text: "1912", correct: true },
      { text: "1920", correct: false },
      { text: "1905", correct: false },
      { text: "1935", correct: false },
    ],
  },
  {
    question: "Which planet is known as the 'Red Planet'?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Mars", correct: true },
      { text: "Venus", correct: false },
      { text: "Jupiter", correct: false },
    ],
  },
  {
    question: "Who painted the Mona Lisa?",
    answers: [
      { text: "Vincent van Gogh", correct: false },
      { text: "Leonardo da Vinci", correct: true },
      { text: "Pablo Picasso", correct: false },
      { text: "Claude Monet", correct: false },
    ],
  },
  {
    question: "Which of the following is a programming language?",
    answers: [
      { text: "HTML", correct: false },
      { text: "Python", correct: true },
      { text: "Adobe Photoshop", correct: false },
      { text: "Microsoft Excel", correct: false },
    ],
  },
];

// Shuffle questions randomly before starting the quiz
shuffleArray(questions);

const quizDuration = 60; // 1 minute in seconds

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.classList.add("hide");
  startQuizTimer();
  showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionContainer.innerText = question.question;
  answerButtonsContainer.innerHTML = "";

  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("answer-button");
    button.addEventListener("click", () => selectAnswer(answer));
    answerButtonsContainer.appendChild(button);
  });
}

function selectAnswer(answer) {
  const correct = answer.correct;

  if (correct) {
    score++;
    answerButtonsContainer.classList.add("correct");
  } else {
    answerButtonsContainer.classList.add("wrong");
  }

  answerButtonsContainer.classList.add("disabled");
  nextButton.classList.remove("hide");
  scoreContainer.innerText = `Score: ${score}`;

  // Check if it's the last question and show rewards
  if (currentQuestionIndex === questions.length - 1) {
    console.log("hell");
    showRewards();
  }

  // Check if "Time's up!" scenario
  if (answer.text === "Time's up!") {
    // Handle time up logic here
    // For example, you can show a message in the quiz completion container
    showQuizCompleteContainer();
  }
}

function nextQuestion() {
  answerButtonsContainer.classList.remove("disabled");
  answerButtonsContainer.classList.remove("correct");
  answerButtonsContainer.classList.remove("wrong");
  nextButton.classList.add("hide");
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion(questions[currentQuestionIndex]);
  } else {
    showQuizCompleteContainer();
  }
}

// ... (previous code remains unchanged)

let timerInterval; // Variable to store the interval reference

function startQuizTimer() {
  let timeLeft = quizDuration;

  timerInterval = setInterval(() => {
    timeLeft--;

    // Update the timer display
    timerContainer.innerText = `Time Left: ${timeLeft} seconds`;

    if (timeLeft <= 0) {
      // When Quiz time's up, handle the end of the quiz
      clearInterval(timerInterval);
      console.log("Quiz time's up!");
      showQuizCompleteContainer();
    }
  }, 1000); // 1 second interval
}

function showQuizCompleteContainer() {
  questionContainer.innerText = "Quiz Completed!";
  answerButtonsContainer.innerHTML = "";
  nextButton.classList.add("hide");
  scoreContainer.classList.add("final-score");
  scoreContainer.innerText = `Final Score: ${score} out of ${questions.length} correct Ans`; // Fix score display
  clearInterval(timerInterval); // Use the correct interval reference
  showRewards();
}

function showRewards() {
  rewardText = "Reward: ";
  if (score === questions.length) {
    rewardText += "100% - Congratulations! You win:!";
  } else if (score >= Math.ceil(0.7 * questions.length)) {
    rewardText += " Impressive!";
  } else if (score >= Math.ceil(0.25 * questions.length)) {
    rewardText += " Improve your work!";
  } else {
    rewardText += "better luck next time, Loser!";
  }

  // Check if the elements exist before setting innerText
  const rewardTextElement = document.getElementById("rewardText");

  if (
    rewardTextElement &&
    rewardTextElement.classList.contains("reward-container")
  ) {
    rewardTextElement.innerText = rewardText;
  } else {
    console.error(
      "Could not find an element with ID 'rewardText' and class 'reward-container'"
    );
  }
}
