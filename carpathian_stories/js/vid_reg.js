
  const video = document.querySelector('.bg-video');

  if (video) {
    // чекаємо, поки відео реально почне грати
    video.addEventListener('playing', () => {
      video.playbackRate = 0.60;   // дуже повільно (15% швидкості)
      console.log('Уповільнено до:', video.playbackRate);
    }, { once: true });            // виконується тільки один раз

    // якщо відео вже грає на момент запуску скрипта
    if (!video.paused && video.currentTime > 0) {
      video.playbackRate = 0.60;
      console.log('Уже грає → уповільнено до:', video.playbackRate);
    }
  } else {
    console.error('Відео з класом .bg-video не знайдено');
  }
