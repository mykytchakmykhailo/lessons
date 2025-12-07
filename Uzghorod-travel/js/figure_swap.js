// Показуємо шторку при завантаженні сторінки
setTimeout(() => {
	document.getElementById('bottomSheet').classList.add('visible');
}, 600);

// Клік по скульптурі — той самий код, що був раніше (залишаємо)
document.querySelectorAll('.grid-item').forEach(item => {
	item.addEventListener('click', async function () {
		// ... (той самий код з маршрутом, що я давав раніше) ...
		// Просто скопіюй попередній обробник кліку сюди
	});
});