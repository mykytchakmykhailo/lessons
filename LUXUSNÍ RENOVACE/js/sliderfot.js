document.addEventListener('DOMContentLoaded', () => {
    // Перевірка ширини екрана
    if (window.innerWidth > 768) return;

    // Масив зображень
    const images = [
        'img/nasheprace/1.jpg',
        'img/nasheprace/2.jpg',
        'img/nasheprace/3.jpg',
        'img/nasheprace/4.jpg',
        'img/nasheprace/5.jpg',
        'img/nasheprace/6.jpg',
        'img/nasheprace/7.jpg',
        'img/nasheprace/8.jpg',
        'img/nasheprace/9.jpg',
        'img/nasheprace/10.jpg'
    ];

    // Елементи DOM
    const sliderImage = document.getElementById('currentImage');
    const imageWrapper = sliderImage?.parentElement;
    const links = document.querySelectorAll('.nashe_prace-links li');

    // Перевірка наявності необхідних елементів
    if (!sliderImage || !imageWrapper || links.length === 0) {
        console.error('Slider elements not found');
        return;
    }

    let currentIndex = 0;

    // Створення кнопок керування
    const controls = document.createElement('div');
    controls.className = 'slider-controls';
    controls.innerHTML = `
        <button class="slider-btn prev" aria-label="Previous image">⟨</button>
        <button class="slider-btn next" aria-label="Next image">⟩</button>
    `;
    imageWrapper.style.position = 'relative';
    imageWrapper.appendChild(controls);

    // Функція оновлення зображення
    function updateImage(index) {
        if (index < 0 || index >= images.length) return;
        currentIndex = index;
        sliderImage.classList.add('fade-out');
        setTimeout(() => {
            sliderImage.src = images[currentIndex];
            links.forEach((li, i) => li.classList.toggle('active', i === currentIndex));
            sliderImage.classList.remove('fade-out');
            sliderImage.classList.add('fade-in');
            setTimeout(() => sliderImage.classList.remove('fade-in'), 600);
        }, 300);
    }

    // Обробники подій для кнопок
    controls.querySelector('.prev').addEventListener('click', () => {
        updateImage((currentIndex - 1 + images.length) % images.length);
    });

    controls.querySelector('.next').addEventListener('click', () => {
        updateImage((currentIndex + 1) % images.length);
    });

    // Обробники подій для посилань
    links.forEach((li, index) => {
        li.addEventListener('click', () => updateImage(index));
    });

    // Ініціалізація слайдера
    updateImage(currentIndex);
});