// Theme toggle with persistence and system preference
(function themeInit() {
  const root = document.documentElement;
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") {
    root.setAttribute("data-theme", stored);
  } else {
    root.setAttribute("data-theme", "auto");
  }
})();

document.getElementById("themeToggle").addEventListener("click", () => {
  const root = document.documentElement;
  const current = root.getAttribute("data-theme") || "auto";
  const next = current === "light" ? "dark" : current === "dark" ? "auto" : "light";
  root.setAttribute("data-theme", next);
  if (next === "auto") {
    localStorage.removeItem("theme");
  } else {
    localStorage.setItem("theme", next);
  }
});

// Mobile nav
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
navToggle.addEventListener("click", () => {
  const open = navMenu.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
});
navMenu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  navMenu.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
}));

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", (e) => {
    const id = link.getAttribute("href");
    if (id.length > 1) {
      e.preventDefault();
      document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      history.pushState(null, "", id);
    }
  });
});

// Current year in footer
document.getElementById("year").textContent = String(new Date().getFullYear());

// Contact form validation + progressive enhancement submit
const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");

function showError(field, message) {
  const small = field.parentElement.querySelector(".error");
  if (small) small.textContent = message || "";
  field.setAttribute("aria-invalid", message ? "true" : "false");
}

function validate(form) {
  let ok = true;
  const name = form.elements.namedItem("name");
  const email = form.elements.namedItem("email");
  const message = form.elements.namedItem("message");

  if (name && name.value.trim().length < 2) {
    showError(name, "Please enter your name.");
    ok = false;
  } else if (name) { showError(name, ""); }

  const emailVal = email && email.value.trim();
  if (!emailVal || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
    showError(email, "Please enter a valid email.");
    ok = false;
  } else if (email) { showError(email, ""); }

  if (message && message.value.trim().length < 10) {
    showError(message, "Message should be at least 10 characters.");
    ok = false;
  } else if (message) { showError(message, ""); }

  return ok;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  statusEl.textContent = "";
  if (!validate(form)) return;

  const data = new FormData(form);
  const endpoint = form.getAttribute("action");
  if (!endpoint || endpoint.includes("your-id")) {
    // Fallback if action not configured
    statusEl.textContent = "Form endpoint not configured. Please use the email button.";
    return;
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: data
    });
    if (res.ok) {
      form.reset();
      statusEl.textContent = "Thanks! Your message has been sent.";
    } else {
      statusEl.textContent = "Something went wrong. Please try again.";
    }
  } catch {
    statusEl.textContent = "Network error. Please try again.";
  }
});
