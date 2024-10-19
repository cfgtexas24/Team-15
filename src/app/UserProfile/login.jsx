import { useState } from "react"
import './UserProfile'
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

export default function Login() {

    return (
        <div>
            <div>
                <img src="logo" alt="Rebirth Logo" />
                <h2 className="pageMessage">Rebirth Job Portal</h2>
            </div>



            <div className="login">
                <input className="email" type="text" placeholder="Enter Email"></input>
                <input className="password" type="text" placeholder="Enter Password"></input>
                <button className="signIn">Sign In</button> 
                <button className="createAccount">Create Account</button>
            </div>



        </div>


    )
}
