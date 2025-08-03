(function() {
  function blockHorizontalScroll() {
    if (window.innerWidth <= 768) {
      document.body.style.overflowX = 'hidden !important';
      document.documentElement.style.overflowX = 'hidden !important';

      // Виключаємо меню з обробки
      const menuElements = document.querySelectorAll('.nav-menu, .menu-toggle, .logo, .logo-top, .logo-bottom');
      const allElements = document.querySelectorAll('*:not(.nav-menu):not(.menu-toggle):not(.logo):not(.logo-top):not(.logo-bottom)');

      // Обмежуємо ширину всіх елементів, крім меню
      allElements.forEach(el => {
        el.style.maxWidth = '100% !important';
        el.style.width = '100% !important';
        el.style.overflowX = 'hidden !important';
        el.style.marginLeft = '0 !important';
        el.style.left = '0 !important';
        if (el.tagName === 'IMG') {
          el.style.height = 'auto !important';
          el.style.objectFit = 'contain !important';
        }
        if (getComputedStyle(el).backgroundColor.match(/rgb\(0,\s*0,\s*255\)|#1e90ff|#00b7eb/)) {
          el.style.backgroundColor = 'transparent';
        }
      });

      // Спеціальна обробка проблемних елементів
      ['.img_anim-3', '.img_an-right', '.img_an-left', '.img_anim-4', '.img_anim-4 img', '.img_an-left img', '.img_animation', '.container:not(.nav-menu .container)'].forEach(sel => {
        document.querySelectorAll(sel).forEach(el => {
          el.style.maxWidth = '100% !important';
          el.style.width = '100% !important';
          el.style.height = 'auto !important';
          el.style.left = '0 !important';
          el.style.marginLeft = '0 !important';
          el.style.overflowX = 'hidden !important';
          el.style.position = 'relative !important';
          el.style.boxSizing = 'border-box !important';
        });
      });

      // Додаємо CSS для блокування скролу, виключаючи меню
      const style = document.createElement('style');
      style.id = 'block-scroll';
      style.textContent = `
        @media (max-width: 768px) {
          html, body, *:not(.nav-menu):not(.menu-toggle):not(.logo):not(.logo-top):not(.logo-bottom) {
            overflow-x: hidden !important;
            max-width: 100% !important;
            width: 100% !important;
          }
          img, .img_anim-3, .img_an-right, .img_an-left, .img_anim-4, .container:not(.nav-menu .container) {
            max-width: 100% !important;
            width: 100% !important;
            height: auto !important;
            left: 0 !important;
            margin-left: 0 !important;
            overflow-x: hidden !important;
            position: relative !important;
            background-color: transparent !important;
          }
          nav {
            position: sticky !important;
            top: 0 !important;
            z-index: 100 !important;
          }
        }
      `;
      document.head.appendChild(style);
    } else {
      const existingStyle = document.getElementById('block-scroll');
      if (existingStyle) existingStyle.remove();
    }
  }

  document.addEventListener('DOMContentLoaded', blockHorizontalScroll);
  window.addEventListener('resize', blockHorizontalScroll);
  window.addEventListener('scroll', blockHorizontalScroll);
  setInterval(blockHorizontalScroll, 100);
})();