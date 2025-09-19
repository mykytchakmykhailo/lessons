document.addEventListener("DOMContentLoaded", () => {
  const video = document.querySelector(".chemumy_vid video");

  // зменшуємо швидкість (0.5 = у 2 рази повільніше)
  video.playbackRate = 1;

  // автозапуск
  video.play().catch(err => {
    console.log("Автовідтворення заблоковано браузером:", err);
  });

  // плавне повторення
  video.addEventListener("ended", () => {
    video.style.opacity = "0";
    setTimeout(() => {
      video.currentTime = 0;
      video.play();
      video.style.opacity = "1";
    }, 300);
  });
});
