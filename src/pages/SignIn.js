import React, { useState } from 'react'
import { UserAuth } from '../context/AuthContext.js'
import { useNavigate } from 'react-router-dom'

const SignIn =()=>{
    const navigate = useNavigate()
    const { signIn } = UserAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //sign in users using email and password
  const handleSignIn = async(e)=>{
    e.preventDefault()   
 
    try{
        await signIn(email, password)
        navigate('/explore')
    }
    catch(userCredential){
        console.log("Invalid email or password.")

        return(
          alert("Email or password is incorrect.")
        )
    }
  
  }

    return(
        <div className="user-auth">    
            <div className="title">       
                <h1>WELCOME BACK TO MAGNABOXD</h1>
             
                <div className="user-auth-form">
                    <h1>SIGN IN</h1>
                    <div className="input">
                        <label for="name">EMAIL: </label>
                        <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder="johndoe@google.ca"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        required></input>
                    </div>

                    <div className="input">
                        <label for="name">PASSWORD: </label>
                        <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        placeholder="abcd1234"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        required></input>
                    </div>
                    <button onClick={handleSignIn}>SIGN IN</button>
                    <p>Don't have an account? Sign up <a href="/signup">here.</a></p>
                </div>
            </div>
        </div>
    )
}

export default SignIn