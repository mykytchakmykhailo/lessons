window.onload = function() {
  console.log('Сторінка index.html завантажена (banner.js)');
  const bannerImage = document.getElementById('bannerImage');
  if (!bannerImage) {
    console.error('Помилка: елемент з id="bannerImage" не знайдено!');
    return;
  }
  const savedBanner = localStorage.getItem('bannerImage');
  if (savedBanner) {
    console.log('Завантажено зображення з localStorage:', savedBanner.substring(0, 50) + '...');
    bannerImage.src = savedBanner;
  } else {
    console.log('Зображення з localStorage не знайдено, використовується стандартне: img/main/4.jpg');
    bannerImage.src = 'img/main/4.jpg';
  }
};