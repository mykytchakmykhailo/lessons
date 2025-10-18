// js/admin.js

// === 1. Вхід через пароль ===
const PASSWORD = "shumadmin"; // зміни тут на свій реальний пароль

function checkPassword() {
  const input = document.getElementById("adminPassword").value;
  const prompt = document.getElementById("passwordPrompt");
  const content = document.getElementById("adminContent");
  const error = document.getElementById("passwordError");

  if (input === PASSWORD) {
    prompt.style.display = "none";
    content.style.display = "block";
    error.style.display = "none";
  } else {
    error.style.display = "block";
  }
}

// === 2. Завантаження афіші ===
async function saveBanner() {
  const fileInput = document.getElementById("bannerInput");
  const file = fileInput.files[0];
  const success = document.getElementById("successMessage");
  const error = document.getElementById("errorMessage");

  success.style.display = "none";
  error.style.display = "none";

  if (!file) {
    error.style.display = "block";
    return;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "shum_uzgh"); // твій Cloudinary preset
  formData.append("folder", "banner");

  try {
    const response = await fetch("https://api.cloudinary.com/v1_1/dofeufhjd/image/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.secure_url) {
      success.style.display = "block";
      console.log("✅ Афішу оновлено:", data.secure_url);
      alert("✅ Афішу успішно оновлено! Вона з'явиться на головній сторінці.");
    } else {
      error.style.display = "block";
      console.error("Cloudinary error:", data);
    }
  } catch (err) {
    error.style.display = "block";
    console.error("Помилка:", err);
  }
}

// Очистити вибір файлу афіші
function clearBanner() {
  document.getElementById("bannerInput").value = "";
  document.getElementById("preview").src = "";
}

// Попередній перегляд афіші
document.getElementById("bannerInput").addEventListener("change", function (event) {
  const file = event.target.files[0];
  const preview = document.getElementById("preview");

  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      preview.src = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    preview.src = "";
  }
});

// === 3. Завантаження галереї ===
async function saveGalleryImages() {
  const files = document.getElementById("galleryInput").files;
  const success = document.getElementById("gallerySuccessMessage");
  const error = document.getElementById("galleryErrorMessage");
  const galleryPreview = document.getElementById("galleryPreview");

  success.style.display = "none";
  error.style.display = "none";

  if (files.length === 0) {
    error.style.display = "block";
    return;
  }

  for (const file of files) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "shum_uzgh");
    formData.append("folder", "gallery");

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dofeufhjd/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.secure_url) {
        const img = document.createElement("img");
        img.src = data.secure_url;
        img.classList.add("preview-img");
        galleryPreview.appendChild(img);
        console.log("✅ Галерея: додано", data.secure_url);
      } else {
        console.error("Помилка завантаження:", data);
      }
    } catch (err) {
      console.error("Помилка завантаження:", err);
    }
  }

  success.style.display = "block";
  alert("✅ Зображення галереї успішно оновлені!");
}

// Очистити вибір файлів галереї
function clearGalleryImages() {
  document.getElementById("galleryInput").value = "";
  document.getElementById("galleryPreview").innerHTML = "";
}
function saveBanner() {
  const fileInput = document.getElementById("bannerInput");
  const file = fileInput.files[0];

  if (!file) {
    document.getElementById("errorMessage").style.display = "block";
    return;
  }

  // Завантажуємо в Cloudinary
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "your_upload_preset"); // заміни на свій

  fetch("https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", {
    method: "POST",
    body: formData,
  })
    .then(res => res.json())
    .then(data => {
      const imageUrl = data.secure_url;
      localStorage.setItem("bannerUrl", imageUrl); // ⬅️ ось це головне
      document.getElementById("preview").src = imageUrl;
      document.getElementById("successMessage").style.display = "block";
    })
    .catch(() => {
      document.getElementById("errorMessage").style.display = "block";
    });
}
