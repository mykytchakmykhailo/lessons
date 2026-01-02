import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { 
  getAuth, 
  onAuthStateChanged, 
  signOut 
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  updateDoc 
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCEToRTAs4z8SLW8DIiFMzZYWTZOHfmvhs",
  authDomain: "carpathianstories-b826c.firebaseapp.com",
  projectId: "carpathianstories-b826c",
  storageBucket: "carpathianstories-b826c.firebasestorage.app",
  messagingSenderId: "70281321648",
  appId: "1:70281321648:web:27f819a8453cbf615e6f75"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Елементи DOM
const avatarImg = document.getElementById('user-avatar');
const nickSpan = document.getElementById('user-nick');
const modal = document.getElementById('avatar-modal');
const fileInput = document.getElementById('new-avatar');
const saveBtn = document.getElementById('save-avatar');
const cancelBtn = document.getElementById('cancel-avatar');
const changeBtn = document.getElementById('change-avatar');
const logoutBtn = document.getElementById('logout-btn');

let currentUid = null;

// Завантаження даних при кожному вході
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = 'index.html';
    return;
  }

  currentUid = user.uid;
  await loadUserProfile();
});

// Завантаження ніку та аватарки з Firestore
async function loadUserProfile() {
  try {
    const userDoc = await getDoc(doc(db, "players", currentUid));
    
    if (userDoc.exists()) {
      const data = userDoc.data();
      nickSpan.textContent = data.username || "Мандрівник";
      avatarImg.src = data.photo || "https://via.placeholder.com/50/333/aaa?text=👤";
    } else {
      nickSpan.textContent = "Новий гравець";
    }
  } catch (error) {
    console.error("Помилка завантаження:", error);
    nickSpan.textContent = "Помилка";
  }
}

// Відкрити модалку
changeBtn.addEventListener('click', () => {
  modal.classList.remove('hidden');
  fileInput.value = '';
});

// Закрити модалку
cancelBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
});

// Збереження нової аватарки
saveBtn.addEventListener('click', async () => {
  const file = fileInput.files[0];
  if (!file) {
    alert("Обери зображення");
    return;
  }

  try {
    // Завантаження в Storage
    const storageRef = ref(storage, `avatars/${currentUid}_${Date.now()}.jpg`);
    await uploadBytes(storageRef, file);
    const photoUrl = await getDownloadURL(storageRef);

    // Оновлення Firestore
    await updateDoc(doc(db, "players", currentUid), {
      photo: photoUrl
    });

    // Оновлення на сторінці
    avatarImg.src = photoUrl;

    modal.classList.add('hidden');
    alert("Аватарка оновлена!");
  } catch (error) {
    alert("Помилка: " + error.message);
  }
});

// Вихід
logoutBtn.addEventListener('click', async () => {
  await signOut(auth);
  window.location.href = 'index.html';
});