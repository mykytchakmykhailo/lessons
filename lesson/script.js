document.addEventListener('DOMContentLoaded', function () {
	console.log("Скрипт працює!");

	const menu = document.querySelector('.header__menu');
	const menuIcon = document.getElementById('menu__button'); // Виправлено тут

	menuIcon.addEventListener('click', function () {
		console.log("Клік на іконці меню!");
		menu.classList.toggle('active'); // Виправлено тут
	});
});
