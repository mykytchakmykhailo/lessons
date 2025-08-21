document.addEventListener('DOMContentLoaded', () => {
  const galleryItems = document.querySelectorAll('.gallery-item a');
  const body = document.body;
  let scrollPosition = 0; // Зберігаємо позицію прокрутки

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

  // Функція для блокування прокрутки
  function lockScroll() {
    scrollPosition = window.scrollY;
    body.style.position = 'fixed';
    body.style.top = `-${scrollPosition}px`;
    body.style.width = '100%';
    body.style.overflow = 'hidden';
    // Додаємо захист від прокрутки для html
    document.documentElement.style.overflow = 'hidden';
  }

  // Функція для розблокування прокрутки
  function unlockScroll() {
    body.style.position = '';
    body.style.top = '';
    body.style.width = '';
    body.style.overflow = '';
    document.documentElement.style.overflow = '';
    window.scrollTo(0, scrollPosition);
  }

  // Функція для відкриття модального вікна
  function openModal(index) {
    currentIndex = index;
    modalImage.src = galleryItems[currentIndex].querySelector('img').src;
    modalImage.alt = galleryItems[currentIndex].querySelector('img').alt;
    modal.style.display = 'flex';
    lockScroll();
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
    unlockScroll();
  });

  // Закриття при кліку поза фото
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      unlockScroll();
    }
  });

  // Навігація: попереднє фото
  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      modalImage.src = galleryItems[currentIndex].querySelector('img').src;
      modalImage.alt = galleryItems[currentIndex].querySelector('img').alt;
      updateButtons();
    }
  });

  // Навігація: наступне фото
  nextButton.addEventListener('click', () => {
    if (currentIndex < galleryItems.length - 1) {
      currentIndex++;
      modalImage.src = galleryItems[currentIndex].querySelector('img').src;
      modalImage.alt = galleryItems[currentIndex].querySelector('img').alt;
      updateButtons();
    }
  });

  // Навігація клавіатурою
  document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'flex') {
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        currentIndex--;
        modalImage.src = galleryItems[currentIndex].querySelector('img').src;
        modalImage.alt = galleryItems[currentIndex].querySelector('img').alt;
        updateButtons();
      } else if (e.key === 'ArrowRight' && currentIndex < galleryItems.length - 1) {
        currentIndex++;
        modalImage.src = galleryItems[currentIndex].querySelector('img').src;
        modalImage.alt = galleryItems[currentIndex].querySelector('img').alt;
        updateButtons();
      } else if (e.key === 'Escape') {
        modal.style.display = 'none';
        unlockScroll();
      }
    }
  });

  // Блокування сенсорної прокрутки
  function preventScroll(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  modal.addEventListener('touchmove', preventScroll, { passive: false });
  modalImage.addEventListener('touchmove', preventScroll, { passive: false });

  // Додаємо CSS для модального вікна
  const style = document.createElement('style');
  style.textContent = `
    .modal {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.8);
      z-index: 2000;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    .modal-content {
      position: relative;
      max-width: 90vw;
      max-height: 90vh;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      box-sizing: border-box;
      padding: 0;
      margin: 0;
    }
    .modal-image {
      max-width: 100%;
      max-height: 80vh;
      height: auto;
      width: auto;
      object-fit: contain;
      border-radius: 10px;
      display: block;
      box-sizing: border-box;
    }
    .modal-close {
      position: absolute;
      top: -40px;
      right: 0;
      color: #fff;
      font-size: 2rem;
      cursor: pointer;
      z-index: 2100;
      padding: 10px;
      line-height: 1;
    }
    .modal-prev, .modal-next {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
      border: none;
      padding: 10px 15px;
      cursor: pointer;
      font-size: 1.5rem;
      border-radius: 5px;
      transition: background 0.3s;
      box-sizing: border-box;
    }
    .modal-prev:hover, .modal-next:hover {
      background: rgba(0, 0, 0, 0.8);
    }
    .modal-prev {
      left: 5px;
    }
    .modal-next {
      right: 5px;
    }
    .modal-prev:disabled, .modal-next:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    @media (max-width: 768px) {
      .modal-content {
        max-width: 95vw;
        max-height: 85vh;
      }
      .modal-image {
        max-height: 70vh;
      }
      .modal-prev, .modal-next {
        padding: 8px 12px;
        font-size: 1.2rem;
      }
      .modal-close {
        top: -35px;
        font-size: 1.8rem;
      }
    }
    @media (max-width: 480px) {
      .modal-content {
        max-width: 98vw;
        max-height: 80vh;
      }
      .modal-image {
        max-height: 65vh;
      }
      .modal-prev, .modal-next {
        padding: 6px 10px;
        font-size: 1rem;
      }
      .modal-close {
        top: -30px;
        font-size: 1.5rem;
      }
    }
  `;
  document.head.appendChild(style);

  // Діагностика: виводимо розміри елементів для перевірки
  modalImage.addEventListener('load', () => {
    console.log('Modal image dimensions:', {
      width: modalImage.offsetWidth,
      height: modalImage.offsetHeight,
      containerWidth: modal.querySelector('.modal-content').offsetWidth,
      containerHeight: modal.querySelector('.modal-content').offsetHeight,
    });
  });
});