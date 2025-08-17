document.addEventListener('DOMContentLoaded', () => {
  const comedianBlocks = document.querySelectorAll('.comedian-block');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Зупиняємо спостереження після появи
      }
    });
  }, {
    threshold: 0.2 // Анімація спрацьовує, коли 20% блоку видно
  });

  comedianBlocks.forEach(block => {
    observer.observe(block);
  });
});