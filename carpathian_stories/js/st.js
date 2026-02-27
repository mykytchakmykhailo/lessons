// ────────────── Вибір статі та вигляду ──────────────
const cards = document.querySelectorAll('.card');
const slider = document.getElementById('look-slider');
const currentLook = document.getElementById('current-look');
const lookName = document.getElementById('look-name');
const confirmBtn = document.getElementById('confirm-look');
const selection = document.getElementById('selection');
const storyScreen = document.getElementById('story');

let selectedGender = null;
let currentIndex = 0;
let playerName = "Ти";  // можна буде замінити на введене ім'я пізніше

// Масив виглядів (додай свої PNG)
const looks = {
  boy: [
    'characters/boy-1.png',
    'characters/boy-2.png',
    'characters/boy-3.png',
    'characters/boy-4.png'
  ],
  girl: [
    'characters/girl-1.png',
    'characters/girl-2.png',
    'characters/girl-3.png',
    'characters/girl-4.png'
  ]
};

cards.forEach(card => {
  card.addEventListener('click', () => {
    cards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    selectedGender = card.dataset.gender;

    slider.classList.add('visible');
    currentIndex = 0;
    updateLook();
  });
});

function updateLook() {
  if (!selectedGender) return;
  currentLook.src = looks[selectedGender][currentIndex];
  lookName.textContent = `Варіант ${currentIndex + 1} з ${looks[selectedGender].length}`;
}

document.querySelector('.arrow.left').addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateLook();
  }
});

document.querySelector('.arrow.right').addEventListener('click', () => {
  if (currentIndex < looks[selectedGender]?.length - 1) {
    currentIndex++;
    updateLook();
  }
});

confirmBtn.addEventListener('click', () => {
  if (!selectedGender) return alert('Обери спочатку хлопця чи дівчину!');
  selection.classList.remove('active');
  storyScreen.classList.add('active');
  startStory();
});

// ────────────── Історія ──────────────
function startStory() {
  const dialogues = document.getElementById('dialogues');
  dialogues.innerHTML = '';

  // ──── Початкова сцена ────
  addLine("Туман такий густий, що Латориця ніби дихає під ним. Місяць ледве пробивається.", 0.6, "left");
  addLine("Ти стоїш на старому кам'яному мості в центрі Мукачева. Пахне мокрим каменем і димом з дров.", 1.8, "narrator");
  addLine("З туману чути кроки. Повільні, впевнені. Хтось наближається.", 3.0, "left");
  addLine("— Добрий вечір... або вже добрій ночі? — голос низький, з легким смішком.", 4.5, "right", "Андрійко", "right");

  // Перший вибір
  addChoice("Що відповіси?", [
    { text: "— А ти хто такий файний, що серед ночі блукаєш?", next: "flirt" },
    { text: "— Назвися, бо я вмію кричати голосніше, ніж трембіта.", next: "cautious" },
    { text: "— Ой, та то ти той легінь, що вчора на ринку бербеницю розбив?", next: "joke" }
  ], 6.2);

  // ──── Гілки діалогу ────
  window.storyBranches = {

    flirt: () => {
      addLine("— Ого, язик гострий, подобаєшся мені вже... — Андрійко посміхається, підходить ближче.", 1.0, "right", "Андрійко", "right");
      addLine("— Мене звуть Андрійко. А тебе як кличуть, що такий/така сміливий/смілива?", 1.8, "right", "Андрійко", "right");

      addChoice("Як представишся?", [
        { text: "— " + playerName + "... просто " + playerName + ".", next: "flirt_name_simple" },
        { text: "— Та хто його знає... може й не скажу, якщо не сподобаєшся.", next: "flirt_tease" },
        { text: "— А ти спершу заслужи, щоб я тобі своє ім'я казала/казав.", next: "flirt_challenge" }
      ], 2.5);
    },

    cautious: () => {
      addLine("— Тихо-тихо, не кричи, бо ще Даяла з Пікуя прокинеться й нас обох забере.", 1.0, "right", "Андрійко", "right");
      addLine("— Я Андрійко. Просто... шукав дещо. Тобто когось. Тебе, якщо чесно.", 2.0, "right", "Андрійко", "right");

      addChoice("Що скажеш?", [
        { text: "— Мене? Та ти мене й не знаєш.", next: "cautious_doubt" },
        { text: "— Ой, не починай... всі ви так кажете.", next: "cautious_skeptic" }
      ], 2.5);
    },

    joke: () => {
      addLine("— Ха-ха, бербеницю не я, то брат мій... але репутація летить швидше за мене.", 1.2, "right", "Андрійко", "right");
      addLine("— А ти смішний/смішна. Мені подобається. Хочеш, покажу де справжній бордо наливають, а не ту кислятину з супермаркету?", 2.2, "right", "Андрійко", "right");

      addChoice("Піти з ним?", [
        { text: "— Та ну, пізно вже... краще додому.", next: "joke_refuse" },
        { text: "— А що, кращий бордо, ніж у корчмі на Ракоцій?", next: "joke_interested" }
      ], 2.5);
    },

    // Приклади продовження однієї гілки (flirt)
    flirt_name_simple: () => {
      addLine("— " + playerName + "... гарне ім'я. Як музика на полонині.", 1.0, "right", "Андрійко", "right");
      addLine("— То може пройдемося? Туман розвіється, а я тобі покажу місце, де зірки найближче.", 1.8, "right", "Андрійко", "right");
      addLine("(Андрійко +5 ❤️)", 0.8, "narrator");
    },

    flirt_tease: () => {
      addLine("— Ого, загадкова/загадковий... Люблю такі ігри.", 1.0, "right", "Андрійко", "right");
      addLine("— Добре, тоді я сам здогадаюсь. Але за кожну спробу — по келиху вина.", 1.8, "right", "Андрійко", "right");
      addLine("(Андрійко +8 ❤️, але + трохи підозри)", 0.8, "narrator");
    },

    flirt_challenge: () => {
      addLine("— Виклик прийнято. — Він усміхається ширше, очі блищать.", 1.2, "right", "Андрійко", "right");
      addLine("— Тоді почнемо з малого. Розкажи, що ти любиш більше — едельвейси чи старі легенди?", 2.0, "right", "Андрійко", "right");
    }
  };
}

// ──── Допоміжні функції ────
function addLine(text, delay = 1.2, side = "left", name = "", portrait = "") {
  const dialogues = document.getElementById('dialogues');
  const bubble = document.createElement('div');
  bubble.className = `speech-bubble fade-sequence ${side === 'right' ? 'right' : ''}`;
  bubble.style.setProperty('--delay', delay + 's');

  let content = `<p>${text}</p>`;
  if (name) content = `<div class="speaker-name">${name}</div>` + content;

  bubble.innerHTML = content;
  dialogues.appendChild(bubble);

  if (portrait) {
    document.getElementById('portrait-' + portrait).classList.remove('hidden');
  }

  setTimeout(() => bubble.scrollIntoView({ behavior: 'smooth' }), delay * 1000 + 300);
}

function addChoice(title, options, delay = 1.5) {
  const dialogues = document.getElementById('dialogues');
  const bubble = document.createElement('div');
  bubble.className = 'speech-bubble fade-sequence';
  bubble.style.setProperty('--delay', delay + 's');

  let buttonsHTML = options.map(opt => 
    `<button data-next="${opt.next}">${opt.text}</button>`
  ).join('');

  bubble.innerHTML = `
    <p class="choice-title">${title}</p>
    <div class="choices">${buttonsHTML}</div>
  `;
  dialogues.appendChild(bubble);

  // Обробка вибору
  bubble.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      const nextBranch = btn.dataset.next;
      if (window.storyBranches[nextBranch]) {
        window.storyBranches[nextBranch]();
      } else {
        addLine("Ти обрав: " + btn.textContent + "\n(ця гілка ще в розробці)", 0.6, "right");
      }
      bubble.querySelector('.choices').innerHTML = ''; // ховаємо кнопки після вибору
    });
  });

  setTimeout(() => bubble.scrollIntoView({ behavior: 'smooth' }), delay * 1000 + 400);
}

document.getElementById('back').addEventListener('click', () => {
  storyScreen.classList.remove('active');
  selection.classList.add('active');
  document.querySelectorAll('.portrait').forEach(p => p.classList.add('hidden'));
});