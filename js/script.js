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

// Close mobile menu on click outside
document.addEventListener('click', (e) => {
    if (navMenu && navMenu.classList.contains('show') && !navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        navMenu.classList.remove('show');
        mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// Smooth Scrolling for anchor links (if any)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Form Submission handling for Contact Page
const contactForm = document.querySelector('.contact-form-container form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you within 24 hours.');
        contactForm.reset();
    });
}

// Intersection Observer for Smooth Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Target elements for animation
const animateOnScroll = () => {
    const targets = document.querySelectorAll('.feature-card, .service-block, .ticket-card, .news-card, .contact-card, .about-grid, .welcome-content, .timeline-stop');
    targets.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.165, 0.84, 0.44, 1), transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)';
        observer.observe(el);
    });
};

// Counter Animation for stats (if present)
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.innerText.replace(/[^0-9]/g, ''));
        const suffix = counter.innerText.replace(/[0-9]/g, '');
        let count = 0;
        const speed = 2000 / target;

        const updateCount = () => {
            if (count < target) {
                count++;
                counter.innerText = count + suffix;
                setTimeout(updateCount, speed);
            } else {
                counter.innerText = target + suffix;
            }
        };

        const rect = counter.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0 && !counter.classList.contains('animated')) {
            counter.classList.add('animated');
            updateCount();
        }
    });
};

// Scroll effects
window.addEventListener('scroll', () => {
    animateCounters();
});

// Initialize on Load
window.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
    animateCounters();
});