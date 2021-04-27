// your birthday
// {{ month / day / year }}
const birthday = "3/25/1995";

// console.log(birthday.split(/[-|/]/))

setCountDown(birthday);

// extract date for birth day
function getDate(birthday) {
  return birthday.split(/[-|/]/);
}

function setCountDown(birthday) {
  const monthElement = document.getElementById("month");
  const dayElement = document.getElementById("day");
  const hourElement = document.getElementById("hour");
  const minElement = document.getElementById("min");
  const secElement = document.getElementById("sec");

  let counter = setInterval(() => {
    const birth = new Date(birthday);
    const date = new Date();

    const extractData = get_Date_AND_Timer(date, birth);

    monthElement.innerHTML = extractData.month;
    dayElement.innerHTML = extractData.day;
    hourElement.innerHTML = extractData.hour;
    minElement.innerHTML = extractData.min;
    secElement.innerHTML = extractData.second;

    // sum for all number extracted
    const numbersOfExtract = Object.values(extractData).reduce((a, b) => a + b);

    console.log(extractData)
    console.log(numbersOfExtract) ; 

    if( numbersOfExtract <= 0 ) {
        Draw() ;
        clearInterval(counter) ; 
    }

  }, 1000);
}

function get_Date_AND_Timer(date, birth) {
  let month;
  let day = birth.getDate();
  let min = date.getMinutes();
  let hour;
  let second = date.getSeconds();

  // get month remainder for real date and birth
  let monthReal = date.getMonth() + 1;
  let monthBirth = birth.getMonth() + 1;

  if (monthReal > monthBirth) {
    month = 12 - monthReal + monthBirth;
  } else {
    month = Math.abs( 12 - monthReal + monthBirth );
  }

  // get day
  if (date.getDate() > birth.getDate()) {
    if ( month - 1 === 0 || month === -1 ){
        month = 12 ; 
    }else{
        month -= 1 ; 
    }

    day = 30 - date.getDate() + birth.getDate();
  } else {
    day = birth.getDate() - date.getDate();
  }

  // get hour
  hour = 23 - date.getHours();
  // min
  min = 60 - date.getMinutes();
  // second
  second = 60 - date.getSeconds();

  return {
    month,
    day,
    min,
    hour,
    second,
  };
}



/* ---------------------------------- animtion birth take it in codepen -------------- */ 
let W = window.innerWidth;
let H = window.innerHeight;
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const maxConfettis = 150;
const particles = [];

const possibleColors = [
  "DodgerBlue",
  "OliveDrab",
  "Gold",
  "Pink",
  "SlateBlue",
  "LightBlue",
  "Gold",
  "Violet",
  "PaleGreen",
  "SteelBlue",
  "SandyBrown",
  "Chocolate",
  "Crimson"
];

function randomFromTo(from, to) {
  return Math.floor(Math.random() * (to - from + 1) + from);
}

function confettiParticle() {
  this.x = Math.random() * W; // x
  this.y = Math.random() * H - H; // y
  this.r = randomFromTo(11, 33); // radius
  this.d = Math.random() * maxConfettis + 11;
  this.color =
    possibleColors[Math.floor(Math.random() * possibleColors.length)];
  this.tilt = Math.floor(Math.random() * 33) - 11;
  this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
  this.tiltAngle = 0;

  this.draw = function() {
    context.beginPath();
    context.lineWidth = this.r / 2;
    context.strokeStyle = this.color;
    context.moveTo(this.x + this.tilt + this.r / 3, this.y);
    context.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);
    return context.stroke();
  };
}

function Draw() {
  const results = [];

  // Magical recursive functional love
  requestAnimationFrame(Draw);

  context.clearRect(0, 0, W, window.innerHeight);

  for (var i = 0; i < maxConfettis; i++) {
    results.push(particles[i].draw());
  }

  let particle = {};
  let remainingFlakes = 0;
  for (var i = 0; i < maxConfettis; i++) {
    particle = particles[i];

    particle.tiltAngle += particle.tiltAngleIncremental;
    particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
    particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;

    if (particle.y <= H) remainingFlakes++;

    // If a confetti has fluttered out of view,
    // bring it back to above the viewport and let if re-fall.
    if (particle.x > W + 30 || particle.x < -30 || particle.y > H) {
      particle.x = Math.random() * W;
      particle.y = -30;
      particle.tilt = Math.floor(Math.random() * 10) - 20;
    }
  }

  return results;
}

window.addEventListener(
  "resize",
  function() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  },
  false
);

// Push new confetti objects to `particles[]`
for (var i = 0; i < maxConfettis; i++) {
  particles.push(new confettiParticle());
}

// Initialize
canvas.width = W;
canvas.height = H;
