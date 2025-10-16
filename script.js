// --- Floating orbs ---
const orbsContainer = document.getElementById('orbsContainer');
for(let i=0;i<20;i++){
  const orb = document.createElement('div');
  orb.className='orb';
  orb.style.width=orb.style.height=Math.random()*50+30+'px';
  orb.style.background=['#00f0ff','#bf00ff','#ff00ea'][Math.floor(Math.random()*3)];
  orb.style.top=Math.random()*100+'%';
  orb.style.left=Math.random()*100+'%';
  orb.style.animationDuration=10+Math.random()*10+'s';
  orbsContainer.appendChild(orb);
}

// --- Modal & facts ---
const startBtn = document.getElementById('startBtn');
const modal = document.getElementById('modal');
const factText = document.getElementById('factText');
const embedWrap = document.getElementById('embedWrap');
const fallback = document.getElementById('fallback');

// 50 facts, 5 memes at 10,20,30,40,50
const facts = [
  {type:"text", content:"Water can boil and freeze at the same time."},
  {type:"text", content:"Bananas are berries, but strawberries aren't."},
  {type:"text", content:"Octopuses have three hearts."},
  {type:"text", content:"Honey never spoils."},
  {type:"text", content:"Sharks existed before trees."},
  {type:"text", content:"Some turtles breathe through their butts."},
  {type:"text", content:"There are more stars in the universe than grains of sand on Earth."},
  {type:"text", content:"Sloths can hold their breath longer than dolphins."},
  {type:"text", content:"Your stomach gets a new lining every 3-4 days."},
  {type:"meme", content:"meme1.png"}, // 10
  {type:"text", content:"Wombat poop is cube-shaped."},
  {type:"text", content:"Butterflies can taste with their feet."},
  {type:"text", content:"Sea otters hold hands while sleeping."},
  {type:"text", content:"A day on Venus is longer than a year on Venus."},
  {type:"text", content:"The Eiffel Tower can be 15 cm taller during summer."},
  {type:"text", content:"Sloths can rotate their heads almost 360 degrees."},
  {type:"text", content:"Some mushrooms create zombies of ants."},
  {type:"text", content:"Water can exist in all three states at once in a Tristate Point."},
  {type:"text", content:"Your body has enough iron to make a nail."},
  {type:"meme", content:"meme2.png"}, // 20
  {type:"text", content:"Sharks can live up to 500 years."},
  {type:"text", content:"Venus spins backward compared to other planets."},
  {type:"text", content:"Sea cucumbers fight by shooting their guts out."},
  {type:"text", content:"Butterflies can see red, green, blue, and ultraviolet."},
  {type:"text", content:"The moon has moonquakes."},
  {type:"text", content:"There are more bacteria in your mouth than people on Earth."},
  {type:"text", content:"Sloths can hold their own body weight with their mouth."},
  {type:"text", content:"The fingerprints of a koala are almost identical to humans."},
  {type:"text", content:"Bananas glow blue under blacklight."},
  {type:"meme", content:"meme3.png"}, // 30
  {type:"text", content:"Sharks can detect one drop of blood in 25 gallons of water."},
  {type:"text", content:"Rats laugh when tickled."},
  {type:"text", content:"A jiffy is an actual unit of time: 1/100th of a second."},
  {type:"text", content:"Some turtles can breathe through their butts."},
  {type:"text", content:"Penguins propose with pebbles."},
  {type:"text", content:"Otters have favorite rocks."},
  {type:"text", content:"Your body has more bacterial cells than human cells."},
  {type:"text", content:"Sharks existed before trees."},
  {type:"text", content:"There’s a species of jellyfish that is immortal."},
  {type:"meme", content:"meme4.png"}, // 40
  {type:"text", content:"Lightning strikes Earth 8 million times per day."},
  {type:"text", content:"The heart of a shrimp is located in its head."},
  {type:"text", content:"Sloths can move faster in water than on land."},
  {type:"text", content:"Pineapples take about 2 years to grow."},
  {type:"text", content:"The oldest living tree is over 5,000 years old."},
  {type:"text", content:"Some frogs can freeze completely and come back to life."},
  {type:"text", content:"The human nose can remember 50,000 different scents."},
  {type:"text", content:"Sharks have been around for 400 million years."},
  {type:"meme", content:"meme5.png"}  // 50
];

let currentFact = 0;

function showNextFact(){
  if(currentFact < facts.length){
    factText.classList.remove('showFact');
    embedWrap.innerHTML = ''; // clear previous iframe or img
    setTimeout(()=>{
      const fact = facts[currentFact];
      if(fact.type === "text"){
        factText.style.display='block';
        factText.textContent = fact.content;
      } else if(fact.type === "meme"){
        factText.style.display='none';
        const img = document.createElement('img');
        img.src=fact.content;
        img.alt="Science Meme";
        img.style.maxWidth="100%";
        embedWrap.appendChild(img);
      }
      factText.classList.add('showFact');
      currentFact++;
      setTimeout(showNextFact,3000);
    },800);
  } else showRickroll();
}

function showRickroll(){
  const iframe=document.createElement('iframe');
  iframe.width='560';
  iframe.height='315';
  iframe.src='https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&controls=0';
  iframe.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; autoplay';
  iframe.title='Rickroll';
  embedWrap.appendChild(iframe);
  setTimeout(()=>{
    if(iframe.getBoundingClientRect().width===0) fallback.style.display='block';
  },1500);
}

startBtn.addEventListener('click',()=>{
  modal.classList.add('show');
  startBtn.style.display='none';
  showNextFact();
});
