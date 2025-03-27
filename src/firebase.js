import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

/*configuramos firebase */
const firebaseConfig = {
  apiKey: "AIzaSyA95-NnOfQ3MTbJ6xUos_yZRk-6T3E537c",
  authDomain: "lab10-48168.firebaseapp.com",
  projectId: "lab10-48168",
  storageBucket: "lab10-48168.appspot.com",
  messagingSenderId: "678219382043",
  appId: "1:678219382043:web:00fdc0db0107b4a9a327be",
  measurementId: "G-J1LLK2RBJM",
};

/*lo inicializamos */

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
