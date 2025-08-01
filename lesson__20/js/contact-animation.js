document.addEventListener('DOMContentLoaded', () => {
  console.log('form-submit.js loaded');
  const form = document.getElementById('contact-form');
  if (form) {
    console.log('Contact form found');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      console.log('Form submission triggered');

      const formData = new FormData(form);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        platforms: formData.get('platforms'),
        country: formData.get('country'),
        service: formData.get('service'),
        message: formData.get('message')
      };
      console.log('Form data:', data);

      try {
        // Заміни URL на твій Formspree endpoint
        const response = await axios.post('https://formspree.io/f/YOUR_FORM_ID', data);
        console.log('Form submitted successfully:', response.data);
        alert('Повідомлення відправлено! Ми зв’яжемося з вами скоро.');
        form.reset();
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Помилка при відправці форми. Спробуйте ще раз.');
      }
    });
  } else {
    console.error('Contact form not found');
  }
});