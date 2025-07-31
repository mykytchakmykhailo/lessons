document.addEventListener('DOMContentLoaded', () => {
  console.log('contact-animation.js loaded');
  const formWrapper = document.querySelector('.form-wrapper');
  if (formWrapper) {
    console.log('Form wrapper found');
    setTimeout(() => {
      console.log('Applying visible class after 5 seconds');
      formWrapper.classList.add('visible');
    }, 5000);
  } else {
    console.error('Form wrapper not found');
  }
});