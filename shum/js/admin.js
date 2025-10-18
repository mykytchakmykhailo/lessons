function checkPassword() {
  console.log('Функція checkPassword викликана о', new Date().toLocaleString('uk-UA', { timeZone: 'Europe/Kiev' }));

  // Перевірка наявності елементів
  const passwordInput = document.getElementById('adminPassword');
  const passwordError = document.getElementById('passwordError');
  const passwordPrompt = document.getElementById('passwordPrompt');
  const adminContent = document.getElementById('adminContent');

  console.log('Елементи знайдені:', {
    passwordInput: !!passwordInput,
    passwordError: !!passwordError,
    passwordPrompt: !!passwordPrompt,
    adminContent: !!adminContent
  });

  if (!passwordInput || !passwordError || !passwordPrompt || !adminContent) {
    console.error('Помилка: один із елементів не знайдено!');
    return;
  }

  const passwordValue = passwordInput.value.trim(); // Прибираємо пробіли
  console.log('Введений пароль:', passwordValue ? passwordValue : '[порожньо]');

  const correctPassword = 'shum2025';
  if (passwordValue === correctPassword) {
    console.log('Пароль правильний, змінюємо відображення');
    passwordPrompt.style.display = 'none';
    adminContent.style.display = 'block';
  } else {
    console.log('Пароль неправильний');
    passwordError.style.display = 'block';
  }
}

window.onload = function() {
  console.log('Сторінка admin.html завантажена о', new Date().toLocaleString('uk-UA', { timeZone: 'Europe/Kiev' }));
  const preview = document.getElementById('preview');
  const galleryPreview = document.getElementById('galleryPreview');
  if (galleryPreview) {
    galleryPreview.innerHTML = '<p>Завантажте зображення для галереї.</p>';
  } else {
    console.warn('Елемент galleryPreview не знайдено');
  }

  if (galleryPreview) {
    fetchGalleryImages();
  }
};

async function saveBanner() {
  console.log('Натискання "Зберегти афішу" о', new Date().toLocaleString('uk-UA', { timeZone: 'Europe/Kiev' }));
  const fileInput = document.getElementById('bannerInput');
  const file = fileInput?.files[0];
  const successMessage = document.getElementById('successMessage');
  const errorMessage = document.getElementById('errorMessage');
  const preview = document.getElementById('preview');

  if (!file) {
    console.log('Помилка: файл не вибрано');
    errorMessage.style.display = 'block';
    successMessage.style.display = 'none';
    return;
  }

  if (file.size > 2 * 1024 * 1024) {
    console.log('Помилка: розмір файлу перевищує 2 МБ:', file.size);
    errorMessage.style.display = 'block';
    successMessage.style.display = 'none';
    return;
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'shum');
  formData.append('folder', 'banners');

  try {
    console.log('Відправка запиту до Cloudinary...');
    const response = await fetch(`https://api.cloudinary.com/v1_1/c-f65c836276cf5a43cecb0a74168b4d/image/upload`, {
      method: 'POST',
      body: formData
    });
    const data = await response.json();
    console.log('Відповідь Cloudinary:', data);
    if (data.secure_url) {
      console.log('Афіша завантажена:', data.secure_url);
      preview.src = data.secure_url;
      preview.style.display = 'block';
      successMessage.style.display = 'block';
      errorMessage.style.display = 'none';
      updatePageWithBanner(data.secure_url);
    } else {
      throw new Error('Немає secure_url у відповіді:', data.error?.message || 'невідома помилка');
    }
  } catch (error) {
    console.error('Помилка при завантаженні афіші:', error);
    errorMessage.style.display = 'block';
    successMessage.style.display = 'none';
  }
}

async function saveGalleryImages() {
  console.log('Натискання "Зберегти галерею" о', new Date().toLocaleString('uk-UA', { timeZone: 'Europe/Kiev' }));
  const fileInput = document.getElementById('galleryInput');
  const files = fileInput?.files || [];
  const successMessage = document.getElementById('gallerySuccessMessage');
  const errorMessage = document.getElementById('galleryErrorMessage');
  const galleryPreview = document.getElementById('galleryPreview');

  if (files.length === 0) {
    console.log('Помилка: файли не вибрано');
    errorMessage.style.display = 'block';
    successMessage.style.display = 'none';
    return;
  }

  if (files.length > 300) {
    console.log('Помилка: ліміт 300 зображень');
    errorMessage.style.display = 'block';
    successMessage.style.display = 'none';
    return;
  }

  const newImages = [];
  let hasError = false;

  for (let i = 0; i < files.length; i++) {
    if (files[i].size > 2 * 1024 * 1024) {
      console.log('Помилка: розмір файлу перевищує 2 МБ:', files[i].name, files[i].size);
      errorMessage.textContent = `Помилка: розмір ${files[i].name} перевищує 2 МБ!`;
      errorMessage.style.display = 'block';
      successMessage.style.display = 'none';
      hasError = true;
      break;
    }

    const formData = new FormData();
    formData.append('file', files[i]);
    formData.append('upload_preset', 'shum');
    formData.append('folder', 'gallery');

    try {
      console.log(`Відправка зображення ${i + 1}/${files.length}...`);
      const response = await fetch(`https://api.cloudinary.com/v1_1/c-f65c836276cf5a43cecb0a74168b4d/image/upload`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (data.secure_url) {
        newImages.push(data.secure_url);
        console.log(`Зображення завантажено:`, data.secure_url);
      } else {
        throw new Error('Немає secure_url у відповіді:', data.error?.message || 'невідома помилка');
      }
    } catch (error) {
      console.error('Помилка при завантаженні:', error);
      hasError = true;
      break;
    }
  }

  if (hasError) {
    errorMessage.style.display = 'block';
    successMessage.style.display = 'none';
    return;
  }

  galleryPreview.innerHTML = '';
  newImages.forEach((image, index) => {
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
    removeButton.onclick = () => removeGalleryImage(index, newImages);

    galleryItem.appendChild(img);
    galleryItem.appendChild(removeButton);
    galleryPreview.appendChild(galleryItem);
  });

  successMessage.style.display = 'block';
  errorMessage.style.display = 'none';
  updateGalleryPage(newImages);
}

function removeGalleryImage(index, images) {
  console.log('Видалення зображення з індексом:', index, 'о', new Date().toLocaleString('uk-UA', { timeZone: 'Europe/Kiev' }));
  images.splice(index, 1);
  const galleryPreview = document.getElementById('galleryPreview');
  galleryPreview.innerHTML = '';
  images.forEach((image, i) => {
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
    removeButton.onclick = () => removeGalleryImage(i, images);

    galleryItem.appendChild(img);
    galleryItem.appendChild(removeButton);
    galleryPreview.appendChild(galleryItem);
  });

  updateGalleryPage(images);
  const successMessage = document.getElementById('gallerySuccessMessage');
  successMessage.style.display = 'block';
}

function updatePageWithBanner(url) {
  console.log('Оновіть index.html для афіші:', url, 'о', new Date().toLocaleString('uk-UA', { timeZone: 'Europe/Kiev' }));
}

function updateGalleryPage(images) {
  console.log('Оновіть galery.html для галереї:', images, 'о', new Date().toLocaleString('uk-UA', { timeZone: 'Europe/Kiev' }));
}

function clearBanner() {
  console.log('Очищення афіші о', new Date().toLocaleString('uk-UA', { timeZone: 'Europe/Kiev' }));
  const preview = document.getElementById('preview');
  const successMessage = document.getElementById('successMessage');
  const errorMessage = document.getElementById('errorMessage');
  preview.style.display = 'none';
  successMessage.style.display = 'none';
  errorMessage.style.display = 'block';
}

function clearGalleryImages() {
  console.log('Очищення галереї о', new Date().toLocaleString('uk-UA', { timeZone: 'Europe/Kiev' }));
  const galleryPreview = document.getElementById('galleryPreview');
  const successMessage = document.getElementById('gallerySuccessMessage');
  const errorMessage = document.getElementById('galleryErrorMessage');
  galleryPreview.innerHTML = '<p>Немає зображень у галереї.</p>';
  successMessage.style.display = 'none';
  errorMessage.style.display = 'block';
}

async function fetchGalleryImages() {
  console.log('Завантаження зображень галереї о', new Date().toLocaleString('uk-UA', { timeZone: 'Europe/Kiev' }));
  const galleryPreview = document.getElementById('galleryPreview');
  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/c-f65c836276cf5a43cecb0a74168b4d/resources/image?folder=gallery&max_results=300&api_key=197628645921524`);
    const data = await response.json();
    if (data.resources && data.resources.length > 0) {
      galleryPreview.innerHTML = '';
      data.resources.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.style.display = 'inline-block';
        galleryItem.style.margin = '5px';
        galleryItem.style.width = '150px';

        const img = document.createElement('img');
        img.src = item.secure_url;
        img.alt = `Галерея - зображення ${index + 1}`;
        img.className = 'gallery-img';

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Видалити';
        removeButton.onclick = () => removeGalleryImage(index, data.resources.map(r => r.secure_url));

        galleryItem.appendChild(img);
        galleryItem.appendChild(removeButton);
        galleryPreview.appendChild(galleryItem);
      });
    } else {
      galleryPreview.innerHTML = '<p>Немає зображень у галереї.</p>';
    }
  } catch (error) {
    console.log('Помилка завантаження галереї:', error);
    galleryPreview.innerHTML = '<p>Помилка завантаження галереї.</p>';
  }
}

