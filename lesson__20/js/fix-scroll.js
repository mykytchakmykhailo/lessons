(function() {
  function disableHorizontalScroll() {
    if (window.innerWidth <= 768) {
      document.body.style.overflowX = 'hidden';
      document.documentElement.style.overflowX = 'hidden';

      document.querySelectorAll('*').forEach(el => {
        el.style.maxWidth = '100%';
        el.style.width = 'auto';
        el.style.minWidth = 'auto';
        el.style.overflowX = 'hidden';
        el.style.marginLeft = '0';
        el.style.left = '0';

        if (getComputedStyle(el).backgroundColor.match(/rgb\(0,\s*0,\s*255\)|#1e90ff|#00b7eb/)) {
          el.style.backgroundColor = 'transparent';
        }
      });

      ['.img_anim-3', '.img_an-right', '.img_an-left', '.img_anim-4', '.img_anim-4 img', '.img_an-left img', '.img_animation', '.container', '.nav-menu'].forEach(sel => {
        document.querySelectorAll(sel).forEach(el => {
          el.style.maxWidth = '100%';
          el.style.width = '100%';
          el.style.minWidth = 'auto';
          el.style.left = '0';
          el.style.marginLeft = '0';
          el.style.overflowX = 'hidden';
          el.style.position = 'relative';
          el.style.boxSizing = 'border-box';
          if (el.tagName === 'IMG') {
            el.style.height = 'auto';
            el.style.objectFit = 'contain';
          }
        });
      });

      const style = document.createElement('style');
      style.textContent = `
        html, body, * { overflow-x: hidden !important; max-width: 100% !important; box-sizing: border-box !important; }
        img, .img_anim-3, .img_an-right, .img_an-left, .img_anim-4 { max-width: 100% !important; width: 100% !important; height: auto !important; left: 0 !important; margin-left: 0 !important; }
      `;
      document.head.appendChild(style);
    }
  }

  document.addEventListener('DOMContentLoaded', disableHorizontalScroll);
  window.addEventListener('resize', disableHorizontalScroll);
  window.addEventListener('scroll', disableHorizontalScroll);
})();