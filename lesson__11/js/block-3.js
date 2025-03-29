document.addEventListener("scroll", function () {
    const block = document.querySelector(".main_center-3block");
    const rect = block.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    if (rect.top < windowHeight && rect.bottom > 0) {
        block.classList.add("show");
    }
});
