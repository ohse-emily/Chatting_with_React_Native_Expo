import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBzsOkgwawMXBUBr8Msgi5Pt1p_DsM9Zq4",
  authDomain: "signal-clone-yt-build-3a7b8.firebaseapp.com",
  projectId: "signal-clone-yt-build-3a7b8",
  storageBucket: "signal-clone-yt-build-3a7b8.appspot.com",
  messagingSenderId: "638981873641",
  appId: "1:638981873641:web:38a7fa928f26bf43743578"
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth=firebase.auth();

export {db, auth}; 



