// js/script.js — фінальна версія, яка працює у всіх

let map = L.map("map").setView([48.623, 22.3], 15);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
	maxZoom: 19,
}).addTo(map);

let userMarker = null;
let routeControl = null;

// Віджет відстані (залишаємо твій)
const distanceDisplay = L.control({ position: 'bottomleft' });
distanceDisplay.onAdd = function () {
	const div = L.DomUtil.create('div', 'distance-info');
	div.innerHTML = 'Відстань: 0 м';
	div.style.cssText = 'background:rgba(0,0,0,0.7); color:white; padding:10px 18px; border-radius:12px; font-weight:600; font-size:16px; position:absolute; bottom:60px; left:100px; transform:translateX(-50%); z-index:1000;';
	return div;
};
distanceDisplay.addTo(map);

// Іконки
const yellowIcon = L.icon({
	iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png",
	shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -38]
});

const blueIcon = L.icon({
	iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
	shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
	iconSize: [25, 41],
	iconAnchor: [12, 41]
});

// Функція побудови маршруту (твоя, трохи покращена)
function showRoute(destLat, destLng) {
	if (!userMarker) {
		alert("Спочатку натисни «Я ТУТ»");
		return;
	}

	if (routeControl) map.removeControl(routeControl);

	routeControl = L.Routing.control({
		waypoints: [
			userMarker.getLatLng(),
			L.latLng(destLat, destLng)
		],
		lineOptions: { styles: [{ color: "#ff6b00", weight: 6 }] },
		createMarker: () => null,
		addWaypoints: false,
		show: false
	}).addTo(map);

	routeControl.on('routesfound', e => {
		const distance = e.routes[0].summary.totalDistance;
		const km = (distance / 1000).toFixed(2);
		const minutes = Math.round(distance * 15 / 1000);
		document.querySelector('.distance-info').innerHTML =
			`Відстань: ${km.replace('.', ',')} км<br>Пішки ${minutes} хвилин`;
	});

	map.setView([destLat, destLng], 17);
}

// Кнопка «Я ТУТ»
document.getElementById("locateBtn")?.addEventListener("click", () => {
	map.locate({ setView: true, maxZoom: 17 });
});

map.on("locationfound", e => {
	if (userMarker) userMarker.setLatLng(e.latlng);
	else userMarker = L.marker(e.latlng, { icon: blueIcon }).addTo(map).bindPopup("Ви тут").openPopup();
});

map.on("locationerror", () => alert("Не вдалося отримати локацію"));

// === ГОЛОВНЕ: ДОДАЄМО ВСІ СКУЛЬПТУРИ З МАЛЕНЬКОЮ КРУГЛОЮ ФОТКОЮ В ПОПАПІ ===
sculptures.forEach(s => {
	const marker = L.marker([s.lat, s.lng], { icon: yellowIcon }).addTo(map);

	// Попап: назва зверху + маленька кругла фотка знизу
	marker.bindPopup(`
        <div style="text-align:center; padding:10px 12px 10px; width:100px; font-family:system-ui;">
            <div style="font-weight:600; font-size:14px; margin-bottom:12px; line-height:1.3;">
                ${s.name}
            </div>
            <img src="${s.img}" 
                 onerror="this.style.display='none'"
                 style="width:90px; height:90px; object-fit:cover; border-radius:50%; 
                        border:4px solid white; box-shadow:0 6px 20px rgba(0,0,0,0.4);">
        </div>
    `, {
		maxWidth: 200,
		closeButton: false,
		autoClose: false,
		closeOnClick: false
	});

	// Клік по маркеру
	marker.on("click", () => {
		marker.openPopup();
		showRoute(s.lat, s.lng);
	});

	// Клік по плитці внизу
	const gridItem = document.querySelector(`.grid-item[data-lat="${s.lat}"][data-lng="${s.lng}"]`) ||
		document.querySelector(`.grid-item[data-lat="${s.lat.toFixed(6)}"]`);
	if (gridItem) {
		gridItem.style.cursor = "pointer";
		gridItem.addEventListener("click", () => {
			marker.openPopup();
			showRoute(s.lat, s.lng);
			document.getElementById("bottomSheet")?.classList.remove("visible");
			document.getElementById("mapWrapper")?.classList.remove("collapsed");
		});
	}
});

// Анімація появи карти
const mapWrapper = document.getElementById("mapWrapper");
if (mapWrapper) {
	mapWrapper.style.opacity = 0;
	setTimeout(() => {
		mapWrapper.style.transition = "opacity 2s ease";
		mapWrapper.style.opacity = 1;
	}, 100);
}
// Жорстко обмежуємо карту тільки містом Ужгород
map.setMaxBounds([
	[48.645, 22.245],  // північний-захід
	[48.595, 22.355]   // південний-схід
]);
map.options.minZoom = 14;
map.options.maxZoom = 19;