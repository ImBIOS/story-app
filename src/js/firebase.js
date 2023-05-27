// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'xxxxx',
  authDomain: 'xxxxx',
  projectId: 'xxxxx',
  storageBucket: 'xxxxx',
  messagingSenderId: 'xxxxx',
  appId: 'xxxxx',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
