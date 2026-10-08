// ===== LOADER =====
window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('loader').classList.add('hidden');
    }, 800);
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== MOBILE MENU =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
mobileMenuBtn.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.querySelector('i').classList.remove('fa-times');
        mobileMenuBtn.querySelector('i').classList.add('fa-bars');
    });
});

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ===== ANIMATED STATISTICS =====
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

function animateStats() {
    if (statsAnimated) return;
    const statsSection = document.querySelector('.about-stats');
    const rect = statsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
        statsAnimated = true;
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000;
            const start = performance.now();

            function update(currentTime) {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(easeOut * target);

                if (target >= 1000) {
                    stat.textContent = current.toLocaleString() + '+';
                } else {
                    stat.textContent = current + '+';
                }

                if (progress < 1) {
                    requestAnimationFrame(update);
                }
            }
            requestAnimationFrame(update);
        });
    }
}
window.addEventListener('scroll', animateStats);

// ===== REVIEWS SLIDER =====
const reviewsTrack = document.getElementById('reviewsTrack');
const prevBtn = document.getElementById('prevReview');
const nextBtn = document.getElementById('nextReview');
let currentSlide = 0;
const totalSlides = 6;
let slidesPerView = window.innerWidth <= 768 ? 1 : (window.innerWidth <= 1024 ? 2 : 3);

function updateSlider() {
    slidesPerView = window.innerWidth <= 768 ? 1 : (window.innerWidth <= 1024 ? 2 : 3);
    const slideWidth = reviewsTrack.children[0].offsetWidth + 30;
    const maxSlide = totalSlides - slidesPerView;
    currentSlide = Math.min(currentSlide, maxSlide);
    reviewsTrack.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}

nextBtn.addEventListener('click', () => {
    slidesPerView = window.innerWidth <= 768 ? 1 : (window.innerWidth <= 1024 ? 2 : 3);
    const maxSlide = totalSlides - slidesPerView;
    currentSlide = currentSlide < maxSlide ? currentSlide + 1 : 0;
    updateSlider();
});

prevBtn.addEventListener('click', () => {
    slidesPerView = window.innerWidth <= 768 ? 1 : (window.innerWidth <= 1024 ? 2 : 3);
    const maxSlide = totalSlides - slidesPerView;
    currentSlide = currentSlide > 0 ? currentSlide - 1 : maxSlide;
    updateSlider();
});

window.addEventListener('resize', updateSlider);

// Auto-slide reviews
setInterval(() => {
    slidesPerView = window.innerWidth <= 768 ? 1 : (window.innerWidth <= 1024 ? 2 : 3);
    const maxSlide = totalSlides - slidesPerView;
    currentSlide = currentSlide < maxSlide ? currentSlide + 1 : 0;
    updateSlider();
}, 5000);

// ===== TOAST NOTIFICATION =====
function showToast(title, message) {
    const toast = document.getElementById('toast');
    const toastTitle = document.getElementById('toastTitle');
    const toastMessage = document.getElementById('toastMessage');

    toastTitle.textContent = title;
    toastMessage.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ===== RESERVATION FORM =====
document.getElementById('reservationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    showToast('Reservation Confirmed!', 'Your table has been booked. We will send a confirmation email shortly.');
    this.reset();
});

// ===== SET MIN DATE TO TODAY =====
document.querySelector('input[type="date"]').min = new Date().toISOString().split('T')[0];

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== MENU CATEGORY FILTERING =====
function filterMenu(filter, clickedCard) {
    // Update active state on category cards
    const allCards = document.querySelectorAll('.menu-combined .category-card');
    allCards.forEach(function(c) { c.classList.remove('active'); });
    clickedCard.classList.add('active');

    // Filter dishes
    const dishes = document.querySelectorAll('.menu-combined .dish-card');
    dishes.forEach(function(dish) {
        var category = dish.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
            dish.classList.remove('filter-hide');
        } else {
            dish.classList.add('filter-hide');
        }
    });
}