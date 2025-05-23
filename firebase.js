import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Only import AsyncStorage and getReactNativePersistence on native
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "YOUR API KEY",
  authDomain: "arduinotempmonitor-cd26e.firebaseapp.com",
  projectId: "arduinotempmonitor-cd26e",
  storageBucket: "arduinotempmonitor-cd26e.appspot.com",
  messagingSenderId: "96440812090",
  appId: "1:96440847947:web:d0f813205450f",
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


  



