import firebase from 'firebase'

const settings = { timestampsInSnapshots: true };

// STAGING
const config = {
  apiKey: "AIzaSyAB9KNWwCP7i-_GyjtbA-Xz27xC2OtBZc8",
  authDomain: "e-arsip-bidang-preservasi.firebaseapp.com",
  projectId: "e-arsip-bidang-preservasi",
  storageBucket: "e-arsip-bidang-preservasi.appspot.com",
  messagingSenderId: "496758889024",
  appId: "1:496758889024:web:14b48a56f5e4ff8a76dda5"
};

// PRODUCTION
// const config = {
//   apiKey: "AIzaSyAJ8CRBOSdiIzEQXR5iaay_ZMnkFUbWFqA",
//   authDomain: "fnl-hrms-app.firebaseapp.com",
//   databaseURL: "https://fnl-hrms-app.firebaseio.com",
//   projectId: "fnl-hrms-app",
//   storageBucket: "fnl-hrms-app.appspot.com",
//   messagingSenderId: "1021590476639",
//   appId: "1:1021590476639:web:ff07439861d5f7708948ea",
//   measurementId: "G-PL996LFJ4W"
// };


firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;
