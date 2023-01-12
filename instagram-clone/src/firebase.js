// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'

const firebaseApp=firebase.initializeApp({
  apiKey: "AIzaSyBVEoh1LZAPBfvPviOStoOst22RYMFS8gs",
  authDomain: "instagram-7fab5.firebaseapp.com",
  databaseURL: "https://instagram-7fab5-default-rtdb.firebaseio.com",
  projectId: "instagram-7fab5",
  storageBucket: "instagram-7fab5.appspot.com",
  messagingSenderId: "790502426624",
  appId: "1:790502426624:web:c6a049936df40cd63f70e5",
  measurementId: "G-RPWVV9MYPV"
});


const db=firebaseApp.firestore();
const auth=firebaseApp.auth();

const storage = firebase.storage();

export{db,auth,storage};