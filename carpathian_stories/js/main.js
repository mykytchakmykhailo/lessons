import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCEToRTAs4z8SLW8DIiFMzZYWTZOHfmvhs",
  authDomain: "carpathianstories-b826c.firebaseapp.com",
  projectId: "carpathianstories-b826c",
  storageBucket: "carpathianstories-b826c.firebasestorage.app",
  messagingSenderId: "70281321648",
  appId: "1:70281321648:web:27f819a8453cbf615e6f75",
  measurementId: "G-P83M6BV99E"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Оновлення привітання та прогресу
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = 'index.html';
    return;
  }

  try {
    const playerDoc = await getDoc(doc(db, "players", user.uid));
    
    if (playerDoc.exists()) {
      const data = playerDoc.data();
      
      // Нікнейм (головне джерело)
      const nick = data.username || data.name?.split(' ')[0] || 'Мандрівник';
      document.getElementById('user-nick').textContent = nick;

      // Прогрес (якщо є в базі)
      document.getElementById('completed-stories').textContent = 
        data.progress?.completedStories?.length || 0;
      
      document.getElementById('achievements-count').textContent = 
        data.progress?.achievements?.length || 0;
    } else {
      // Якщо документа чомусь немає — перенаправляємо на вибір ніку
      window.location.href = 'choose-nickname.html';
    }
  } catch (error) {
    console.error("Помилка завантаження даних гравця:", error);
    document.getElementById('user-nick').textContent = 'Таємничий гість';
  }
});

// Функції кнопок (поки заглушки)
function startNewStory() {
  alert('Тут буде вибір сюжету');
  // window.location.href = 'stories.html';
}

function continueLast() {
  alert('Продовжуємо останню історію...');
}

function showAchievements() {
  alert('Сторінка досягнень (ще не готова)');
}

function openShop() {
  alert('Магазин ігорки (в розробці)');
}

function openSettings() {
  alert('Налаштування (звук, мова, тощо)');
}

function logout() {
  if (confirm('Дійсно вийти з акаунту?')) {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        window.location.href = 'index.html';
      })
      .catch((error) => {
        console.error("Помилка виходу:", error);
        alert("Не вдалося вийти. Спробуйте ще раз.");
      });
  }
}