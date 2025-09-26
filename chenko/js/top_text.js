document.addEventListener('DOMContentLoaded', function() {
    const text = document.querySelector('.overlay-text');
    text.classList.add('show');
    
    setTimeout(() => {
        text.classList.remove('show');
    }, 3000); // Текст зникає через 3 секунди
});