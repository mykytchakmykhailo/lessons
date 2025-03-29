// Додаємо анімацію при завантаженні сторінки
document.addEventListener('DOMContentLoaded', function() {
    const element = document.getElementById('main__top_text');
    
    // Початкові стилі
    element.style.position = 'relative';
    element.style.transition = 'all 1s ease-out'; // 1 секунда анімації
    element.style.left = '100vw'; // Починаємо за межами екрану справа
    
    // Запускаємо анімацію через невелику затримку
    setTimeout(() => {
        element.style.left = '0'; // Повертаємо на початкову позицію
    }, 100);
});