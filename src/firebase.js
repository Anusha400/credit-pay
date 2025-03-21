// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore'; // Import Firestore

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDseQ48mCWxPsiawJbsD3IyDGadwFx8AoE",
  authDomain: "credpe-21ebd.firebaseapp.com",
  projectId: "credpe-21ebd",
  storageBucket: "credpe-21ebd.appspot.com",
  messagingSenderId: "73096185724",
  appId: "1:73096185724:web:b844ddae1e43184be1c6f9",
  measurementId: "G-0QYRRXTZGX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app); // Initialize Firestore

// Export auth, storage, and db
export { auth, storage, db }; // Make sure db is exported
