document.addEventListener('DOMContentLoaded', () => {
  console.log('Скрипт slider.js завантажено');

  // Створюємо модальне вікно один раз
  const body = document.body;
  let modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="modal-close">&times;</span>
      <img class="modal-image" src="" alt="">
      <button class="modal-prev" aria-label="Попереднє фото">&larr;</button>
      <button class="modal-next" aria-label="Наступне фото">&rarr;</button>
    </div>
  `;
  body.appendChild(modal);

  // Додаємо стилі для слайдера
  const style = document.createElement('style');
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');

    .modal {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      z-index: 2000;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      font-family: 'Comfortaa', sans-serif;
    }
    .modal-content {
      position: relative;
      max-width: 90%;
      max-height: 90vh;
      margin: auto;
    }
    .modal-image {
      width: 100%;
      height: auto;
      max-height: 80vh;
      object-fit: contain;
      border-radius: 10px;
    }
    .modal-close {
      position: absolute;
      top: -30px;
      right: -10px;
      color: #fff;
      font-size: 2rem;
      cursor: pointer;
      z-index: 2100;
      font-family: 'Lobster', sans-serif;
    }
    .modal-prev, .modal-next {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
      border: none;
      padding: 15px;
      cursor: pointer;
      font-size: 2rem;
      border-radius: 5px;
      transition: background 0.3s;
      font-family: 'Comfortaa', sans-serif;
    }
    .modal-prev:hover, .modal-next:hover {
      background: rgba(0, 0, 0, 0.8);
    }
    .modal-prev {
      left: -50px;
    }
    .modal-next {
      right: -50px;
    }
    .modal-prev:disabled, .modal-next:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    @media (max-width: 768px) {
      .modal-prev {
        left: 10px;
      }
      .modal-next {
        right: 10px;
      }
      .modal-image {
        max-height: 70vh;
      }
    }
    @media (max-width: 480px) {
      .modal-prev, .modal-next {
        padding: 10px;
        font-size: 1.5rem;
      }
      .modal-close {
        top: -25px;
        right: 0;
        font-size: 1.5rem;
      }
    }
  `;
  document.head.appendChild(style);

  // Функція ініціалізації слайдера
  window.initSlider = function() {
    console.log('Ініціалізація слайдера');
    const galleryItems = document.querySelectorAll('.gallery-item a');
    const modalImage = modal.querySelector('.modal-image');
    const closeModal = modal.querySelector('.modal-close');
    const prevButton = modal.querySelector('.modal-prev');
    const nextButton = modal.querySelector('.modal-next');
    let currentIndex = 0;

    // Видаляємо старі обробники подій
    const newModal = modal.cloneNode(true);
    modal.parentNode.replaceChild(newModal, modal);
    modal = newModal;
    const newModalImage = modal.querySelector('.modal-image');
    const newCloseModal = modal.querySelector('.modal-close');
    const newPrevButton = modal.querySelector('.modal-prev');
    const newNextButton = modal.querySelector('.modal-next');

    // Функція для відкриття модального вікна
    function openModal(index) {
      currentIndex = index;
      newModalImage.src = galleryItems[currentIndex].href;
      newModalImage.alt = galleryItems[currentIndex].querySelector('img').alt;
      modal.style.display = 'flex';
      body.style.overflow = 'hidden';
      updateButtons();
    }

    // Функція для оновлення стану кнопок
    function updateButtons() {
      newPrevButton.disabled = currentIndex === 0;
      newNextButton.disabled = currentIndex === galleryItems.length - 1;
    }

    // Додаємо обробники подій для всіх зображень
    galleryItems.forEach((item, index) => {
      item.removeEventListener('click', handleClick); // Видаляємо старі обробники
      item.addEventListener('click', handleClick);
      function handleClick(e) {
        e.preventDefault();
        openModal(index);
      }
    });

    // Закриття модального вікна
    newCloseModal.addEventListener('click', () => {
      modal.style.display = 'none';
      body.style.overflow = 'auto';
    });

    // Закриття при кліку поза модальним вікном
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
        body.style.overflow = 'auto';
      }
    });

    // Попереднє зображення
    newPrevButton.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        newModalImage.src = galleryItems[currentIndex].href;
        newModalImage.alt = galleryItems[currentIndex].querySelector('img').alt;
        updateButtons();
      }
    });

    // Наступне зображення
    newNextButton.addEventListener('click', () => {
      if (currentIndex < galleryItems.length - 1) {
        currentIndex++;
        newModalImage.src = galleryItems[currentIndex].href;
        newModalImage.alt = galleryItems[currentIndex].querySelector('img').alt;
        updateButtons();
      }
    });

    // Навігація клавіатурою
    document.removeEventListener('keydown', handleKeydown); // Видаляємо старі обробники
    document.addEventListener('keydown', handleKeydown);
    function handleKeydown(e) {
      if (modal.style.display === 'flex') {
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
          currentIndex--;
          newModalImage.src = galleryItems[currentIndex].href;
          newModalImage.alt = galleryItems[currentIndex].querySelector('img').alt;
          updateButtons();
        } else if (e.key === 'ArrowRight' && currentIndex < galleryItems.length - 1) {
          currentIndex++;
          newModalImage.src = galleryItems[currentIndex].href;
          newModalImage.alt = galleryItems[currentIndex].querySelector('img').alt;
          updateButtons();
        } else if (e.key === 'Escape') {
          modal.style.display = 'none';
          body.style.overflow = 'auto';
        }
      }
    }
  };

  // Викликаємо ініціалізацію слайдера при завантаженні сторінки
  window.initSlider();
});