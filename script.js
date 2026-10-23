const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

// Animated hero text
const typedRole = document.getElementById("typedRole");

if (typedRole) {
  const phrases = [
    "the modern web.",
    "full-stack apps.",
    "AI-powered ideas.",
    "useful experiences."
  ];

  let phraseIndex = 0;
  let charIndex = phrases[0].length;
  let deleting = false;

  function typeRole() {
    const current = phrases[phraseIndex];

    if (deleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    typedRole.textContent = current.slice(0, charIndex);

    let delay = deleting ? 35 : 75;

    if (!deleting && charIndex === current.length) {
      deleting = true;
      delay = 1200;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 300;
    }

    setTimeout(typeRole, delay);
  }

  setTimeout(typeRole, 1200);
}
// Project category filters
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(
  ".projects-grid .project-card"
);

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((btn) => {
      btn.classList.toggle("active", btn === button);
    });

    projectCards.forEach((card) => {
      const matches =
        filter === "all" || card.dataset.category === filter;

      card.hidden = !matches;
    });
  });
});

// Reveal elements as they enter the viewport
const revealElements = document.querySelectorAll(
  ".skill-card, .project-card, .timeline-item"
);

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => {
    element.classList.add("js-reveal");
    revealObserver.observe(element);
  });
}