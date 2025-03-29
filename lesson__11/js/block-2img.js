document.addEventListener("scroll", function () {
    const imageContainer = document.querySelector(".main_center-2block-right");
    const rect = imageContainer.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    if (rect.top < windowHeight && rect.bottom > 0) {
        imageContainer.classList.add("show");
    }
});
