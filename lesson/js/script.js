document.addEventListener('DOMContentLoaded', function () {
	console.log("Скрипт працює!");

	const menu = document.querySelector('.header__menu');
	const menuIcon = document.querySelector('.menu__button');

	menuIcon.addEventListener('click', function () {
		console.log("Клік на іконці меню!");
		menu.classList.toggle('active');
	});
});
