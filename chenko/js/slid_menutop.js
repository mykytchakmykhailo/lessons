document.addEventListener('DOMContentLoaded', () => {
  const sliderImage = document.getElementById('sliderImage');
  const images = [
    '/img/main/1/2.jpg',
    '/img/main/1/3.jpg', // Додай свої фото сюди
    '/img/main/1/4.jpg',
    '/img/main/1/5.jpg',
    '/img/main/1/6.jpg',
    '/img/main/1/7.jpg',
    '/img/main/1/8.jpg',
    '/img/main/1/9.jpg',
  ];
  let currentImageIndex = 0;

  function changeImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length; // Цикл по масиву
    sliderImage.src = images[currentImageIndex];
  }

  // Запускаємо слайдер кожні 3 секунди
  setInterval(changeImage, 3000);

  // Початковий запуск для плавності (опціонально)
  changeImage();
});