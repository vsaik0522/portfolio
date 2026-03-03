console.log("JavaScript is connected!");
// ================================
// INTERSECTION OBSERVER
// Fades in elements as you scroll
// ================================

const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));
// ================================
// TYPEWRITER EFFECT
// ================================

const typingElement = document.getElementById('typing-text');

const words = [
  'a Systems Engineer.',
  'a Problem Solver.',
  'a Tech Enthusiast.',
  'a Lifelong Learner.',
];

let wordIndex    = 0;   // which word we're on
let charIndex    = 0;   // which character we're on
let isDeleting   = false;

function type() {
  const currentWord = words[wordIndex];

  // Add or remove a character depending on direction
  if (isDeleting) {
    typingElement.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingElement.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  // Typing speed: faster when deleting, slower when typing
  let typeSpeed = isDeleting ? 60 : 120;

  // Word is fully typed — pause then start deleting
  if (!isDeleting && charIndex === currentWord.length) {
    typeSpeed = 1800;
    isDeleting = true;
  }

  // Word is fully deleted — move to next word
  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    typeSpeed = 400;
  }

  setTimeout(type, typeSpeed);
}

// Start the effect after a short delay
// so the fade-in animation plays first
setTimeout(type, 1200);
// ================================
// HAMBURGER MENU
// ================================

const hamburger   = document.getElementById('hamburger');
const navMenu     = document.getElementById('nav-menu');
const navOverlay  = document.getElementById('nav-overlay');
const navLinks    = document.querySelectorAll('#nav-menu a');

// Toggle menu open/closed
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
  navOverlay.classList.toggle('open');
  document.body.style.overflow = '';
});

// Close menu when a link is clicked, then scroll
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');

    closeMenu();

    // Small delay lets the menu close before scrolling
    setTimeout(() => {
      console.log('Looking for:', targetId);
      const targetSection = document.querySelector(targetId);
      console.log('Found:', targetSection);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  });
});

// Close menu when overlay is clicked
navOverlay.addEventListener('click', closeMenu);

function closeMenu() {
  hamburger.classList.remove('open');
  navMenu.classList.remove('open');
  navOverlay.classList.remove('open');
  document.body.style.overflow = '';
}
// ================================
// ACTIVE NAV LINK ON SCROLL
// ================================

const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('nav a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    // Remove active from all links
    navItems.forEach(link => link.classList.remove('active'));

    // Add active to the matching link
    const id = entry.target.getAttribute('id');
    const activeLink = document.querySelector(`nav a[href="#${id}"]`);
    if (activeLink) activeLink.classList.add('active');
  });
}, {
  threshold: 0.4,
  rootMargin: '-80px 0px 0px 0px'
});

sections.forEach(section => sectionObserver.observe(section));
// ================================
// HEADER SCROLL EFFECT
// ================================

const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});