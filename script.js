// Mobile navigation toggle
const mobileToggle = document.getElementById('mobileToggle');
const navList = document.getElementById('navList');

if (mobileToggle && navList) {
    // Toggle menu on button click
    mobileToggle.addEventListener('click', () => {
        navList.classList.toggle('open');
        mobileToggle.setAttribute('aria-expanded', navList.classList.contains('open'));
        // Toggle hamburger animation
        mobileToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    document.querySelectorAll('#navList a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 900) {
                navList.classList.remove('open');
                if (mobileToggle) {
                    mobileToggle.setAttribute('aria-expanded', 'false');
                    mobileToggle.classList.remove('active');
                }
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 900 && navList.classList.contains('open')) {
            const header = document.querySelector('header');
            if (header && !header.contains(e.target)) {
                navList.classList.remove('open');
                mobileToggle.setAttribute('aria-expanded', 'false');
                mobileToggle.classList.remove('active');
            }
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 900 && navList.classList.contains('open')) {
            navList.classList.remove('open');
            mobileToggle.setAttribute('aria-expanded', 'false');
            mobileToggle.classList.remove('active');
        }
    });

    // Keyboard accessibility - Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navList.classList.contains('open')) {
            navList.classList.remove('open');
            mobileToggle.setAttribute('aria-expanded', 'false');
            mobileToggle.classList.remove('active');
            mobileToggle.focus();
        }
    });
}

// Toast notification
const toast = document.getElementById('toast-success');
function showSuccessToast(message) {
    if (!toast) return;
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
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            showSuccessToast(successMessage);
        }, 500);
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
        projects.forEach(project => {
            if (type === "all") {
                project.style.display = "block";
            } else if (project.dataset.type === type) {
                project.style.display = "block";
            } else {
                project.style.display = "none";
            }
        });
    });
});

// Smooth scroll for anchor links - keeps everything on the same page
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href.length > 1 && href !== '#') {
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (window.innerWidth <= 900 && navList) {
                    navList.classList.remove('open');
                    if (mobileToggle) {
                        mobileToggle.setAttribute('aria-expanded', 'false');
                        mobileToggle.classList.remove('active');
                    }
                }
                
                targetElement.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
                
                // Update URL without reload
                if (history.pushState) {
                    history.pushState(null, null, href);
                }
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
    if (header) {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
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

// Load header
fetch('header.html')
    .then(response => {
        if (!response.ok) throw new Error('Header not found');
        return response.text();
    })
    .then(data => {
        document.getElementById('header-placeholder').innerHTML = data;
        
        // Re-initialize mobile toggle after header loads
        const newMobileToggle = document.getElementById('mobileToggle');
        const newNavList = document.getElementById('navList');
        
        if (newMobileToggle && newNavList) {
            newMobileToggle.addEventListener('click', () => {
                newNavList.classList.toggle('open');
                newMobileToggle.setAttribute('aria-expanded', newNavList.classList.contains('open'));
                newMobileToggle.classList.toggle('active');
            });
            
            document.querySelectorAll('#navList a').forEach(link => {
                link.addEventListener('click', () => {
                    if (window.innerWidth <= 900) {
                        newNavList.classList.remove('open');
                        if (newMobileToggle) {
                            newMobileToggle.setAttribute('aria-expanded', 'false');
                            newMobileToggle.classList.remove('active');
                        }
                    }
                });
            });
            
            document.addEventListener('click', (e) => {
                if (window.innerWidth <= 900 && newNavList.classList.contains('open')) {
                    const header = document.querySelector('header');
                    if (header && !header.contains(e.target)) {
                        newNavList.classList.remove('open');
                        newMobileToggle.setAttribute('aria-expanded', 'false');
                        newMobileToggle.classList.remove('active');
                    }
                }
            });
            
            window.addEventListener('resize', () => {
                if (window.innerWidth > 900 && newNavList.classList.contains('open')) {
                    newNavList.classList.remove('open');
                    newMobileToggle.setAttribute('aria-expanded', 'false');
                    newMobileToggle.classList.remove('active');
                }
            });
            
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && newNavList.classList.contains('open')) {
                    newNavList.classList.remove('open');
                    newMobileToggle.setAttribute('aria-expanded', 'false');
                    newMobileToggle.classList.remove('active');
                    newMobileToggle.focus();
                }
            });
        }
        
        // Re-apply smooth scroll for anchor links after header loads
        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href && href.length > 1 && href !== '#') {
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        e.preventDefault();
                        
                        if (window.innerWidth <= 900 && newNavList) {
                            newNavList.classList.remove('open');
                            if (newMobileToggle) {
                                newMobileToggle.setAttribute('aria-expanded', 'false');
                                newMobileToggle.classList.remove('active');
                            }
                        }
                        
                        targetElement.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'start' 
                        });
                        
                        if (history.pushState) {
                            history.pushState(null, null, href);
                        }
                    }
                }
            });
        });
    })
    .catch(error => {
        console.error('Error loading header:', error);
    });

// Load footer
fetch('footer.html')
    .then(response => {
        if (!response.ok) throw new Error('Footer not found');
        return response.text();
    })
    .then(data => {
        document.getElementById('footer-placeholder').innerHTML = data;
    })
    .catch(error => {
        console.error('Error loading footer:', error);
    });