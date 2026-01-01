
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