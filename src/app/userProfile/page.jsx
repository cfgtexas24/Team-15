"use client"; 
import './userProfile.css';
import Image from 'next/image';
import React, { useState } from 'react';

export default function Profile() {
    // State to manage profile details
    const [profile] = useState({
        name: 'Alyssa F',
        company: 'XXX',
        location: 'Dallas, Texas',
    });

    // Function to display profile information
    const displayInfo = () => {
        alert(`Name: ${profile.name}\nCompany: ${profile.company}\nLocation: ${profile.location}`);
    };

    return (
        <div className='container mx-auto'>
            <div className="header">
                <h2 className="pageMessage">Rebirth Job Portal:</h2>
            </div>

            <div className="profileInfo">
                <Image 
                    className="profileImage" 
                    src="/download.png" 
                    alt="Profile" 
                    width={120} 
                    height={120} 
                />
                <h4>Name: {profile.name}</h4>
                <h4>Company Name: {profile.company}</h4>
                <h4>Location: {profile.location}</h4>
                <button className="editAccount" onClick={displayInfo}>View Profile</button>
            </div>
        </div>
    );
}
