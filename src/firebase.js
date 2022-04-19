import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFRCiSas_GklbL8rL09MIkPz4_HigTvbQ",
  authDomain: "react-postit-test.firebaseapp.com",
  databaseURL: "https://react-postit-test-default-rtdb.firebaseio.com",
  projectId: "react-postit-test",
  storageBucket: "react-postit-test.appspot.com",
  messagingSenderId: "1053393307724",
  appId: "1:1053393307724:web:cf824387ae7866ddba8ce9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;