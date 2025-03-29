document.addEventListener("DOMContentLoaded", function () {
    function adaptToScreenSize() {
      const screenWidth = window.innerWidth;
      const images = document.querySelectorAll(".center_1block-img img");
      images.forEach((img) => {
        img.style.animation = screenWidth <= 769 ? "none" : "slide-inside 40s ease infinite";
      });
    }
  
    const observerOptions = {
      root: null,
      threshold: 0.1,
    };
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains("main_center-2block")) {
            entry.target.querySelector(".main_center-2block-left").classList.add("visible");
            entry.target.querySelector(".main_center-2block-right").classList.add("show");
          }
          if (entry.target.classList.contains("main_center-3block")) {
            entry.target.classList.add("show");
          }
          if (entry.target.classList.contains("main_center-4block")) {
            entry.target.classList.add("show");
          }
          if (entry.target.classList.contains("main_center-5block")) {
            entry.target.querySelectorAll("img, p").forEach((el) => el.classList.add("visible"));
          }
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
  
    document.querySelectorAll(".main_center-2block, .main_center-3block, .main_center-4block, .main_center-5block").forEach((block) => {
      observer.observe(block);
    });
  
    adaptToScreenSize();
    window.addEventListener("resize", adaptToScreenSize);
  });