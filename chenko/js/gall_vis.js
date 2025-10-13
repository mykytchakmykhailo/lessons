document.addEventListener("DOMContentLoaded", function () {
  const galleryImages = document.querySelectorAll(".gall-grid img");

  galleryImages.forEach((img, index) => {
    setTimeout(() => {
      img.classList.add("visible");
    }, index * 250); // затримка між появою (150мс між кожним)
  });
});
