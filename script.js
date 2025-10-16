/* ========== CONFIG ========== */
const TOTAL = 50;
const DURATION = 3000; // ms per fact
// memes filenames (in repo root)
const MEMES = {
  10: 'meme1.png',
  20: 'meme2.png',
  30: 'meme3.png',
  40: 'meme4.png',
  50: 'meme5.png'
};
/* ============================ */

/* --- create floating orbs --- */
const orbsContainer = document.getElementById('orbsContainer');
const orbColors = ['#00f0ff','#bf00ff','#ff00ea'];
for(let i=0;i<16;i++){
  const o = document.createElement('div');
  o.className = 'orb';
  const size = Math.floor(Math.random()*120)+60;
  o.style.width = o.style.height = size+'px';
  o.style.left = Math.random()*100 + '%';
  o.style.top = Math.random()*100 + '%';
  o.style.background = orbColors[Math.floor(Math.random()*orbColors.length)];
  o.style.animationDuration = (12 + Math.random()*10) + 's';
  orbsContainer.appendChild(o);
}

/* --- DOM refs --- */
const startBtn = document.getElementById('startBtn');
const modal = document.getElementById('modal');
const factText = document.getElementById('factText');
const memeWrap = document.getElementById('memeWrap');
const progressCounter = document.getElementById('progressCounter');
const bar = document.getElementById('bar');
const captchaOverlay = document.getElementById('captchaOverlay');
const captchaGrid = document.getElementById('captchaGrid');
const resultArea = document.getElementById('resultArea');
const embedWrap = document.getElementById('embedWrap');
const fallback = document.getElementById('fallback');

/* --- prepare 50 facts (you can edit texts) --- */
const FACTS_TEXT = [
"Water can boil and freeze at the same time under certain pressures.",
"Bananas are berries, but strawberries aren't.",
"Octopuses have three hearts and blue blood.",
"A day on Venus is longer than a year on Venus.",
"Honey never spoils; archaeologists found edible honey in Egyptian tombs.",
"Sharks existed before trees.",
"Some turtles can breathe through their butts.",
"There are more stars in the universe than grains of sand on Earth.",
"Sloths can hold their breath longer than dolphins.",
"Science meme placeholder (meme10).",
"Your stomach gets a new lining every 3–4 days.",
"The Eiffel Tower can be 15 cm taller during summer.",
"There are more trees on Earth than stars in the Milky Way.",
"Your body has enough iron to make a small nail.",
"Water can exist in three states at once in the triple point.",
"There are more possible chess games than atoms in the universe.",
"You produce about 1–1.5 liters of saliva per day.",
"Hot water can freeze faster than cold water in some cases (Mpemba effect).",
"Some metals melt near body temperature (e.g. gallium).",
"Science meme placeholder (meme20).",
"Butterflies can taste with their feet.",
"A teaspoon of neutron star would weigh about 6 billion tons.",
"Wombat poop is cube-shaped.",
"There are microbes living on and inside you right now.",
"The Moon experiences moonquakes.",
"Tardigrades can survive in outer space.",
"Greenland sharks can live for centuries.",
"Water moves up thin tubes via capillary action.",
"Science meme placeholder (meme30).",
"Some cats are allergic to humans.",
"Koala fingerprints are very similar to humans'.",
"You can start a fire with clear ice shaped like a lens.",
"Your brain produces enough electricity to power a small light.",
"The Great Barrier Reef is the world's largest living structure.",
"Sea otters hold hands while sleeping to avoid drifting apart.",
"Certain fungi can glow in the dark (bioluminescence).",
"The fastest wind gust recorded was 253 mph.",
"Science meme placeholder (meme40).",
"Water dissolves many substances — it's a universal solvent.",
"A blue whale's heart is roughly the size of a small car.",
"Sloths can rotate their heads almost 360 degrees.",
"Venus spins in the opposite direction to most planets.",
"Some bacteria can survive in extreme radiation.",
"The total length of human DNA could reach the Sun and back many times.",
"Butterflies can see ultraviolet light.",
"Sharks are older than trees.",
"Some jellyfish species are biologically immortal.",
"Science meme placeholder (meme50)."
];

// Build facts list as objects (text or meme)
const facts = [];
for(let i=0;i<TOTAL;i++){
  const idx = i+1;
  if(MEMES[idx]){
    facts.push({type:'meme', content: MEMES[idx]});
  } else {
    // cycle FACTS_TEXT if less than TOTAL; ensure text exists
    const txt = FACTS_TEXT[i % FACTS_TEXT.length] || `Fun science fact #${idx}`;
    facts.push({type:'text', content: txt});
  }
}

/* --- sequence control --- */
let pos = 0;
let timer = null;

function openModal(){
  modal.setAttribute('aria-hidden','false');
  modal.querySelector('.modal-card')?.focus?.();
  progressCounter.textContent = `Fact 0 / ${TOTAL}`;
  bar.style.width = `0%`;
}

function closeModal(){
  modal.setAttribute('aria-hidden','true');
}

/* show one fact (with fade) */
function displayFact(obj){
  // clear meme area
  memeWrap.innerHTML = '';
  factText.innerHTML = '';
  // update counter & progress
  progressCounter.textContent = `Fact ${pos+1} / ${TOTAL}`;
  const pct = Math.round(((pos+1)/TOTAL)*100);
  bar.style.width = pct + '%';

  if(obj.type === 'text'){
    // show text
    const t = document.createElement('div');
    t.className = 'text';
    t.textContent = obj.content;
    factText.appendChild(t);
    // fade in
    setTimeout(()=> t.classList.add('show'), 40);
  } else if(obj.type === 'meme'){
    // show meme image in memeWrap
    const img = document.createElement('img');
    img.src = obj.content; // relative filename like 'meme1.png'
    img.alt = 'Science meme';
    img.loading = 'lazy';
    img.style.maxWidth = '100%';
    memeWrap.appendChild(img);
    // also show a brief caption in the text area
    const cap = document.createElement('div');
    cap.className = 'text';
    cap.textContent = `— Science Meme (${pos+1}) —`;
    factText.appendChild(cap);
    setTimeout(()=> cap.classList.add('show'), 40);
  }
}

/* start auto sequence */
function startSequence(){
  pos = 0;
  openModal();
  // show first immediately
  displayFact(facts[pos]);
  pos++;
  timer = setInterval(()=>{
    if(pos < facts.length){
      displayFact(facts[pos]);
      pos++;
    } else {
      clearInterval(timer);
      tim
