import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, updateDoc, doc,setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiqLyRE2sMvWMfDPSkb0xwNu3vqvb09as",
  authDomain: "flow-management-98d9e.firebaseapp.com",
  projectId: "flow-management-98d9e",
  storageBucket: "flow-management-98d9e.firebasestorage.app",
  messagingSenderId: "403245200996",
  appId: "1:403245200996:web:79908a960236883e8e1171",
  measurementId: "G-JLPWK14VFP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export {  collection, addDoc, updateDoc, doc ,setDoc};