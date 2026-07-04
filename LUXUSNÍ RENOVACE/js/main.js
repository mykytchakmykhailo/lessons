// Hero Image Slider
let currentSlide = 0;
const heroImages = [
  "img/main/1/3.jpg",
  "img/nasheprace/6.jpg",
  "img/nasheprace/8.jpg"
];
const heroImg = document.getElementById('heroImage');

function changeHeroImage() {
  currentSlide = (currentSlide + 1) % heroImages.length;
  heroImg.style.opacity = 0;

  setTimeout(() => {
    heroImg.src = heroImages[currentSlide];
    heroImg.style.opacity = 1;
  }, 800);
}

setInterval(changeHeroImage, 6500);

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 80) {
    navbar.style.padding = '0.8rem 0';
    navbar.style.background = 'rgba(10, 10, 10, 0.98)';
  } else {
    navbar.style.padding = '1.2rem 0';
  }
});

// FAQ Toggle
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const answer = question.nextElementSibling;
    const arrow = question.querySelector('.arrow');
    
    answer.classList.toggle('active');
    
    if (arrow) {
      arrow.style.transform = answer.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0)';
    }
  });
});

// Scroll animations
const observerOptions = { threshold: 0.15 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.service-card, .why-card, .portfolio-item').forEach(el => {
  el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
  el.style.opacity = '0';
  el.style.transform = 'translateY(40px)';
  observer.observe(el);
});