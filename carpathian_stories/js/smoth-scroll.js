// Обробка Google Sign-In (кнопка — це <a>, але Google SDK працює з div)
document.addEventListener('DOMContentLoaded', () => {
  // Google викликає handleCredentialResponse автоматично
  window.handleCredentialResponse = function(response) {
    const data = JSON.parse(atob(response.credential.split('.')[1]));

    localStorage.setItem('userName', data.name || 'Гравець');
    localStorage.setItem('userPicture', data.picture || '');
    localStorage.setItem('userId', data.sub);

    window.location.href = 'game-menu.html';
  };
});