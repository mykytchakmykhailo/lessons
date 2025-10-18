document.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !phone) {
    alert('Будь ласка, заповніть обов’язкові поля: ім’я та телефон.');
    return;
  }

  const token = '8217829849:AAEtDPXNafI9guKBeqpOFlXmhrTlkjVJrFg';
  const chatId = '396238637';
  const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;

  const date = new Date().toLocaleString('uk-UA');
  const text = `Нова заявка (${date}):\nІм'я: ${name}\nТелефон: ${phone}\nEmail: ${email || 'Не вказано'}\nПовідомлення: ${message || 'Не вказано'}`;

  console.log('Відправляємо текст:', text);  // Дебаг: що саме надсилаємо

  try {
    const response = await axios.post(telegramUrl, {
      chat_id: chatId,
      text: text,
    });

    console.log('Повна відповідь API:', response.data);  // Дебаг: що повернув Telegram

    if (response.data.ok) {
      alert('Повідомлення успішно відправлено!');
      document.getElementById('contactForm').reset();
    } else {
      console.error('Помилка від Telegram:', response.data);  // Дебаг помилки
      alert('Помилка при відправленні: ' + (response.data.description || 'Спробуйте ще раз.'));
    }
  } catch (error) {
    console.error('Помилка Axios:', error.response?.data || error.message);  // Дебаг мережі/ Axios
    alert('Виникла помилка при відправленні. Перевірте підключення до мережі.');
  }
});