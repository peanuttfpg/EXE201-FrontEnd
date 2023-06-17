import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBtxSGe2IV3URuRhe5WTmAR4-8IpSJ3BJE",
    authDomain: "exe201-387505.firebaseapp.com",
    projectId: "exe201-387505",
    storageBucket: "exe201-387505.appspot.com",
    messagingSenderId: "503796028774",
    appId: "1:503796028774:web:8a1b4e4e32bafb6040e4a7",
    measurementId: "G-Z3M70FH2DX"
};
// let Firebase;

const Firebase = firebase.initializeApp(firebaseConfig);
// init Storage
export const firebaseStorage = getStorage(Firebase);

export default Firebase;