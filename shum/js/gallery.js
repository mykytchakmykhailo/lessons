window.onload = function() {
  console.log('Сторінка galery.html завантажена о', new Date().toLocaleString('uk-UA', { timeZone: 'Europe/Kiev' }));
  const galleryContainer = document.getElementById('dynamicGallery');
  galleryContainer.innerHTML = ''; // Очищаємо статичні зображення

  fetch(`https://api.cloudinary.com/v1_1/c-f65c836276cf5a43cecb0a74168b4d/resources/image?folder=gallery&max_results=300&api_key=197628645921524`)
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      return response.json();
    })
    .then(data => {
      if (data.resources && data.resources.length > 0) {
        data.resources.forEach((item) => {
          const galleryItem = document.createElement('div');
          galleryItem.className = 'gallery-item';

          const link = document.createElement('a');
          link.href = item.secure_url;

          const img = document.createElement('img');
          img.src = item.secure_url;
          img.alt = 'Динамічне зображення';
          img.className = 'gallery-img';
          img.style.maxWidth = '100%'; // Додано для адаптивності

          link.appendChild(img);
          galleryItem.appendChild(link);
          galleryContainer.appendChild(galleryItem);
        });
      } else {
        galleryContainer.innerHTML = '<p>Завантажте зображення в адмін-панелі.</p>';
      }
    })
    .catch(error => {
      console.error('Помилка завантаження галереї:', error);
      galleryContainer.innerHTML = '<p>Помилка завантаження. Перевірте консоль.</p>';
    });
};
