// Вибираємо елемент
const element = document.querySelector('.main_center-2block-left');

// Функція для перевірки видимості
function checkVisibility() {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    // Якщо елемент у видимій зоні і ще не має класу visible
    if (rect.top <= windowHeight * 0.9 && !element.classList.contains('visible')) {
        element.classList.add('visible');
    }
}

// Перевірка при скролі
window.addEventListener('scroll', checkVisibility);

// Перевірка при завантаженні сторінки
window.addEventListener('load', checkVisibility);

