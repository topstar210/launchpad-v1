import { initializeApp } from 'firebase/app';
import { getStorage } from "firebase/storage";
import 'firebase/firestore';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyByzVOrw4ieoTjR-FYtTB1o0yipOx1tmeA",
  authDomain: "bsc-pad.firebaseapp.com",
  databaseURL: "https://bsc-pad-default-rtdb.firebaseio.com",
  projectId: "bsc-pad",
  storageBucket: "bsc-pad.appspot.com",
  messagingSenderId: "651036294665",
  appId: "1:651036294665:web:4c6c7c486be2ef1fd782d8",
  measurementId: "G-BCVK1VJ8Y3"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);

export const storage = getStorage(app);

export default app;