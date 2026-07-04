// Кастомний курсор
const cursor = document.createElement('div');
cursor.classList.add('cursor');
document.body.appendChild(cursor);

let timeout;

document.addEventListener('mousemove', (e) => {
  cursor.style.display = 'block';
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';

  // Збільшення при наведенні на інтерактивні елементи
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    cursor.classList.remove('active');
  }, 100);
});

document.addEventListener('mouseleave', () => {
  cursor.style.display = 'none';
});

// Додаємо ефект при наведенні на посилання та кнопки
const interactiveElements = document.querySelectorAll('a, button, .cta-button, .scroll-prompt');

interactiveElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('active');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('active');
  });
});