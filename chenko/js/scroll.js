let isScrolling = false;

window.addEventListener("wheel", function (e) {
  e.preventDefault();

  if (!isScrolling) {
    isScrolling = true;

    const scrollDistance = 280; // 🔥 БІЛЬША відстань прокрутки (замість 100)
    const direction = e.deltaY > 0 ? 1 : -1;

    // Тривалість більша = плавніше
    smoothScrollBy(scrollDistance * direction, 800); // 800 мс тривалість

    setTimeout(() => {
      isScrolling = false;
    }, 300); // невелика затримка між скролами
  }
}, { passive: false });

// Плавний скрол з easing
function smoothScrollBy(amount, duration) {
  const start = window.pageYOffset;
  const startTime = performance.now();

  function scrollStep(timestamp) {
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = easeOutQuart(progress); // 🔥 інерційний easing
    window.scrollTo(0, start + amount * ease);

    if (progress < 1) {
      requestAnimationFrame(scrollStep);
    }
  }

  requestAnimationFrame(scrollStep);
}

// Easing-функція з "парінням"
function easeOutQuart(t) {
  return 1 - Math.pow(1 - t, 4);
}
