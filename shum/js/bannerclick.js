document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.header nav a[href^="#"]');
  const burgerToggle = document.querySelector('.burger-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const headerHeight = document.querySelector('.header').offsetHeight;

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20; // Додаємо 20px для відступу
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });

        // Закриваємо бургер-меню після кліку
        if (navMenu.classList.contains('active') && navMenu.classList.contains('show')) {
          navMenu.classList.remove('show');
          burgerToggle.classList.remove('active');
        }
      }
    });
  });
});