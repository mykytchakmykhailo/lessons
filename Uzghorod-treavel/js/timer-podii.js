// === ТАЙМЕР ДО НАЙБЛИЖЧОЇ ПОДІЇ ==========================

function startNextEventTimer() {
	const timerBlock = document.getElementById("nextEventTimer");
	if (!timerBlock) return;

	// сьогодні
	const now = new Date();

	// знаходимо найближчу подію, яка ще не почалась
	const upcoming = podii
		.map(ev => ({ ...ev, start: new Date(ev.date_from) }))
		.filter(ev => ev.start > now)
		.sort((a, b) => a.start - b.start)[0];

	if (!upcoming) {
		timerBlock.innerHTML = "Найближчих подій немає";
		return;
	}

	function updateTimer() {
		const now = new Date();
		const diff = upcoming.start - now;

		if (diff <= 0) {
			timerBlock.innerHTML = `🎉 Подія "${upcoming.title}" вже почалася!`;
			clearInterval(interval);
			return;
		}

		const days = Math.floor(diff / (1000 * 60 * 60 * 24));
		const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
		const minutes = Math.floor((diff / (1000 * 60)) % 60);
		const seconds = Math.floor((diff / 1000) % 60);

		timerBlock.innerHTML = `
            ⏳ Найближча подія: <b>${upcoming.title}</b><br>
            Почнеться через: <b>${days} д</b> ${hours} год ${minutes} хв ${seconds} с
        `;
	}

	updateTimer();
	const interval = setInterval(updateTimer, 1000);
}

startNextEventTimer();
