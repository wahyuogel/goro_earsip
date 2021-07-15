import firebase from "firebase";

const settings = { timestampsInSnapshots: true };

// Staging
// const config = {
// 	apiKey: "AIzaSyACggd9N2REF9nJGHfDZf_ppT-bKJIllt0",
// 	authDomain: "dev-e-arsip-preservasi.firebaseapp.com",
// 	projectId: "dev-e-arsip-preservasi",
// 	storageBucket: "dev-e-arsip-preservasi.appspot.com",
// 	messagingSenderId: "175136789564",
// 	appId: "1:175136789564:web:213c1b8a340be215bc5f39",
// };

// Production
const config = {
	apiKey: "AIzaSyAB9KNWwCP7i-_GyjtbA-Xz27xC2OtBZc8",
	authDomain: "e-arsip-bidang-preservasi.firebaseapp.com",
	projectId: "e-arsip-bidang-preservasi",
	storageBucket: "e-arsip-bidang-preservasi.appspot.com",
	messagingSenderId: "496758889024",
	appId: "1:496758889024:web:14b48a56f5e4ff8a76dda5",
};

firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;
