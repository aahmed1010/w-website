// Initialize AOS (Animate on Scroll)
AOS.init({
  duration: 1000,
  once: true,
  offset: 100
});

// Number counter animation
function animateNumbers() {
  // Select both .stat-number and .metric-value
  const numbers = document.querySelectorAll('.stat-number, .metric-value');

  numbers.forEach(number => {
    const target = parseInt(number.getAttribute('data-value'));
    if (isNaN(target)) return;
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;

    const updateNumber = () => {
      current += step;
      if (current < target) {
        number.textContent = Math.round(current);
        requestAnimationFrame(updateNumber);
      } else {
        number.textContent = target;
      }
    };

    // Start animation when element is in viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateNumber();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(number);
  });
}

// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
    mobileMenuBtn.classList.remove('active');
    navLinks.classList.remove('active');
  }
});

// --- Navbar Only Visible at Top, Show Button When Hidden ---
const navbar = document.querySelector('.navbar');
const showNavbarBtn = document.querySelector('.show-navbar-btn');

function updateNavbarVisibility() {
  if (window.scrollY === 0) {
    navbar.style.transform = 'translateY(0)';
    navbar.style.opacity = '1';
    showNavbarBtn.style.display = 'none';
  } else {
    navbar.style.transform = 'translateY(-100%)';
    navbar.style.opacity = '0';
    showNavbarBtn.style.display = 'flex';
  }
}

window.addEventListener('scroll', updateNavbarVisibility);
window.addEventListener('DOMContentLoaded', updateNavbarVisibility);

showNavbarBtn.addEventListener('click', () => {
  navbar.style.transform = 'translateY(0)';
  navbar.style.opacity = '1';
  showNavbarBtn.style.display = 'none';
});

navbar.style.transition = 'transform 0.35s, opacity 0.35s';

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  animateNumbers();
});