// auth.js (або login.js) — використовуй type="module"

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

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

// =============================================
// Автоматичне відстеження стану авторизації
// =============================================
onAuthStateChanged(auth, async (user) => {
  if (user) {
    await handleExistingUser(user);
  }
  // Якщо не залогінений — нічого не робимо, чекаємо натискання кнопки
});

// =============================================
// Обробка після успішного логіну
// =============================================
async function handleExistingUser(user) {
  const userRef = doc(db, "players", user.uid);
  const snap = await getDoc(userRef);

  let data;
  if (!snap.exists()) {
    // Новий гравець — створюємо запис
    const defaultData = {
      name: user.displayName || "Новий мандрівник",
      photo: user.photoURL || null,
      email: user.email || null,
      joined: serverTimestamp(),
      username: null,                     // буде вибирати на choose-nickname
      progress: {
        completedStories: [],
        achievements: [],
        totalScore: 0,
        lastPlayed: null
      },
      settings: {
        sound: true,
        language: "uk"
      }
    };

    await setDoc(userRef, defaultData);
    data = defaultData;
  } else {
    data = snap.data();
  }

  // Зберігаємо для швидкого доступу (опціонально)
  localStorage.setItem("currentUserId", user.uid);

  // Ключова логіка редіректу
  if (!data.username) {
    window.location.href = "choose-nickname.html";
  } else {
    window.location.href = "main.html";
  }
}

// =============================================
// Google Sign-In
// =============================================
document.getElementById("google-btn")?.addEventListener("click", async () => {
  try {
    const provider = new GoogleAuthProvider();
    provider.addScope("email"); // можна додати й інші scopes
    // provider.setCustomParameters({ prompt: 'select_account' }); // змусити вибирати акаунт

    const result = await signInWithPopup(auth, provider);
    // handleExistingUser(result.user); — вже обробляється через onAuthStateChanged
  } catch (error) {
    console.error("Google sign-in error:", error);
    alert(getFriendlyErrorMessage(error.code) || "Помилка входу через Google");
  }
});

// =============================================
// Facebook Sign-In
// =============================================
document.getElementById("fb-btn")?.addEventListener("click", async () => {
  try {
    const provider = new FacebookAuthProvider();
    provider.addScope("email");

    await signInWithPopup(auth, provider);
    // знову — onAuthStateChanged зробить всю роботу
  } catch (error) {
    console.error("Facebook sign-in error:", error);
    alert(getFriendlyErrorMessage(error.code) || "Помилка входу через Facebook");
  }
});

// =============================================
// Допоміжна функція — гарні повідомлення
// =============================================
function getFriendlyErrorMessage(code) {
  const messages = {
    "auth/popup-closed-by-user": "Вікно входу було закрите. Спробуй ще раз.",
    "auth/account-exists-with-different-credential":
      "Такий email вже зареєстрований через інший спосіб. Увійди спочатку тим способом, а потім прив'яжи новий.",
    "auth/operation-not-allowed": "Цей спосіб входу не активовано в консолі Firebase.",
    "auth/popup-blocked": "Браузер заблокував спливаюче вікно. Дозволь попапи для цього сайту.",
  };
  return messages[code];
}