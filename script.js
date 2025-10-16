const facts = [
  "Light from the Sun takes 8 minutes to reach Earth.",
  "Bananas are slightly radioactive — blame potassium-40.",
  "A teaspoon of neutron star weighs about 6 billion tons.",
  "Octopuses have three hearts and blue blood.",
  "Space smells like burnt steak.",
  "Water can boil and freeze at the same time in space.",
  "The Eiffel Tower grows taller in summer due to heat expansion.",
  "Venus spins backward compared to most planets.",
  "Sharks existed before trees.",
  "🧪 Science Meme #1: 'Trust me bro, it's peer reviewed.'",
  "A day on Venus is longer than its year.",
  "Hot water freezes faster than cold water (Mpemba effect).",
  "Diamonds can rain on Jupiter and Saturn.",
  "A cloud can weigh over a million pounds.",
  "Saturn could float on water if you had a big enough tub.",
  "Your stomach gets a new lining every 3-4 days.",
  "Sound travels faster in water than in air.",
  "There are more trees on Earth than stars in the Milky Way.",
  "The tongue is the strongest muscle by size.",
  "🧠 Science Meme #2: 'Chemistry is just cooking but the dinner might explode.'",
  "Some metals explode when they touch water (hello, sodium!).",
  "There’s enough DNA in your body to stretch from the Sun to Pluto and back.",
  "Black holes don’t suck — they warp spacetime.",
  "Water can be older than the Sun.",
  "An adult human is 60% water and 100% curious.",
  "Honey never spoils — archaeologists found 3,000-year-old edible honey.",
  "You can’t burp in space (no gravity, no separation).",
  "Jellyfish are biologically immortal… kind of.",
  "Your brain has more connections than there are stars.",
  "🚀 Science Meme #3: 'Astronomy — where space is literally our field.'",
  "Butterflies taste with their feet.",
  "The smallest bone is in your ear.",
  "Your bones are 5 times stronger than steel (per weight).",
  "The average cloud droplet falls at 2 cm/sec.",
  "Humans share 60% of DNA with bananas.",
  "Rainbows can appear as full circles from planes.",
  "Some turtles can breathe through their butts. Yup.",
  "Pluto has five moons and major identity issues.",
  "The universe is expanding faster than the speed of light (kinda).",
  "☄️ Science Meme #4: 'Big Bang Theory: basically one loud science experiment.'",
  "The longest hiccup lasted 68 years.",
  "Cows have best friends.",
  "Your heart can synchronize to music.",
  "Koalas have fingerprints like humans.",
  "The smell of rain is called petrichor.",
  "A bolt of lightning is 5x hotter than the Sun.",
  "Humans glow in the dark, just too faint to see.",
  "Time passes faster at your head than at your feet.",
  "🧬 Science Meme #5: 'Genetics: copy-paste, but sometimes with typos.'"
];

let factIndex = 0;
const btn = document.getElementById('clickBtn');
const factBox = document.getElementById('factBox');

btn.addEventListener('click', showNextFact);

function showNextFact() {
  if (factIndex < facts.length) {
    factBox.innerHTML = facts[factIndex];
    factIndex++;

    // Scroll memes with a bit of glow fun
    factBox.style.textShadow = "0 0 15px #00f0ff";
  } else {
    startCaptchaPrank();
  }
}

function startCaptchaPrank() {
  document.body.innerHTML = `
  <div class="center glass">
    <h1>🤖 Verify you're not a bot!</h1>
    <p>Click all squares with Rick Astley</p>
    <button class="neon-btn" id="verifyBtn">Verify</button>
  </div>
  `;
  const verify = document.getElementById("verifyBtn");
  verify.addEventListener("click", () => {
    // Final Rickroll page
    document.body.innerHTML = `
      <div class="center glass">
        <h1>🎉 Surprise!</h1>
        <iframe width="560" height="315" 
          src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&controls=0"
          frameborder="0" allow="autoplay; encrypted-media"></iframe>
      </div>
    `;
  });
}
