document.addEventListener('DOMContentLoaded', () => {
  const onasSection = document.querySelector('.onas');
  const onasText = document.querySelector('.onas_text');
  const leftImage = document.querySelector('.onas_img.left img');
  const rightImages = document.querySelectorAll('.onas_img:not(.left) img');

  const observerOptions = {
    root: null, // Відносно вівпорта
    threshold: 0.2 // Активується, коли 20% секції видно
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Поява тексту
        setTimeout(() => {
          onasText.classList.add('in');
        }, 0);

        // Поява першого зображення (зліва)
        setTimeout(() => {
          leftImage.classList.add('in');
        }, 400);

        // Поява другого і третього зображень (справа)
        rightImages.forEach((img, index) => {
          setTimeout(() => {
            img.classList.add('in');
          }, 800 + index * 400); // Затримка 800ms для другого, 1200ms для третього
        });

        observer.unobserve(onasSection); // Зупиняємо спостереження після появи
      }
    });
  }, observerOptions);

  observer.observe(onasSection);
});