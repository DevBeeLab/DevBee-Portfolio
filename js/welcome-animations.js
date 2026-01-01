// Typing animation
const typedTextSpan = document.querySelector('.typed-text');
const cursorSpan = document.querySelector('.cursor');
const textArray = ["Ibrahim Olawale", "a Freelancer", " a Frontend Developer", "a UI Specialist", "a Problem Solver", "a Digital Craftsman"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 1500;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    textArrayIndex++;
    if(textArrayIndex>=textArray.length) textArrayIndex=0;
    setTimeout(type, typingDelay + 500);
  }
}

// Counter animation
function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  const speed = 200;
  
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const increment = target / speed;
    
    if(count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(animateCounters, 1);
    } else {
      counter.innerText = target + '+';
    }
  });
}

// Theme switcher
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  themeToggle.querySelector('i').classList.toggle('fa-moon');
  themeToggle.querySelector('i').classList.toggle('fa-sun');
});

// Initialize animations when DOM loads
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(type, 1000);
  setTimeout(animateCounters, 1500);
});