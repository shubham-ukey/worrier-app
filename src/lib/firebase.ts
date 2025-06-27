
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

    const firebaseConfig = {
    apiKey: "AIzaSyBiWa_l08h4Mlz69pCKNkquSTG3s92Jb-Q",
    authDomain: "worrier-app.firebaseapp.com",
    projectId: "worrier-app",
    storageBucket: "worrier-app.firebasestorage.app",
    messagingSenderId: "1088524659459",
    appId: "1:1088524659459:web:be9dea59e866c1eb2ad736",
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
