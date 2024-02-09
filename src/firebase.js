// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import {getDatabase} from 'firebase/database'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxPv7vD6-MxmfI-2JgaKEpS93GVjHhl-o",
  authDomain: "cinemix-75728.firebaseapp.com",
  projectId: "cinemix-75728",
  storageBucket: "cinemix-75728.appspot.com",
  messagingSenderId: "515101251548",
  appId: "1:515101251548:web:7884d71ac53621758c2119",
  measurementId: "G-VHDL9GTNKG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const database = getDatabase(app);

export async function createUser(userName, email, password) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user;
    await updateProfile(user, {displayName: userName});
    await database.ref(`users/${user.uid}`).set({
        email: user.email,
        displayName: user.displayName,
        // Add more user details as needed
      });
    console.log("usercreated",user)
    return user
}

export async function checkUser(setSignInChecker) {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log(user)
            setSignInChecker(true)
        } else {
            setSignInChecker(false)
        }
    })
}

export function logOutUser(){
    signOut(auth).then(() => {
        console.log("signed out")
    })
    .catch((error)=>{
        console.log("error")
    }) 
}

export function signInUser(eamil, password) {
    signInWithEmailAndPassword(auth, eamil, password)
    .then((userCredential) => {
        console.log(userCredential)
    })
    .catch((error) => {
        console.log(error)
    });
}

export function getUserData(setUserName) {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUserName(user.displayName)
        }
    })
}