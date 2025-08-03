document.getElementById('contact-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const platforms = document.getElementById('platforms').value || 'Не вказано';
  const country = document.getElementById('country').value;
  const service = document.getElementById('service').value;
  const message = document.getElementById('message').value;

  const token = '8489868269:AAH6ned7JZDlNxm8pswV9NnJgNA1UXNUe8U';
  const chatId = '-1002886305261'; // Група "Михайло, Оксанулька and MY SITE"
  const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;

  const text = `Нова заявка:\nІм'я: ${name}\nEmail: ${email}\nДодаткові платформи: ${platforms}\nКраїна: ${country}\nПослуга: ${service}\nПовідомлення: ${message}`;

  try {
    await axios.post(telegramUrl, {
      chat_id: chatId,
      text: text
    });
    alert('Повідомлення успішно відправлено!');
    document.getElementById('contact-form').reset();
  } catch (error) {
    console.error('Помилка відправки:', error);
    alert('Сталася помилка при відправці. Спробуйте ще раз.');
  }
});