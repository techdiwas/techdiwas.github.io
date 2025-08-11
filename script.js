// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href"))
            .scrollIntoView({ behavior: "smooth" });
    });
});

// Theme toggle
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    themeToggle.innerHTML = document.body.classList.contains("light-mode")
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
});

// Fade-in animation on scroll
const fadeElems = document.querySelectorAll(".fade-in");
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("show");
    });
});
fadeElems.forEach(el => observer.observe(el));

// Carousel logic
const track = document.querySelector(".carousel-track");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
let index = 0;

nextBtn.addEventListener("click", () => {
    if (index < track.children.length - 1) {
        index++;
        track.style.transform = `translateX(-${index * 100}%)`;
    }
});
prevBtn.addEventListener("click", () => {
    if (index > 0) {
        index--;
        track.style.transform = `translateX(-${index * 100}%)`;
    }
});
