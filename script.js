const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const popup = document.getElementById("popup");
const closeBtn = document.getElementById("closeBtn");

// runaway NO button 😭
noBtn.addEventListener("mouseover", () => {
  const x = Math.random() * (window.innerWidth - 100);
  const y = Math.random() * (window.innerHeight - 100);

  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";
});

// YES triggers romantic popup
yesBtn.addEventListener("click", () => {
  popup.classList.remove("hidden");
  createHearts();
});

// close popup
closeBtn.addEventListener("click", () => {
  popup.classList.add("hidden");
});

// floating hearts burst
function createHearts() {
  for (let i = 0; i < 40; i++) {
    const heart = document.createElement("div");
    heart.innerHTML = "💖";
    heart.style.position = "absolute";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = "-20px";
    heart.style.fontSize = Math.random() * 30 + 20 + "px";
    document.body.appendChild(heart);

    let pos = -20;

    const fall = setInterval(() => {
      pos += 4;
      heart.style.top = pos + "px";

      if (pos > window.innerHeight) {
        clearInterval(fall);
        heart.remove();
      }
    }, 20);
  }
}