const dialogueBox = document.getElementById("dialogue");
const speaker = document.getElementById("speaker");
const text = document.getElementById("dialogue-text");

function showDialogue(name, message) {
  speaker.textContent = name;
  text.textContent = message;
  dialogueBox.classList.add("active");
}

function hideDialogue() {
  dialogueBox.classList.remove("active");
}