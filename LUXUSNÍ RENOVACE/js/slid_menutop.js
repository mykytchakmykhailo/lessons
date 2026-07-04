document.addEventListener('DOMContentLoaded', () => {
  const sliderImage = document.getElementById('sliderImage');
  const images = [
    'img/main/1/2.jpg',
    'img/main/1/3.jpg', // Додай свої фото сюди
    'img/main/1/4.jpg',
    'img/main/1/5.jpg',
    'img/main/1/6.jpg',
    'img/main/1/7.jpg',
    'img/main/1/8.jpg',
    'img/main/1/1.jpg',
  ];
  let currentImageIndex = 0;
  let interval;

  function changeImage() {
    sliderImage.style.opacity = '1';
    
    setTimeout(() => {
      currentImageIndex = (currentImageIndex + 1) % images.length;
      sliderImage.src = images[currentImageIndex];
      sliderImage.style.opacity = '1';
    }, 500); // Половина часу transition
  }

  // Запускаємо слайдер кожні 3 секунди
  interval = setInterval(changeImage, 4000);

  // Початковий запуск для плавності (опціонально)
  changeImage();
});