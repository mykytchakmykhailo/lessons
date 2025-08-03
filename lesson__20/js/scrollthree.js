document.addEventListener('DOMContentLoaded', () => {
    const portfolioSection = document.querySelector('#portfolio');
    const fadeInElements = document.querySelectorAll('#portfolio .fade-in-left-portfolio, #portfolio .fade-in-right-portfolio');

    const checkVisibility = () => {
        const rect = portfolioSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.8 && rect.bottom >= 0) {
            fadeInElements.forEach(element => {
                element.classList.add('visible');
            });
        }
    };

    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Перевірити одразу при завантаженні
});