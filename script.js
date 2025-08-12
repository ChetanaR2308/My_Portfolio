// ===== Scroll Reveal =====
const sections = document.querySelectorAll('.section');
function revealSections() {
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop < window.innerHeight - 100) {
      section.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealSections);
revealSections();

// ===== Navbar Scroll Background =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== Parallax Hero Image =====
const heroImage = document.querySelector('.hero-image');
window.addEventListener('scroll', () => {
  let scrollPos = window.scrollY * 0.3;
  heroImage.style.backgroundPositionY = `${scrollPos}px`;
});
