import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAMi3lLeW6hCqEMHulmafB_ctjVPbT5IKU",
  authDomain: "auth-5793f.firebaseapp.com",
  projectId: "auth-5793f",
  storageBucket: "auth-5793f.appspot.com",
  messagingSenderId: "464378953514",
  appId: "1:464378953514:web:510d66ef524b2e59892853",
  measurementId: "G-5G2HYEQCXT"
};


const app = initializeApp(firebaseConfig);


const auth = getAuth(app);


const monitorAuthState = (callback) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      
      user.getIdToken().then((token) => {
        callback({ loggedIn: true, user, token });
      });
    } else {
    
      callback({ loggedIn: false });
    }
  });
};

export { app, auth, monitorAuthState };
