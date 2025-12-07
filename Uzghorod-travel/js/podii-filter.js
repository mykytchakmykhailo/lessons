function renderList(items) {
	const list = document.getElementById("list");
	list.innerHTML = "";

	if (items.length === 0) {
		list.innerHTML = `<div class="no-events">Подій у цей період немає</div>`;
		return;
	}

	items.forEach(ev => {
		const card = document.createElement("div");
		card.classList.add("card");

		card.innerHTML = `
            <img src="${ev.img || 'img/no-photo.jpg'}" alt="">
            <div class="info">
                <h3>${ev.title}</h3>
                <div class="date">${ev.date_from} — ${ev.date_to}</div>
                <div class="loc">${ev.loc || "Ужгород"}</div>
                <p>${ev.desc || ""}</p>
            </div>
        `;

		list.appendChild(card);
	});
}

// --- ФІЛЬТР ПО ДАТАХ (календар) --------------------

document.getElementById("showRange").addEventListener("click", () => {
	const fromValue = document.getElementById("dateFrom").value;
	const toValue = document.getElementById("dateTo").value;

	if (!fromValue || !toValue) {
		alert("Вибери обидві дати!");
		return;
	}

	const fromDate = new Date(fromValue);
	const toDate = new Date(toValue);

	const result = podii.filter(ev => {
		const df = new Date(ev.date_from);
		const dt = new Date(ev.date_to);

		return dt >= fromDate && df <= toDate;
	});

	renderList(result);
});

// --- ОЧИСТИТИ --------------------

document.getElementById("clear").addEventListener("click", () => {
	document.getElementById("list").innerHTML = "";
	document.getElementById("dateFrom").value = "";
	document.getElementById("dateTo").value = "";
});
