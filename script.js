/* =============================================
   PORTFOLIO — script.js
   All interactive features & animations
   ============================================= */

/* =============================================
   EMAILJS INIT
   Replace with your actual EmailJS credentials:
   - Go to https://www.emailjs.com
   - Create an account, add an email service
   - Create two templates: one for your notification, one for auto-reply
   - Replace the IDs below
   ============================================= */
(function () {
  emailjs.init("YOUR_EMAILJS_PUBLIC_KEY"); // <-- Replace with your EmailJS public key
})();

const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";          // <-- Your EmailJS service ID
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";        // <-- Template for your notification
const EMAILJS_AUTOREPLY_ID = "YOUR_AUTOREPLY_TEMPLATE_ID"; // <-- Auto-reply template ID

/* =============================================
   CUSTOM CURSOR
   ============================================= */
const cursorDot = document.getElementById("cursorDot");
const cursorRing = document.getElementById("cursorRing");

if (window.matchMedia("(hover: hover)").matches) {
  document.addEventListener("mousemove", (e) => {
    cursorDot.style.left = e.clientX + "px";
    cursorDot.style.top = e.clientY + "px";
    cursorRing.style.left = e.clientX + "px";
    cursorRing.style.top = e.clientY + "px";
  });

  document.querySelectorAll("a, button, .project-card, .soft-skill-card, .tool-chip").forEach((el) => {
    el.addEventListener("mouseenter", () => cursorRing.classList.add("expanded"));
    el.addEventListener("mouseleave", () => cursorRing.classList.remove("expanded"));
  });
}

/* =============================================
   SCROLL PROGRESS BAR
   ============================================= */
const scrollProgress = document.getElementById("scrollProgress");
window.addEventListener("scroll", () => {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (window.scrollY / total) * 100;
  scrollProgress.style.width = progress + "%";
});

/* =============================================
   NAVBAR: scroll class + active link
   ============================================= */
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  // Sticky styling
  if (window.scrollY > 20) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Active nav link on scroll
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

/* =============================================
   SMOOTH SCROLL for nav links
   ============================================= */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      // Close mobile menu if open
      closeMobileMenu();
    }
  });
});

/* =============================================
   HAMBURGER / MOBILE MENU
   ============================================= */
const hamburger = document.getElementById("hamburger");
const navLinksContainer = document.getElementById("navLinks");
const mobileOverlay = document.getElementById("mobileOverlay");

function openMobileMenu() {
  hamburger.classList.add("open");
  hamburger.setAttribute("aria-expanded", "true");
  navLinksContainer.classList.add("open");
  mobileOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeMobileMenu() {
  hamburger.classList.remove("open");
  hamburger.setAttribute("aria-expanded", "false");
  navLinksContainer.classList.remove("open");
  mobileOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

hamburger.addEventListener("click", () => {
  if (hamburger.classList.contains("open")) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
});
mobileOverlay.addEventListener("click", closeMobileMenu);

/* =============================================
   DARK / LIGHT MODE TOGGLE
   ============================================= */
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const root = document.documentElement;

// Persist theme in localStorage
const savedTheme = localStorage.getItem("portfolioTheme") || "dark";
root.setAttribute("data-theme", savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener("click", () => {
  const current = root.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  localStorage.setItem("portfolioTheme", next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  if (theme === "dark") {
    themeIcon.className = "fas fa-moon";
  } else {
    themeIcon.className = "fas fa-sun";
  }
}

/* =============================================
   TYPEWRITER ANIMATION (Hero)
   ============================================= */
const phrases = [
  "Aspiring Web Developer",
  "Creative UI Designer",
  "Problem Solver",
  "HTML · CSS · JavaScript",
  "Open to Opportunities",
];
let phraseIdx = 0;
let charIdx = 0;
let isDeleting = false;
const typeEl = document.getElementById("typewriter");

function typeWrite() {
  const current = phrases[phraseIdx];
  if (isDeleting) {
    typeEl.textContent = current.substring(0, charIdx - 1);
    charIdx--;
  } else {
    typeEl.textContent = current.substring(0, charIdx + 1);
    charIdx++;
  }

  let delay = isDeleting ? 60 : 100;

  if (!isDeleting && charIdx === current.length) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    phraseIdx = (phraseIdx + 1) % phrases.length;
    delay = 400;
  }

  setTimeout(typeWrite, delay);
}
typeWrite();

/* =============================================
   PARTICLE / CANVAS BACKGROUND
   ============================================= */
const canvas = document.getElementById("particlesCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
const PARTICLE_COUNT = 60;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.opacity = Math.random() * 0.4 + 0.05;
    this.twinkle = Math.random() * Math.PI * 2;
    this.twinkleSpeed = Math.random() * 0.03 + 0.01;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.twinkle += this.twinkleSpeed;

    if (
      this.x < -10 || this.x > canvas.width + 10 ||
      this.y < -10 || this.y > canvas.height + 10
    ) {
      this.reset();
    }
  }
  draw() {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    const alpha = this.opacity * (0.6 + 0.4 * Math.sin(this.twinkle));
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = isDark
      ? 'rgba(0, 255, 136, ${alpha})'
      : 'rgba(0, 168, 85, ${alpha * 0.5})';
    ctx.fill();
  }
}

// Draw connecting lines between close particles
function drawConnections() {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const alpha = (1 - dist / 120) * 0.12;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = isDark
          ? 'rgba(0, 255, 136, $,alpha}'
          : 'rgba(0, 168, 85, ${alpha , .4})';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

for (let i = 0; i < PARTICLE_COUNT; i++) {
  particles.push(new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawConnections();
  particles.forEach((p) => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* =============================================
   SCROLL REVEAL ANIMATIONS
   ============================================= */
const revealElements = document.querySelectorAll(
  ".reveal-up, .reveal-left, .reveal-right"
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);

revealElements.forEach((el) => revealObserver.observe(el));

// Stagger project cards reveal
document.querySelectorAll(".project-card[data-delay]").forEach((card) => {
  const delay = card.getAttribute("data-delay");
  card.style.transitionDelay = delay + "ms";
});

/* =============================================
   SKILL BAR ANIMATIONS (scroll triggered)
   ============================================= */
const skillBars = document.querySelectorAll(".skill-bar-fill");
const skillPercents = document.querySelectorAll(".skill-percent");

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const skillItem = entry.target.closest(".skill-item");
        const bar = skillItem.querySelector(".skill-bar-fill");
        const percentEl = skillItem.querySelector(".skill-percent");
        const targetWidth = bar.getAttribute("data-width");

        bar.style.width = targetWidth + "%";

        // Animate number count
        let count = 0;
        const target = parseInt(targetWidth);
        const duration = 1200;
        const step = target / (duration / 16);
        const counter = setInterval(() => {
          count += step;
          if (count >= target) {
            count = target;
            clearInterval(counter);
          }
          percentEl.textContent = Math.round(count) + "%";
        }, 16);

        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

document.querySelectorAll(".skill-item").forEach((item) => {
  skillObserver.observe(item);
});

/* =============================================
   PROJECT FILTER TABS
   ============================================= */
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    projectCards.forEach((card) => {
      const categories = card.getAttribute("data-category") || "";
      const matches = filter === "all" || categories.includes(filter);

      if (matches) {
        card.style.display = "flex";
        card.classList.remove("slide-out");
        void card.offsetWidth; // reflow
        card.classList.add("slide-in");
        setTimeout(() => card.classList.remove("slide-in"), 500);
      } else {
        card.classList.add("slide-out");
        setTimeout(() => {
          card.style.display = "none";
          card.classList.remove("slide-out");
        }, 300);
      }
    });
  });
});

/* =============================================
   BACK TO TOP BUTTON
   ============================================= */
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* =============================================
   CONTACT FORM — Validation + EmailJS Send
   ============================================= */
const contactForm = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const formSuccess = document.getElementById("formSuccess");
const formFail = document.getElementById("formFail");

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(id, msg) {
  const el = document.getElementById(id);
  if (el) el.textContent = msg;
}

function clearErrors() {
  ["nameError", "emailError", "msgError"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.textContent = "";
  });
}

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearErrors();
  formSuccess.classList.add("hidden");
  formFail.classList.add("hidden");

  const name = document.getElementById("userName").value.trim();
  const email = document.getElementById("userEmail").value.trim();
  const message = document.getElementById("userMessage").value.trim();

  let valid = true;

  if (!name) {
    showError("nameError", "Please enter your name.");
    valid = false;
  }
  if (!email) {
    showError("emailError", "Please enter your email address.");
    valid = false;
  } else if (!validateEmail(email)) {
    showError("emailError", "Please enter a valid email address.");
    valid = false;
  }
  if (!message) {
    showError("msgError", "Please enter a message.");
    valid = false;
  }

  if (!valid) return;

  // Show loading state
  submitBtn.querySelector(".btn-text").classList.add("hidden");
  submitBtn.querySelector(".btn-loading").classList.remove("hidden");
  submitBtn.disabled = true;

  try {
    // Send notification to you
    await emailjs.sendForm(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      contactForm
    );

    // Send auto-reply to the sender
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_AUTOREPLY_ID,
      {
        to_name: name,
        to_email: email,
        from_name: "Your Name", // <-- Replace with your name
        reply_to: "your@email.com", // <-- Replace with your email
      }
    );

    formSuccess.classList.remove("hidden");
    contactForm.reset();
  } catch (err) {
    console.error("EmailJS error:", err);
    formFail.classList.remove("hidden");
  } finally {
    submitBtn.querySelector(".btn-text").classList.remove("hidden");
    submitBtn.querySelector(".btn-loading").classList.add("hidden");
    submitBtn.disabled = false;
  }
});

// Input focus: clear error on typing
["userName", "userEmail", "userMessage"].forEach((id) => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener("input", () => {
      const errMap = {
        userName: "nameError",
        userEmail: "emailError",
        userMessage: "msgError",
      };
      showError(errMap[id], "");
    });
  }
});

/* =============================================
   HERO SECTION — Initial Load Reveal
   ============================================= */
window.addEventListener("load", () => {
  // Trigger hero reveals on load (not scroll)
  document.querySelectorAll(".hero .reveal-up, .hero .reveal-right").forEach((el, i) => {
    setTimeout(() => {
      el.classList.add("visible");
    }, i * 120);
  });
});

