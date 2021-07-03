import firebase from 'firebase';
import "firebase/firestore"
const config={
  apiKey: "AIzaSyALSNUVlp5QfFvbtB5qjCKK4tv3Z0xCImw",
  authDomain: "demologin-96344.firebaseapp.com",
  databaseURL: "https://demologin-96344-default-rtdb.firebaseio.com",
  projectId: "demologin-96344",
  storageBucket: "demologin-96344.appspot.com",
  messagingSenderId: "162713581722",
  appId: "1:162713581722:web:99d53950bb0de7b501c723",
  measurementId: "G-VQNHZKETHD"
}
const Firebase = firebase.initializeApp(config);
const db = Firebase.firestore().settings({ experimentalForceLongPolling: true });
  const auth = Firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  
  export { db, auth, provider, Firebase} //1:28