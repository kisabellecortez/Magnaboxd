import { useContext, createContext, useState, useEffect } from 'react'; 
import { GoogleAuthProvider , createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword, signOut, onAuthStateChanged, deleteUser } from 'firebase/auth';
import { auth, db } from '../firebase.js' 
import { doc, setDoc, getDoc, arrayUnion, arrayRemove, updateDoc } from 'firebase/firestore'

const AuthContext = createContext()

export const AuthContextProvider = ({ children })=> {
    const [user, setUser] = useState({});
    var currDate = ''

    const googleSignIn =()=> {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    };

    const signIn = (email, password) =>  {
        return signInWithEmailAndPassword(auth, email, password)
       }

    const logOut =()=>{
        return signOut(auth)
    }

    const delUser =()=>{
        return deleteUser(user)
    }

    const createUser =async(email, password)=>{
        const date = new Date();  
        const day = date.getDate(); 
        const month = date.getMonth(); 
        const year = date.getFullYear(); 
        currDate = (day.toString() + month.toString() + year.toString())
        console.log(currDate)
        await createUserWithEmailAndPassword(auth, email, password)
        
    }

    function addEntry(id) {
        // Assuming `user.uid` and `db` are defined appropriately
        const userDocRef = doc(db, user.uid, 'played-games');
        updateDoc(userDocRef, {
            games: arrayUnion(id)
        })
    }

    function delEntry(id){
        //delete data from users database
        const userDocRef = doc(db, user.uid, 'played-games');
        updateDoc(userDocRef, {
            games: arrayRemove(id)
        })
    }
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          console.log(currentUser);
          setUser(currentUser);
        });
        return () => {
          unsubscribe();
        };
      }, []);

    return(
        <AuthContext.Provider value = {{ delEntry, addEntry, googleSignIn, signIn, logOut, deleteUser, delUser, createUser, user }}>
            { children }
        </AuthContext.Provider>
    );
};

export const UserAuth =()=> {
    return useContext(AuthContext)
};

