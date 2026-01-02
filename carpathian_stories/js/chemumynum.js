document.addEventListener('DOMContentLoaded', () => {
  const counters = [
    { elem: '.chemumy_2024', target: 24, year: '2023' },
    { elem: '.chemumy_2025', target: 51, year: '2024' }
  ];

  counters.forEach(counter => {
    const el = document.querySelector(counter.elem);
    if (!el) return;

    el.innerHTML = `<div class="counter-number" id="counter-${counter.year}">0</div><div class="counter-text">Clienty</div><div class="year-text">v ${counter.year}</div>`;

    const counterNum = document.getElementById(`counter-${counter.year}`);
    let count = 0;
    const speed = 200;

    function updateCount() {
      if (count < counter.target) {
        count += Math.ceil(counter.target / speed);
        if (count > counter.target) count = counter.target;
        counterNum.textContent = count;
        requestAnimationFrame(updateCount);
      }
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        updateCount();
        observer.disconnect();
      }
    }, { threshold: 0.5 });

    observer.observe(el);
  });
});