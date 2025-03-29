document.addEventListener("DOMContentLoaded", function() {
    // Отримуємо всі параграфи
    const paragraphs = document.querySelectorAll("p");

    // Обробляємо кожен параграф
    paragraphs.forEach(p => {
        const originalText = p.textContent;
        
        // Розбиваємо текст на букви і обгортаємо в span
        p.innerHTML = originalText
            .split("")
            .map(char => `<span>${char}</span>`)
            .join("");

        // Отримуємо всі span у поточному параграфі
        const spans = p.querySelectorAll("span");

        // Додаємо обробники подій для кожної букви
        spans.forEach(span => {
            span.addEventListener("mouseover", function() {
                this.style.color = "rgb(0, 0, 0)"; // колір при наведенні
                this.style.transition = "color 0.3s ease"; // плавний перехід
            });

            span.addEventListener("mouseout", function() {
                this.style.color = "rgb(218, 131, 17)"; // повернення до початкового кольору
                this.style.transition = "color 0.3s ease";
            });
        });
    });
});