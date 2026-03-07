let selectedGender = null;
let currentLook = 0;
let bgMusic = null;

let currentScene = null;
let narratorIndex = 0;
let textIndex = 0;

const looks = {
  boy: ["img/story_1/person/boyz/1.png", "img/story_1/person/boyz/2.png"],
  girl: ["img/story_1/person/girlz/1.png", "img/story_1/person/girlz/2.png"]
};

/* ===== Музика ===== */
function initBackgroundMusic() {
  bgMusic = document.getElementById("bgMusic");
  if (!bgMusic) return console.warn("Елемент <audio id='bgMusic'> не знайдено");
  bgMusic.volume = 0.35;
  bgMusic.loop = true;

  document.addEventListener('click', () => {
    if (bgMusic.paused) bgMusic.play().catch(() => {});
  }, { once: true });
}

function changeMusic(newSrc) {
  if (!bgMusic || bgMusic.src.endsWith(newSrc)) return;
  bgMusic.pause();
  bgMusic.src = newSrc;
  bgMusic.load();
  bgMusic.play().catch(() => {});
}

/* ===== Вибір героя ===== */
document.querySelectorAll("[data-gender]").forEach(btn => {
  btn.onclick = () => {
    selectedGender = btn.dataset.gender;
    document.getElementById("look-select").classList.remove("hidden");
    currentLook = 0;
    updateLook();
    initBackgroundMusic();
  };
});

document.getElementById("prev-look").onclick = () => {
  if (currentLook > 0) currentLook--, updateLook();
};

document.getElementById("next-look").onclick = () => {
  if (currentLook < looks[selectedGender]?.length - 1) currentLook++, updateLook();
};

function updateLook() {
  if (!selectedGender) return;
  document.getElementById("look-preview").src = looks[selectedGender][currentLook];
  document.getElementById("look-label").innerText = `${currentLook + 1} / ${looks[selectedGender].length}`;
}

/* ===== Початок історії ===== */
document.getElementById("start-btn").onclick = () => {
  if (!selectedGender) return alert("Обери героя!");
  document.getElementById("selection-screen").classList.add("hidden");
  document.getElementById("story-screen").classList.remove("hidden");

  document.getElementById("player").src = looks[selectedGender][currentLook];
  if (bgMusic?.paused) bgMusic.play().catch(() => {});
  loadScene("start");
};

/* ===== СЦЕНИ ===== */
const scenes = {
start: {
  bg: "img/story_1/locat/1.jpg",
  music: "img/audio/21.mp3",

  player: { position: "left", offset: "5%" },
  char2: { img: "img/story_1/person/girl/litl.png", position: "right", offset: "5%" },

  lines: [
    { type: "narrator", text: "Зима в Міжгір'ї...", x: "50%", y: "10%" },
    { type: "narrator", text: "Ти знову бачиш той зимовий спогад, що давно зберігався в серці.", x: "50%", y: "15%" },
    { type: "narrator", text: "Сніг хрумтить під ногами, як свіжа скоринка хліба", x: "50%", y: "18%" },
    { type: "narrator", text: "Мороз між ними гострий, чистий, пронизує легені, але не ранить.", x: "50%", y: "21%" },
    { type: "narrator", text: "Він ніби очищає тебе від усього міського бруду, від шуму, від людей.", x: "50%", y: "24%" },
    { type: "narrator", text: "Повітря таке прозоре, що здається, ніби можна побачити, як дихає ліс.", x: "50%", y: "27%" },
    { type: "narrator", text: "Сніг падає повільно, великими м'якими пластівцями. Кожен з них кружляє, ніби має власне життя, шепоче щось давнє, забуте.", x: "50%", y: "30%" },
    { type: "narrator", text: "Він лягає на ялини білим важким покривалом, гілки схиляються під вагою, а потім тихо скидають сніг — і той падає далі, без звуку, ніби ніч сама дихає.", x: "50%", y: "33%" },
    { type: "narrator", text: "Ти йдеш до ялинки, поруч йде твоя молодша сестра.", x: "50%", y: "36%" },

    { type: "player", text: "Пам’ятаєш, як ми грали в сніжки біля хати баби?" },
    { type: "char2", text: "Звичайно! Ти тоді ніколи не хотів програвати." },
    { type: "char2", text: "Ти був повільний!" },
    { type: "char2", text: "Я хотіла, щоб ти впав…" },
    { type: "char2", text: "Ну, не боляче" },
    { type: "char2", text: "Просто щоб ти виглядав смішно, весь у снігу, з червоним носом і розлюченими очима" },

    // наратор після останнього рядка діалогу
    { type: "narrator", text: "Ти смієшся разом із сестрою, а сніг тихо осідає на вашому одязі, роблячи момент ще більш безтурботним.", x: "50%", y: "40%" },
        { type: "narrator", text: "Вона зупиняється, повертається до тебе. Щоки червоні від морозу, ніс трошки тече, але очі світяться — як два маленькі вогники в темряві. Вона нахиляється ближче, шепоче тобі.", x: "50%", y: "40%" },
    { type: "char2", text: "А пам’ятаєш той раз, коли ми побудували снігову фортецю?" },
    { type: "char2", text: "Ти сказав: «Це наша хата, тільки краща за бабину»." },
    { type: "char2", text: "Ми сиділи всередині, пили гарячий чай з термоса, який баба таємно дала, і дивилися, як сніг засипає весь світ." },
    { type: "char2", text: "Ти тоді додав:" },
    { type: "char2", text: "«Коли виростемо, побудуємо справжню хату тут, щоб завжди повертатися»." },
        { type: "player", text: "Я досі пам’ятаю смак того чаю — з малиною і медом." },
    { type: "player", text: "І як ти тоді сказала:" },
    { type: "player", text: "«Але тільки якщо ти не будеш знову красти мої рукавички»" },
    { type: "player", text: "Я ж не крав!" },
    { type: "player", text: "Просто… вони були тепліші." },
    { type: "narrator", text: "Сестра посміхнулася", x: "50%", y: "40%" },
    { type: "char2", text: "Ти завжди крав." },
    { type: "char2", text: "Мої рукавички, шарф, навіть частину ковдри, коли ми спали на печі в бабусі" },
    { type: "char2", text: "А я не сварилася, бо думала:" },
    { type: "char2", text: "Якщо в тебе холодніше руки — значить ти більше мене потребуєш." },
    { type: "char2", text: "Дурна була, правда?" },
    { type: "player", text: "Не дурна." },
    { type: "player", text: "Просто… ти молодша." },
    { type: "player", text: "Але завжди турбуєшся." },
    { type: "player", text: "Я… дякую тобі, сестро." },
    { type: "narrator", text: "Сніг падає повільно, великими пластівцями. Кожен кружляє у повітрі, як маленький танець світла й тіні.", x: "50%", y: "36%" },
    { type: "narrator", text: "І раптом — різкий ривок, темрява автобуса заповнює очі.", x: "50%", y: "36%" },
    { type: "player", text: "?????????????" }

  ],

  choices: [
    { text: "Це був лише сон, ти прокинувся", next: "buss" }
]

},
buss: {
  bg: "img/story_1/locat/2.jpg",
  music: "img/audio/21.mp3",

  player: { position: "left", offset: "5%" },
  char2: { img: "img/story_1/person/girl/litl.png", position: "right", offset: "5%" },

  lines: [
    
    { type: "narrator", text: "Сніг хрумтить під ногами, як свіжа скоринка хліба", x: "50%", y: "18%" },
    { type: "narrator", text: "Мороз між ними гострий, чистий, пронизує легені, але не ранить.", x: "50%", y: "21%" },
    { type: "narrator", text: "Він ніби очищає тебе від усього міського бруду, від шуму, від людей.", x: "50%", y: "24%" },
    { type: "narrator", text: "Повітря таке прозоре, що здається, ніби можна побачити, як дихає ліс.", x: "50%", y: "27%" },
    { type: "narrator", text: "Сніг падає повільно, великими м'якими пластівцями. Кожен з них кружляє, ніби має власне життя, шепоче щось давнє, забуте.", x: "50%", y: "30%" },
    { type: "narrator", text: "Він лягає на ялини білим важким покривалом, гілки схиляються під вагою, а потім тихо скидають сніг — і той падає далі, без звуку, ніби ніч сама дихає.", x: "50%", y: "33%" },
    { type: "narrator", text: "Ти йдеш до ялинки, поруч йде твоя молодша сестра.", x: "50%", y: "36%" },

    { type: "player", text: "Пам’ятаєш, як ми грали в сніжки біля хати баби?" },
    { type: "char2", text: "Звичайно! Ти тоді ніколи не хотів програвати." },
    { type: "char2", text: "Ти був повільний!" },
    { type: "char2", text: "Я хотіла, щоб ти впав…" },
    { type: "char2", text: "Ну, не боляче" },
    { type: "char2", text: "Просто щоб ти виглядав смішно, весь у снігу, з червоним носом і розлюченими очима" },

    // наратор після останнього рядка діалогу
    { type: "narrator", text: "Ти смієшся разом із сестрою, а сніг тихо осідає на вашому одязі, роблячи момент ще більш безтурботним.", x: "50%", y: "40%" },
        { type: "narrator", text: "Вона зупиняється, повертається до тебе. Щоки червоні від морозу, ніс трошки тече, але очі світяться — як два маленькі вогники в темряві. Вона нахиляється ближче, шепоче тобі.", x: "50%", y: "40%" },
    { type: "char2", text: "А пам’ятаєш той раз, коли ми побудували снігову фортецю?" },
    { type: "char2", text: "Ти сказав: «Це наша хата, тільки краща за бабину»." },
    { type: "char2", text: "Ми сиділи всередині, пили гарячий чай з термоса, який баба таємно дала, і дивилися, як сніг засипає весь світ." },
    { type: "char2", text: "Ти тоді додав:" },
    { type: "char2", text: "«Коли виростемо, побудуємо справжню хату тут, щоб завжди повертатися»." },
        { type: "player", text: "Я досі пам’ятаю смак того чаю — з малиною і медом." },
    { type: "player", text: "І як ти тоді сказала:" },
    { type: "player", text: "«Але тільки якщо ти не будеш знову красти мої рукавички»" },
    { type: "player", text: "Я ж не крав!" },
    { type: "player", text: "Просто… вони були тепліші." },
    { type: "narrator", text: "Сестра посміхнулася", x: "50%", y: "40%" },
    { type: "char2", text: "Ти завжди крав." },
    { type: "char2", text: "Мої рукавички, шарф, навіть частину ковдри, коли ми спали на печі в бабусі" },
    { type: "char2", text: "А я не сварилася, бо думала:" },
    { type: "char2", text: "Якщо в тебе холодніше руки — значить ти більше мене потребуєш." },
    { type: "char2", text: "Дурна була, правда?" },
    { type: "player", text: "Не дурна." },
    { type: "player", text: "Просто… ти молодша." },
    { type: "player", text: "Але завжди турбуєшся." },
    { type: "player", text: "Я… дякую тобі, сестро." },
    { type: "narrator", text: "Сніг падає повільно, великими пластівцями. Кожен кружляє у повітрі, як маленький танець світла й тіні.", x: "50%", y: "36%" },
    { type: "narrator", text: "І раптом — різкий ривок, темрява автобуса заповнює очі.", x: "50%", y: "36%" },
    { type: "player", text: "?????????????" }

  ],

  choices: [
    { text: "Це був лише сон, ти прокинувся", next: "buss" }
]

},

  look: {
    bg: "img/story_1/locat/1.jpg",
    music: "img/story_1/audio/mysterious_whispers.mp3",
    player: { position: "left", offset: "5%" },
    char2: { img: "img/story_1/person/boyz/2.png", position: "right", offset: "5%" },
    narrator: [
      { text: "Ти повільно обертаєшся...", x: "50%", y: "15%" }
    ],
    text: [
      { speaker: "player", text: "Він… чи вона? Стоїть нерухомо. Дуже близько." },
      { speaker: "char2", text: "Ти запізнився. Або прийшов занадто рано?" }
    ],
    choices: [
      { text: "Хто ти?", next: "who_are_you" },
      { text: "Що тобі потрібно?", next: "what_do_you_want" }
    ]
  },

  who_are_you: {
    bg: "img/story_1/locat/1.jpg",
    music: "img/story_1/audio/tense_heartbeat.mp3",
    player: { position: "right", offset: "8%" },
    char2: { img: "img/story_1/person/boyz/2.png", position: "left", offset: "5%" },
    narrator: [
      { text: "Постать злегка нахиляє голову...", x: "55%", y: "20%" }
    ],
    text: [
      { speaker: "char2", text: "Ти справді не пам’ятаєш?" },
      { speaker: "player", text: "Це неможливо… ти помер." },
      { speaker: "char2", text: "Смерть — це лише початок." }
    ],
    choices: [
      { text: "Тоді хто ти?", next: "look" }
    ]
  }
};

/* ===== ЛОГІКА СЦЕН ===== */
function loadScene(key) {
  currentScene = scenes[key];
  if (!currentScene) return console.error("Сцена не знайдена:", key);

  narratorIndex = 0;
  textIndex = 0;

const bg = document.getElementById("background");

bg.classList.add("fade");

setTimeout(() => {
  bg.style.backgroundImage = `url(${currentScene.bg})`;
  bg.classList.remove("fade");
}, 2200);
  if (currentScene.music) changeMusic(currentScene.music);

  const player = document.getElementById("player");
  const char2 = document.getElementById("char2");
  const dialogueBox = document.getElementById("dialogue-box");
  const narratorBox = document.getElementById("narrator-box");

  player.classList.add("hidden");
  char2.classList.add("hidden");
  player.classList.remove("visible");
  char2.classList.remove("visible");
  dialogueBox.classList.remove("visible");
  narratorBox.classList.remove("visible");
  narratorBox.classList.add("hidden");

  // Позиціонування гравця
  if (currentScene.player) {
    if (currentScene.player.position === "left") {
      player.style.left = currentScene.player.offset || "0%";
      player.style.right = "auto";
    } else {
      player.style.right = currentScene.player.offset || "0%";
      player.style.left = "auto";
    }
  }

  // Позиціонування char2
  if (currentScene.char2) {
    char2.src = currentScene.char2.img;
    if (currentScene.char2.position === "left") {
      char2.style.left = currentScene.char2.offset || "0%";
      char2.style.right = "auto";
    } else {
      char2.style.right = currentScene.char2.offset || "0%";
      char2.style.left = "auto";
    }
  }

  document.getElementById("choices").innerHTML = "";
  setTimeout(showNextLine, 400);
}

function showNextLine() {
  const dialogueBox = document.getElementById("dialogue-box");
  const dialogueText = document.getElementById("dialogue-text");
  const narratorBox = document.getElementById("narrator-box");
  const narratorText = document.getElementById("narrator-text");
  const player = document.getElementById("player");
  const char2 = document.getElementById("char2");

  if (!currentScene.lines || currentScene.lines.length === 0) return;

  if (textIndex >= currentScene.lines.length) {
    showChoices();
    return;
  }

  const line = currentScene.lines[textIndex];
  textIndex++;

  // Приховуємо всіх спікерів
  player.classList.add("hidden");
  char2.classList.add("hidden");
  dialogueBox.classList.remove("visible");
  narratorBox.classList.remove("visible");

  if (line.type === "narrator") {
    narratorText.innerText = line.text;
    narratorBox.style.left = line.x || "50%";
    narratorBox.style.top = line.y || "10%";
    narratorBox.classList.remove("hidden");
    narratorBox.classList.add("visible");
  } else if (line.type === "player") {
    dialogueText.innerText = line.text;
    player.classList.remove("hidden");
    player.classList.add("visible");
    dialogueBox.style.right = "5%";
    dialogueBox.style.left = "auto";
    dialogueBox.classList.add("visible");
  } else if (line.type === "char2") {
    dialogueText.innerText = line.text;
    char2.classList.remove("hidden");
    char2.classList.add("visible");
    dialogueBox.style.left = "5%";
    dialogueBox.style.right = "auto";
    dialogueBox.classList.add("visible");
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

/* ===== КЛІКИ ===== */
document.getElementById("dialogue-box").addEventListener("click", e => {
  if (e.target.tagName === "BUTTON") return;
  showNextLine();
});

document.getElementById("scene").addEventListener("click", e => {
  if (document.getElementById("choices").children.length > 0) return;
  if (e.target.closest("#choices, #dialogue-box button")) return;
  showNextLine();
});