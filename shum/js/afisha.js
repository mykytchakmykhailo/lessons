// js/afisha.js
async function loadBanner() {
  try {
    const response = await fetch(
      "https://res.cloudinary.com/dofeufhjd/image/list/banner.json"
    );
    const data = await response.json();

    if (data.resources && data.resources.length > 0) {
      // беремо останню завантажену афішу
      const latest = data.resources[0];
      document.getElementById("bannerImage").src =
        `https://res.cloudinary.com/dofeufhjd/image/upload/${latest.public_id}.${latest.format}`;
      console.log("✅ Афіша оновлена з Cloudinary");
    } else {
      console.warn("⚠️ Афіша не знайдена, використовується запасна");
      document.getElementById("bannerImage").src = "img/main/4.jpg";
    }
  } catch (err) {
    console.error("❌ Помилка при завантаженні афіші:", err);
    document.getElementById("bannerImage").src = "img/main/4.jpg";
  }
}

loadBanner();
