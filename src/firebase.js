import firebase from 'firebase/app';
import 'firebase/auth';

var config = {
    apiKey: "AIzaSyDQbMkTRMvZkfA7lmBwMN6_RFRgDVNzN0A",
    authDomain: "bagel-c756a.firebaseapp.com",
    databaseURL: "https://bagel-c756a.firebaseio.com",
    projectId: "bagel-c756a",
    storageBucket: "bagel-c756a.appspot.com",
    messagingSenderId: "724418721175"
};


if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
    auth,
};