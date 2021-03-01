import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyADMC6aUzJN3l60Nf_i9wiq_WO2l8sd5U0",
    authDomain: "rn-recruitmentapp.firebaseapp.com",
    projectId: "rn-recruitmentapp",
    storageBucket: "rn-recruitmentapp.appspot.com",
    messagingSenderId: "1040384233313",
    appId: "1:1040384233313:web:b9227cd4b9b3f8ce4fbf20"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
