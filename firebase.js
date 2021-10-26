import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDdi1BKVqRaJ2Oa095KiMUcFawdstYsz68",
  authDomain: "blogapp-42f7d.firebaseapp.com",
  databaseURL: "https://blogapp-42f7d-default-rtdb.firebaseio.com",
  projectId: "blogapp-42f7d",
  storageBucket: "blogapp-42f7d.appspot.com",
  messagingSenderId: "496819661594",
  appId: "1:496819661594:web:fa8cc6eb9a4be24bda9aa3"
};
 
 if(!firebase.apps.length) firebase.initializeApp(firebaseConfig)

 const auth = firebase.auth()
 const storage = firebase.storage()
 const db = firebase.firestore()
 const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp
//server k time pe chij ko store wgera krne k liye servertimestamp nikal liya server ka time
 export {auth,storage,db,serverTimestamp} 