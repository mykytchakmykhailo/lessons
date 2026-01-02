import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

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

// Google
document.getElementById('google-btn').onclick = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    await handleLogin(result.user);
  } catch (e) {
    alert('Google помилка: ' + e.message);
  }
};

// Facebook
document.getElementById('fb-btn').onclick = async () => {
  try {
    const provider = new FacebookAuthProvider();
    const result = await signInWithPopup(auth, provider);
    await handleLogin(result.user);
  } catch (e) {
    alert('Facebook помилка: ' + e.message);
  }
};

async function handleLogin(user) {
  const userRef = doc(db, "players", user.uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    await setDoc(userRef, {
      name: user.displayName || 'Гравець',
      photo: user.photoURL || '',
      joined: new Date(),
      username: null,           // ще не вибрано
      progress: {
        completedStories: [],
        achievements: [],
        totalScore: 0
      }
    });
    window.location.href = 'choose-nickname.html';
    return;
  }

  const data = snap.data();

  // Якщо нік вже є — одразу на головну
  if (data.username) {
    localStorage.setItem('currentUserId', user.uid);
    window.location.href = 'main.html';
  } 
  // Якщо немає — на вибір ніку
  else {
    window.location.href = 'choose-nickname.html';
  }
}