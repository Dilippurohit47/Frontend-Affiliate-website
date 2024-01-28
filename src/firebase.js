import {initializeApp} from "firebase/app"
import {getAuth} from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyBR0eRyl9z_L7VLIWWx9916IV5wjCi06hQ",
  authDomain: "affiliatemarketing-fc9f8.firebaseapp.com",
  projectId: "affiliatemarketing-fc9f8",
  storageBucket: "affiliatemarketing-fc9f8.appspot.com",
  messagingSenderId: "129441417827",
  appId: "1:129441417827:web:0b4dabe454c129c71ac656",
  measurementId: "G-4RV0KDBB36"
};


export const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)