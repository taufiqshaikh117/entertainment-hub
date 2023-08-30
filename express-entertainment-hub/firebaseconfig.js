
const { initializeApp } = require("firebase/app");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC46VJTpfnG08cEeW8d1KH7G8FXCgzGuic",
  authDomain: "entertainment-hub-ef4c4.firebaseapp.com",
  projectId: "entertainment-hub-ef4c4",
  storageBucket: "entertainment-hub-ef4c4.appspot.com",
  messagingSenderId: "943498008928",
  appId: "1:943498008928:web:ab8bbcf74a42b40a82a605",
  measurementId: "G-XGLVRXBFPH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
module.exports = app;
