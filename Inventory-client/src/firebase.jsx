import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAnzvyUtu8OKd3tqryOVJTbHRXbGoM3IfA",
  authDomain: "inventorymanagment-805f2.firebaseapp.com",
  projectId: "inventorymanagment-805f2",
  storageBucket: "inventorymanagment-805f2.appspot.com",
  messagingSenderId: "935949709952",
  appId: "1:935949709952:web:fd85f2250d672313bb2c65",
  measurementId: "G-FP1WERN3B9"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage(app);