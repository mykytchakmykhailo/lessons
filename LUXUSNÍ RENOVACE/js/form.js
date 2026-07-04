  document.getElementById("contactForm").addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("name").value;
            const phone = document.getElementById("phone").value;
            const email = document.getElementById("email").value;
            const message = document.getElementById("message").value;

            const text = `📩 Нова заявка:\n👤 Ім'я: ${name}\n📞 Телефон: ${phone}\n✉️ Email: ${email}\n💬 Повідомлення: ${message}`;

            alert("Форма працює! Тут буде відправка у Telegram ✅");
        });