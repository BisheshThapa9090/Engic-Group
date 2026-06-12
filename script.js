// Mobile navigation toggle
const mobileToggle = document.getElementById('mobileToggle');
const navList = document.getElementById('navList');
if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navList.classList.toggle('open');
        mobileToggle.setAttribute('aria-expanded', navList.classList.contains('open'));
    });
}

// Close mobile menu when clicking on links
document.querySelectorAll('#navList a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 900) {
            navList.classList.remove('open');
            if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
        }
    });
});

// Toast notification
const toast = document.getElementById('toast-success');
function showSuccessToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3500);
}

// Form submission handler
function handleFormSubmit(form, successMessage) {
    if (!form) return;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = {};
        formData.forEach((v, k) => data[k] = v);
        console.log('Form submitted:', data);
        setTimeout(() => {
            form.reset();
            showSuccessToast(successMessage);
        }, 300);
    });
}

const leadForm = document.getElementById('leadForm');
const contactForm = document.getElementById('contactForm');
handleFormSubmit(leadForm, 'Consultation request sent! We will contact you soon.');
handleFormSubmit(contactForm, 'Detailed inquiry submitted! We will reply within 48 hours.');

// Project filter functionality
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const type = btn.dataset.filter;
        const projects = document.querySelectorAll('.project-card');
        let visibleCount = 0;
        const maxVisible = 6;
        projects.forEach(project => {
            if (type === "all") {
                if (visibleCount < maxVisible) {
                    project.style.display = "block";
                    visibleCount++;
                } else {
                    project.style.display = "none";
                }
            } else if (project.dataset.type === type) {
                project.style.display = "block";
            } else {
                project.style.display = "none";
            }
        });
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href.length > 1 && href !== '#') {
            const el = document.querySelector(href);
            if (el) {
                e.preventDefault();
                if (window.innerWidth <= 900) {
                    if (navList) navList.classList.remove('open');
                    if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
                }
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// Intersection Observer for animations
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements with animation classes
document.querySelectorAll('.fade-in, .scale-in').forEach(el => {
    if (!el.closest('.hero')) {
        observer.observe(el);
    }
});
document.querySelectorAll('.footer-main, .footer-bottom').forEach(el => {
    observer.observe(el);
});

// Sticky header on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Initial hero animations on page load
window.addEventListener('DOMContentLoaded', () => {
    const heroLeft = document.querySelector('.hero-content-left');
    const heroRight = document.querySelector('.hero-content-right');
    const heroStaggerItems = document.querySelectorAll('.hero-stagger-item');
    const statItems = document.querySelectorAll('.stat-item');
    
    if (heroLeft) heroLeft.classList.add('visible');
    if (heroRight) heroRight.classList.add('visible');
    
    heroStaggerItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('visible');
        }, index * 100);
    });
    
    setTimeout(() => {
        statItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('visible');
            }, index * 150);
        });
    }, heroStaggerItems.length * 100 + 200);
});