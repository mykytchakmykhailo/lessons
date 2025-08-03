(function() {
  function blockHorizontalScroll() {
    if (window.innerWidth <= 768) {
      document.body.style.cssText = 'overflow-x: hidden !important; max-width: 100% !important;';
      document.documentElement.style.cssText = 'overflow-x: hidden !important; max-width: 100% !important;';

      document.querySelectorAll('*').forEach(el => {
        el.style.cssText += 'max-width: 100% !important; width: 100% !important; overflow-x: hidden !important; margin-left: 0 !important; left: 0 !important;';
        if (el.tagName === 'IMG') {
          el.style.cssText += 'height: auto !important; object-fit: contain !important;';
        }
        if (getComputedStyle(el).backgroundColor.match(/rgb\(0,\s*0,\s*255\)|#1e90ff|#00b7eb/)) {
          el.style.backgroundColor = 'transparent';
        }
      });

      const style = document.createElement('style');
      style.id = 'block-scroll';
      style.textContent = `
        html, body, * { overflow-x: hidden !important; max-width: 100% !important; width: 100% !important; }
        img, .img_anim-3, .img_an-right, .img_an-left, .img_anim-4, .container, .nav-menu {
          max-width: 100% !important; width: 100% !important; height: auto !important; 
          left: 0 !important; margin-left: 0 !important; overflow-x: hidden !important; 
          position: relative !important; box-sizing: border-box !important;
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