// ===== Swastik Hospital - Main Script =====

document.addEventListener('DOMContentLoaded', function () {
    initNavigation();
    initHeaderScroll();
    initServiceTabs();
    initSmoothScroll();
    initFooterAccordions();
});

// ===== Mobile Navigation =====
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');

    if (navToggle && nav) {
        navToggle.addEventListener('click', function () {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            nav.classList.toggle('active');

            // Animate hamburger
            const hamburger = navToggle.querySelector('.hamburger');
            if (hamburger) {
                hamburger.classList.toggle('active');
            }
        });

        // Close nav when clicking a link
        nav.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Close nav when clicking outside
        document.addEventListener('click', function (e) {
            if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
                nav.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

// ===== Header Scroll Effect =====
function initHeaderScroll() {
    const header = document.querySelector('.header');

    if (header) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Check initial scroll position
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        }
    }
}

// ===== Service Tabs =====
function initServiceTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            const targetTab = this.getAttribute('data-tab');

            // Remove active from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));

            // Remove active from all contents
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active to clicked button
            this.classList.add('active');

            // Add active to target content
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// ===== Smooth Scroll =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if just "#"
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();

                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== Active Navigation Highlight =====
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.highlight-card, .service-card, .doctor-card, .opd-card').forEach(el => {
    observer.observe(el);
});

// ===== Footer Accordions for Mobile =====
function initFooterAccordions() {
    const headings = document.querySelectorAll('.footer-heading');

    headings.forEach(heading => {
        heading.addEventListener('click', function () {
            if (window.innerWidth <= 768) {
                // Find the associated list
                const list = this.nextElementSibling;
                const toggle = this.querySelector('.accordion-toggle');

                if (list && list.classList.contains('footer-list')) {
                    list.classList.toggle('active');
                    if (toggle) toggle.classList.toggle('active');
                }
            }
        });
    });
}
