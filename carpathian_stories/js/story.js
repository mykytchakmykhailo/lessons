// Глобальні змінні
let selectedGender = null;
let currentIndex = 0;

const looks = {
  boy: [
    { src: "/img/story_1/person/boyz/1.png",       name: "Повсякденний" },
    { src: "/img/story_1/person/boyz/2.png",       name: "Джинси + футболка" },
    { src: "characters/boy-3.png",                 name: "Темний стиль" },
    { src: "characters/boy-4.png",                 name: "Літній лук" }
  ],
  girl: [
    { src: "characters/girl-1.png",                name: "Повсякденний" },
    { src: "characters/girl-2.png",                name: "Джинси + топ" },
    { src: "characters/girl-3.png",                name: "Готичний" },
    { src: "characters/girl-4.png",                name: "Літній легкий" }
  ]
};

// ─── Вибір статі ───
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    // знімаємо active з усіх карток
    document.querySelectorAll('.card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');

    selectedGender = card.dataset.gender;
    console.log("Обрано стать:", selectedGender);

    // анімація зникнення списку персонажів
    const chars = document.getElementById('characters-list');
    chars.classList.add('fade-out');

    setTimeout(() => {
      chars.style.display = 'none';               // повністю ховаємо після анімації
      const slider = document.getElementById('look-slider');
      slider.classList.remove('hidden');          // показуємо слайдер
      slider.classList.add('visible');            // якщо в CSS є .visible { opacity:1; transform:none; }

      currentIndex = 0;
      updateLook();
    }, 700); // трохи довше, ніж триває fade-out (перевір свій CSS)
  });
});

// ─── Оновлення вигляду ───
function updateLook() {
  if (!selectedGender) {
    console.warn("Стать ще не обрана!");
    return;
  }

  const look = looks[selectedGender][currentIndex];
  if (!look) {
    console.error("Немає вигляду за індексом", currentIndex);
    return;
  }

  const img = document.getElementById('current-look');
  img.style.opacity = '0'; // плавне зникнення

  setTimeout(() => {
    img.src = look.src;
    document.getElementById('look-name').textContent = 
      `${look.name} (${currentIndex + 1} з ${looks[selectedGender].length})`;

    // плавна поява нової картинки
    setTimeout(() => {
      img.style.opacity = '1';
      // показуємо кнопку "Почати", якщо ще не видно
      document.getElementById('confirm-look').classList.remove('hidden');
      console.log("Оновлено вигляд:", look.name, "→", look.src);
    }, 300);
  }, 500);
}

// ─── Стрілки ───
document.querySelector('.arrow.left')?.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateLook();
  }
});

document.querySelector('.arrow.right')?.addEventListener('click', () => {
  if (currentIndex < looks[selectedGender]?.length - 1) {
    currentIndex++;
    updateLook();
  }
});

// ─── Кнопка "Це мій вигляд → Почати" ───
const confirmBtn = document.getElementById('confirm-look');
if (confirmBtn) {
  confirmBtn.addEventListener('click', () => {
    if (!selectedGender) {
      alert("Спочатку обери хлопця чи дівчину!");
      return;
    }

    console.log("Початок історії! Стать:", selectedGender, "Вигляд:", currentIndex);

    const selection = document.getElementById('selection');
    selection.classList.remove('active');
    selection.classList.add('fade-out'); // якщо є анімація зникнення

    setTimeout(() => {
      selection.classList.add('hidden'); // повністю ховаємо
      const story = document.getElementById('story');
      story.classList.remove('hidden');
      
      // невелика затримка для плавності
      setTimeout(() => {
        story.classList.add('active');
        // тут можна запустити startStory() з попередньої версії
        console.log("Екран історії активовано");
      }, 300);
    }, 800);
  });
} else {
  console.error("Кнопка #confirm-look не знайдена в DOM!");
}

// ─── Кнопка "Назад" ───
document.getElementById('back')?.addEventListener('click', () => {
  console.log("Повернення до вибору персонажа");

  const story = document.getElementById('story');
  story.classList.remove('active');
  story.classList.add('fade-out');

  setTimeout(() => {
    story.classList.add('hidden');

    const selection = document.getElementById('selection');
    selection.classList.remove('hidden');
    selection.classList.remove('fade-out');
    
    setTimeout(() => {
      selection.classList.add('active');
      
      // відновлюємо видимий слайдер, якщо був обраний
      if (selectedGender) {
        document.getElementById('characters-list').style.display = 'none';
        document.getElementById('look-slider').classList.remove('hidden');
        document.getElementById('look-slider').classList.add('visible');
        updateLook(); // оновлюємо поточний вигляд
      }
    }, 300);
  }, 700);
});
