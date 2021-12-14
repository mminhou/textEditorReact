import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


// console.log(process.env);
// const {REACT_APP_FIREBASE_KEY,  } = process.env; // 왜 안되누

const firebaseConfig = {
    apiKey: "AIzaSyAxtSwW-GXM2S2tzWwRwFmb8HUha51Ms6U",
    authDomain: "texteditor-a1487.firebaseapp.com",
    projectId: "texteditor-a1487",
    storageBucket: "texteditor-a1487.appspot.com",
    messagingSenderId: "374331536169",
    appId: "1:374331536169:web:359368a944f802b0bfbd38",
    measurementId: "G-9WPTQ0PNJL"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const fireStore = firebase.firestore();
// export default fireStorage = firebase.storage();
export default firebase;


