document.addEventListener("DOMContentLoaded", function () {
    const block = document.querySelector(".main_center-5block");
    const image = block.querySelector("img");
    const text = block.querySelector("p");
  
    // Функція для перевірки видимості елемента
    function checkVisibility() {
      const rect = block.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  
      // Якщо блок у зоні видимості (наприклад, верх блоку нижче верху екрану, але вище низу)
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        image.classList.add("visible"); // Показуємо картинку
        text.classList.add("visible");  // Показуємо текст
      }
    }
  
    // Перевірка при скролі
    window.addEventListener("scroll", checkVisibility);
  
    // Перевірка одразу після завантаження (якщо блок уже видимий)
    checkVisibility();
  });