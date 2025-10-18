document.addEventListener('DOMContentLoaded', () => {
  const burgerToggle = document.querySelector('.burger-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  burgerToggle.addEventListener('click', () => {
    burgerToggle.classList.toggle('active');

    if (navMenu.classList.contains('active')) {
      navMenu.classList.remove('show');
      setTimeout(() => {
        navMenu.classList.remove('active');
        burgerToggle.classList.remove('hidden');
      }, 100); // Затримка 1000 мс = 1 секунда
    } else {
      navMenu.classList.add('active');
      setTimeout(() => {
        navMenu.classList.add('show');
        burgerToggle.classList.add('hidden');
      }, 10); // Невелика затримка для початку анімації
    }
  });
});