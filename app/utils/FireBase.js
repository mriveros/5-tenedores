import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBehBQwIRoNHPVwrA-lzNIgO7ruCIsTa0M",
  authDomain: "tenedores-71f81.firebaseapp.com",
  databaseURL: "https://tenedores-71f81.firebaseio.com",
  projectId: "tenedores-71f81",
  storageBucket: "tenedores-71f81.appspot.com",
  messagingSenderId: "867281312386",
  appId: "1:867281312386:web:43aacbcded2a7aba80729b"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
