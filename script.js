document.addEventListener('DOMContentLoaded', () => {
  // Floating orbs
  const orbsContainer = document.getElementById('orbsContainer');
  const orbColors = ['#00f0ff','#bf00ff','#ff00ea'];
  for (let i=0;i<16;i++){
    const o = document.createElement('div');
    o.className = 'orb';
    const size = Math.floor(Math.random()*120)+60;
    o.style.width = o.style.height = size + 'px';
    o.style.left = Math.random()*100 + '%';
    o.style.top = Math.random()*100 + '%';
    o.style.background = orbColors[Math.floor(Math.random()*orbColors.length)];
    o.style.animationDuration = (12 + Math.random()*10) + 's';
    orbsContainer.appendChild(o);
  }

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
  const FACTS_TEXT = [
    "Water can boil and freeze at the same time under certain pressures.",
    "Bananas are berries, but strawberries aren't.",
    "Octopuses have three hearts and blue blood.",
    "A day on Venus is longer than a year on Venus.",
    "Honey never spoils.",
    "Sharks existed before trees.",
    "Some turtles can breathe through their butts.",
    "There are more stars in the universe than grains of sand on Earth.",
    "Sloths can hold their breath longer than dolphins.",
    "Science meme placeholder (meme at 10).",
    "Your stomach lining regenerates every few days.",
    "The Eiffel Tower can grow in summer heat.",
    "There are more trees on Earth than stars in the Milky Way.",
    "Your body has enough iron to form a small nail.",
    "Water can exist simultaneously in three phases at the triple point.",
    "There are more possible chess games than atoms in the universe.",
    "You produce about 1–1.5 liters of saliva per day.",
    "Hot water can sometimes freeze faster than cold (Mpemba effect).",
    "Gallium is a metal that melts in your hand.",
    "Science meme placeholder (meme at 20).",
    "Butterflies taste with their feet.",
    "A teaspoon of neutron star weighs billions of tons.",
    "Wombat poop is cube-shaped.",
    "Microbes exist inside you right now.",
    "The Moon has moonquakes.",
    "Tardigrades can survive in space.",
    "Greenland sharks can live centuries.",
    "Water moves up tubes via capillary action.",
    "Science meme placeholder (meme at 30).",
    "Some cats are allergic to humans.",
    "Koala fingerprints mimic humans.",
    "You can make fire using clear ice as lens.",
    "Your brain generates electricity.",
    "The Great Barrier Reef is the largest structure.",
    "Otters hold hands while sleeping.",
    "Some fungi are bioluminescent.",
    "Highest wind gust recorded: 253 mph.",
    "Science meme placeholder (meme at 40).",
    "Water is a universal solvent.",
    "Blue whale's heart is car-sized.",
    "Sloths can rotate heads nearly 360°.",
    "Venus spins backwards vs most planets.",
    "Some bacteria survive radiation.",
    "DNA length could reach the Sun repeatedly.",
    "Butterflies see ultraviolet light.",
    "Sharks predate trees.",
    "Some jellyfish are immortal.",
    "Science meme placeholder (meme at 50)."
  ];

  const facts = [];
  for(let i=0; i<TOTAL; i++){
    const num = i+1;
    if (MEMES[num]){
      facts.push({ type:'meme', content: MEMES[num] });
    } else {
      facts.push({ type:'text', content: FACTS_TEXT[i % FACTS_TEXT.length] });
    }
  }

  let pos = 0;
  let timer = null;

  function displayFact(obj){
    memeWrap.innerHTML = '';
    factText.innerHTML = '';
    progressCounter.textContent = `Fact ${pos+1} / ${TOTAL}`;
    bar.style.width = `${Math.round(((pos+1)/TOTAL)*100)}%`;

    if (obj.type === 'text'){
      factText.style.display = 'block';
      const div = document.createElement('div');
      div.className = 'text';
      div.textContent = obj.content;
      factText.appendChild(div);
      setTimeout(()=> div.classList.add('show'), 50);
    } else {
      factText.style.display = 'none';
      const img = document.createElement('img');
      img.src = obj.content;
      img.alt = 'Science Meme';
      img.style.maxWidth = '100%';
      memeWrap.appendChild(img);
    }
  }

  function startSequence(){
    pos = 0;
    modal.setAttribute('aria-hidden', 'false');
    displayFact(facts[pos]);
    pos++;
    timer = setInterval(()=>{
      if(pos < facts.length){
        displayFact(facts[pos]);
        pos++;
      } else {
        clearInterval(timer);
        timer = null;
        setTimeout(showCaptcha, 800);
      }
    }, DURATION);
  }

  function showCaptcha(){
    modal.setAttribute('aria-hidden', 'true');
    captchaOverlay.classList.remove('hidden');
    captchaGrid.innerHTML = '';
    for(let i=0;i<9;i++){
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.addEventListener('click', ()=>{
        alert('Verification failed! Retrying...');
        window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
        showResultEmbed();
        captchaOverlay.classList.add('hidden');
      });
      captchaGrid.appendChild(cell);
    }
  }

  function showResultEmbed(){
    resultArea.classList.remove('hidden');
    embedWrap.innerHTML = '';
    const iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&controls=0&rel=0&mute=1';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; autoplay';
    iframe.title = 'Rickroll';
    embedWrap.appendChild(iframe);
    setTimeout(()=>{
      const r = iframe.getBoundingClientRect();
      if(r.width === 0 || r.height === 0){
        fallback.classList.remove('hidden');
      }
    }, 1200);
  }

  startBtn.addEventListener('click', ()=>{
    startBtn.disabled = true;
    startSequence();
  });
});
