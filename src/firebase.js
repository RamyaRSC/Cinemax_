// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirestore, collection, addDoc, onSnapshot, getDoc, query, where, FieldValue, updateDoc } from "firebase/firestore";
import { getDatabase, set } from 'firebase/database';
import { doc, setDoc } from "firebase/firestore"; 

// Your web app's Firebase configuration
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
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
const database = getDatabase(app);
// const currentUser = auth.currentUser.uid;

export { app };

export async function createUser(userName, email, password) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user;
    await updateProfile(user, {displayName: userName})
    await database.ref(`users/${user.uid}`).set({
        email: user.email,
        displayName: user.displayName,
    });
    console.log("user created", user)
    // return user
}

export async function checkUser(setSignInChecker) {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // console.log(user)
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

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const colRefToUser = collection(db,'cities') //collection reference

//queries
const q = query(colRefToUser, where("Rating", ">", 3))
//real time collection data
onSnapshot(q, (snapshot) => {
    let data = [];
    snapshot.docs.forEach((doc) => {
        data.push({docID: doc.id, ...doc.data()})
    })
    console.log("based on rating",data)
})

// const q1 = query(colRefToUser, where("userID", "==", user.uid));
// const currectUserData = onSnapshot(q1, (snapshot) => {
//     let data = [];
//     snapshot.docs.forEach((doc) => {
//         data.push({docID: doc.id, ...doc.data()})
//     })
//     console.log("hell",data)
// })
// currectUserData();

// const unsubscribeAuth = auth.onAuthStateChanged(user => {
//     if (user) {
//       // If a user is authenticated, proceed to fetch data
//       const currentUserUID = user.uid;
//         console.log("Current user ID:", currentUserUID);
  
//       // Construct the query to retrieve data where "userID" matches the current user's UID
//       const q1 = query(colRefToUser, where("userID", "==", currentUserUID));
  
//       // Listen for real-time updates to the query
//       const unsubscribeSnapshot = onSnapshot(q1, (snapshot) => {
//         let data = [];
//         snapshot.docs.forEach((doc) => {
//           data.push({ docID: doc.id, ...doc.data() });
//         });
//         console.log("current user data:", data);
//       });
//     } else {
      // If no user is authenticated, handle the case appropriately
//       console.log("No authenticated user found.");
//     }
//   });

//   unsubscribeAuth()

//real time collection data
onSnapshot(colRefToUser, (snapshot) => {
    let data = [];
    snapshot.docs.forEach((doc) => {
        data.push({docID: doc.id, ...doc.data()})
    })
    console.log("all data",data)
})

async function checkIfUserExists(uid, movieData) {
    const col = collection(db, 'cities')
    const docRef = doc(col, uid)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
        let prevData = docSnap.data();
        let temp = movieData.Genre.split(", ");

        // Iterate over each genre in temp array
        temp.forEach(genre => {
            // Check if the genre exists in prevData.Genre array
            if (prevData.Genre.hasOwnProperty(genre)) {
            // If the genre exists, increment its value
            prevData.Genre[genre]++;
            } else {
            // If the genre doesn't exist, initialize it with value 1
            prevData.Genre[genre] = 1;
            }
        });

        if (Array.isArray(prevData.MovieDetails)) {
            let temp = prevData.MovieDetails;
            temp.push(movieData.MovieDetails); 
            prevData.MovieDetails = temp;
        } else{
            let temp = [prevData.MovieDetails, movieData.MovieDetails] 
            prevData.MovieDetails = temp;
        }
        console.log(prevData);

        updateDoc(docRef, {
            Genre: prevData.Genre,
            MovieDetails: prevData.MovieDetails
        })
    } else {
        let temp = movieData.Genre.split(", ");

        // Define the custom array prototype method
        Array.prototype.toOneMap = function() {
            // Create an empty object
            let obj = {};
        
            // Iterate over the array elements
            this.forEach(item => {
            // Assign each element as a key in the object with a value of 1
            obj[item] = 1;
            });
        
            // Return the resulting object
            return obj;
        };
    
        let result = temp.toOneMap();
        movieData.Genre = result;

        await setDoc(docRef, {
            Genre: movieData.Genre,
            MovieDetails: movieData.MovieDetails
        })
    }
}

export async function userMovieData(movieData) {
    // console.log('rated the movie')
    await onAuthStateChanged(auth, (user) => {
        if (user) {
            checkIfUserExists(user.uid, movieData)
        }
        else (
            console.log("no user")
        )
    })
    // console.log(obj)
}

auth.onAuthStateChanged(user => {
    if (user) {
      // User is signed in.
      const userID = user.uid;
    //   console.log("Current user ID:", userID);
      const q1 = query(colRefToUser, where("userID", "==", userID));
  
      // Listen for real-time updates to the query
      const unsubscribeSnapshot = onSnapshot(q1, (snapshot) => {
        let data = [];
        snapshot.docs.forEach((doc) => {
          data.push({ docID: doc.id, ...doc.data() });
        });
        // console.log("current user dataAA:", data);
      });

    } else {
      // No user is signed in.
      console.log("No user signed in.");
    }
  });


export async function fetchUserData(setUserData) {
    await onAuthStateChanged(auth, (user) => {
        if (user) {
            async function temp() {
                const col = collection(db, 'cities')
                const docRef = doc(col, user.uid)
                const docSnap = await getDoc(docRef)
                setUserData(docSnap.data())
            }
            temp()
        }
        else (
            console.log("no user")
        )
    })
}