const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");

noBtn.addEventListener("mouseover", () => {
    const maxX = window.innerWidth - noBtn.offsetWidth;
    const maxY = window.innerHeight - noBtn.offsetHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";
});

yesBtn.addEventListener("click", () => {
    document.querySelector(".container").style.display = "none";

    const celebration = document.getElementById("celebration");
    celebration.classList.remove("hidden");

    createHearts();
});

function createHearts() {
    for(let i=0; i<50; i++) {
        const heart = document.createElement("div");

        heart.innerHTML = "💖";
        heart.style.position = "absolute";
        heart.style.left = Math.random()*100 + "vw";
        heart.style.top = "-20px";
        heart.style.fontSize = (Math.random()*30+20) + "px";

        document.body.appendChild(heart);

        let pos = -20;

        const fall = setInterval(() => {
            pos += 5;
            heart.style.top = pos + "px";

            if(pos > window.innerHeight){
                clearInterval(fall);
                heart.remove();
            }
        }, 20);
    }
}