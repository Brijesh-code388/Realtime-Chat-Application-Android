import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC9SDLI2c_UtYGOe2KXwn9e7hiqwiQ-p5M",
    authDomain: "signal-clone-yt-26206.firebaseapp.com",
    databaseURL: "https://signal-clone-yt-26206-default-rtdb.firebaseio.com",
    projectId: "signal-clone-yt-26206",
    storageBucket: "signal-clone-yt-26206.appspot.com",
    messagingSenderId: "522883501915",
    appId: "1:522883501915:web:77f8e6b06f29bbe510547e",
    measurementId: "G-03DNMB9N8H"
};
let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}



const db = app.firestore();
const auth = firebase.auth();

export { db, auth };