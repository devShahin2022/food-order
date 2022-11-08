import { initializeApp } from "firebase/app";
// const firebaseConfig = {
//   apiKey: "AIzaSyC7f7qmaZeBnttWzvrs9S2C_WVkPmt7Rcg",
//   authDomain: "assignment11-ea12d.firebaseapp.com",
//   projectId: "assignment11-ea12d",
//   storageBucket: "assignment11-ea12d.appspot.com",
//   messagingSenderId: "528154398669",
//   appId: "1:528154398669:web:b499fb3ae486a8cc693e84"
// };
const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;