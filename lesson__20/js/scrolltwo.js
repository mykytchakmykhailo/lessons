document.addEventListener('DOMContentLoaded', () => {
    const servicesSection = document.querySelector('#services');
    const fadeInElements = document.querySelectorAll('#services .fade-in-left, #services .fade-in-right');

    const checkVisibility = () => {
        const rect = servicesSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.8 && rect.bottom >= 0) {
            fadeInElements.forEach(element => {
                element.classList.add('visible');
            });
        }
    };

    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Перевірити одразу при завантаженні
});