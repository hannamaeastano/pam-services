// Auto-close mobile menu when links are clicked
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 992) { // Only for mobile
          const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
            toggle: false
          });
          bsCollapse.hide();
        }
      });
    });
  
    // Add scroll effect
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        document.querySelector('.navbar').classList.add('scrolled');
      } else {
        document.querySelector('.navbar').classList.remove('scrolled');
      }
    });
  
  
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
          });
          
          // Close mobile menu if open
          const navbarCollapse = document.querySelector('.navbar-collapse');
          if (navbarCollapse.classList.contains('show')) {
            const navbarToggler = document.querySelector('.navbar-toggler');
            navbarToggler.click();
          }
        }
      });
    });
  
    // Current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
  
    // Form submission handling
    const estimateForm = document.getElementById('estimateForm');
    if (estimateForm) {
      estimateForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(estimateForm);
        
        // Simulate form submission (replace with actual AJAX call)
        setTimeout(() => {
          // Show success message
          alert('Thank you for your request! We will contact you shortly.');
          
          // Reset form
          estimateForm.reset();
        }, 1000);
      });
    }
  
    // Add animation class to elements when they come into view
    const animateOnScroll = function() {
      const elements = document.querySelectorAll('.fade-in');
      
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
          element.classList.add('animated');
        }
      });
    };
  
    // Initialize animations
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
  });