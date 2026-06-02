import "./main.js";

/* =========================
   DATA
========================= */

const galleryData = [
    { src: "images/gallery1.jpg", category: "puppy", alt: "Щенок" },
    { src: "images/gallery2.jpg", category: "puppy", alt: "Щенок" },
    { src: "images/gallery3.jpg", category: "puppy", alt: "Щенок" },
    { src: "images/gallery13.jpg", category: "puppy", alt: "Щенок" },
    { src: "images/gallery4.jpg", category: "adult", alt: "Взрослый" },
    { src: "images/gallery5.jpg", category: "adult", alt: "Взрослый" },
    { src: "images/gallery6.jpg", category: "adult", alt: "Взрослый" },
    { src: "images/gallery10.jpg", category: "adult", alt: "Взрослый" },
    { src: "images/gallery11.jpg", category: "adult", alt: "Взрослый" },
    { src: "images/gallery7.jpg", category: "play", alt: "Игра" },
    { src: "images/gallery8.jpg", category: "play", alt: "Игра" },
    { src: "images/gallery9.jpg", category: "play", alt: "Игра" },
    { src: "images/gallery12.jpg", category: "play", alt: "Игра" }
];

/* =========================
   STATE
========================= */

let index = 0;
let currentGallery = [...galleryData];

/* =========================
   ELEMENTS
========================= */

const circle = document.getElementById("galleryCircle");
const nextBtn = document.getElementById("galleryNext");
const prevBtn = document.getElementById("galleryPrev");


/* =========================
   HELPERS
========================= */

function getPrev(i) {
    return (i - 1 + currentGallery.length) % currentGallery.length;
}

function getNext(i) {
    return (i + 1) % currentGallery.length;
}

/* =========================
   RENDER (3 IMAGES ONLY)
========================= */

function render() {
    if (!circle) return;

    circle.innerHTML = "";

    const items = [
        { pos: "left", data: currentGallery[getPrev(index)] },
        { pos: "center", data: currentGallery[index] },
        { pos: "right", data: currentGallery[getNext(index)] }
    ];

    items.forEach(item => {
        const div = document.createElement("div");
        div.className = `gallery-item ${item.pos}`;

        div.innerHTML = `
            <img src="${item.data.src}" alt="${item.data.alt}">
        `;

        circle.appendChild(div);
    });
}

/* =========================
   CONTROLS
========================= */

nextBtn?.addEventListener("click", () => {
    index = getNext(index);
    render();
});

prevBtn?.addEventListener("click", () => {
    index = getPrev(index);
    render();
});

/* =========================
   FILTERS
========================= */

document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {

        document.querySelectorAll(".filter-btn")
            .forEach(b => b.classList.remove("active"));

        btn.classList.add("active");

        const filter = btn.dataset.filter;

        currentGallery =
            filter === "all"
                ? [...galleryData]
                : galleryData.filter(i => i.category === filter);

        index = 0;
        render();
    });
});

/* =========================
   INIT
========================= */

render();