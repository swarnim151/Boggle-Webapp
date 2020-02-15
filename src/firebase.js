import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBy4GUP-ltga0Ub1rxNpMFPSOCY-CFhV2o",
  authDomain: "boggle-8ed62.firebaseapp.com",
  databaseURL: "https://boggle-8ed62.firebaseio.com",
  projectId: "boggle-8ed62",
  storageBucket: "boggle-8ed62.appspot.com",
  messagingSenderId: "321707851120",
  appId: "1:321707851120:web:8cd14051eb911a7e95e3b5"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
export { db };
