const messages = [
  {
    id: "msg1",
    text: "Добрий день , Микитчак , де ваші лабораторні?",
    speaker: "kurator",
    delay: 4000
  },
  {
    id: "msg2",
    text: "Добрий день, вони тут, Олександр Миколайович...",
    speaker: "mykytchak",
    delay: 4500
  },
  {
    id: "msg3",
    text: "Аааа, так бачу...",
    speaker: "kurator",
    delay: 3500
  },
  {
    id: "msg4",
    text: "Скільки балів ви би хотіли?",
    speaker: "kurator",
    delay: 4000
  },
  {
    id: "msg5",
    text: "Олександр Микитчак, РІІІІІІВНО 60 балів",
    speaker: "mykytchak",
    delay: 4500
  },
  {
    id: "msg6",
    text: "Без проблем Микитчак, я докладу вам бали щоб було РІІІІВНО 60",
    speaker: "kurator",
    delay: 5500
  },
  {
    id: "msg7",
    text: "ФОСО,дуже сильно подякував Олександр Миколайович!Допобачення!",
    speaker: "mykytchak",
    delay: 5000
  },
  {
    id: "msg8",
    text: "Допобачення",
    speaker: "kurator",
    delay: 5000
  }
];

messages.forEach(msg => {
  msg.delay = Math.floor(msg.delay * 0.85);
});

let currentStep = 0;

function showMessage(step) {
  document.querySelectorAll(".message").forEach(m => {
    m.classList.remove("show");
    m.classList.remove("kurator");
    m.classList.remove("mykytchak");
  });

  const current = messages[step];
  const msg = document.getElementById(current.id);

  msg.textContent = current.text;
  msg.classList.add(current.speaker);

  setTimeout(() => {
    msg.classList.add("show");
  }, 50);

  document.getElementById("kurator").style.opacity =
    current.speaker === "kurator" ? "1" : "0.6";

  document.getElementById("mykytchak").style.opacity =
    current.speaker === "mykytchak" ? "1" : "0.6";
}

function startDialogue() {
  if (currentStep >= messages.length) {
    const music = document.getElementById("bgMusic");

    if (music) {
      music.volume = 0.5;
      music.play().catch(err => console.log(err));
    }

    return;
  }

  showMessage(currentStep);

  currentStep++;

  setTimeout(() => {
    startDialogue();
  }, messages[currentStep - 1].delay);
}

window.onload = () => {
  const kurator = document.getElementById("kurator");
  const mykytchak = document.getElementById("mykytchak");
  const dialogueBox = document.querySelector(".dialogue");
  const labBlock = document.querySelector(".lab");

  setTimeout(() => {
    kurator.classList.add("visible");
  }, 400);

  setTimeout(() => {
    mykytchak.classList.add("visible");
  }, 1100);

  setTimeout(() => {
    startDialogue();
  }, 2300);

  const totalDialogueTime =
    messages.reduce((sum, msg) => sum + msg.delay, 0) + 2300;

  setTimeout(() => {
    dialogueBox.style.transition = "all 1s ease";
    dialogueBox.style.opacity = "0";
    dialogueBox.style.transform = "translateY(30px)";

    setTimeout(() => {
      kurator.style.transition = "all 1.4s ease";
      kurator.style.transform = "translateX(-450px)";
      kurator.style.opacity = "0";

      setTimeout(() => {
        mykytchak.style.transition = "all 1.4s ease";
        mykytchak.style.transform = "translateX(450px)";
        mykytchak.style.opacity = "0";

        setTimeout(() => {
          labBlock.classList.add("show");
        }, 1800);

      }, 400);

    }, 800);

  }, totalDialogueTime);
};