import firebase from "@firebase/app";
import "@firebase/database";
import "@firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCo83uvaCicajiqgtYSKRXeqEtwcBKWBv0",
  authDomain: "react-spa-e5300.firebaseapp.com",
  databaseURL: "https://react-spa-e5300-default-rtdb.firebaseio.com",
  projectId: "react-spa-e5300",
  storageBucket: "react-spa-e5300.appspot.com",
  messagingSenderId: "173660876162",
  appId: "1:173660876162:web:4bc1c86da0c4d42ae7739b",
  measurementId: "G-NNJFRJ8RBZ",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;
// var firebaseConfig = {
//   apiKey: "AIzaSyCMg0QeV-y1w5dAg6DNZ7E7jXJuRInN1n0",
//   authDomain: "react-spa-fb75a.firebaseapp.com",
//   databaseURL: "https://react-spa-fb75a-default-rtdb.europe-west1.firebasedatabase.app",
//   projectId: "react-spa-fb75a",
//   storageBucket: "react-spa-fb75a.appspot.com",
//   messagingSenderId: "258459031259",
//   appId: "1:258459031259:web:b4ba745065878f3c2fdefe",
//   measurementId: "G-KFZXE4T84Z"
// };
