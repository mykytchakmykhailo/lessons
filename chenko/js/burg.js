// Отримуємо елементи для мобільного меню
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

// Додаємо обробник подій для перемикання меню
mobileMenu.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});