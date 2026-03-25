import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signOut 
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

import { 
    getFirestore,
    doc,
    setDoc,
    collection,
    addDoc
 } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

import { getDatabase, ref, set , onValue } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-database.js"

const firebaseConfig = {
    apiKey: "AIzaSyCMWO93aaT0HaD21uqQ-RM4hRDc3VA6mmc",
    authDomain: "smit-e-commerce-application.firebaseapp.com",
    projectId: "smit-e-commerce-application",
    storageBucket: "smit-e-commerce-application.firebasestorage.app",
    messagingSenderId: "691707383552",
    appId: "1:691707383552:web:6955b49077269ed030ede5",
    measurementId: "G-DC20LGY005",
    databaseURL: "https://smit-e-commerce-application-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

export {
    initializeApp,
    getAuth,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    firebaseConfig,
    signOut,
    getFirestore,
    doc,
    setDoc,
    collection,
    addDoc,
    getDatabase,
    ref,
    set,
    onValue
}