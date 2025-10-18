document.addEventListener('DOMContentLoaded', () => {
  console.log('Скрипт password.js завантажено');
  const passwordPrompt = document.getElementById('passwordPrompt');
  const adminContent = document.getElementById('adminContent');
  const passwordInput = document.getElementById('adminPassword');
  const errorMessage = document.getElementById('passwordError');

  // Пароль (змініть на свій у продакшені)
  const ADMIN_PASSWORD = '123';

  window.checkPassword = function() {
    console.log('Перевірка пароля');
    if (passwordInput.value === ADMIN_PASSWORD) {
      console.log('Пароль правильний');
      passwordPrompt.style.display = 'none';
      adminContent.style.display = 'block';
      errorMessage.style.display = 'none';
    } else {
      console.log('Неправильний пароль');
      errorMessage.style.display = 'block';
      passwordInput.value = '';
    }
  };

  // Дозволяємо вхід по клавіші Enter
  passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      checkPassword();
    }
  });
});