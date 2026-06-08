/* ============================================================
   script.js — Romantic Proposal Interactive Experience
   ============================================================ */

// ── CONFIG ────────────────────────────────────────────────────
const IMAGES = [
  "images/popup1.jpg",
    "images/popup2.jpg",
    "images/popup3.jpg",
    "images/popup4.jpg",
];

const HINTS = [
  "The button seems shy… 👀",
  "Hmm, it keeps running away! 🙈",
  "Is the NO button scared? 😂",
  "Maybe that's a sign… 😇",
  "It really doesn't want to be clicked! 💨",
  "Just one little YES… 🥺",
  "The button has trust issues! 😅",
  "Try harder? Or… just click YES? 💖",
];

// ── DOM REFS ──────────────────────────────────────────────────
const heartsBg      = document.getElementById("heartsBg");
const yesBtn        = document.getElementById("yesBtn");
const noBtn         = document.getElementById("noBtn");
const noHint        = document.getElementById("noHint");
const modal         = document.getElementById("modal");
const burst         = document.getElementById("burst");
const gallery       = document.getElementById("gallery");
const closeBtn      = document.getElementById("closeBtn");
const proposalCard  = document.getElementById("proposalCard");

// ── FLOATING HEARTS BACKGROUND ────────────────────────────────
const BG_HEARTS = ["💗", "💕", "💖", "❤️", "🌸", "💓", "✨", "🌹"];

function spawnBgHeart() {
  const el = document.createElement("span");
  el.className = "heart-float";
  el.textContent = BG_HEARTS[Math.floor(Math.random() * BG_HEARTS.length)];
  el.style.left = Math.random() * 100 + "vw";
  el.style.fontSize = (0.9 + Math.random() * 1.4) + "rem";
  const dur = 7 + Math.random() * 8;
  el.style.animationDuration = dur + "s";
  el.style.animationDelay = (Math.random() * dur) + "s";
  heartsBg.appendChild(el);

  // remove after it's done to keep DOM clean
  setTimeout(() => el.remove(), (dur + dur) * 1000);
}

// Seed initial hearts, then keep spawning
for (let i = 0; i < 18; i++) spawnBgHeart();
setInterval(spawnBgHeart, 900);

// ── EVASIVE NO BUTTON ─────────────────────────────────────────
let noEscapes = 0;
let hintIndex = 0;

// Initialise NO button as absolutely positioned inside card__buttons
function initNoBtn() {
  const container = noBtn.parentElement;
  const containerRect = container.getBoundingClientRect();
  const noBtnRect = noBtn.getBoundingClientRect();

  // Convert to position relative to container
  container.style.position = "relative";
  noBtn.style.position = "absolute";
  noBtn.style.left = (noBtnRect.left - containerRect.left) + "px";
  noBtn.style.top  = (noBtnRect.top  - containerRect.top) + "px";
  // Reserve space so card height stays stable
  container.style.minHeight = (noBtn.offsetTop + noBtn.offsetHeight + 10) + "px";
}

function moveNoBtn() {
  const card      = proposalCard;
  const container = noBtn.parentElement;
  const cRect     = container.getBoundingClientRect();
  const cardRect  = card.getBoundingClientRect();

  // Available zone: within the card boundaries relative to container
  const maxX = cardRect.width - noBtn.offsetWidth - 16;
  const maxY = cardRect.height - noBtn.offsetHeight - 16;

  // Pick random position, favour edges for dramatic effect
  let x = Math.random() * maxX;
  let y = Math.random() * maxY;

  // Ensure it doesn't land on YES button region (approx centre)
  const centreX = (cardRect.width / 2) - (noBtn.offsetWidth / 2);
  const centreY = cRect.top - cardRect.top + (container.offsetTop);
  if (Math.abs(x - centreX) < 90 && Math.abs(y - centreY) < 50) {
    x = x > centreX ? Math.min(x + 110, maxX) : Math.max(x - 110, 0);
  }

  noBtn.style.left = x + "px";
  noBtn.style.top  = y + "px";
  noBtn.classList.add("is-running");

  noEscapes++;
  // Show a rotating hint
  noHint.textContent = HINTS[hintIndex % HINTS.length];
  hintIndex++;
}

// Move on hover / mouse-proximity
noBtn.addEventListener("mouseenter", moveNoBtn);
noBtn.addEventListener("touchstart", (e) => { e.preventDefault(); moveNoBtn(); }, { passive: false });

// Proximity detection: move before cursor reaches button
document.addEventListener("mousemove", (e) => {
  const rect = noBtn.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top  + rect.height / 2;
  const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
  if (dist < 70) moveNoBtn();
});

// ── CONFETTI / CELEBRATION PARTICLES ─────────────────────────
const CONFETTI_ICONS = ["💖","💗","💕","🌸","✨","🎉","💫","❤️","🌹","💝","🥰"];

function launchConfetti(count = 55) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const el = document.createElement("span");
      el.className = "confetti";
      el.textContent = CONFETTI_ICONS[Math.floor(Math.random() * CONFETTI_ICONS.length)];
      el.style.left = Math.random() * 100 + "vw";
      el.style.fontSize = (0.9 + Math.random() * 1.2) + "rem";
      const dur = 2.5 + Math.random() * 2.5;
      el.style.animationDuration = dur + "s";
      document.body.appendChild(el);
      setTimeout(() => el.remove(), dur * 1000 + 200);
    }, i * 55);
  }
}

// ── BURST PARTICLES (in modal) ────────────────────────────────
function triggerBurst() {
  const icons = ["💖","💗","✨","🌸","💫"];
  for (let i = 0; i < 20; i++) {
    const el = document.createElement("span");
    el.className = "burst-particle";
    el.textContent = icons[Math.floor(Math.random() * icons.length)];
    const angle = Math.random() * 360;
    const radius = 80 + Math.random() * 130;
    el.style.setProperty("--dx", `${Math.cos(angle) * radius}px`);
    el.style.setProperty("--dy", `${Math.sin(angle) * radius}px`);
    el.style.setProperty("--dr", `${(Math.random() - 0.5) * 360}deg`);
    el.style.left = "50%";
    el.style.top  = "30%";
    el.style.animationDelay = (Math.random() * 0.3) + "s";
    burst.appendChild(el);
    setTimeout(() => el.remove(), 1600);
  }
}

// ── GALLERY BUILDER ───────────────────────────────────────────
function buildGallery() {
  gallery.innerHTML = "";

  if (IMAGES.length === 0) {
    // Show friendly placeholder tiles
    const placeholders = [
      { icon: "📸", label: "Add your photos" },
      { icon: "🌹", label: "Your memories here" },
      { icon: "💑", label: "Your love story" },
      { icon: "✈️", label: "Adventures together" },
    ];
    placeholders.forEach(({ icon, label }) => {
      const item = document.createElement("div");
      item.className = "gallery__item";
      item.innerHTML = `<div class="gallery__placeholder">${icon}<span>${label}</span></div>`;
      gallery.appendChild(item);
    });
    return;
  }

  IMAGES.forEach(src => {
    const item = document.createElement("div");
    item.className = "gallery__item";
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Our memory";
    img.loading = "lazy";
    item.appendChild(img);
    gallery.appendChild(item);
  });
}

// ── YES BUTTON ────────────────────────────────────────────────
yesBtn.addEventListener("click", () => {
  launchConfetti(60);
  buildGallery();
  triggerBurst();

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");

  // Keep sending more confetti for extra joy
  setTimeout(() => launchConfetti(30), 1000);
  setTimeout(() => launchConfetti(25), 2200);
});

// ── CLOSE BUTTON ──────────────────────────────────────────────
closeBtn.addEventListener("click", () => {
  launchConfetti(20);
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
});

// Click overlay to close
modal.querySelector(".modal__overlay").addEventListener("click", () => {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
});

// ── INIT ──────────────────────────────────────────────────────
window.addEventListener("load", () => {
  // Slight delay so layout is stable before we measure
  setTimeout(initNoBtn, 250);
});

window.addEventListener("resize", () => {
  // Re-init on resize so NO button stays within bounds
  noBtn.style.left = "";
  noBtn.style.top = "";
  setTimeout(initNoBtn, 100);
});