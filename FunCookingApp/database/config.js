import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider,getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDg8TCiGMTINvfWsirIgm3A64vKQhBvV44",
  authDomain: "funcooking2-72cbd.firebaseapp.com",
  projectId: "funcooking2-72cbd",
  storageBucket: "funcooking2-72cbd.appspot.com",
  messagingSenderId: "706472229913",
  appId: "1:706472229913:web:cae37dcb52d6ab11097e88"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize 
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider(app);
export const auth = getAuth(app);

