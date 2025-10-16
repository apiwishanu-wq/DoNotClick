document.addEventListener('DOMContentLoaded', () => {
  // 🟣 Floating orbs
  const orbsContainer = document.getElementById('orbsContainer');
  const orbColors = ['#00f0ff', '#bf00ff', '#ff00ea'];
  for (let i = 0; i < 16; i++) {
    const orb = document.createElement('div');
    orb.className = 'orb';
    const size = Math.floor(Math.random() * 120) + 60;
    orb.style.width = orb.style.height = `${size}px`;
    orb.style.left = Math.random() * 100 + '%';
    orb.style.top = Math.random() * 100 + '%';
    orb.style.background = orbColors[Math.floor(Math.random() * orbColors.length)];
    orb.style.animationDuration = `${10 + Math.random() * 10}s`;
    orbsContainer.appendChild(orb);
  }

  // 🌐 DOM elements
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

  const TOTAL = 50;
  const DURATION = 3000;
  const MEMES = {
    10: 'meme1.png',
    20: 'meme2.png',
    30: 'meme3.png',
    40: 'meme4.png',
    50: 'meme5.png'
  };

  // 🧪 Science facts
  const FACTS = [
    "Water can boil and freeze at the same time.",
    "Bananas are berries, but strawberries aren’t.",
    "Octopuses have three hearts and blue blood.",
    "A day on Venus is longer than a year there.",
    "Honey never spoils.",
    "Sharks existed before trees.",
    "Some turtles breathe through their butts.",
    "Sloths can hold their breath longer than dolphins.",
    "There are more stars in space than grains of sand on Earth.",
    "Meme #10 incoming...",
    "Your stomach lining regenerates every few days.",
    "The Eiffel Tower grows taller in summer.",
    "There are more trees on Earth than stars in the Milky Way.",
    "Your body has enough iron to make a small nail.",
    "Hot water can freeze faster than cold.",
    "Gallium melts in your hand.",
    "Some cats are allergic to humans.",
    "Koalas have fingerprints like humans.",
    "Science is 1% inspiration, 99% caffeine.",
    "Meme #20 incoming...",
    "Wombats poop cubes.",
    "Butterflies taste with their feet.",
    "Water expands when it freezes.",
    "Your brain generates 20 watts of power.",
    "Tardigrades can survive in space.",
    "Otters hold hands while sleeping.",
    "DNA in your body can reach the sun and back many times.",
    "Greenland sharks can live over 400 years.",
    "Science is like magic but real.",
    "Meme #30 incoming...",
    "Your bones are stronger than steel.",
    "A teaspoon of neutron star weighs a billion tons.",
    "Some fungi glow in the dark.",
    "The moon has moonquakes.",
    "The Great Barrier Reef is the largest living structure.",
    "Water is the only substance on Earth found naturally in all 3 states.",
    "Lightning strikes the Earth 100 times per second.",
    "There are more microbes in your body than human cells.",
    "Meme #40 incoming...",
    "Sloths move so slowly that algae grows on them.",
    "Octopuses can taste with their arms.",
    "Space smells like seared steak.",
    "Koalas sleep 22 hours per day.",
    "Butterflies see ultraviolet light.",
    "Some jellyfish are immortal.",
    "Venus spins backwards.",
    "You can make fire with ice.",
    "Science meme time!",
    "Meme #50 incoming."
  ];

  // 🧠 Build fact list
  const facts = [];
  for (let i = 1; i <= TOTAL; i++) {
    if (MEMES[i]) facts.push({ type: 'meme', content: MEMES[i] });
    else facts.push({ type: 'text', content: FACTS[i - 1] });
  }

  let pos = 0, timer = null;

  function displayFact(obj) {
    memeWrap.innerHTML = '';
    factText.innerHTML = '';
    progressCounter.textContent = `Fact ${pos + 1} / ${TOTAL}`;
    bar.style.width = `${((pos + 1) / TOTAL) * 100}%`;

    if (obj.type === 'text') {
      factText.textContent = obj.content;
    } else {
      const img = document.createElement('img');
      img.src = obj.content;
      img.alt = 'Science Meme';
      memeWrap.appendChild(img);
    }
  }

  function startSequence() {
    modal.setAttribute('aria-hidden', 'false');
    displayFact(facts[pos]);
    pos++;
    timer = setInterval(() => {
      if (pos < facts.length) {
        displayFact(facts[pos]);
        pos++;
      } else {
        clearInterval(timer);
        showCaptcha();
      }
    }, DURATION);
  }

  function showCaptcha() {
    modal.setAttribute('aria-hidden', 'true');
    captchaOverlay.classList.remove('hidden');
    captchaGrid.innerHTML = '';
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.addEventListener('click', () => {
        alert('Verification failed! Retrying...');
        showResultEmbed();
        captchaOverlay.classList.add('hidden');
      });
      captchaGrid.appendChild(cell);
    }
  }

  function showResultEmbed() {
    resultArea.classList.remove('hidden');
    embedWrap.innerHTML = '';
    const iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&controls=0&mute=1&rel=0';
    iframe.allow = 'autoplay; encrypted-media';
    embedWrap.appendChild(iframe);
    setTimeout(() => {
      const rect = iframe.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) {
        fallback.classList.remove('hidden');
      }
    }, 1000);
  }

  startBtn.addEventListener('click', () => {
    startBtn.disabled = true;
    startSequence();
  });
});
