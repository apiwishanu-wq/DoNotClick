// Canvas for mouse trails
const canvas = document.createElement('canvas');
canvas.id='trailCanvas';
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', ()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Mouse tracking
let mouse = {x:canvas.width/2, y:canvas.height/2};
window.addEventListener('mousemove', (e)=>{
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Particle class
let particles=[];
class Particle {
  constructor(x,y,color){
    this.x=x; this.y=y;
    this.color=color;
    this.size=Math.random()*4+2;
    this.alpha=1;
    this.vx=(Math.random()-0.5)*1;
    this.vy=(Math.random()-0.5)*1;
  }
  update(){
    this.x += this.vx + (mouse.x-this.x)*0.02;
    this.y += this.vy + (mouse.y-this.y)*0.02;
    this.alpha-=0.02;
  }
  draw(){
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
    ctx.fillStyle=`rgba(${this.color.r},${this.color.g},${this.color.b},${this.alpha})`;
    ctx.fill();
  }
}

// Neon color helper
function neonColor(){
  const colors = [{r:0,g:240,b:255},{r:191,g:0,b:255},{r:255,g:0,b:234}];
  return colors[Math.floor(Math.random()*colors.length)];
}

// Animate trails
function animateTrails(){
  ctx.fillStyle='rgba(0,0,0,0.1)';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  for(let i=0;i<2;i++) particles.push(new Particle(mouse.x,mouse.y, neonColor()));
  for(let i=particles.length-1;i>=0;i--){
    particles[i].update();
    particles[i].draw();
    if(particles[i].alpha<=0) particles.splice(i,1);
  }
  requestAnimationFrame(animateTrails);
}
animateTrails();

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

const facts = [
  {type:"text", content:"Water can boil and freeze at the same time."},
  {type:"text", content:"Bananas are berries, but strawberries aren't."},
  // ... other text facts ...
  {type:"meme", content:"meme1.png"}, // fact 10
  // ... more text ...
  {type:"meme", content:"meme2.png"}, // fact 20
  {type:"meme", content:"meme3.png"}, // fact 30
  {type:"meme", content:"meme4.png"}, // fact 40
  {type:"meme", content:"meme5.png"}  // fact 50
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
