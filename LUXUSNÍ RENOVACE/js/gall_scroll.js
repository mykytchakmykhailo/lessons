document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".gall-grid img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.querySelector(".lightbox-img");
  const closeBtn = document.querySelector(".close-btn");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  let currentIndex = 0;

  // Відкрити лайтбокс
  function openLightbox(index) {
    currentIndex = index;
    lightbox.style.display = "flex";
    lightboxImg.src = images[currentIndex].src;
  }

  // Закрити
  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  // Наступне
  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.src = images[currentIndex].src;
  });

  // Попереднє
  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentIndex].src;
  });

  // Клік по зображенню в галереї
  images.forEach((img, index) => {
    img.addEventListener("click", () => openLightbox(index));
  });

  // Клік поза зображенням — закрити
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  });
});
