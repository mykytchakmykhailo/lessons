document.addEventListener('DOMContentLoaded', () => {
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

    let currentIndex = 0;
    const sliderImage = document.getElementById('currentImage');
    const imageWrapper = sliderImage.parentElement; // контейнер картинки
    const links = document.querySelectorAll('.nashe_prace-links li');

    // Кнопки всередині контейнера картинки
    const controls = document.createElement('div');
    controls.className = 'slider-controls';
    controls.innerHTML = `
        <button class="slider-btn prev">⟨</button>
        <button class="slider-btn next">⟩</button>
    `;
    imageWrapper.style.position = 'relative';
    imageWrapper.appendChild(controls);

    function updateImage(index) {
        sliderImage.classList.add('fade-out');
        setTimeout(() => {
            sliderImage.src = images[index];
            links.forEach((li, i) => {
                li.classList.toggle('active', i === index);
            });
            sliderImage.classList.remove('fade-out');
            sliderImage.classList.add('fade-in');
            setTimeout(() => sliderImage.classList.remove('fade-in'), 600);
        }, 300);
    }

    document.querySelector('.slider-btn.prev').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateImage(currentIndex);
    });

    document.querySelector('.slider-btn.next').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateImage(currentIndex);
    });

    links.forEach((li, index) => {
        li.addEventListener('click', () => {
            currentIndex = index;
            updateImage(currentIndex);
        });
    });

    updateImage(currentIndex);
});
