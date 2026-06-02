/* ===================================
   DOM ELEMENTS CACHE
=================================== */

const burger = document.getElementById("burger");
const nav = document.getElementById("nav");
const topBtn = document.getElementById("topBtn");
const header = document.querySelector(".header");
const statsSection = document.querySelector(".stats");

const revealElements = document.querySelectorAll(".reveal");
const counters = document.querySelectorAll(".counter");

/* ===================================
   БУРГЕР-МЕНЮ
=================================== */

if (burger && nav) {
    burger.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
}

/* ===================================
   ЗАКРЫТИЕ МОБИЛЬНОГО МЕНЮ
=================================== */

document.querySelectorAll(".nav a").forEach(link => {
    link.addEventListener("click", () => {
        nav?.classList.remove("active");
    });
});

/* ===================================
   SCROLL HANDLER (ОПТИМИЗИРОВАНО)
=================================== */

function handleScroll() {

    /* HEADER SHADOW */
    if (header) {
        header.style.boxShadow =
            window.scrollY > 50
                ? "0 10px 30px rgba(0,0,0,.08)"
                : "none";
    }

    /* TOP BUTTON */
    if (topBtn) {
        topBtn.style.display =
            window.scrollY > 500 ? "block" : "none";
    }

    /* REVEAL ANIMATION */
    const windowHeight = window.innerHeight;

    revealElements.forEach(el => {
        if (el.getBoundingClientRect().top < windowHeight - 120) {
            el.classList.add("active");
        }
    });

    /* COUNTERS */
    startCounters();
}

window.addEventListener("scroll", handleScroll);

/* ===================================
   TOP BUTTON ACTION
=================================== */

if (topBtn) {
    topBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

/* ===================================
   СЧЁТЧИКИ
=================================== */

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

/* ===================================
   QUIZ
=================================== */

const quizData = [
    {
        q: "Вы готовы к активным прогулкам каждый день?",
        a: [
            { text: "Да", score: 1 },
            { text: "Нет", score: 0 }
        ]
    },
    {
        q: "У вас есть опыт с собаками?",
        a: [
            { text: "Да", score: 1 },
            { text: "Нет", score: 0 }
        ]
    },
    {
        q: "Готовы уделять время воспитанию?",
        a: [
            { text: "Да", score: 1 },
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

    quizQuestion.textContent = "";
    quizButtons.innerHTML = "";

    if (score >= 2) {
        quizResult.textContent = "Бультерьер вам подходит!";
    } else {
        quizResult.textContent = "Стоит рассмотреть более спокойные породы.";
    }

    quizRestart.classList.remove("hidden");
}

quizRestart?.addEventListener("click", () => {
    current = 0;
    score = 0;
    quizResult.textContent = "";
    quizRestart.classList.add("hidden");
    renderQuestion();
});

if (quizQuestion && quizButtons) {
    renderQuestion();
}

/* ===================================
   FACT GENERATOR
=================================== */

const factBtn = document.getElementById("factBtn");
const factText = document.getElementById("factText");

const facts = [
    "Порода выведена в Англии в XIX веке.",
    "Известна яйцеобразной формой головы.",
    "Отличается высоким интеллектом.",
    "Очень привязана к семье.",
    "Нуждается в регулярной активности.",
    "Хороший компаньон при правильном воспитании.",
    "Любит активные игры.",
    "Может быть уравновешенной и дружелюбной."
];

if (factBtn && factText) {
    factBtn.addEventListener("click", () => {
        const i = Math.floor(Math.random() * facts.length);
        factText.textContent = facts[i];
    });
}

/* ===================================
   AGE CALCULATOR
=================================== */

const ageBtn = document.getElementById("ageBtn");
const dogAgeInput = document.getElementById("dogAge");
const ageResult = document.getElementById("ageResult");

if (ageBtn && dogAgeInput && ageResult) {
    ageBtn.addEventListener("click", () => {

        const age = Number(dogAgeInput.value);

        if (!age && age !== 0) {
            ageResult.textContent = "Введите возраст собаки.";
            return;
        }

        const humanAge =
            age <= 2
                ? age * 12
                : 24 + (age - 2) * 4;

        ageResult.textContent =
            `Примерный человеческий возраст: ${humanAge} лет`;
    });
}

/* ================================
   ДАННЫЕ ГАЛЕРЕИ
================================ */

const galleryData = [

    {
        src: "images/gallery1.jpg",
        category: "puppy",
        alt: "Щенок бультерьера"
    },

    {
        src: "images/gallery2.jpg",
        category: "puppy",
        alt: "Щенок бультерьера"
    },

    {
        src: "images/gallery3.jpg",
        category: "puppy",
        alt: "Щенок бультерьера"
    },

    {
        src: "images/gallery4.jpg",
        category: "adult",
        alt: "Взрослый бультерьер"
    },

    {
        src: "images/gallery5.jpg",
        category: "adult",
        alt: "Взрослый бультерьер"
    },

    {
        src: "images/gallery6.jpg",
        category: "adult",
        alt: "Взрослый бультерьер"
    },

    {
        src: "images/gallery7.jpg",
        category: "play",
        alt: "Активная собака"
    },

    {
        src: "images/gallery8.jpg",
        category: "play",
        alt: "Играющий бультерьер"
    },

    {
        src: "images/gallery9.jpg",
        category: "play",
        alt: "Прогулка с собакой"
    }

];


/* ================================
   КАРУСЕЛЬ
================================ */

let currentIndex = 0;

let currentGallery = [...galleryData];

const galleryCircle =
    document.getElementById("galleryCircle");

const galleryPrev =
    document.getElementById("galleryPrev");

const galleryNext =
    document.getElementById("galleryNext");


function renderCarousel() {

    if (!galleryCircle) return;

    galleryCircle.innerHTML = "";

    const spacing = 280;
    const total = currentGallery.length;

    currentGallery.forEach((item, index) => {

        let offset = index - currentIndex;

        if (offset > total / 2) {
            offset -= total;
        }

        if (offset < -total / 2) {
            offset += total;
        }

        if (Math.abs(offset) > 4) return;

        const div = document.createElement("div");

        div.className = "gallery-item";

        div.style.left =
            `calc(50% + ${offset * spacing}px)`;

        div.style.top = "50%";

        const scale =
            offset === 0
                ? 1.2
                : Math.max(0.7, 1 - Math.abs(offset) * 0.1);

        div.style.transform =
            `translate(-50%, -50%) scale(${scale})`;

        div.style.opacity =
            Math.max(0.2, 1 - Math.abs(offset) * 0.2);

        div.style.zIndex =
            100 - Math.abs(offset);

        div.innerHTML = `
            <img
                src="${item.src}"
                alt="${item.alt}">
        `;

        galleryCircle.appendChild(div);

    });

}


/* ================================
   СТРЕЛКИ
================================ */

galleryNext?.addEventListener("click", () => {

    currentIndex++;

    if (currentIndex >= currentGallery.length) {

        currentIndex = 0;

    }

    renderCarousel();

});

galleryPrev?.addEventListener("click", () => {

    currentIndex--;

    if (currentIndex < 0) {

        currentIndex =
            currentGallery.length - 1;

    }

    renderCarousel();

});


/* ================================
   ФИЛЬТРАЦИЯ
================================ */

const filterButtons =
    document.querySelectorAll(".filter-btn");

filterButtons.forEach(btn => {

    btn.addEventListener("click", () => {

        filterButtons.forEach(button =>
            button.classList.remove("active")
        );

        btn.classList.add("active");

        const filter =
            btn.dataset.filter;

        currentGallery =
            filter === "all"
                ? [...galleryData]
                : galleryData.filter(
                    item =>
                        item.category === filter
                );

        currentIndex = 0;

        renderCarousel();

    });

});


document.addEventListener("DOMContentLoaded", () => {

    if (document.getElementById("galleryCircle")) {

        renderCarousel();

    }

});

/* ===================================
   FACT QUIZ
=================================== */

document.querySelectorAll(".fact-quiz-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const result = document.getElementById("factQuizResult");
        if (!result) return;

        result.textContent =
            btn.dataset.correct === "true"
                ? "Верно!"
                : "Неверно.";
    });
});

