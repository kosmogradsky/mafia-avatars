import * as React from "react";
import { render } from "react-dom";
import { Main } from "./Main";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA1Cq8tXjKS9F7TnwEcji0w1ELbZf39FjE",
  authDomain: "mafia-avatars.firebaseapp.com",
  databaseURL:
    "https://mafia-avatars-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mafia-avatars",
  storageBucket: "mafia-avatars.appspot.com",
  messagingSenderId: "150543299586",
  appId: "1:150543299586:web:ce638b296399b83430e31b",
};

initializeApp(firebaseConfig);

const root = document.createElement("div");

render(<Main />, root);

document.body.appendChild(root);
