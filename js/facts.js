import "./main.js";

const factBtn = document.getElementById("factBtn");
const factText = document.getElementById("factText");

const facts = [
    "Порода выведена в Англии в XIX веке",
    "Були известны яйцеобразной формой головы",
    "Отличается высоким интеллектом и упрямством",
    "Буль очень привязан к хозяину",
    "Були нуждаются в регулярной активности",
    "Буль — отличный друг при правильном воспитании",
    "Любит крутиться на месте",
    "Були уже давно не собаки-убийцы"
];

if (factBtn && factText) {
    factBtn.addEventListener("click", () => {

        const i = Math.floor(Math.random() * facts.length);

        factText.textContent = facts[i];

        // превращаем блок в карточку
        factText.classList.add("fact-card-active");
    });
}

const quizData = [
    {
        q: "В какой стране была выведена порода бультерьер?",
        a: [
            { text: "Германия", correct: false },
            { text: "Англия", correct: true },
            { text: "Франция", correct: false }
        ]
    },
    {
        q: "Какой главный признак породы?",
        a: [
            { text: "Яйцевидная голова", correct: true },
            { text: "Длинные уши", correct: false },
            { text: "Кудрявая шерсть", correct: false }
        ]
    },
    {
        q: "Бультерьер — это в первую очередь:",
        a: [            
            { text: "Охотничья собака", correct: false },
            { text: "Служебная собака", correct: false },
            { text: "Собака-компаньон", correct: true }
        ]
    }
];

let current = 0;
let score = 0;

const qEl = document.getElementById("quizQuestion");
const btnEl = document.getElementById("quizButtons");
const resEl = document.getElementById("factQuizResult");

function renderQuiz() {
    if (!qEl || !btnEl) return;

    const q = quizData[current];

    qEl.textContent = q.q;
    btnEl.innerHTML = "";

    q.a.forEach(answer => {
        const btn = document.createElement("button");
        btn.className = "btn";
        btn.textContent = answer.text;

        btn.onclick = () => {
            if (answer.correct) score++;

            current++;

            if (current < quizData.length) {
                renderQuiz();
            } else {
                showFinalResult();
            }
        };

        btnEl.appendChild(btn);
    });

    resEl.textContent = "";
}

function showFinalResult() {
    qEl.style.display = "none";
    btnEl.style.display = "none";

    const text =
        score === quizData.length
            ? "Идеально! Вы отлично знаете породу 🐾"
            : score >= 2
            ? "Хороший результат! Вы неплохо разбираетесь в породе"
            : "Есть время узнать побольше о бультерьерах!";

    resEl.innerHTML = `
        <div class="quiz-result-card">
            <h3>Ваш результат</h3>
            <p>${text}</p>
            <p>Правильных ответов: ${score} / ${quizData.length}</p>
        </div>
    `;
}

/* init */
renderQuiz();