document.addEventListener('DOMContentLoaded', () => {
  const sluzbyWrapper = document.querySelector('.sluzby_wrapper');
  const sluzbyBlocks = document.querySelectorAll('.sluzby_block');
  const title = sluzbyWrapper.querySelector('h1');

  // ---------- Налаштування ----------
  const baseDelay = 600;       // інтервал між блоками у мс
  const appearDuration = 1000;  // тривалість анімації блоків
  const appearEasing = 'cubic-bezier(0.22, 1, 0.36, 1)'; // easing блоків

  const titleDelay = 100;        // затримка появи заголовка
  const titleDuration = 800;   // тривалість анімації заголовка
  const titleEasing = 'ease-out'; // easing заголовка
  // -----------------------------------

  // Передаємо CSS-змінні для контролю duration/easing
  if(sluzbyWrapper){
    sluzbyWrapper.style.setProperty('--appear-duration', `${appearDuration}ms`);
    sluzbyWrapper.style.setProperty('--appear-easing', appearEasing);
    sluzbyWrapper.style.setProperty('--title-duration', `${titleDuration}ms`);
    sluzbyWrapper.style.setProperty('--title-easing', titleEasing);
  }

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        // Поява заголовка з затримкою
        setTimeout(() => {
          title.classList.add('in');
        }, titleDelay);

        // Поява блоків по черзі
        sluzbyBlocks.forEach((block, i) => {
          setTimeout(() => {
            block.classList.add('in');
          }, i * baseDelay);
        });

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.4
  });

  if(sluzbyWrapper) observer.observe(sluzbyWrapper);
});
