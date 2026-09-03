document.addEventListener('DOMContentLoaded', function() {
    const chenkoImage = document.querySelector('.chenko');
    if (chenkoImage) {
        chenkoImage.style.opacity = '0';
        chenkoImage.style.transition = 'opacity 4s ease-in-out';
        setTimeout(() => {
            chenkoImage.style.opacity = '0.8';
        }, 100); // Slight delay to ensure smooth animation
    }
});