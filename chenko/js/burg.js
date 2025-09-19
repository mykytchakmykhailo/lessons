const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
  mobileMenu.classList.toggle('active'); // анімація бургер кнопки
  navLinks.classList.toggle('active');   // плавне меню
});
