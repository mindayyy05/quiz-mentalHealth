const questions = [
  "1 | Are you not satisfied with life? (click 'yes' if you are not satisfied) ",
  "none",
  "2 | Have you dropped many of your activities and interest?",
  "none",
  "3 | Do you feel that your life is empty?",
  "none",
  "4 | Do you often get bored?",
  "none",
  "5 | Are you in bad spirits most of the time?",
  "none",
  "6 | Are you afraid something bad is going to happen to you?",
  "none",
  "7 | Do you feel sad most of the time?",
  "none",
  "8 | Do you often  feel helpless?",
  "none",
  "9 | Do you prefer to stay at home rather than going out and trying new things?",
  "none",
  "10 | Do you feel you have more problems with your memory than most?",
  "none",
  "11 | Do you think it is not wonderful to be alive now?",
  "none",
  "12 | Do you feel pretty worthless the way you are now?",
  "none",
  "13 | Do you feel less of energy? ",
  "none",
  "14 | Do you feel that your situation is hopeless?",
  "none",
  "15 | Do you think that most people are better off than you are?",
  "none",
];

let currentQuestion = 0;
let userAnswers = [];

const questionNumberElement = document.getElementById("question-number");
const questionTextElement = document.getElementById("question-text");
const yesRadioButton = document.getElementById("yes");
const noRadioButton = document.getElementById("no");
const backBtn = document.getElementById("back-btn");
const nextBtn = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const resultTextElement = document.getElementById("result-text");

function showQuestion() {
  questionTextElement.textContent = questions[currentQuestion];
  if (userAnswers[currentQuestion] === "yes") {
    yesRadioButton.checked = true;
  } else if (userAnswers[currentQuestion] === "no") {
    noRadioButton.checked = true;
  } else {
    yesRadioButton.checked = false;
    noRadioButton.checked = false;
  }

  backBtn.disabled = currentQuestion === 0;
  nextBtn.disabled = false; // Enable the "Next" button
  if (currentQuestion === questions.length - 1) {
    nextBtn.addEventListener("click", showResult); // Directly show result on "Next" after the last question
  } else {
    nextBtn.removeEventListener("click", showResult); // Remove the listener if not on the last question
  }
}


function nextQuestion() {
  saveAnswer(); // Save the answer before moving to the next question
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    showQuestion();
  } else {
    showResult();
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion();
  }
}


function calculateScore() {
  const score = userAnswers.filter(answer => answer === "yes").length;
  const totalQuestions = questions.length / 2; // Assuming each question has a "yes" and "no" option

  // Calculate status based on the total score
  let status;
  if (score >= 0 && score <= 4) {
    status = "No depression";
    showStatusMessage("Congratulations! continue to do your activities with a positive mindset");
  } else if (score >= 5 && score <= 10) {
    status = "Mild depression";
    showStatusMessage("Contact us on +94-777-797-900 for medical advice");
  } else {
    status = "Severe depression";
    showStatusMessage("You need immediate medical attention. Contact us on +94-777-797-900 for medical advice");
  }

  // Display total score and status
  resultTextElement.innerHTML = `Total score: ${score} out of ${totalQuestions}<br><br>Status:<b> ${status}</b><br><br><h3>${statusMessage}</h3>`;
}

let statusMessage = ""; // Variable to store the status message

function showStatusMessage(message) {
  statusMessage = message;
}


function showResult() {
  document.getElementById("question-container").style.display = "none";
  resultContainer.style.display = "block";
  calculateScore();
}

function saveAnswer() {
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');
  if (selectedAnswer) {
    userAnswers[currentQuestion] = selectedAnswer.value;
  }
}

showQuestion();
nextBtn.addEventListener("click", () => {
  saveAnswer();
  nextQuestion();
});

backBtn.addEventListener("click", prevQuestion);

document.getElementById("answer-form").addEventListener("submit", function (e) {
  e.preventDefault();
  saveAnswer();
  if (currentQuestion === questions.length - 1) {
    showResult();
  } else {
    nextQuestion();
  }
});
