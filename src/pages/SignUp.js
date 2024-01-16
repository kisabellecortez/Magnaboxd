import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext.js'

const SignUp =()=>{
    const { createUser } = UserAuth()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordC, setPasswordC] = useState('')

    //create new users
    const handleSignUp = async()=>{
        try{
            if(password === passwordC){
                await createUser(email, password)
                navigate('/explore')
            
            }
            else{
                return(
                    alert("Passwords do not match.")
                )
            }
       
        }
        catch(error){
            alert(error)
        }
    }

    return(
        <div className="user-auth">
            <div className="title"> 

                <h1>WELCOME TO MAGNABOXD</h1>
                <div className="user-auth-form">
                    <h1>SIGN UP</h1>
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

                    <div className="input">
                        <label for="name">CONFIRM PASSWORD: </label>
                        <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        placeholder="abcd1234"
                        value={passwordC}
                        onChange={(e)=>setPasswordC(e.target.value)}
                        required></input>
                    </div>
                    <button onClick={handleSignUp}>SIGN IN</button>
                    <p>Already have an account? Sign in <a href="/signin">here.</a></p>
                </div>
            </div>
        </div>
    )
}

export default SignUp