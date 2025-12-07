// Бургер — згорнути/розгорнути
document.getElementById('burgerBtn').addEventListener('click', function () {
	const wrapper = document.getElementById('mapWrapper');
	wrapper.classList.toggle('collapsed');

	// Оновлюємо Leaflet після анімації
	setTimeout(() => {
		if (typeof map !== 'undefined') {
			map.invalidateSize();
		}
	}, 550);
});