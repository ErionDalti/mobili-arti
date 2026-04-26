const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const filterButtons = document.querySelectorAll("[data-filter]");
const productCards = document.querySelectorAll("[data-category]");
const forms = document.querySelectorAll("[data-form]");
const yearElement = document.querySelector("[data-year]");

document.documentElement.classList.add("js");

// Mobile navigation
const closeMenu = () => {
  document.body.classList.remove("menu-open");
  nav?.classList.remove("is-open");
  menuToggle?.setAttribute("aria-expanded", "false");
  menuToggle?.setAttribute("aria-label", "Hap menunë");
};

const openMenu = () => {
  document.body.classList.add("menu-open");
  nav?.classList.add("is-open");
  menuToggle?.setAttribute("aria-expanded", "true");
  menuToggle?.setAttribute("aria-label", "Mbyll menunë");
};

menuToggle?.addEventListener("click", () => {
  const isOpen = nav?.classList.contains("is-open");
  isOpen ? closeMenu() : openMenu();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

// Smooth in-page navigation
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    const target = targetId ? document.querySelector(targetId) : null;

    if (!target) return;

    event.preventDefault();
    closeMenu();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
};

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

// Catalog filtering
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");

    productCards.forEach((card) => {
      const shouldShow = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

// Local form feedback
forms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const message = form.querySelector(".form-message");
    const formType = form.dataset.form;
    const successText =
      formType === "appointment"
        ? "Faleminderit. Kërkesa për takim u dërgua dhe ekipi ynë do t’ju kontaktojë së shpejti."
        : "Faleminderit për mesazhin. Do t’ju përgjigjemi sa më shpejt.";

    form.reset();

    if (message) {
      message.textContent = successText;
    }
  });
});

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const dateInput = document.querySelector('input[type="date"]');

if (dateInput) {
  dateInput.min = new Date().toISOString().split("T")[0];
}

// Scroll reveal animation
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
