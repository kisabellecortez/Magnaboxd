import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBYywuA3aMZ5YX_7tgadaDLeaKN6cgYKLU",
  authDomain: "gaming-forum-backend.firebaseapp.com",
  projectId: "gaming-forum-backend",
  storageBucket: "gaming-forum-backend.appspot.com",
  messagingSenderId: "3457360551",
  appId: "1:3457360551:web:4def3d1ae417a87c46f182"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
export default app; 