/* Questions for quiz */

var questions = [{
    q: "Arrays in JavaScript are defined by which of the following statements?",
    a: "1. It is an ordered list of values",
    b: "2. It is an ordered list of objects",
    c: "3. It is an ordered list of string",
    d: "4. It is an ordered list of functions",
    correct: "1. It is an ordered list of values",
},
{
    q: 'The "function" and "var" are known as:',
    a: "1. Keywords",
    b: "2. Data Types",
    c: "3. Declaration Statements",
    d: "4. Prototypes",
    correct: "3. Declaration Statements",
},
{
    q: "Which of the following is not a JavaScript data type?",
    a: "1. Null type",
    b: "2. Undefined type",
    c: "3. Number type",
    d: "4. All of the above",
    correct: "4. All of the above",
},
{
    q: "A very useful tool used during development and debugging for printing content to the debugger is:",
    a: "1. Javascript",
    b: "2. Terminal/Bash",
    c: "3. for loops",
    d: "4. console.log",
    correct: "4. console.log",
},
{
    q: "String values must be enclosed within ____ when being assigned to variables.",
    a: "1. Quotes",
    b: "2. Curly brackets",
    c: "3. Parentheses",
    d: "4. Square brackets",
    correct: "1. Quotes",
}];
/* Configure timer elements with intended behaviour*/

var clickStart = document.getElementById("start");
var timerEl = document.getElementById("countdown");
var timeLeft = 60;
var quizDuration;
var questionContainer = document.querySelector("#quiz-container");

function timer() {
    timerEl.textContent = "Time remaining: " + timeLeft + "s";
    quizDuration = setInterval(function () {
        if (timeLeft > 0) {
            adjustTime(-1);
        } else {
            endQuizPage();
        }
    }, 1000);
}
function adjustTime(amount) {
    timeLeft += amount;
    if (timeLeft < 0) {
        timeLeft = 0;
    }
    timerEl.textContent = "Time remaining: " + timeLeft + "s";
}

clickStart.onclick = timer;
var renderQuestion = function (question) {
    questionContainer.innerHTML = "";

    var questionHeader = document.createElement("h2");
    questionHeader.textContent = question.q;

    var answerA = document.createElement("button");
    answerA.textContent = question.a;
    answerA.addEventListener("click", answerClick);

    var answerB = document.createElement("button");
    answerB.textContent = question.b;
    answerB.addEventListener("click", answerClick);

    var answerC = document.createElement("button");
    answerC.textContent = question.c;
    answerC.addEventListener("click", answerClick);

    var answerD = document.createElement("button");
    answerD.textContent = question.d;
    answerD.addEventListener("click", answerClick);

    questionContainer.appendChild(questionHeader);
    questionContainer.appendChild(answerA);
    questionContainer.appendChild(answerB);
    questionContainer.appendChild(answerC);
    questionContainer.appendChild(answerD);
}

var currentQuestion = 0;
var userScore = 0;
var correctAnswer = questions[currentQuestion].correct;
var clickViewScores = document.getElementById("view-score");

var answerClick = function (event) {
    event.preventDefault();
    var userAnswer = event.target.textContent;
    correctAnswer = questions[currentQuestion].correct;

    /* Is the answer right or wrong */

    var answerDetermination = document.querySelector("#answer-right-or-wrong");
    if (userAnswer !== correctAnswer) {
        adjustTime(-5);
        answerDetermination.textContent = "Incorrect!";
        currentQuestion++;
        if (currentQuestion >= questions.length) {
            endQuizPage();
        } else { renderQuestion(questions[currentQuestion]) };

    }
    else if (userAnswer === correctAnswer) {
        currentQuestion++;
        answerDetermination.textContent = "Correct!";
        userScore++;
        if (currentQuestion >= questions.length) {
            endQuizPage();
        } else { renderQuestion(questions[currentQuestion]) };
    }
};

var quiz = function (event) {
    event.preventDefault();
    resetDisplay();
    renderQuestion(questions[currentQuestion]);
};

function resetDisplay() {
    questionContainer.innerHTML = "";
    document.querySelector("#introduction").style.display = "none";
}
function highScores() {
    let data = localStorage.getItem("object");
    let getData = JSON.parse(data);
    let name = getData.name;
    let score = getData.score;
    questionContainer.innerHTML = "";
    questionContainer.innerHTML = name + " " + score;
}
clickViewScores.addEventListener("click", () => {
    highScores();
})

var initials;
function endQuizPage() {
    resetDisplay();
    timerEl.textContent = "";
    clearInterval(quizDuration);
    var endPage = document.createElement("h2");
    questionContainer.appendChild(endPage);

    let blank = document.querySelector("#answer-right-or-wrong");
    blank.innerHTML = "";

    endPage.innerHTML = "You have completed the quiz and scored " + userScore + " out of 5 points! Please enter your initials to save your score.";

    var initialBox = document.createElement("input");
    blank.appendChild(initialBox);

    var submitInitialBtn = document.createElement("button");
    submitInitialBtn.textContent = "Submit";
    blank.appendChild(submitInitialBtn);

    submitInitialBtn.addEventListener("click", () => {

        if (initialBox.value.length === 0) return false;

        let storeInitials = (...input) => {
            let data = JSON.stringify({ "name": input[0], "score": input[1] })
            localStorage.setItem("object", data)
        }
        storeInitials(initialBox.value, userScore);

        var playAgain = document.createElement("button");
        playAgain.textContent = "Try Again!";
        blank.appendChild(playAgain);

        playAgain.addEventListener("click", () => {
            location.reload();
        })
    });

    document.querySelector("input").value = "";

    initialBox.addEventListener("submit", endQuizPage);

};
function renderInitials() {
    submitInitialBtn.addEventListener('click', function (event) {
        event.preventDefault;
    }
    )
};

clickStart.addEventListener('click', quiz);
