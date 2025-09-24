document.addEventListener('DOMContentLoaded', () => {
  const arrows = document.querySelectorAll('.arrow');

  arrows.forEach((arrow) => {
    arrow.addEventListener('click', () => {
      const details = arrow.parentElement.querySelector('.details');
      details.classList.toggle('active');
      arrow.textContent = details.classList.contains('active') ? '↑' : '↓';
    });
  });
});