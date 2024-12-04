// firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpDs7aroCZeH_j7XgrOYRJfHv66piVhmw",
  authDomain: "lostatpenn.firebaseapp.com",
  databaseURL: "https://lostatpenn-default-rtdb.firebaseio.com",
  projectId: "lostatpenn",
  storageBucket: "lostatpenn.appspot.com",
  messagingSenderId: "990079057032",
  appId: "1:990079057032:web:728bb27b6a2d448022333d",
  measurementId: "G-BD814NJ232"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const database = getDatabase(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, db, database, storage, auth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup };