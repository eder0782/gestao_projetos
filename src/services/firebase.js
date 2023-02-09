// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_UTJmv-LKgquiS2Yw1ee1btDsL6DR9Yw",
  authDomain: "myapp-3a811.firebaseapp.com",
  databaseURL: "https://myapp-3a811-default-rtdb.firebaseio.com",
  projectId: "myapp-3a811",
  storageBucket: "myapp-3a811.appspot.com",
  messagingSenderId: "1060069994270",
  appId: "1:1060069994270:web:461095e79e13786b7ba30f",
  measurementId: "G-K1DLGLM1TL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// const app = initializeApp(firebaseConfig)
const db = getFirestore(app);
export { db };
