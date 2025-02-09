const questions = [
    { question: "Who was Nigeria's first President?", answers: [
        { text: "Obafemi Awolowo", correct: false },
        { text: "Nnamdi Azikiwe", correct: true },
        { text: "Yakubu Gowon", correct: false },
        { text: "Olusegun Obasanjo", correct: false }
    ]},
    { question: "What year did Nigeria gain independence?", answers: [
        { text: "1957", correct: false },
        { text: "1960", correct: true },
        { text: "1963", correct: false },
        { text: "1979", correct: false }
    ]},
    { question: "Which is the largest city in Nigeria by population?", answers: [
        { text: "Abuja", correct: false },
        { text: "Lagos", correct: true },
        { text: "Kano", correct: false },
        { text: "Port Harcourt", correct: false }
    ]},
    { question: "What is Nigeria’s currency?", answers: [
        { text: "Cedi", correct: false },
        { text: "Naira", correct: true },
        { text: "Rand", correct: false },
        { text: "Shilling", correct: false }
    ]},
    { question: "Who painted the Mona Lisa?", answers: [
        { text: "Vincent van Gogh", correct: false },
        { text: "Leonardo da Vinci", correct: true },
        { text: "Pablo Picasso", correct: false },
        { text: "Michelangelo", correct: false }
    ]},
    { question: "Which is the longest river in Nigeria?", answers: [
        { text: "Benue River", correct: false },
        { text: "Niger River", correct: true },
        { text: "Ogun River", correct: false },
        { text: "Cross River", correct: false }
    ]},
    { question: "What is the primary export of Nigeria?", answers: [
        { text: "Cocoa", correct: false },
        { text: "Crude oil", correct: true },
        { text: "Gold", correct: false },
        { text: "Rubber", correct: false }
    ]},
    { question: "Which Nigerian leader was assassinated in 1976?", answers: [
        { text: "Yakubu Gowon", correct: false },
        { text: "Murtala Mohammed", correct: true },
        { text: "Sani Abacha", correct: false },
        { text: "Obafemi Awolowo", correct: false }
    ]},
    { question: "How many geopolitical zones does Nigeria have?", answers: [
        { text: "4", correct: false },
        { text: "6", correct: true },
        { text: "8", correct: false },
        { text: "12", correct: false }
    ]},
    { question: "Which Nigerian state is the largest by land area?", answers: [
        { text: "Borno", correct: false },
        { text: "Niger", correct: true },
        { text: "Kaduna", correct: false },
        { text: "Benue", correct: false }
    ]},
    { question: "Who was the first civilian President of Nigeria after military rule in 1999?", answers: [
        { text: "Goodluck Jonathan", correct: false },
        { text: "Olusegun Obasanjo", correct: true },
        { text: "Muhammadu Buhari", correct: false },
        { text: "Shehu Shagari", correct: false }
    ]},
    { question: "Which gas do plants absorb from the atmosphere?", answers: [
        { text: "Oxygen", correct: false },
        { text: "Carbon Dioxide", correct: true },
        { text: "Nitrogen", correct: false },
        { text: "Hydrogen", correct: false }
    ]}
];

let currentQuestionIndex = 0;
let score = 0;
let userAnswers = []; // Stores user's answers

const questionText = document.getElementById("question-text");
const answerButtons = document.getElementById("answer-buttons");
const progressText = document.getElementById("progress-text");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container"); // To show review

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    nextButton.innerText = "Next";
    resultContainer.innerHTML = ""; // Clear previous results
    resultContainer.style.display = "none"; 
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionText.innerText = currentQuestion.question;
    progressText.innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("answer-btn");
        button.addEventListener("click", () => selectAnswer(answer, currentQuestion));
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    answerButtons.innerHTML = "";
}

function selectAnswer(answer, question) {
    userAnswers.push({ 
        question: question.question, 
        selectedAnswer: answer.text, 
        correctAnswer: question.answers.find(a => a.correct).text,
        isCorrect: answer.correct
    });

    if (answer.correct) {
        score++;
    }
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
});

function showResults() {
    resetState();
    questionText.innerText = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerText = "Restart";
    nextButton.style.display = "block";
    
    // Show detailed results
    resultContainer.style.display = "block";
    resultContainer.innerHTML = "<h3>Review Your Answers:</h3>";

    userAnswers.forEach(entry => {
        let resultItem = document.createElement("div");
        resultItem.classList.add("result-item");

        resultItem.innerHTML = `
            <p><strong>Question:</strong> ${entry.question}</p>
            <p><strong>Your Answer:</strong> ${entry.selectedAnswer} ${entry.isCorrect ? "✅" : "❌"}</p>
            <p><strong>Correct Answer:</strong> ${entry.correctAnswer}</p>
            <hr>
        `;
        resultContainer.appendChild(resultItem);
    });

    nextButton.addEventListener("click", startQuiz);
}

startQuiz();
