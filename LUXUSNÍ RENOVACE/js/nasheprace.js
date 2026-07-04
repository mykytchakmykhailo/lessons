const links = document.querySelectorAll('.nashe_prace-links li');
const currentImageContainer = document.querySelector('.nashe_prace-image');
let currentImage = document.getElementById('currentImage');
let nextImage = null;

// Додаємо категорії
const categories = [
  "Rekonstrukce činžovního bytu", "Rekonstrukce koupelny světlou dlažbou", "Luxusní rekonstrukce koupelny s mramorovou dlažbou", "Rekonstrukce lodžie", "Reconstrukce chodby"
];
links.forEach((link, index) => {
  if (index % 2 === 0) {
    link.setAttribute('data-category', categories[Math.floor(index / 2)]);
  }
  link.addEventListener('mouseenter', () => {
    const newSrc = link.getAttribute('data-img');
    const tempImage = new Image();

    tempImage.onload = () => {
      nextImage.src = newSrc;
      currentImage.style.transition = 'opacity 0.1s ease';
      nextImage.style.transition = 'opacity 0.1s ease';
      currentImage.style.opacity = '0';
      nextImage.style.opacity = '1';

      setTimeout(() => {
        const temp = currentImage;
        currentImage = nextImage;
        nextImage = temp;
        currentImage.style.opacity = '1';
        nextImage.style.opacity = '0';
      }, 100);
    };

    tempImage.onerror = () => {
      console.error('Помилка завантаження зображення:', newSrc);
    };

    tempImage.src = newSrc;
  });
});

// Створюємо другий зображення
if (!nextImage) {
  nextImage = document.createElement('img');
  nextImage.style.opacity = '0';
  nextImage.style.position = 'absolute';
  nextImage.style.width = '100%';
  nextImage.style.height = '100%';
  nextImage.style.objectFit = 'cover';
  nextImage.style.borderRadius = '8px';
  nextImage.style.top = '0';
  nextImage.style.left = '0';
  nextImage.alt = 'Next Project Image';
  currentImageContainer.style.position = 'relative';
  currentImageContainer.appendChild(nextImage);
}