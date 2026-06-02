import "./main.js";

/* =========================
   COUNTERS
========================= */

const counters = document.querySelectorAll(".counter");
const statsSection = document.querySelector(".stats");

let counterStarted = false;

function startCounters() {
    if (counterStarted || !statsSection) return;

    const top = statsSection.getBoundingClientRect().top;

    if (top < window.innerHeight - 100) {
        counterStarted = true;

        counters.forEach(counter => {
            const target = Number(counter.dataset.target);
            let current = 0;
            const step = target / 80;

            function update() {
                current += step;

                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = target;
                }
            }

            update();
        });
    }
}

window.addEventListener("scroll", startCounters);

/* =========================
   QUIZ
========================= */

const quizData = [
    {
        q: "Готовы к активным прогулкам каждый день?",
        a: [
            { text: "Да", score: 2 },
            { text: "Нет", score: 0 }
        ]
    },
    {
        q: "У вас есть опыт воспитания собак?",
        a: [
            { text: "Да", score: 1 },
            { text: "Нет", score: 0 }
        ]
    },
    {
        q: "Готовы уделять много времени воспитанию?",
        a: [
            { text: "Да", score: 2 },
            { text: "Нет", score: 0 }
        ]
    }
];

let current = 0;
let score = 0;

const quizQuestion = document.getElementById("quizQuestion");
const quizButtons = document.getElementById("quizButtons");
const quizResult = document.getElementById("quizResult");
const quizRestart = document.getElementById("quizRestart");

function renderQuestion() {
    const q = quizData[current];

    // возвращаем нормальное состояние (ВАЖНО)
    quizQuestion.style.display = "block";
    quizButtons.style.display = "flex";
    quizResult.textContent = "";

    quizQuestion.textContent = q.q;
    quizButtons.innerHTML = "";

    q.a.forEach(ans => {
        const btn = document.createElement("button");
        btn.className = "btn";
        btn.textContent = ans.text;

        btn.onclick = () => {
            score += ans.score;
            current++;

            if (current < quizData.length) {
                renderQuestion();
            } else {
                showResult();
            }
        };

        quizButtons.appendChild(btn);
    });
}

function showResult() {
    quizQuestion.style.display = "none";
    quizButtons.style.display = "none";

    quizResult.innerHTML = `
        <div class="quiz-result-card">
            ${
                score >= 4
                    ? "Кажется, бультерьер вам подходит!"
                    : "Стоит рассмотреть более спокойные породы"
            }
        </div>
    `;

    quizRestart.classList.remove("hidden");
}

quizRestart?.addEventListener("click", () => {
    current = 0;
    score = 0;

    quizResult.innerHTML = "";
    quizRestart.classList.add("hidden");

    renderQuestion();
});

if (quizQuestion && quizButtons) {
    renderQuestion();
}