import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCdpsGxBeWI6koPjIjEugalZJMQe8zlUK8",
  authDomain: "thesisproject-6a177.firebaseapp.com",
  projectId: "thesisproject-6a177",
  // Add other Firebase configuration details here
  storageBucket: "thesisproject-6a177.appspot.com",
  messagingSenderId: "935423670686",
  appId: "1:935423670686:web:49bcb681867c147b563e8f",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
