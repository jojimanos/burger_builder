import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAAM1nPXSrysjR39yiFe6zZX0i-MuMu1wg",
  authDomain: "burgerbuilder-83fd3.firebaseapp.com",
  projectId: "burgerbuilder-83fd3",
  storageBucket: "burgerbuilder-83fd3.appspot.com",
  messagingSenderId: "654643825632",
  appId: "1:654643825632:web:de73f5674d8b9ac053b985",
  measurementId: "G-SRNM7P48B8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)