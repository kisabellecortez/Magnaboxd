import { useContext, createContext, useState, useEffect } from 'react'; 
import { GoogleAuthProvider , createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword, signOut, onAuthStateChanged, deleteUser, updateEmail, sendEmailVerification, sendPasswordResetEmail } from 'firebase/auth';
import { auth, db } from '../firebase.js' 
import { doc, arrayUnion, arrayRemove, setDoc, updateDoc } from 'firebase/firestore'

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

    /* functions for user management */ 

    // create user
    const createUser =async(email, password)=>{
        const date = new Date();  
        const day = date.getDate(); 
        const month = date.getMonth(); 
        const year = date.getFullYear(); 
        currDate = (day.toString() + month.toString() + year.toString())
        console.log(currDate)
        await createUserWithEmailAndPassword(auth, email, password)
        
        const user = auth.currentUser; 
        const docRefLiked = doc(db, user.uid, 'liked-games'); 
        const docRefSaved = doc(db, user.uid, 'saved-games')

        await setDoc(docRefLiked, {
            liked: []
        })

        await setDoc(docRefSaved, {
            saves: []
        })
    }

    // delete user 
    const delUser =()=>{
        return deleteUser(user)
    }

    // change profile picture 

    // changes username 
    const changeUsername = (email) => {
        updateEmail(auth.currentUser, email).then(() => {
            sendEmailVerification(auth.currentUser);
        })
    }

    // sends a change password link 
    const changePassword = () => {
        const user = auth.currentUser; 

        sendPasswordResetEmail(auth, user.email);
    }

    /* functions for adding games to collection */

    // adds game to liked page 
    function addLike(id) {
        // Assuming `user.uid` and `db` are defined appropriately
        const userDocRef = doc(db, user.uid, 'liked-games');
        updateDoc(userDocRef, {
            liked: arrayUnion(id)
        })
    }

    // deletes game from liked page 
    function delLike(id){
        //delete data from users database
        const userDocRef = doc(db, user.uid, 'liked-games');
        updateDoc(userDocRef, {
            liked: arrayRemove(id)
        })
    }


    // adds game to saved page 
    function addSave(id){
        const userDocRef = doc(db, user.uid, 'saved-games'); 
        updateDoc(userDocRef, {
            saves: arrayUnion(id)
        })
    }


    // deletes game from saved page 
    function delSave(id){
        const userDocRef = doc(db, user.uid, 'saved-games'); 
        updateDoc(userDocRef, {
            saves: arrayRemove(id) 
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
        <AuthContext.Provider value = {{ googleSignIn, signIn, logOut, deleteUser, delUser, createUser, changeUsername, changePassword, addLike, delLike, addSave, delSave, user }}>
            { children }
        </AuthContext.Provider>
    );
};

export const UserAuth =()=> {
    return useContext(AuthContext)
};

