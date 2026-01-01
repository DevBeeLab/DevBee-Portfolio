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
  
  // * Testimonials slider initialization
 document.addEventListener('DOMContentLoaded', function() {
   new Swiper('.testimonials-slider', {
     speed: 600,
     loop: true,
     autoplay: {
       delay: 5000,
       disableOnInteraction: false
     },
     slidesPerView: 'auto',
     pagination: {
       el: '.swiper-pagination',
       type: 'bullets',
       clickable: true
     },
     breakpoints: {
       320: {
         slidesPerView: 1,
         spaceBetween: 20
       },
       768: {
         slidesPerView: 2,
         spaceBetween: 20
       },
       1200: {
         slidesPerView: 3,
         spaceBetween: 20
       }
     }
   });
 });

  

// Theme switcher functionality
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  
  // Check for saved theme preference or use preferred color scheme
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
  
  // Toggle theme on button click
  themeToggle.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      localStorage.setItem('theme', 'light');
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
  });
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const newColorScheme = e.matches ? 'dark' : 'light';
    
    if (newColorScheme === 'dark' && !localStorage.getItem('theme')) {
      body.classList.add('dark-mode');
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else if (newColorScheme === 'light' && !localStorage.getItem('theme')) {
      body.classList.remove('dark-mode');
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
  });
});