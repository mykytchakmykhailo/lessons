document.addEventListener('DOMContentLoaded', () => {
  const galleryItems = document.querySelectorAll('.gallery-item a');
  const body = document.body;

  // Створюємо модальне вікно
  const modal = document.createElement('div');
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

  const modalImage = modal.querySelector('.modal-image');
  const closeModal = modal.querySelector('.modal-close');
  const prevButton = modal.querySelector('.modal-prev');
  const nextButton = modal.querySelector('.modal-next');
  let currentIndex = 0;

  // Функція для відкриття модального вікна
  function openModal(index) {
    currentIndex = index;
    modalImage.src = galleryItems[currentIndex].href;
    modalImage.alt = galleryItems[currentIndex].querySelector('img').alt;
    modal.style.display = 'flex';
    body.style.overflow = 'hidden'; // Блокуємо прокрутку
    updateButtons();
  }

  // Функція для оновлення стану кнопок
  function updateButtons() {
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === galleryItems.length - 1;
  }

  // Відкриття модального вікна при кліку на фото
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(index);
    });
  });

  // Закриття модального вікна
  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    body.style.overflow = 'auto'; // Відновлюємо прокрутку
  });

  // Закриття при кліку поза фото
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      body.style.overflow = 'auto';
    }
  });

  // Навігація: попереднє фото
  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      modalImage.src = galleryItems[currentIndex].href;
      modalImage.alt = galleryItems[currentIndex].querySelector('img').alt;
      updateButtons();
    }
  });

  // Навігація: наступне фото
  nextButton.addEventListener('click', () => {
    if (currentIndex < galleryItems.length - 1) {
      currentIndex++;
      modalImage.src = galleryItems[currentIndex].href;
      modalImage.alt = galleryItems[currentIndex].querySelector('img').alt;
      updateButtons();
    }
  });

  // Навігація клавіатурою
  document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'flex') {
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        currentIndex--;
        modalImage.src = galleryItems[currentIndex].href;
        modalImage.alt = galleryItems[currentIndex].querySelector('img').alt;
        updateButtons();
      } else if (e.key === 'ArrowRight' && currentIndex < galleryItems.length - 1) {
        currentIndex++;
        modalImage.src = galleryItems[currentIndex].href;
        modalImage.alt = galleryItems[currentIndex].querySelector('img').alt;
        updateButtons();
      } else if (e.key === 'Escape') {
        modal.style.display = 'none';
        body.style.overflow = 'auto';
      }
    }
  });

  // Додаємо CSS для модального вікна та слайдера
  const style = document.createElement('style');
  style.textContent = `
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
      overflow: auto;
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
});