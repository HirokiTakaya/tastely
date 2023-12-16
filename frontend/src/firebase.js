import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Firebase設定
const firebaseConfig = {
  apiKey: "AIzaSyAMi3lLeW6hCqEMHulmafB_ctjVPbT5IKU",
  authDomain: "auth-5793f.firebaseapp.com",
  projectId: "auth-5793f",
  storageBucket: "auth-5793f.appspot.com",
  messagingSenderId: "464378953514",
  appId: "1:464378953514:web:510d66ef524b2e59892853",
  measurementId: "G-5G2HYEQCXT"
};

// Firebaseアプリの初期化
const app = initializeApp(firebaseConfig);

// Firebase Authenticationサービスの取得
const auth = getAuth(app);

// ユーザーがログインしているか監視する関数
const monitorAuthState = (callback) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // ユーザーがログインしている場合、トークンを取得してコールバックに渡す
      user.getIdToken().then((token) => {
        callback({ loggedIn: true, user, token });
      });
    } else {
      // ユーザーがログインしていない場合
      callback({ loggedIn: false });
    }
  });
};

export { app, auth, monitorAuthState };
