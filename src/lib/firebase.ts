
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDVMWdEn3QkdQ_c1cXpAkoS257D8Wz5-NM",
  authDomain: "shuddha-32217.firebaseapp.com", 
  projectId: "shuddha-32217",
  storageBucket: "shuddha-32217.firebasestorage.app",
  messagingSenderId: "809995789251",
  appId: "1:809995789251:web:18520da28b9d0a2f999376"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
