/* =========================
   BURGER MENU
========================= */

const burger = document.getElementById("burger");
const nav = document.getElementById("nav");

if (burger && nav) {
    burger.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
}

/* close menu on link click */
document.querySelectorAll(".nav a").forEach(link => {
    link.addEventListener("click", () => {
        nav?.classList.remove("active");
    });
});

/* =========================
   TOP BUTTON
========================= */

const topBtn = document.getElementById("topBtn");

if (topBtn) {
    window.addEventListener("scroll", () => {
        topBtn.style.display =
            window.scrollY > 500 ? "block" : "none";
    });

    topBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

/* =========================
   HEADER SHADOW + REVEAL
========================= */

const header = document.querySelector(".header");
const revealElements = document.querySelectorAll(".reveal");

function handleScrollCommon() {

    if (header) {
        header.style.boxShadow =
            window.scrollY > 50
                ? "0 10px 30px rgba(0,0,0,.08)"
                : "none";
    }

    const windowHeight = window.innerHeight;

    revealElements.forEach(el => {
        if (el.getBoundingClientRect().top < windowHeight - 120) {
            el.classList.add("active");
        }
    });
}

window.addEventListener("scroll", handleScrollCommon);