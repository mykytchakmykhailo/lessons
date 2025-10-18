window.onload = function() {
  console.log('Сторінка galery.html завантажена');
  const savedGalleryImages = localStorage.getItem('galleryImages');
  const galleryContainer = document.getElementById('dynamicGallery');

  if (savedGalleryImages) {
    const images = JSON.parse(savedGalleryImages);
    console.log('Завантажено зображення галереї:', images.length, 'зображень');
    images.forEach((image, index) => {
      const galleryItem = document.createElement('div');
      galleryItem.className = 'gallery-item';

      const link = document.createElement('a');
      link.href = image; // Посилання на зображення (base64)

      const img = document.createElement('img');
      img.src = image;
      img.alt = `Динамічне зображення ${index + 1}`;
      img.className = 'gallery-img';

      link.appendChild(img);
      galleryItem.appendChild(link);
      galleryContainer.appendChild(galleryItem);
    });
  } else {
    console.log('Зображення галереї в localStorage не знайдені.');
    galleryContainer.innerHTML = ''; // Динамічна секція порожня
  }
};