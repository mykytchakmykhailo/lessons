document.addEventListener('DOMContentLoaded', () => {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const modal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  const closeModal = document.querySelector('.modal-close');

  // Відкривання модального вікна при кліку на зображення
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const imageSrc = item.getAttribute('data-image');
      modalImage.src = imageSrc;
      modal.style.display = 'flex';
    });
  });

  // Закривання модального вікна при кліку на хрестик
  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Закривання модального вікна при кліку поза зображенням
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Анімація появи для елементів галереї
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  galleryItems.forEach(item => observer.observe(item));
});