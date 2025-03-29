// Очікуємо завантаження DOM
document.addEventListener("DOMContentLoaded", function () {
    // Функція для перевірки ширини екрану та адаптації
    function adaptToScreenSize() {
      const screenWidth = window.innerWidth;
  
      // Приклади адаптації
      if (screenWidth <= 769) {
        // Додаємо стилі чи класи для малих екранів
        document.querySelectorAll(".center_1block-img img").forEach((img) => {
          img.style.animation = "none"; // Вимикаємо анімацію на малих екранах
        });
      } else {
        // Повертаємо анімацію для великих екранів
        document.querySelectorAll(".center_1block-img img").forEach((img) => {
          img.style.animation = "slide-inside 40s ease infinite";
        });
      }
    }
  
    // Intersection Observer для анімацій при появі елементів
    const observerOptions = {
      root: null, // Відносно вікна браузера
      threshold: 0.1, // 10% елемента має бути видно
    };
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Додаємо класи для активації анімацій
          if (entry.target.classList.contains("main_center-2block")) {
            entry.target
              .querySelector(".main_center-2block-left")
              .classList.add("visible");
            entry.target
              .querySelector(".main_center-2block-right")
              .classList.add("show");
          }
          if (entry.target.classList.contains("main_center-3block")) {
            entry.target.classList.add("show");
          }
          if (entry.target.classList.contains("main_center-4block")) {
            entry.target.classList.add("show");
          }
          if (entry.target.classList.contains("main_center-5block")) {
            entry.target
              .querySelectorAll("img, p")
              .forEach((el) => el.classList.add("visible"));
          }
          // Припиняємо спостереження після активації
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
  
    // Спостерігаємо за блоками
    document.querySelectorAll(".main_center-2block").forEach((block) => {
      observer.observe(block);
    });
    document.querySelectorAll(".main_center-3block").forEach((block) => {
      observer.observe(block);
    });
    document.querySelectorAll(".main_center-4block").forEach((block) => {
      observer.observe(block);
    });
    document.querySelectorAll(".main_center-5block").forEach((block) => {
      observer.observe(block);
    });
  
    // Викликаємо адаптацію при завантаженні та зміні розміру вікна
    adaptToScreenSize();
    window.addEventListener("resize", adaptToScreenSize);
  });