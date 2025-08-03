document.addEventListener('DOMContentLoaded', () => {
    // Перехоплюємо всі якірні посилання
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault(); // Запобігаємо стандартному переходу
        const targetId = anchor.getAttribute('href'); // Отримуємо ID цільової секції
        const targetElement = document.querySelector(targetId); // Знаходимо елемент
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop, // Позиція верхньої частини секції
            behavior: 'smooth' // Плавний скрол
          });
        }
      });
    });
  });