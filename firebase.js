import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Only import AsyncStorage and getReactNativePersistence on native
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDfuWSwiognMi6xfDWqwDlyDYawXPoGiDQ",
  authDomain: "arduinotempmonitor-cd26e.firebaseapp.com",
  projectId: "arduinotempmonitor-cd26e",
  storageBucket: "arduinotempmonitor-cd26e.appspot.com",
  messagingSenderId: "96440847947",
  appId: "1:96440847947:web:d0f813205450f3221f47ce",
};

const app = initializeApp(firebaseConfig);

// ✅ Conditionally initialize auth
let auth;

if (Platform.OS === 'web') {
  auth = getAuth(app); // Use default auth for web
} else {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

const db = getFirestore(app);

export { auth, db };

/*
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDfuWSwiognMi6xfDWqwDlyDYawXPoGiDQ",
  authDomain: "arduinotempmonitor-cd26e.firebaseapp.com",
  projectId: "arduinotempmonitor-cd26e",
  storageBucket: "arduinotempmonitor-cd26e.firebasestorage.app",
  messagingSenderId: "96440847947",
  appId: "1:96440847947:web:d0f813205450f3221f47ce",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
*/
//import { initializeApp } from 'firebase/app';
//import {
 // getAuth,
 // initializeAuth,
 // getReactNativePersistence
//} from 'firebase/auth';
//import AsyncStorage from '@react-native-async-storage/async-storage';
//import { getFirestore } from 'firebase/firestore';

//const firebaseConfig = {
  //apiKey: "AIzaSyDfuWSwiognMi6xfDWqwDlyDYawXPoGiDQ",
 // authDomain: "arduinotempmonitor-cd26e.firebaseapp.com",
 // projectId: "arduinotempmonitor-cd26e",
 // storageBucket: "arduinotempmonitor-cd26e.firebasestorage.app",
 /// messagingSenderId: "96440847947",
  //appId: "1:96440847947:web:d0f813205450f3221f47ce",
//};

// Prevent re-initializing auth multiple times
//const app = initializeApp(firebaseConfig);

//let auth;
//try {
  //auth = initializeAuth(app, {
   // persistence: getReactNativePersistence(AsyncStorage),
  //});
//} catch (e) {
  // Already initialized
  ////auth = getAuth(app);
//}

//const db = getFirestore(app);

//export { auth, db };


//import { initializeApp } from 'firebase/app';
//import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
//import { getFirestore } from 'firebase/firestore';
//import AsyncStorage from '@react-native-async-storage/async-storage';

//const firebaseConfig = {
 // apiKey: "AIzaSyDfuWSwiognMi6xfDWqwDlyDYawXPoGiDQ",
  //authDomain: "arduinotempmonitor-cd26e.firebaseapp.com",
  //projectId: "arduinotempmonitor-cd26e",
  //storageBucket: "arduinotempmonitor-cd26e.appspot.com",
  //messagingSenderId: "96440847947",
  //appId: "1:96440847947:web:d0f813205450f3221f47ce",
//};

//const app = initializeApp(firebaseConfig);

//const auth = initializeAuth(app, {
  //persistence: getReactNativePersistence(AsyncStorage)
//});

//const db = getFirestore(app);

//export { auth, db };



