// js/banner.js

async function loadBanner() {
  const bannerImage = document.getElementById('bannerImage');
  if (!bannerImage) return;

  try {
    // Отримуємо список зображень з Cloudinary у теці "banner"
    const response = await fetch(
      'https://res.cloudinary.com/dofeufhjd/image/list/banner.json'
    );
    const data = await response.json();

    // Якщо теку порожня — нічого не робимо
    if (!data.resources || data.resources.length === 0) {
      console.warn('📭 Папка "banner" порожня');
      return;
    }

    // Беремо останню завантажену афішу (найновішу)
    const latestBanner = data.resources[data.resources.length - 1];

    // Змінюємо src зображення на сайті
    bannerImage.src = latestBanner.secure_url;
  } catch (error) {
    console.error('Помилка при завантаженні банера:', error);
  }
}

// Завантажуємо банер, коли сторінка готова
document.addEventListener('DOMContentLoaded', loadBanner);
