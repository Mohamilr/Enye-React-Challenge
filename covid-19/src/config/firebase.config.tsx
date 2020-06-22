import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
    apiKey: "AIzaSyD2jS1AYTo8aDbue075XTeIjvNb57s7KaI",
    authDomain: "covid-19-dd561.firebaseapp.com",
    databaseURL: "https://covid-19-dd561.firebaseio.com",
    projectId: "covid-19-dd561",
    storageBucket: "covid-19-dd561.appspot.com",
    messagingSenderId: "71610863878",
    appId: "1:71610863878:web:c7df1b8cb1d9384b150e87"
};

firebase.initializeApp(config);

const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
    auth.signInWithPopup(provider);
  };

export const firestore = firebase.firestore();
export const auth = firebase.auth();
