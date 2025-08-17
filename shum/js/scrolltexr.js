document.addEventListener('DOMContentLoaded', () => {
  const heroText = document.querySelector('.hero-block p');

  if (heroText) {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !entry.target.classList.contains('loaded')) {
            entry.target.classList.add('loaded');
            observer.unobserve(entry.target); // Зупиняємо спостереження
          }
        });
      },
      {
        threshold: 0.3, // Запускаємо, коли 30% елемента видно
        rootMargin: '110px' // Додаємо відступ для раннього спрацьовування
      }
    );

    observer.observe(heroText);
  } else {
    console.error('Element .hero-block p not found');
  }
});