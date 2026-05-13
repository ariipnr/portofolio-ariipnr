const introPage = document.getElementById('intro-page');
const portfolioPage = document.getElementById('portfolio-page');
const getInTouchBtn = document.getElementById('get-in-touch-btn');
const viewWorkBtn = document.getElementById('view-work-btn');
const backToLandingBtn = document.getElementById('back-to-landing');
let isTransitioning = false;
const PAGE_TRANSITION_MS = 760;

function openPortfolio(targetId = 'overview') {
    if (!introPage || !portfolioPage || isTransitioning) {
        return;
    }

    isTransitioning = true;
    introPage.classList.add('is-leaving');
    portfolioPage.classList.remove('hidden');
    requestAnimationFrame(() => {
        portfolioPage.classList.add('is-visible');
    });

    setTimeout(() => {
        introPage.classList.add('hidden');
        const target = document.getElementById(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        isTransitioning = false;
    }, PAGE_TRANSITION_MS);
}

function openLanding() {
    if (!introPage || !portfolioPage || isTransitioning) {
        return;
    }

    isTransitioning = true;
    portfolioPage.classList.remove('is-visible');
    introPage.classList.remove('hidden');
    requestAnimationFrame(() => {
        introPage.classList.remove('is-leaving');
    });

    setTimeout(() => {
        portfolioPage.classList.add('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        isTransitioning = false;
    }, PAGE_TRANSITION_MS);
}

if (getInTouchBtn) {
    getInTouchBtn.addEventListener('click', () => openPortfolio('contact'));
}

if (viewWorkBtn) {
    viewWorkBtn.addEventListener('click', () => openPortfolio('overview'));
}

if (backToLandingBtn) {
    backToLandingBtn.addEventListener('click', openLanding);
}

// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') {
            return;
        }

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;

        // Simple validation
        if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
            alert('Please fill in all fields!');
            return;
        }

        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate API call with timeout
        setTimeout(() => {
            alert('Thank you! Your message has been sent. I will contact you soon.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Scroll Animation for Elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe skill cards and experience cards
document.querySelectorAll('.skill-card, .experience-card, .stat-box').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(10px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

console.log('✓ GitHub-style portfolio loaded successfully!');
