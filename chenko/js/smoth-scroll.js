document.addEventListener('DOMContentLoaded', () => {
  // Select all anchor links with a hash (#) in the href
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent default anchor behavior

      const targetId = link.getAttribute('href'); // Get the href value (e.g., #hlav)
      const targetElement = document.querySelector(targetId); // Find the target element

      if (targetElement) {
        // Scroll smoothly to the target element
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});