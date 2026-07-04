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

  const token = '8368855925:AAGcCWLbYAQ-R-3nMyaUyhCCMTgI4Lxa8JY';
  const chatId = '5913453601';
  const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;

  const date = new Date().toLocaleString('uk-UA');
  const text = `Нова заявка (${date}):\nІм'я: ${name}\nТелефон: ${phone}\nEmail: ${email || 'Не вказано'}\nПовідомлення: ${message || 'Не вказано'}`;

  try {
    const response = await axios.post(telegramUrl, {
      chat_id: chatId,
      text: text,
    });

    if (response.data.ok) {
      alert('Повідомлення успішно відправлено!');
      document.getElementById('contactForm').reset();
    } else {
      alert('Помилка при відправленні заявки. Спробуйте ще раз.');
    }
  } catch (error) {
    console.error('Помилка відправки:', error);
    alert('Виникла помилка при відправленні. Перевірте підключення до мережі.');
  }
});