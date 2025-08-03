document.querySelector('.contact-btn[href*="mailto"]').addEventListener('click', function(e) {
    const email = 'mykytchak.mykhailo@student.uzhnu.edu.ua';
    const subject = encodeURIComponent('Запит на обговорення проєкту');
    
    // Перенаправляємо одразу на Gmail, щоб уникнути about:blank
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}`, '_blank');
    e.preventDefault(); // Зупиняємо mailto
});