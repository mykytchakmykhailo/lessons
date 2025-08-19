document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM завантажено, шукаю елементи'); // Дебаг 1
  const heroImg = document.querySelector('.hero-img');
  const bannerImg = document.querySelector('.banner_wrap img');

  if (!heroImg || !bannerImg) {
    console.error('Помилка: .hero-img або .banner_wrap img не знайдено!', {
      heroImg: heroImg ? 'Знайдено' : 'Не знайдено',
      bannerImg: bannerImg ? 'Знайдено' : 'Не знайдено'
    });
    return;
  }
  console.log('Елементи знайдено:', { heroImg, bannerImg }); // Дебаг 2

  const originalZIndex = getComputedStyle(bannerImg).zIndex || '10'; // Беремо з CSS або 10

  heroImg.addEventListener('click', (e) => {
    console.log('Клік у .hero-img, координати:', e.clientX, e.clientY); // Дебаг 3
    if (window.innerWidth <= 768) {
      console.log('Екран ≤ 768px, змінюю z-index'); // Дебаг 4
      bannerImg.style.zIndex = '7000';
      bannerImg.style.position = 'relative'; // Гарантуємо, що z-index працює
      setTimeout(() => {
        console.log('Повертаю z-index до', originalZIndex); // Дебаг 5
        bannerImg.style.zIndex = originalZIndex;
      }, 5000); // 5 секунд
    } else {
      console.log('Екран > 768px, ефект не застосовується');
    }
  });
});