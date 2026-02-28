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
// ─── Дерево історії ────────────────────────────────────────
const scenes = {
  start: {
    bg: "scenes/night-bridge.jpg",
    leftChar: null,
    rightChar: null,
    texts: [
      { text: "Місто тоне в густому тумані. Місяць майже не видно.", side: "narrator", delay: 0.7 },
      { text: "Ти стоїш посеред старого мосту. Холодний вітер тягне за волосся.", side: "narrator", delay: 2.1 },
      { text: "Раптом чути чіткі кроки... хтось іде до тебе.", side: "narrator", delay: 3.8 }
    ],
    choices: [
      { text: "Обернутися й подивитись", next: "look_back" },
      { text: "Прискорити крок",         next: "hurry" },
      { text: "Сховатися за опорою",     next: "hide" }
    ]
  },

  look_back: {
    bg: "scenes/bridge-shadow-figure.jpg",
    leftChar: null,
    rightChar: "characters/mystery-man.png",
    texts: [
      { text: "Ти різко обертаєшся.", side: "narrator", delay: 0.9 },
      { text: "Перед тобою стоїть висока постать у довгому темному плащі.", side: "narrator", delay: 2.0 },
      { text: "— Нарешті ти тут... — голос низький, трохи хриплий.", side: "right", delay: 3.5 }
    ],
    choices: [
      { text: "— Хто ти такий?",             next: "ask_who" },
      { text: "Вдарити його й тікати",       next: "fight_and_run" },
      { text: "Стояти мовчки й чекати",      next: "wait_silent" }
    ]
  },

  hurry: {
    bg: "scenes/dark-street-fog.jpg",
    leftChar: null,
    rightChar: null,
    texts: [
      { text: "Ти майже біжиш. Серце б’ється в скронях.", side: "narrator" },
      { text: "Але кроки позаду не відстають… вони навіть наближаються.", side: "narrator", delay: 2.8 }
    ],
    choices: [
      { text: "Стрибнути вниз з мосту", next: "jump" },
      { text: "Зупинитись і обернутись", next: "look_back" }
    ]
  },

  // Додай скільки завгодно сцен
  // hide: { ... },
  // ask_who: { ... },
  // fight_and_run: { ... },
};

let currentSceneKey = "start";

function startStory() {
  currentSceneKey = "start";
  renderScene(currentSceneKey);
}

function renderScene(sceneKey) {
  const scene = scenes[sceneKey];
  if (!scene) {
    console.error("Сцени не знайдено:", sceneKey);
    return;
  }

  // Фон
  document.getElementById("scene-container").style.backgroundImage = `url(${scene.bg})`;

  // Персонажі
  const left  = document.getElementById("char-left");
  const right = document.getElementById("char-right");

  if (scene.leftChar) {
    left.src = scene.leftChar;
    left.classList.remove("hidden");
  } else {
    left.classList.add("hidden");
  }

  if (scene.rightChar) {
    right.src = scene.rightChar;
    right.classList.remove("hidden");
  } else {
    right.classList.add("hidden");
  }

  // Очищення діалогів
  const container = document.getElementById("dialogue-container");
  container.innerHTML = "";

  // Додаємо репліки з затримкою
  scene.texts.forEach((item, idx) => {
    setTimeout(() => {
      const bubble = document.createElement("div");
      bubble.className = `speech-bubble ${item.side}`;
      bubble.innerHTML = `<p>${item.text}</p>`;
      container.appendChild(bubble);

      // маленька затримка для анімації
      setTimeout(() => bubble.classList.add("visible"), 80);
    }, (item.delay || 1.4 + idx * 1.6) * 1000);
  });

  // Вибір після останньої репліки
  if (scene.choices?.length > 0) {
    const delayAfterText = scene.texts.length * 1600 + 900;

    setTimeout(() => {
      const choiceBlock = document.createElement("div");
      choiceBlock.className = "speech-bubble narrator visible";

      const title = document.createElement("p");
      title.style.fontWeight = "600";
      title.style.marginBottom = "12px";
      title.textContent = "Що робиш?";
      choiceBlock.appendChild(title);

      const btnContainer = document.createElement("div");
      btnContainer.className = "choices";

      scene.choices.forEach(opt => {
        const btn = document.createElement("button");
        btn.textContent = opt.text;
        btn.onclick = () => {
          currentSceneKey = opt.next;
          renderScene(currentSceneKey);
        };
        btnContainer.appendChild(btn);
      });

      choiceBlock.appendChild(btnContainer);
      container.appendChild(choiceBlock);
    }, delayAfterText);
  }
}

// ─── Запуск історії після вибору вигляду ───────────────────────