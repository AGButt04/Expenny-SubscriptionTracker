'use client'

import { use, useState } from "react"

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegisteration, setIsRegisteration] = useState('');

    return (
        <div className="login">
            <h2>{isRegisteration? 'Create an account' : 'Login'}</h2>
            
            <input value={email} onChange={(e) => {setEmail(e.target.value)}} 
            placeholder="Email" type="email" />
            <input value={password} onChange={(e) => {setPassword(e.target.value)}} 
            placeholder="password" type="password"/>
            
            <button>Submit</button>
            
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