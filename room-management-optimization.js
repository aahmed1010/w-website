// JS for Smart Recommendations service page
// Floating navbar logic for hide/show on scroll and floating button
let hideNavbarTimeout;
let overBtn = false;
let overNavbar = false;

// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
}

document.addEventListener('click', (e) => {
  if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
    mobileMenuBtn.classList.remove('active');
    navLinks.classList.remove('active');
  }
});

const navbar = document.querySelector('.navbar');
const showNavbarBtn = document.querySelector('.show-navbar-btn');

function hideNavbar() {
  navbar.style.transform = 'translateY(-100%)';
  navbar.style.opacity = '0';
  setTimeout(() => {
    showNavbarBtn.style.display = 'flex';
  }, 400);
}

function showNavbar() {
  clearTimeout(hideNavbarTimeout);
  navbar.style.transform = 'translateY(0)';
  navbar.style.opacity = '1';
}

// Show navbar by default on page load
showNavbar();

// Hide navbar on scroll down
let lastScrollY = window.scrollY;
window.addEventListener('scroll', () => {
  if (window.scrollY > lastScrollY && window.scrollY > 40) {
    hideNavbar();
  }
  lastScrollY = window.scrollY;
});

showNavbarBtn.addEventListener('mouseenter', () => {
  overBtn = true;
  clearTimeout(hideNavbarTimeout);
  showNavbar();
});
showNavbarBtn.addEventListener('mouseleave', () => {
  overBtn = false;
  hideNavbarTimeout = setTimeout(() => {
    if (!overBtn && !overNavbar) {
      showNavbarBtn.style.display = 'none';
    }
  }, 400);
});
navbar.addEventListener('mouseenter', () => {
  overNavbar = true;
  clearTimeout(hideNavbarTimeout);
});
navbar.addEventListener('mouseleave', () => {
  overNavbar = false;
  hideNavbarTimeout = setTimeout(() => {
    if (!overBtn && !overNavbar) {
      showNavbarBtn.style.display = 'none';
    }
  }, 400);
});

navbar.style.transition = 'transform 0.35s, opacity 0.35s';

function updateNavbarScrolled() {
  if (window.scrollY > 10) {
    navbar.classList.add('navbar--scrolled');
  } else {
    navbar.classList.remove('navbar--scrolled');
  }
}

window.addEventListener('scroll', updateNavbarScrolled);
window.addEventListener('DOMContentLoaded', updateNavbarScrolled);

// Animate fade-in sections
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.fade-in').forEach((el, i) => {
    el.style.animationDelay = (i * 0.2) + 's';
  });
});