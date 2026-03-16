// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('nav ul');

if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show');
        mobileMenuToggle.innerHTML = navMenu.classList.contains('show') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            if (navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// Form Submission
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const service = contactForm.querySelector('select').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !service || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // Simulate form submission
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add animation classes to elements
document.querySelectorAll('.service-card, .subsidiary-card, .about-stats, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Parallax Effect for Hero Section
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    });
}

// Counter Animation for Statistics
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const updateCount = () => {
            const target = parseInt(counter.innerText.replace(/[^0-9]/g, ''));
            const suffix = counter.innerText.replace(/[0-9]/g, '');
            const count = parseInt(counter.getAttribute('data-count') || '0');
            const increment = target / 100;
            
            if (count < target) {
                counter.setAttribute('data-count', Math.ceil(count + increment));
                counter.innerText = Math.ceil(count + increment) + suffix;
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target + suffix;
            }
        };
        
        // Check if element is visible
        const rect = counter.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            if (!counter.classList.contains('animated')) {
                counter.classList.add('animated');
                updateCount();
            }
        }
    });
};

window.addEventListener('scroll', animateCounters);
animateCounters(); // Run on load

// Initialize animations on load
window.addEventListener('load', () => {
    // Trigger initial scroll position check
    window.dispatchEvent(new Event('scroll'));
    
    // Add slight delay for hero animation
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }
    }, 100);
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .service-card, .subsidiary-card, .about-stats, .contact-item, .hero-content {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
`;
document.head.appendChild(style);