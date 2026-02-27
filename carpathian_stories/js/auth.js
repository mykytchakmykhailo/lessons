// ─── Глобальні змінні ───
let currentScene = 0;
let affectionAndriyko = 0;   // очки стосунків з Андрійком
let affectionMariyka = 0;    // якщо буде другий LI

const sceneContainer = document.getElementById('scene');
const dialogues = document.getElementById('dialogues');
const portraitLeft = document.getElementById('portrait-left');
const portraitRight = document.getElementById('portrait-right');

// ─── Зміна фону сцени ───
function changeBackground(url) {
  document.documentElement.style.setProperty('--scene-bg', `url('${url}') center/cover no-repeat fixed`);
  sceneContainer.classList.add('scene-transition'); // можна додати анімацію
  setTimeout(() => sceneContainer.classList.remove('scene-transition'), 1800);
}

// ─── Показ/приховування портрету ───
function showPortrait(side, characterId = '') {
  const portrait = side === 'left' ? portraitLeft : portraitRight;
  if (characterId) {
    portrait.src = `characters/${characterId}.png`;
  }
  portrait.classList.remove('hidden');
  portrait.classList.add('visible', 'animate-slide-' + side);
}

function hidePortraits() {
  [portraitLeft, portraitRight].forEach(p => {
    p.classList.remove('visible', 'animate-slide-left', 'animate-slide-right');
    p.classList.add('hidden');
  });
}

// ─── Додавання репліки ───
function addDialogue(text, side = 'left', name = '', delay = 1.2, anim = 'fade-up') {
  const bubble = document.createElement('div');
  bubble.className = `speech-bubble ${side === 'right' ? 'right' : ''} fade-sequence animate-${anim}`;
  bubble.style.setProperty('--delay', delay + 's');

  let content = `<p>${text}</p>`;
  if (name) content = `<div class="speaker-name">${name}</div>` + content;

  bubble.innerHTML = content;
  dialogues.appendChild(bubble);

  setTimeout(() => {
    bubble.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, delay * 1000 + 400);
}

// ─── Додавання вибору ───
function addChoice(title, options, delay = 1.5) {
  const bubble = document.createElement('div');
  bubble.className = 'speech-bubble fade-sequence';
  bubble.style.setProperty('--delay', delay + 's');

  bubble.innerHTML = `
    <p class="choice-title">${title}</p>
    <div class="choices">
      ${options.map((opt, i) => `<button data-choice="${i}">${opt.text}</button>`).join('')}
    </div>
  `;
  dialogues.appendChild(bubble);

  bubble.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      const choiceIndex = parseInt(btn.dataset.choice);
      const selected = options[choiceIndex];

      // ховаємо кнопки
      bubble.querySelector('.choices').innerHTML = '';

      // показуємо, що обрав гравець
      addDialogue(`→ ${selected.text}`, 'right', '', 0.4, 'fade-up');

      // виконуємо наслідки вибору
      if (selected.action) selected.action();

      // перехід до наступної сцени або гілки
      if (selected.nextScene !== undefined) {
        setTimeout(() => loadScene(selected.nextScene), 1200);
      }
    });
  });

  setTimeout(() => bubble.scrollIntoView({ behavior: 'smooth' }), delay * 1000 + 400);
}

// ─── Сцени історії ───
const scenes = [
  // Сцена 0 — Початок
  () => {
    changeBackground('scenes/mukachevo-bridge-fog.jpg');
    hidePortraits();

    addDialogue("Густий туман ковтає Мукачево. Латориця шепоче щось своє...", 0.8, '', 0, 'fade-up');
    addDialogue("Ти стоїш на старому мосту. Холод пробирає крізь куртку.", 2.0, '', 0, 'fade-up');
    addDialogue("Раптом — кроки. Повільні. Хтось іде прямо до тебе.", 3.5, '', 0, 'fade-up');

    addChoice("Що робиш?", [
      { text: "Повернутися і подивитися, хто там", nextScene: 1 },
      { text: "Прискорити крок і йти геть", nextScene: 2 },
      { text: "Сховатися за перилами мосту", nextScene: 3 }
    ], 5.0);
  },

  // Сцена 1 — Подивився
  () => {
    changeBackground('scenes/andriyko-approach.jpg');
    showPortrait('right', 'li-andriyko');

    addDialogue("З туману виходить високий легінь у темному плащі.", 1.0, '', 0, 'slide-right');
    addDialogue("— Добрий вечір... або вже добра ніч? Не бійся, я не вовкулак.", 2.2, 'Андрійко', 0, 'slide-right');

    addChoice("Відповідаєш?", [
      { 
        text: "— А ти хто такий, що серед ночі лякаєш людей?", 
        action: () => { affectionAndriyko += 5; addDialogue("(Андрійко +5 ❤️)", 0.6, '', 0, 'pulse-heart'); },
        nextScene: 4 
      },
      { 
        text: "— Добрий... а ти звідки знаєш, що я боюся?", 
        action: () => { affectionAndriyko += 10; },
        nextScene: 4 
      },
      { 
        text: "Мовчиш і відступаєш назад", 
        action: () => { affectionAndriyko -= 3; },
        nextScene: 5 
      }
    ], 4.0);
  },

  // Сцена 2 — Прискорив крок
  () => {
    changeBackground('scenes/night-street-chase.jpg');

    addDialogue("Ти прискорюєш крок. Кроки позаду — теж.", 1.2, '', 0, 'fade-up');
    addDialogue("— Гей, зачекай! Я не кусаюсь... ну майже.", 2.5, 'Андрійко', 0, 'slide-right');

    addChoice("Зупинитися?", [
      { text: "Зупинитися і обернутися", nextScene: 1 },
      { text: "Бігти ще швидше", nextScene: 6 }
    ], 3.5);
  },

  // Сцена 3 — Сховався
  () => {
    changeBackground('scenes/bridge-shadows.jpg');

    addDialogue("Ти ховаєшся за перилами. Серце калатає.", 1.0, '', 0, 'fade-up');
    addDialogue("Кроки зупиняються зовсім поруч...", 2.8, '', 0, 'fade-up');
    addDialogue("— Я знаю, що ти тут. Виходь, не соромся.", 3.5, 'Андрійко', 0, 'slide-right');

    showPortrait('right', 'li-andriyko');

    addChoice("Що робиш?", [
      { text: "Повільно виходиш", nextScene: 4 },
      { text: "Стрибаєш у воду (жартівливий варіант)", nextScene: 7 }
    ], 4.5);
  },

  // Сцена 4 — Нормальний діалог з Андрійком
  () => {
    changeBackground('scenes/andriyko-close.jpg');
    showPortrait('right', 'li-andriyko');

    addDialogue("— Мене звуть Андрійко. А тебе?", 1.0, 'Андрійко', 0, 'slide-right');
    addDialogue("(Тут можна додати введення імені гравця пізніше)", 2.0, '', 0, 'fade-up');

    addChoice("Представляєшся...", [
      { text: "Називаєш своє ім'я", action: () => affectionAndriyko += 12, nextScene: 8 },
      { text: "Жартуєш і не кажеш", action: () => affectionAndriyko += 6, nextScene: 9 }
    ], 3.0);
  },

  // ... і так далі — додавай нові сцени за номерами
  // Сцена 8 — гарний розвиток стосунків
  () => {
    changeBackground('scenes/night-walk-together.jpg');
    addDialogue("Андрійко посміхається. Ви йдете разом туманними вуличками.", 1.5, '', 0, 'fade-up');
    addDialogue("— Знаєш, я давно не зустрічав/ла такого/таку цікавого/цікаву людину...", 2.8, 'Андрійко', 0, 'slide-right');
    addDialogue(`(Стосунки з Андрійком: ${affectionAndriyko} ❤️)`, 1.0, '', 0, 'pulse-heart');
    // можна продовжити
  }
];

// ─── Запуск першої сцени після вибору персонажа ───
function startStory() {
  dialogues.innerHTML = '';
  hidePortraits();
  currentScene = 0;
  scenes[currentScene]();
}

// Виклик після підтвердження вибору вигляду (в confirmBtn)
confirmBtn.addEventListener('click', () => {
  // ... попередній код ...
  startStory();
});

// Приклад: перехід до сцени
function loadScene(index) {
  if (scenes[index]) {
    dialogues.innerHTML = ''; // очищуємо попередні репліки
    currentScene = index;
    scenes[index]();
  }
}