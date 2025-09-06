let quizContents = [
    // 10 MCQ
    {
        question: "Who is making the Web standards?",
        choices: ["Mozilla", "The world wide web consortium", "Microsoft", "Google"],
        correctAnswer: "The world wide web consortium"
    },
    {
        question: "Choose the correct HTML element for the largest heading:",
        choices: ["<h6>", "<head>", "<heading>", "<h1>"],
        correctAnswer: "<h1>"
    },
    {
        question: "What is the correct HTML element for inserting a line break?",
        choices: ["<break>", "<br>", "<lb>", "<rb>"],
        correctAnswer: "<br>"
    },
    {
        question: "What is the correct HTML for adding a background color?",
        choices: [`<background>yellow</background>`, `<body style=background-color:yellow;>`, `<body bg=yellow>`, `<body color=yellow>`], 
        correctAnswer: `<body style=background-color:yellow;>`
    },
    {
        question: "Choose the correct HTML element to define emphasized text",
        choices: ["<em>", "<italic>", "<i>", "<rem>"],
        correctAnswer: "<em>"
    },
    {
        question: "Which character is used to indicate an end tag?",
        choices: ["^", "/", "<", "*"],
        correctAnswer: "/"
    },
    {
        question: "How can you make a numbered list?",
        choices: ["<list>", "<ul>", "<dl>", "<ol>"],
        correctAnswer: "<ol>"
    },
    {
        question: "What is the correct HTML for making a checkbox?",
        choices: ["<input type=check>", "<check>", "<box>", "<checkbox>"],
        correctAnswer: "<checkbox>"
    },
    {
        question: "Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?",
        choices: ["title", "longdesc", "alt", "src"],
        correctAnswer: "alt"
    },
    {
        question: "In HTML, which attribute is used to specify that an input field must be filled out?",
        choices: ["formvalidate", "placeholder", "validate", "required"],
        correctAnswer: "required"
    },
    // 10 TRUE/FALSE
    {
        question: "In HTML, you can embed SVG elements directly into an HTML page.",
        choices: ["True", "False"],
        correctAnswer: "True"
    },
    {
        question: "Block elements are normally displayed without starting a new line.",
        choices: ["True", "False"],
        correctAnswer: "False"
    },
    {
        question: "HTML comments start with <!-- and end with -->",
        choices: ["True", "False"],
        correctAnswer: "True"
    },
    {
        question: "An <iframe> is used to display a web page within a web page.",
        choices: ["True", "False"],
        correctAnswer: "True"
    },
    {
        question: "Inline elements are normally displayed without starting a new line.",
        choices: ["True", "False"],
        correctAnswer: "True"
    },
    {
        question: "The <br> tag requires a closing </br> tag to be valid HTML.",
        choices: ["True", "False"],
        correctAnswer: "False"
    },
    {
        question: "All HTML attributes must be placed inside the opening tag of an element.",
        choices: ["True", "False"],
        correctAnswer: "True"
    },
    {
        question: "The <img> tag uses the src attribute to specify the path to the image.",
        choices: ["True", "False"],
        correctAnswer: "True"
    },
    {
        question: `The <title> tag defines a heading for the document and is displayed within the page's body.`,
        choices: ["True", "False"],
        correctAnswer: "False"
    },
    {
        question: "In HTML5, the <!DOCTYPE html> declaration is optional.",
        choices: ["True", "False"],
        correctAnswer: "False"
    }
];

const homePage = document.querySelector(".home-page")
const startBtn = document.querySelector(".home-page .icon-box");
const message = document.querySelector(".home-page .span");
const quizContainer = document.querySelector(".quiz-page");
const countNumber = document.querySelector(".quiz-page .count-number");
const question = document.querySelector(".quiz-page .question");
const choices = document.querySelector(".quiz-page .choices");
const nextBtn = document.querySelector(".quiz-page .next-btn");
const overlay = document.querySelector(".overlay");
const quizResult = document.querySelector(".quiz-result");

startBtn.addEventListener("click", () => {
    homePage.style.display = "none";
    quizContainer.style.display = "block";
})

let questionNumber = 0;
let score = 0;
const maxQuestions = quizContents.length;

const shuffleContents = (contents) => {
    return contents.slice().sort(() => Math.random() - 0.5);
}

quizContents = shuffleContents(quizContents);

const checkAnswer = (e) => {
    let userAnswer = e.target.textContent;
    if(userAnswer === quizContents[questionNumber].correctAnswer){
        score++;
        e.target.classList.add("correct");
    }else{
        e.target.classList.add("incorrect");
    }

    let allChoices = document.querySelectorAll(".quiz-page .choice");
    allChoices.forEach((c) => {
        c.classList.add("disabled");
    })
}

const createQuestion = () => {
    choices.innerHTML = "";
    countNumber.innerHTML = `<span class="number">${questionNumber + 1} / ${maxQuestions}</span>`;
    question.textContent = quizContents[questionNumber].question;

    const shuffleChoices = shuffleContents(quizContents[questionNumber].choices);

    shuffleChoices.forEach(o => {
        const option = document.createElement("button");
        option.classList.add("choice");
        option.textContent = o;
        option.addEventListener("click", (e) => {
            checkAnswer(e);
        })
        choices.appendChild(option);
    });
}

const displayQuizResult = () => {
    overlay.style.display = "block";
    quizResult.style.display = "block";

    quizResult.innerHTML = "";

    const result = document.createElement("h2");
    result.innerHTML = `You have scored ${score} out of ${maxQuestions}.`

    const confirmBtn = document.createElement("button");
    confirmBtn.classList.add("confirm-btn");
    confirmBtn.innerHTML = "Ok";

    quizResult.appendChild(result);
    quizResult.appendChild(confirmBtn);

    confirmBtn.addEventListener("click", () => {
        overlay.style.display = "none";
        quizResult.style.display = "none";
        quizContainer.style.display = "none";
        homePage.style.display = "block";
    });
}

createQuestion();

const displayNextQuestion = () => {
    if(questionNumber >= maxQuestions - 1){
        displayQuizResult();

        startBtn.disabled = true;
        startBtn.classList.add("disabled");
        startBtn.classList.add("submitted");
        message.innerHTML = "Submitted Quiz";
        return;
    }

    questionNumber++;
    createQuestion();
}

nextBtn.addEventListener("click", displayNextQuestion);