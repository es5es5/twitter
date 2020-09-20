import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBBJmX9cB2MGDrUjFsQdbgbN-K3SBQ-EWM",
  authDomain: "twitter-c98b8.firebaseapp.com",
  databaseURL: "https://twitter-c98b8.firebaseio.com",
  projectId: "twitter-c98b8",
  storageBucket: "twitter-c98b8.appspot.com",
  messagingSenderId: "140715922466",
  appId: "1:140715922466:web:1fb40da050ca362f33267b"
};

export default firebase.initializeApp(firebaseConfig);
