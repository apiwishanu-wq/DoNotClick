const facts = [
  "Water can boil and freeze at the same time!",
  "Bananas are slightly radioactive 🍌",
  "There’s enough DNA in your body to stretch to the sun and back 17 times!",
  "Octopuses have three hearts 🐙",
  "Honey never spoils — 3,000-year-old honey is still edible!",
  "Some metals explode on contact with water 💥",
  "Neutron stars are so dense, a teaspoon would weigh 6 billion tons!",
  "Sharks existed before trees 🌳",
  "A day on Venus is longer than a year on Venus.",
  "The human brain uses about 20 watts of power – enough to light a dim bulb!",
  // memes
  "Science meme checkpoint 1 🔬",
  "Science meme checkpoint 2 🧪",
  "Science meme checkpoint 3 ⚛️",
  "Science meme checkpoint 4 🧫",
  "Science meme checkpoint 5 🧠"
];

const memes = {
  10: "memes/meme1.png",
  20: "memes/meme2.png",
  30: "memes/meme3.png",
  40: "memes/meme4.png",
  50: "memes/meme5.png",
};

let factIndex = 0;
const factBox = document.getElementById("scienceFact");
const memeImg = document.getElementById("sciMeme");

function updateFact() {
  factIndex++;
  if (factIndex >= facts.length) {
    // Rickroll time!
    document.body.innerHTML = `
      <div style="text-align:center;padding:30px;color:white;">
        <h1>🎵 Never gonna give you up... 🎶</h1>
        <iframe width="560" height="315"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&controls=0"
          frameborder="0" allow="autoplay; encrypted-media"
          allowfullscreen></iframe>
      </div>`;
    return;
  }

  factBox.textContent = facts[factIndex];

  if (memes[factIndex * 10]) {
    memeImg.src = memes[factIndex * 10];
    memeImg.style.display = "block";
  } else {
    memeImg.style.display = "none";
  }
}

document.getElementById("doNotClick").addEventListener("click", () => {
  updateFact();
  setInterval(updateFact, 3000);
});
