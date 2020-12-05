import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp = firebase.initializeApp ({
  apiKey: "AIzaSyAuWJrvVWqOqT9IfHsb2mWfRGQVxBw79XM",
  authDomain: "instagram-cloned-db41f.firebaseapp.com",
  databaseURL: "https://instagram-cloned-db41f.firebaseio.com",
  projectId: "instagram-cloned-db41f",
  storageBucket: "instagram-cloned-db41f.appspot.com",
  messagingSenderId: "1060291975174",
  appId: "1:1060291975174:web:aaf8c9cf5cbebfd5c84b87",
  measurementId: "G-GPJBHNZCHX"
});
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage}