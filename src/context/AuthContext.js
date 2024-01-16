import { useContext, createContext, useState, useEffect } from 'react'; 
import { GoogleAuthProvider , createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword, signOut, onAuthStateChanged, deleteUser } from 'firebase/auth';
import { auth, db } from '../firebase.js' 
import { doc, setDoc } from 'firebase/firestore'

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

    function addEntry(entry){
        //get date to use as id 
        const date = new Date();  
        const day = date.getDate(); 
        const month = date.getMonth(); 
        const year = date.getFullYear(); 
        const id = (day.toString() + month.toString() + year.toString())

        //add data to users database
        setDoc(doc(db, user.uid, id), {
            string: entry
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
        <AuthContext.Provider value = {{ addEntry, googleSignIn, signIn, logOut, deleteUser, delUser, createUser, user }}>
            { children }
        </AuthContext.Provider>
    );
};

export const UserAuth =()=> {
    return useContext(AuthContext)
};

