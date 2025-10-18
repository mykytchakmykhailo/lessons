function checkPassword() {
  const passwordInput = document.getElementById('adminPassword').value;
  const passwordError = document.getElementById('passwordError');
  const correctPassword = 'shum2025'; // Заміни на пароль для клієнта

  if (passwordInput === correctPassword) {
    document.getElementById('passwordPrompt').style.display = 'none';
    document.getElementById('adminContent').style.display = 'block';
  } else {
    passwordError.textContent = 'Неправильний пароль!';
    passwordError.style.display = 'block';
  }
}

window.onload = function() {
  console.log('Сторінка admin.html завантажена');

  // Завантаження афіші
  const savedBanner = localStorage.getItem('bannerImage');
  const preview = document.getElementById('preview');
  if (savedBanner) {
    console.log('Завантажено афішу:', savedBanner.substring(0, 50) + '...');
    preview.src = savedBanner;
    preview.style.display = 'block';
  } else {
    console.log('Афіша в localStorage не знайдена.');
    preview.style.display = 'none';
  }

  // Завантаження галереї
  const savedGalleryImages = localStorage.getItem('galleryImages');
  const galleryPreview = document.getElementById('galleryPreview');
  if (savedGalleryImages) {
    const images = JSON.parse(savedGalleryImages);
    console.log('Завантажено зображення галереї:', images.length, 'зображень');
    galleryPreview.innerHTML = '';
    images.forEach((image, index) => {
      const galleryItem = document.createElement('div');
      galleryItem.className = 'gallery-item';
      galleryItem.style.display = 'inline-block';
      galleryItem.style.margin = '5px';
      galleryItem.style.width = '150px';

      const img = document.createElement('img');
      img.src = image;
      img.alt = `Галерея - зображення ${index + 1}`;
      img.className = 'gallery-img';

      const removeButton = document.createElement('button');
      removeButton.textContent = 'Видалити';
      removeButton.onclick = () => removeGalleryImage(index);

      galleryItem.appendChild(img);
      galleryItem.appendChild(removeButton);
      galleryPreview.appendChild(galleryItem);
    });
  } else {
    console.log('Зображення галереї в localStorage не знайдені.');
    galleryPreview.innerHTML = '<p>Немає зображень у галереї.</p>';
  }
};

function saveBanner() {
  console.log('Натискання кнопки "Зберегти афішу"');
  const fileInput = document.getElementById('bannerInput');
  const file = fileInput.files[0];
  const successMessage = document.getElementById('successMessage');
  const errorMessage = document.getElementById('errorMessage');
  const preview = document.getElementById('preview');

  if (!file) {
    console.log('Помилка: файл не вибрано.');
    errorMessage.textContent = 'Помилка: виберіть зображення!';
    errorMessage.style.display = 'block';
    successMessage.style.display = 'none';
    return;
  }

  if (file.size > 2 * 1024 * 1024) {
    console.log('Помилка: розмір файлу перевищує 2 МБ:', file.size);
    errorMessage.textContent = 'Помилка: розмір зображення перевищує 2 МБ!';
    errorMessage.style.display = 'block';
    successMessage.style.display = 'none';
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const base64Image = e.target.result;
    console.log('Афіша зчитана:', base64Image.substring(0, 50) + '...');
    localStorage.setItem('bannerImage', base64Image);
    preview.src = base64Image;
    preview.style.display = 'block';
    successMessage.style.display = 'block';
    errorMessage.style.display = 'none';
    console.log('Афіша збережена в localStorage.');
  };
  reader.onerror = function() {
    console.log('Помилка при зчитуванні файлу афіші.');
    errorMessage.textContent = 'Помилка при зчитуванні зображення!';
    errorMessage.style.display = 'block';
    successMessage.style.display = 'none';
  };
  reader.readAsDataURL(file);
}

function saveGalleryImages() {
  console.log('Натискання кнопки "Зберегти зображення галереї"');
  const fileInput = document.getElementById('galleryInput');
  const files = fileInput.files;
  const successMessage = document.getElementById('gallerySuccessMessage');
  const errorMessage = document.getElementById('galleryErrorMessage');
  const galleryPreview = document.getElementById('galleryPreview');

  if (!files || files.length === 0) {
    console.log('Помилка: файли не вибрано.');
    errorMessage.textContent = 'Помилка: виберіть зображення!';
    errorMessage.style.display = 'block';
    successMessage.style.display = 'none';
    return;
  }

  let existingImages = localStorage.getItem('galleryImages') ? JSON.parse(localStorage.getItem('galleryImages')) : [];
  if (existingImages.length + files.length > 300) {
    console.log('Помилка: ліміт у 300 зображень перевищено.');
    errorMessage.textContent = `Помилка: ліміт у 300 зображень перевищено (зараз ${existingImages.length}, додається ${files.length})!`;
    errorMessage.style.display = 'block';
    successMessage.style.display = 'none';
    return;
  }

  const newImages = [];
  let processed = 0;
  galleryPreview.innerHTML = '';

  for (let i = 0; i < files.length; i++) {
    if (files[i].size > 2 * 1024 * 1024) {
      console.log('Помилка: розмір файлу перевищує 2 МБ:', files[i].size);
      errorMessage.textContent = `Помилка: розмір зображення ${files[i].name} перевищує 2 МБ!`;
      errorMessage.style.display = 'block';
      successMessage.style.display = 'none';
      return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
      newImages.push(e.target.result);
      console.log(`Зображення галереї зчитано (${processed + 1}/${files.length}):`, e.target.result.substring(0, 50) + '...');
      processed++;
      if (processed === files.length) {
        const updatedImages = [...existingImages, ...newImages];
        localStorage.setItem('galleryImages', JSON.stringify(updatedImages));
        console.log('Зображення галереї збережено в localStorage:', updatedImages.length, 'зображень');
        successMessage.style.display = 'block';
        errorMessage.style.display = 'none';
        galleryPreview.innerHTML = '';
        updatedImages.forEach((image, index) => {
          const galleryItem = document.createElement('div');
          galleryItem.className = 'gallery-item';
          galleryItem.style.display = 'inline-block';
          galleryItem.style.margin = '5px';
          galleryItem.style.width = '150px';

          const img = document.createElement('img');
          img.src = image;
          img.alt = `Галерея - зображення ${index + 1}`;
          img.className = 'gallery-img';

          const removeButton = document.createElement('button');
          removeButton.textContent = 'Видалити';
          removeButton.onclick = () => removeGalleryImage(index);

          galleryItem.appendChild(img);
          galleryItem.appendChild(removeButton);
          galleryPreview.appendChild(galleryItem);
        });
      }
    };
    reader.onerror = function() {
      console.log('Помилка при зчитуванні файлу галереї.');
      errorMessage.textContent = 'Помилка при зчитуванні зображень!';
      errorMessage.style.display = 'block';
      successMessage.style.display = 'none';
    };
    reader.readAsDataURL(files[i]);
  }
}

function removeGalleryImage(index) {
  console.log('Видалення зображення з індексом:', index);
  let existingImages = localStorage.getItem('galleryImages') ? JSON.parse(localStorage.getItem('galleryImages')) : [];
  existingImages.splice(index, 1);
  localStorage.setItem('galleryImages', JSON.stringify(existingImages));

  const galleryPreview = document.getElementById('galleryPreview');
  galleryPreview.innerHTML = '';
  if (existingImages.length > 0) {
    existingImages.forEach((image, i) => {
      const galleryItem = document.createElement('div');
      galleryItem.className = 'gallery-item';
      galleryItem.style.display = 'inline-block';
      galleryItem.style.margin = '5px';
      galleryItem.style.width = '150px';

      const img = document.createElement('img');
      img.src = image;
      img.alt = `Галерея - зображення ${i + 1}`;
      img.className = 'gallery-img';

      const removeButton = document.createElement('button');
      removeButton.textContent = 'Видалити';
      removeButton.onclick = () => removeGalleryImage(i);

      galleryItem.appendChild(img);
      galleryItem.appendChild(removeButton);
      galleryPreview.appendChild(galleryItem);
    });
  } else {
    galleryPreview.innerHTML = '<p>Немає зображень у галереї.</p>';
  }

  const successMessage = document.getElementById('gallerySuccessMessage');
  successMessage.textContent = 'Зображення видалено!';
  successMessage.style.display = 'block';
}

function clearGalleryImages() {
  console.log('Натискання кнопки "Очистити галерею"');
  localStorage.removeItem('galleryImages');
  const galleryPreview = document.getElementById('galleryPreview');
  const successMessage = document.getElementById('gallerySuccessMessage');
  const errorMessage = document.getElementById('galleryErrorMessage');
  galleryPreview.innerHTML = '<p>Немає зображень у галереї.</p>';
  successMessage.style.display = 'none';
  errorMessage.textContent = 'Галерея очищена. Оновіть galery.html для повернення до статичних зображень.';
  errorMessage.style.display = 'block';
  console.log('Зображення галереї видалено з localStorage.');
}

function clearBanner() {
  console.log('Натискання кнопки "Очистити афішу"');
  localStorage.removeItem('bannerImage');
  const preview = document.getElementById('preview');
  const successMessage = document.getElementById('successMessage');
  const errorMessage = document.getElementById('errorMessage');
  preview.style.display = 'none';
  successMessage.style.display = 'none';
  errorMessage.textContent = 'Афіша очищена. Оновіть index.html або contact.html для повернення до стандартного зображення.';
  errorMessage.style.display = 'block';
  console.log('Афіша видалена з localStorage.');
}