import "./main.js";

/* =========================
   AGE CALCULATOR
========================= */

const ageBtn = document.getElementById("ageBtn");
const dogAgeInput = document.getElementById("dogAge");
const ageResult = document.getElementById("ageResult");

if (ageBtn && dogAgeInput && ageResult) {
    ageBtn.addEventListener("click", () => {

        const age = Number(dogAgeInput.value);

        if (!age && age !== 0) {
            ageResult.textContent = "Возраст собаки";
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