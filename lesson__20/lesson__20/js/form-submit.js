document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = {
      name: form.name.value,
      email: form.email.value,
      country: form.country.value,
      service: form.service.value,
      message: form.message.value
    };
    fetch(form.action, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(response => {
      if (response.status === 'success') {
        alert('✅ Заявка успішно надіслана!');
        form.reset();
      } else {
        alert('❌ Сталася помилка: ' + (response.message || 'Спробуйте пізніше.'));
      }
    })
    .catch(() => {
      alert('❌ Помилка при надсиланні форми. Спробуйте пізніше.');
    });
  });
});