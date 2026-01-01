// Enhanced Animations for DevBee Portfolio Website (repeatable + navigation-based)

// Define the animation classes
const animations = {
  fadeIn: {
    start: { opacity: 0 },
    end: { opacity: 1 },
    duration: '1s',
    timing: 'ease'
  },
  slideUp: {
    start: { opacity: 0, transform: 'translateY(50px)' },
    end: { opacity: 1, transform: 'translateY(0)' },
    duration: '1s',
    timing: 'ease-out'
  },
  slideRight: {
    start: { opacity: 0, transform: 'translateX(-50px)' },
    end: { opacity: 1, transform: 'translateX(0)' },
    duration: '1s',
    timing: 'ease-out'
  },
  slideLeft: {
    start: { opacity: 0, transform: 'translateX(50px)' },
    end: { opacity: 1, transform: 'translateX(0)' },
    duration: '1s',
    timing: 'ease-out'
  },
  zoomIn: {
    start: { opacity: 0, transform: 'scale(0.5)' },
    end: { opacity: 1, transform: 'scale(1)' },
    duration: '1s',
    timing: 'ease-out'
  }

 };

// Apply initial states to elements
function initializeAnimations() {
  const animatedElements = document.querySelectorAll('[data-animation]');
  animatedElements.forEach(element => {
    const animationType = element.getAttribute('data-animation');
    if (animations[animationType]) {
      Object.entries(animations[animationType].start).forEach(([prop, value]) => {
        element.style[prop] = value;
      });
      element.style.transition = `${Object.keys(animations[animationType].start).join(', ')} ${animations[animationType].duration} ${animations[animationType].timing}`;
    }
  });
}

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
    rect.bottom >= 0
  );
}

// Animate elements on scroll, with repeatable behavior
function animateOnScroll() {
  const animatedElements = document.querySelectorAll('[data-animation]');
  animatedElements.forEach(element => {
    const animationType = element.getAttribute('data-animation');
    if (!animations[animationType]) return;

    if (isInViewport(element)) {
      if (!element.classList.contains('animated')) {
        Object.entries(animations[animationType].end).forEach(([prop, value]) => {
          element.style[prop] = value;
        });
        element.classList.add('animated');
      }
    } else {
      // Reset to start state if out of view
      Object.entries(animations[animationType].start).forEach(([prop, value]) => {
        element.style[prop] = value;
      });
      element.classList.remove('animated');
    }
  });
}

// Handle navigation-triggered animation replay
function setupNavigationAnimations() {
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (!targetSection) return;

      const elements = targetSection.querySelectorAll('[data-animation]');
      elements.forEach(el => {
        const animationType = el.getAttribute('data-animation');
        if (animations[animationType]) {
          el.classList.remove('animated');
          void el.offsetWidth; // force reflow
          setTimeout(() => {
            Object.entries(animations[animationType].end).forEach(([prop, value]) => {
              el.style[prop] = value;
            });
            el.classList.add('animated');
          }, 50);
        }
      });

      // Optional: Dispatch a custom event if needed
      document.dispatchEvent(new CustomEvent('navigation', {
        detail: { section: targetId }
      }));
    });
  });
}

// Initialize everything on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initializeAnimations();
  animateOnScroll();
  setupNavigationAnimations();
  window.addEventListener('scroll', animateOnScroll);
});


//Debugging Function
function debugAnimations() {
  const elements = document.querySelectorAll('[data-animation]');
  console.log('Animatable elements:', elements);
  elements.forEach(el => {
    console.log(el, 
      'Type:', el.getAttribute('data-animation'),
      'In viewport:', isInViewport(el),
      'Animated:', el.classList.contains('animated')
    );
  });
}
// Call it after initialization
debugAnimations();