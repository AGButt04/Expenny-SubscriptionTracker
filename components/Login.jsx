'use client'

import { useAuth } from "@/context/AuthContext";
import { use, useState } from "react"

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegisteration, setIsRegisteration] = useState('');
    const [error, setError] = useState(null);
    const [authenticating, setAuthenticating] = useState(false);
    const { signup, login }= useAuth();

    async function handleAuthenticate() {
        if (!email || !email.includes('@') || 
        !password || password.length < 6 || authenticating)
            return;
    
        setError(null);     
        setAuthenticating(true);   
        try {
            if (isRegisteration) {
                // Register a user
                await signup(email, password);
            } else {
                // Log in a user
                await login(email, password);
            }
        } catch (err) {
            console.log(err.message);
            setError(err.message);
        } finally {
            setAuthenticating(false);
        }

    }

    return (
        <div className="login">
            <h2>{isRegisteration? 'Create an account' : 'Login'}</h2>
            
            {error && (
                <div className="">
                    <p> ❌ {error}</p>
                </div>)
            }
            
            <input value={email} onChange={(e) => {setEmail(e.target.value)}} 
            placeholder="Email" type="email" />
            <input value={password} onChange={(e) => {setPassword(e.target.value)}} 
            placeholder="password" type="password"/>
            
            <button onClick={handleAuthenticate} disabled={authenticating}>
                {authenticating? 'Submitting...' : 'Submit'}
            </button>
            
            <div className="full-line" />
            <div>
                <p>{isRegisteration? 'Already have an account?' : 'Don\'t have an account?'}</p>
                <button onClick={() => {
                    setIsRegisteration(!isRegisteration)
                }}>{isRegisteration? 'Log in' : 'Sign Up'}</button>
            </div>
        </div>
    )
}