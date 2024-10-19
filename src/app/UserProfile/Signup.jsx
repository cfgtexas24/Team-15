import { useState } from "react"

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [profilePicture, setprofilePicture] = useState('')
const [userName, setUsername] = useState('')



export default function Signup() {

    return (
        <div>
            <div>
                <img src="logo" alt="Rebirth Logo" />
                <h2 className="pageMessage">Rebirth Job Portal</h2>
            </div>



            <div className="signup">
                <h3>Create Account</h3>
                <input className="userName" type="text" placeholder="Enter Name"></input>
                <input className="email" type="text" placeholder="Enter Email"></input>
                <input className="password" type="text" placeholder="Enter Password"></input>
                <input className="confirmPassword" type="text" placeholder="Confirm Password"></input>
                <input type="file" placeholder="Choose Image"></input>
                <button className="createAccount">Create Account</button>
            </div>



        </div>


    )
}
