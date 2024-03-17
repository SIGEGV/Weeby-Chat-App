import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyA5fT0DGhzoIC_or493FkDtsE_B4vgXWwc",
  authDomain: "chat-app-a9bbf.firebaseapp.com",
  projectId: "chat-app-a9bbf",
  storageBucket: "chat-app-a9bbf.appspot.com",
  messagingSenderId: "873654738207",
  appId: "1:873654738207:web:216ba4bff9bd0182cb642a",
  measurementId: "G-F9ZPP47NZB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage=getStorage(app);
