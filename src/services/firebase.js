import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import {getAuth} from 'firebase/auth'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_UTJmv-LKgquiS2Yw1ee1btDsL6DR9Yw",
  authDomain: "myapp-3a811.firebaseapp.com",
  databaseURL: "https://myapp-3a811-default-rtdb.firebaseio.com",
  projectId: "myapp-3a811",
  storageBucket: "myapp-3a811.appspot.com",
  messagingSenderId: "1060069994270",
  appId: process.env.appId, //"1:1060069994270:web:461095e79e13786b7ba30f",
  measurementId: process.env.measurementId, //"G-K1DLGLM1TL",
};

// if (!firebase.apps.length) {
//Abrir minha conexao
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const db_name = process.env.NEXT_PUBLIC_DB_NAME;
const storage = getStorage(app);
const storage_name = process.env.NEXT_PUBLIC_STORAGE_NAME;
const auth = getAuth(app)

export { database, db_name, storage, storage_name, auth };
