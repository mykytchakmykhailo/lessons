document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.burger');
    const menu = document.querySelector('.header-menu');
    const animationDuration = 800; // Час анімації в мілісекундах (0.8s)

    burger.addEventListener('click', function() {
        if (menu.classList.contains('active')) {
            // Закриття меню
            menu.classList.remove('active');
            menu.classList.add('closing');
            setTimeout(() => {
                menu.style.display = 'none';
                menu.classList.remove('closing'); // Прибираємо клас після анімації
            }, animationDuration);
        } else {
            // Відкриття меню
            menu.style.display = 'flex';
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    menu.classList.add('active');
                });
            });
        }
        this.classList.toggle('active');
    });
});