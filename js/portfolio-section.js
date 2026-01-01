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