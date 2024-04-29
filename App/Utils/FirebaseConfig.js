// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCyT3GUf_qWqNRGWmZgiK7N_ZOBqE_8YBU",
  authDomain: "pitstop-capstone.firebaseapp.com",
  projectId: "pitstop-capstone",
  storageBucket: "pitstop-capstone.appspot.com",
  messagingSenderId: "540891237005",
  appId: "1:540891237005:web:cfc222e5510430407430c4",
  measurementId: "G-WZWV9TPCW4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
