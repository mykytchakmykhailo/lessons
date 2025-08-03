// Функція для усунення горизонтального скролу та перевірки синього фону
function fixHorizontalScroll() {
  // Отримуємо проблемні елементи
  const elementsToFix = [
    document.querySelectorAll('.img_anim-3'),
    document.querySelectorAll('.img_an-right'),
    document.querySelectorAll('.img_anim-4 img'),
    document.querySelectorAll('.img_an-left'),
    document.querySelectorAll('.container'),
    document.querySelectorAll('.img_animation')
  ].flat();

  // Обмежуємо ширину елементів і видаляємо від'ємне позиціонування
  elementsToFix.forEach(element => {
    if (element) {
      // Обмежуємо ширину до 100% контейнера
      element.style.maxWidth = '100%';
      element.style.width = '100%';
      element.style.minWidth = 'auto';
      element.style.left = '0';
      element.style.overflowX = 'hidden';

      // Перевіряємо і видаляємо синій фон, якщо він є
      const computedStyle = getComputedStyle(element);
      if (computedStyle.backgroundColor.includes('rgb(0, 0, 255)') || 
          computedStyle.backgroundColor.includes('#1e90ff') || 
          computedStyle.backgroundColor.includes('#00b7eb')) {
        element.style.backgroundColor = 'transparent';
      }
    }
  });

  // Переконуємося, що body не має горизонтального скролу
  document.body.style.overflowX = 'hidden';

  // Перевіряємо дочірні елементи зображень
  const images = document.querySelectorAll('.img_an-right img, .img_an-left img, .img_anim-3 img, .img_anim-4 img');
  images.forEach(img => {
    img.style.maxWidth = '100%';
    img.style.width = '100%';
    img.style.height = 'auto';
    img.style.objectFit = 'contain';
  });
}

// Виконуємо функцію при завантаженні сторінки
document.addEventListener('DOMContentLoaded', fixHorizontalScroll);

// Виконуємо функцію при зміні розміру вікна
window.addEventListener('resize', fixHorizontalScroll);

// Виконуємо функцію при скролі
window.addEventListener('scroll', fixHorizontalScroll);