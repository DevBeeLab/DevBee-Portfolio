// Sidebar functionality
document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.querySelector('.sidebar');
  const openBtn = document.getElementById('menu-open-btn');
  const closeBtn = document.getElementById('menu-close-btn');

  if (openBtn && sidebar) {
    openBtn.addEventListener('click', () => {
      sidebar.style.display = 'flex';
    });
  }

  if (closeBtn && sidebar) {
    closeBtn.addEventListener('click', () => {
      sidebar.style.display = 'none';
    });
  }

  // Close sidebar when clicking outside (optional enhancement)
  document.addEventListener('click', (e) => {
    if (sidebar && sidebar.style.display === 'flex' && 
        !sidebar.contains(e.target) && 
        !openBtn.contains(e.target)) {
      sidebar.style.display = 'none';
    }
  });
});
  

// Theme switcher functionality
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('devbee-theme', isDark ? 'dark' : 'light');
        themeToggle.querySelector('i').classList.toggle('fa-moon');
        themeToggle.querySelector('i').classList.toggle('fa-sun');
    });

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
// Already handled above

// Initialize animations when DOM loads
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(type, 1000);
  setTimeout(animateCounters, 1500);
});

    // Simplified AOS (Animate On Scroll) functionality
    document.addEventListener('DOMContentLoaded', () => {
      const aosElements = document.querySelectorAll('[data-aos]');
      
      const checkIfInView = () => {
        aosElements.forEach(element => {
          const elementPosition = element.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          
          if (elementPosition.top < windowHeight * 0.75) {
            element.classList.add('aos-animate');
          }
        });
      };
      
      // Check on load
      checkIfInView();
      
      // Check on scroll
      window.addEventListener('scroll', checkIfInView);
    });

    // Custom carousel functionality
    document.addEventListener('DOMContentLoaded', () => {
      const carousel = document.querySelector('.testimonials-carousel');
      const wrapper = carousel.querySelector('.swiper-wrapper');
      const slides = Array.from(carousel.querySelectorAll('.swiper-slide'));
      const pagination = carousel.querySelector('.swiper-pagination');
      
      let currentIndex = 0;
      let slidesPerView = 1;
      let autoplayInterval;
      const autoplayDelay = 5000;
      const slideWidth = 100; // percentage
      
      // Set up the slides initially
      function setupSlides() {
        // Determine slides per view based on screen width
        if (window.innerWidth >= 1200) {
          slidesPerView = 3;
        } else if (window.innerWidth >= 768) {
          slidesPerView = 2;
        } else {
          slidesPerView = 1;
        }
        
        // Setup slide widths
        slides.forEach(slide => {
          slide.style.width = `${slideWidth / slidesPerView}%`;
        });
        
        // Create pagination bullets
        createPagination();
        
        // Position slides
        updateSlidePositions();
      }
      
      // Create pagination bullets
      function createPagination() {
        pagination.innerHTML = '';
        const totalBullets = Math.ceil(slides.length / slidesPerView);
        
        for (let i = 0; i < totalBullets; i++) {
          const bullet = document.createElement('span');
          bullet.className = 'swiper-pagination-bullet';
          if (i === 0) {
            bullet.classList.add('swiper-pagination-bullet-active');
          }
          
          bullet.addEventListener('click', () => {
            goToSlide(i * slidesPerView);
          });
          
          pagination.appendChild(bullet);
        }
      }
      
      // Update pagination active state
      function updatePagination() {
        const bullets = Array.from(pagination.querySelectorAll('.swiper-pagination-bullet'));
        const activeIndex = Math.floor(currentIndex / slidesPerView);
        
        bullets.forEach((bullet, index) => {
          if (index === activeIndex) {
            bullet.classList.add('swiper-pagination-bullet-active');
          } else {
            bullet.classList.remove('swiper-pagination-bullet-active');
          }
        });
      }
      
      // Move to specific slide
      function goToSlide(index) {
        // Handle looping
        if (index < 0) {
          index = slides.length - slidesPerView;
        } else if (index > slides.length - slidesPerView) {
          index = 0;
        }
        
        currentIndex = index;
        updateSlidePositions();
        updatePagination();
      }
      
      // Update slide positions based on current index
      function updateSlidePositions() {
        wrapper.style.transform = `translateX(-${currentIndex * (slideWidth / slidesPerView)}%)`;
        wrapper.style.transition = 'transform 0.6s ease';
      }
      
      // Next slide
      function nextSlide() {
        goToSlide(currentIndex + 1);
      }
      
      // Previous slide
      function prevSlide() {
        goToSlide(currentIndex - 1);
      }
      
      // Start autoplay
      function startAutoplay() {
        stopAutoplay(); // Clear any existing interval first
        autoplayInterval = setInterval(() => {
          nextSlide();
        }, autoplayDelay);
      }
      
      // Stop autoplay
      function stopAutoplay() {
        if (autoplayInterval) {
          clearInterval(autoplayInterval);
        }
      }
      
      // Pause on hover
      carousel.addEventListener('mouseenter', stopAutoplay);
      carousel.addEventListener('mouseleave', startAutoplay);
      
      // Handle window resize
      window.addEventListener('resize', () => {
        setupSlides();
      });
      
      // Initialize
      setupSlides();
      startAutoplay();
    });

  // Custom carousel functionality for portfolio
    document.addEventListener('DOMContentLoaded', () => {
      const carousel = document.querySelector('.portfolio-carousel');
      const wrapper = carousel.querySelector('.swiper-wrapper');
      const slides = Array.from(carousel.querySelectorAll('.swiper-slide'));
      const pagination = carousel.querySelector('.swiper-pagination');
      
      let currentIndex = 0;
      let slidesPerView = 1;
      let autoplayInterval;
      const autoplayDelay = 5000;
      const slideWidth = 100; // percentage
      
      // Store original slides for cloning reference
      const originalSlides = [...slides];
      
      // Initialize clones
      function initClones() {
        // Remove existing clones
        const existingClones = carousel.querySelectorAll('.swiper-slide-clone');
        existingClones.forEach(clone => clone.remove());
        
        // Clone slides for infinite loop
        // We need at least slidesPerView clones at end, and maybe at start for prev
        // For simple auto-play forward "first follows last", we generally just need end clones
        
        originalSlides.slice(0, slidesPerView).forEach(slide => {
          const clone = slide.cloneNode(true);
          clone.classList.add('swiper-slide-clone');
          wrapper.appendChild(clone);
        });
      }

      // Set up the slides initially
      function setupSlides() {
        // Determine slides per view based on screen width
        if (window.innerWidth >= 1200) {
          slidesPerView = 3;
        } else if (window.innerWidth >= 768) {
          slidesPerView = 2;
        } else {
          slidesPerView = 1;
        }
        
        // Re-initialize clones based on new slidesPerView
        initClones();
        
        // Refresh slides list to include clones
        const allSlides = carousel.querySelectorAll('.swiper-slide');
        
        // Setup slide widths
        allSlides.forEach(slide => {
          slide.style.width = `${slideWidth / slidesPerView}%`;
        });
        
        // Create pagination bullets based on ORIGINAL slides
        createPagination();
        
        // Position slides (ensure we are within bounds or reset)
        if (currentIndex >= originalSlides.length) {
          currentIndex = 0;
        }
        updateSlidePositions(false);
      }
      
      // Create pagination bullets
      function createPagination() {
        pagination.innerHTML = '';
        const totalBullets = originalSlides.length;
        
        for (let i = 0; i < totalBullets; i++) {
          const bullet = document.createElement('span');
          bullet.className = 'swiper-pagination-bullet';
          if (i === currentIndex) {
            bullet.classList.add('swiper-pagination-bullet-active');
          }
          
          bullet.addEventListener('click', () => {
            goToSlide(i);
          });
          
          pagination.appendChild(bullet);
        }
      }
      
      // Update pagination active state
      function updatePagination() {
        const bullets = Array.from(pagination.querySelectorAll('.swiper-pagination-bullet'));
        // Normalize index for pagination
        let activeIndex = currentIndex;
        if (activeIndex >= originalSlides.length) {
            activeIndex = activeIndex % originalSlides.length;
        }
        
        bullets.forEach((bullet, index) => {
          if (index === activeIndex) {
            bullet.classList.add('swiper-pagination-bullet-active');
          } else {
            bullet.classList.remove('swiper-pagination-bullet-active');
          }
        });
      }
      
      // Move to specific slide
      function goToSlide(index) {
        // Allow going up to originalSlides.length (which is the first clone)
        
        // Handle backward loop (simple version: jump to end)
        if (index < 0) {
          index = originalSlides.length - 1;
        } 
        
        currentIndex = index;
        const isLooping = currentIndex >= originalSlides.length;
        
        updateSlidePositions(true);
        updatePagination();
        
        if (isLooping) {
            // If we moved to a clone, wait for transition then reset
            setTimeout(() => {
                // Calculated target index when resetting from clone
                // e.g. if we are at index 5 (Clone 0), we want to be at index 0
                currentIndex = currentIndex % originalSlides.length;
                updateSlidePositions(false); // No transition for silent reset
            }, 600); // Match CSS transition duration
        }
      }
      
      // Update slide positions based on current index
      function updateSlidePositions(animate) {
        if (animate) {
            wrapper.style.transition = 'transform 0.6s ease';
        } else {
            wrapper.style.transition = 'none';
        }
        wrapper.style.transform = `translateX(-${currentIndex * (slideWidth / slidesPerView)}%)`;
      }
      
      // Next slide
      function nextSlide() {
        goToSlide(currentIndex + 1);
      }
      
      // Previous slide
      function prevSlide() {
        goToSlide(currentIndex - 1);
      }
      
      // Start autoplay
      function startAutoplay() {
        stopAutoplay(); // Clear any existing interval first
        autoplayInterval = setInterval(() => {
          nextSlide();
        }, autoplayDelay);
      }
      
      // Stop autoplay
      function stopAutoplay() {
        if (autoplayInterval) {
          clearInterval(autoplayInterval);
        }
      }
      
      // Pause on hover
      carousel.addEventListener('mouseenter', stopAutoplay);
      carousel.addEventListener('mouseleave', startAutoplay);
      
      // Handle window resize
      window.addEventListener('resize', () => {
        setupSlides();
      });
      
      // Initialize
      setupSlides();
      startAutoplay();
    });