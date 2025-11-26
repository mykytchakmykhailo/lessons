// ==========================
// ІНІЦІАЛІЗАЦІЯ КАРТИ
// ==========================
let map = L.map("map").setView([48.623, 22.3], 15);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
	maxZoom: 19,
}).addTo(map);

// Маркер "Я ТУТ"
let userMarker = null;

// Routing machine
let routeControl = null;

// ==========================
// ВІДЖЕТ ВІДСТАНІ
// ==========================
const distanceDisplay = L.control({ position: 'bottomleft' }); // позиція умовна
distanceDisplay.onAdd = function (map) {
	const div = L.DomUtil.create('div', 'distance-info');
	div.style.position = 'absolute';
	div.style.bottom = '60px'; // підняти над кнопками
	div.style.left = '120px'; // трохи вліво від центру
	div.style.transform = 'translateX(-50%)';
	div.style.background = 'rgba(0,0,0,0.6)';
	div.style.color = 'white';
	div.style.padding = '10px 18px';
	div.style.borderRadius = '12px';
	div.style.fontWeight = '600';
	div.style.fontSize = '16px';
	div.style.zIndex = 1000;
	div.innerHTML = 'Відстань: 0 м';
	return div;
};
distanceDisplay.addTo(map);

// ==========================
// ІКОНКИ
// ==========================
const yellowIcon = L.icon({
	iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png",
	shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
	iconSize: [25, 41],
	iconAnchor: [12, 41]
});

const blueIcon = L.icon({
	iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
	shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
	iconSize: [25, 41],
	iconAnchor: [12, 41]
});

// ==========================
// ФУНКЦІЯ ПОКАЗУ МАРШРУТУ
// ==========================
function showRoute(destLat, destLng) {
	if (!userMarker) {
		alert("Спочатку натисни «Я ТУТ», щоб визначити локацію.");
		return;
	}

	const userPos = userMarker.getLatLng();

	// Видаляємо попередній маршрут
	if (routeControl) map.removeControl(routeControl);

	// Створюємо новий маршрут
	routeControl = L.Routing.control({
		waypoints: [
			L.latLng(userPos.lat, userPos.lng),
			L.latLng(destLat, destLng)
		],
		lineOptions: {
			addWaypoints: false,
			styles: [{ color: "#ff6b00", weight: 5 }]
		},
		createMarker: () => null
	}).addTo(map);

	// Оновлюємо віджет відстані після побудови маршруту
	routeControl.on('routesfound', function (e) {
		const route = e.routes[0];
		const distance = route.summary.totalDistance; // в метрах
		const duration = route.summary.totalTime;     // в секундах

		const km = (distance / 1000).toFixed(2);
		const min = Math.round(duration / 60);

		document.querySelector('.distance-info').innerHTML = `Відстань: ${km} км, ⏱ ${min} хв`;
	});

	map.setView([destLat, destLng], 16);
}

// ==========================
// ОТРИМАННЯ ЛОКАЦІЇ
// ==========================
const locateBtn = document.getElementById("locateBtn");
locateBtn.addEventListener("click", () => {
	locateBtn.disabled = true;
	locateBtn.textContent = "Шукаю...";
	map.locate({ setView: true, maxZoom: 17 });
});

map.on("locationfound", (e) => {
	if (userMarker) map.removeLayer(userMarker);

	userMarker = L.marker(e.latlng, { icon: blueIcon }).addTo(map).bindPopup("Ви тут").openPopup();

	locateBtn.textContent = "Я ТУТ";
	locateBtn.disabled = false;
});

map.on("locationerror", () => {
	alert("Не вдалося отримати локацію 😢");
	locateBtn.textContent = "Я ТУТ";
	locateBtn.disabled = false;
});

// ==========================
// ДОБАВЛЯЄМО МАРКЕРИ СКУЛЬПТУР
// ==========================
sculptures.forEach(s => {
	const marker = L.marker([s.lat, s.lng], { icon: yellowIcon }).addTo(map);
	marker.bindPopup(`<b>${s.name}</b>`);

	// Клік по маркеру — малюємо маршрут
	marker.on("click", () => showRoute(s.lat, s.lng));

	// Клік по картинці в гріді
	const gridItem = document.querySelector(`.grid-item[data-lat="${s.lat}"][data-lng="${s.lng}"]`);
	if (gridItem) {
		gridItem.addEventListener("click", () => {
			showRoute(s.lat, s.lng);
			L.popup()
				.setLatLng([s.lat, s.lng])
				.setContent(`<b>${s.name}</b>`)
				.openOn(map);

			bottomSheet.classList.remove("visible");
			mapWrapper.classList.remove("collapsed");
		});
	}
});

// ==========================
// ШТОРКА
// ==========================
const bottomSheet = document.getElementById("bottomSheet");
const mapWrapper = document.getElementById("mapWrapper");

// Натиснув на "Всі скульптури"
document.querySelector(".sculpture_info").addEventListener("click", () => {
	bottomSheet.classList.add("visible");
	mapWrapper.classList.add("collapsed");
});

// Натиснув на handle шторки
document.querySelector(".handle")?.addEventListener("click", () => {
	bottomSheet.classList.remove("visible");
	mapWrapper.classList.remove("collapsed");
});

// ==========================
// БУРГЕР-МЕНЮ
// ==========================
let burgerBtn = document.getElementById("burgerBtn");
burgerBtn.addEventListener("click", () => {
	burgerBtn.classList.toggle("open");
});

// ==========================
// МАЛЕНЬКА АНІМАЦІЯ
// ==========================
mapWrapper.style.opacity = 0;
setTimeout(() => {
	mapWrapper.style.transition = "opacity 3.6s ease";
	mapWrapper.style.opacity = 1;
}, 200);
