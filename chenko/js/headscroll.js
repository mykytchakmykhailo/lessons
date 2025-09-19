document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  let lastScroll = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    const headerHeight = navbar.offsetHeight; // Висота хедера

    if (currentScroll > lastScroll && currentScroll > headerHeight) {
      // Скрол вниз — хедер зникає
      navbar.style.transform = 'translateY(-100%)';
    } else {
      // Скрол вгору — хедер з'являється
      navbar.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll <= 0 ? 0 : currentScroll; // Скидаємо до 0 нагорі
  });
});