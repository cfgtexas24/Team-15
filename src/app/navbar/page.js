import Image from 'next/image'
import './style.css'
import React from 'react'

export default function Navbar(){
    return(
        <nav className="navbar">
            <Image src="/assets/images/mainLogo.png" className="logo" width={175} height={125}/>
            <ul className="navOptions">
                <li>Job Postings</li>
                <li>Messages</li>
                <li>Calendar</li>
                <li>Inbox</li>
                <li>Profile</li>
            </ul>
        </nav>
    )
}
