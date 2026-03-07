let selectedGender = null;
let currentLook = 0;
let bgMusic = null;           // посилання на аудіо-елемент

const looks = {
  boy: [
    "img/story_1/person/boyz/1.png",
    "img/story_1/person/boyz/2.png"
  ],
  girl: [
    "img/story_1/person/girlz/1.png",
    "img/story_1/person/girlz/2.png"
  ]
};

/* ===== Ініціалізація музики ===== */
function initBackgroundMusic() {
  bgMusic = document.getElementById("bgMusic");
  if (!bgMusic) {
    console.warn("Елемент <audio id=\"bgMusic\"> не знайдено в HTML");
    return;
  }
  
  bgMusic.volume = 0.35;     // гучність за замовчуванням (можна змінити)
  bgMusic.loop = true;

  // Запускаємо після першої взаємодії користувача (браузери блокують autoplay)
  const tryPlay = () => {
    if (bgMusic.paused) {
      bgMusic.play().catch(err => {
        console.log("Автозапуск заблоковано браузером:", err);
      });
    }
  };

  // Додаємо обробник на будь-який клік по сторінці (один раз)
  document.addEventListener('click', tryPlay, { once: true });
}

/* ===== Зміна музики ===== */
function changeMusic(newSrc) {
  if (!bgMusic) return;
  if (bgMusic.src.endsWith(newSrc)) return; // вже грає цей трек

  bgMusic.pause();
  bgMusic.src = newSrc;
  bgMusic.load();
  bgMusic.play().catch(err => {
    console.log("Помилка відтворення музики:", err);
  });
}

/* ===== ВИБІР ГЕРОЯ ===== */
document.querySelectorAll("[data-gender]").forEach(btn => {
  btn.onclick = () => {
    selectedGender = btn.dataset.gender;
    document.getElementById("look-select").classList.remove("hidden");
    currentLook = 0;
    updateLook();

    // Запускаємо музику після першого кліку (якщо ще не ініціалізовано)
    if (!bgMusic) initBackgroundMusic();
  };
});

/* ===== СЛАЙДЕР ВИГЛЯДУ ===== */
document.getElementById("prev-look").onclick = () => {
  if (currentLook > 0) {
    currentLook--;
    updateLook();
  }
};

document.getElementById("next-look").onclick = () => {
  if (currentLook < looks[selectedGender]?.length - 1) {
    currentLook++;
    updateLook();
  }
};

function updateLook() {
  if (!selectedGender || !looks[selectedGender]) return;
  document.getElementById("look-preview").src = looks[selectedGender][currentLook];
  document.getElementById("look-label").innerText = `${currentLook + 1} / ${looks[selectedGender].length}`;
}

/* ===== ПОЧАТОК ІСТОРІЇ ===== */
document.getElementById("start-btn").onclick = () => {
  if (!selectedGender) {
    alert("Обери героя!");
    return;
  }

  document.getElementById("selection-screen").classList.add("hidden");
  document.getElementById("story-screen").classList.remove("hidden");

  const player = document.getElementById("player");
  player.src = looks[selectedGender][currentLook];
  player.classList.remove("hidden");

  // Якщо музика ще не грає — намагаємось запустити
  if (bgMusic && bgMusic.paused) {
    bgMusic.play().catch(() => {});
  }

  loadScene("start");
};

/* ===== СЦЕНИ ===== */
const scenes = {
  start: {
    bg: "img/story_1/locat/1.jpg",
    music: "audio/s1.mp3",          // музика для першої сцени
    player: { size: "75%", x: "10%" },
    dialogue: { width: "55%", x: "50%", y: "5%" },
    text: [
      "Місто тоне в густому тумані...",
      "Ти стоїш на старому мосту. Холодний вітер пробирає до кісток.",
      "Десь далеко чути, як гуде ріка під ногами… або це не ріка?",
      "Щось не так. Ти це відчуваєш шкірою."
    ],
    choices: [
      { text: "Обернутися", next: "look" },
      { text: "Піти вперед, не озираючись", next: "go_forward" }
    ]
  },

  look: {

    
    bg: "img/story_1/locat/1.jpg",
    music: "img/story_1/audio/mysterious_whispers.mp3",   // інша музика тут
    player: { size: "60%", x: "5%" },
    char2: { 
      img: "img/story_1/person/boyz/2.png",
      size: "82%"
    },
    dialogue: { width: "42%", x: "12%", y: "18%" },
    text: [
      "Ти повільно обертаєшся…",
      "Позаду стоїть темна постать. Туман обволікає її, але ти бачиш обриси.",
      "Він… чи вона? Стоїть нерухомо. Дуже близько.",
      "Голос — тихий, але пронизує, ніби говорить прямо в голові:",
      "«Ти запізнився.»",
      "«Або… прийшов занадто рано?»"
    ],
    choices: [
      { text: "«Хто ти?»", next: "who_are_you" },
      { text: "«Що тобі потрібно?»", next: "what_do_you_want" },
      { text: "Мовчки відступити назад", next: "step_back" }
    ]
  },

  // Приклад ще однієї сцени з іншою музикою
  who_are_you: {
    bg: "img/story_1/locat/1.jpg",
    music: "img/story_1/audio/tense_heartbeat.mp3",       // нова музика
    player: { size: "60%", x: "5%" },
    char2: { 
      img: "img/story_1/person/boyz/2.png",
      size: "82%"
    },
    dialogue: { width: "42%", x: "12%", y: "18%" },
    text: [
      "Постать злегка нахиляє голову...",
      "«Ти справді не пам’ятаєш?»"
    ],
    choices: [
      { text: "«Це неможливо… ти помер.»", next: "you_are_dead" }
    ]
  },

  // Додай інші сцени за потребою
};

/* ============================================== */

let currentScene;
let textIndex = 0;

function loadScene(key) {
  currentScene = scenes[key];
  if (!currentScene) {
    console.error("Сцени не знайдено:", key);
    return;
  }

  textIndex = 0;

  document.getElementById("background").style.backgroundImage = `url(${currentScene.bg})`;

  // Зміна музики, якщо вказана для цієї сцени
  if (currentScene.music && bgMusic) {
    changeMusic(currentScene.music);
  }

  const player = document.getElementById("player");
  const char2 = document.getElementById("char2");

  player.style.cssText = "";
  char2.style.cssText = "";

  if (currentScene.player) {
    player.style.height = currentScene.player.size;
    player.style.left = currentScene.player.x;
    player.classList.remove("hidden");
  }

  if (currentScene.char2) {
    char2.src = currentScene.char2.img;
    char2.style.height = currentScene.char2.size;
    player.classList.add("hidden");
    char2.classList.remove("hidden");
  } else {
    char2.classList.add("hidden");
    player.classList.remove("hidden");
  }

  if (currentScene.dialogue) {
    document.documentElement.style.setProperty("--dialogue-width", currentScene.dialogue.width);
    document.documentElement.style.setProperty("--dialogue-x", currentScene.dialogue.x);
    document.documentElement.style.setProperty("--dialogue-y", currentScene.dialogue.y);
  }

  document.getElementById("choices").innerHTML = "";
  showNextText();

  console.log(`Сцена: ${key} | музика: ${currentScene.music || 'не змінено'} | char2 visible: ${!char2.classList.contains("hidden")}`);
}

function showNextText() {
  if (textIndex < currentScene.text.length) {
    document.getElementById("dialogue-text").innerText = currentScene.text[textIndex];
    textIndex++;
  } else {
    showChoices();
  }
}

function showChoices() {
  if (!currentScene.choices?.length) return;

  const box = document.getElementById("choices");
  currentScene.choices.forEach(c => {
    const btn = document.createElement("button");
    btn.textContent = c.text;
    btn.onclick = () => loadScene(c.next);
    box.appendChild(btn);
  });
}

document.getElementById("dialogue-box").addEventListener("click", e => {
  if (e.target.tagName === "BUTTON") return;
  showNextText();
});