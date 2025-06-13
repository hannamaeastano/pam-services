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
    
    // Add scroll effect for navbar
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
                // Determine scroll offset, accounting for fixed navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight; // Get current navbar height
                const offset = targetElement.offsetTop - navbarHeight - 10; // 10px extra padding
                
                window.scrollTo({
                    top: offset,
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
    
    const handleFormSubmit = async (form) => {
        const submitBtn = form.querySelector('[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner"></span> Processing...';
    
        try {
            // Convert FormData to URL-encoded format (required by FormSubmit)
            const formData = new URLSearchParams(new FormData(form)).toString();
            
            const response = await fetch(form.action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                },
                body: formData
            });
    
            if (response.ok) {
                // Success - show modal and log response
                const modal = new bootstrap.Modal(document.getElementById('thankYouModal'));
                modal.show();
                form.reset();
                
                // Debugging: Force email delivery check
                console.log('Submission successful! Check:');
                console.log('1. Email inbox (including spam)');
                console.log('2. FormSubmit dashboard: https://formsubmit.co/');
                
                setTimeout(() => modal.hide(), 5000);
            } else {
                throw new Error(`Server responded with ${response.status}`);
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert(`Form submission failed. ${error.message}`);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Request Free Estimate';
        }
    };
    
    document.getElementById('estimateForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        handleFormSubmit(e.target);
    });
    
    // Combined animation on scroll handler
    const animateOnScroll = function() {
        // Handle elements with .fade-in (your original logic)
        const fadeInElements = document.querySelectorAll('.fade-in');
        fadeInElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            // Adjust the threshold as needed. Here, 100px from the bottom of the viewport
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            } else {
                // Remove 'animated' when scrolling back up and element leaves view
                element.classList.remove('animated');
            }
        });

        // Handle sections with .scroll-animate (new logic for two-way animation)
        const scrollAnimateElements = document.querySelectorAll('.scroll-animate');
        scrollAnimateElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            
            const triggerOffsetBottom = windowHeight * 0.85; 
            const triggerOffsetTop = 0; 

            if (elementPosition < triggerOffsetBottom && elementPosition > -element.offsetHeight) {
                
                element.classList.add('is-visible');
            } else {
                
                element.classList.remove('is-visible');
            }
        });
    };
    
    // Initialize animations and attach to scroll event
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); 
});