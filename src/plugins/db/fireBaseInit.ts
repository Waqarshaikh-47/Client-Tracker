// Import necessary modules from firebase package
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

// Your Firebase configuration
import firebaseConfig from "./firebaseConfig";

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Export the Firestore instance
export default firebaseApp.firestore();
