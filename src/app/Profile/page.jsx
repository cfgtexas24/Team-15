/**
 * @file page.jsx
 * @description This component represents a user profile page for the Rebirth Job Portal. It displays the user's profile
 * information, including their name, company, and location. The profile image is rendered using Next.js's Image component, 
 * and the profile details are managed using React's useState hook. A button is provided to display the profile information 
 * in an alert box.
 * 
 * @dependencies 
 * - next/image: For rendering optimized images in the application.
 * - React hooks (useState) to manage the state of the profile information.
 * - Custom CSS (Profile.css) for styling the profile page and its elements.
 * 
 * @function displayInfo
 * Displays the profile details (name, company, and location) in an alert box when the "View Profile" button is clicked.
 * 
 * @component Profile
 * Displays the user's profile information and includes a button to trigger the display of the profile details.
 * 
 * @state profile
 * Contains the user's profile information (name, company, and location) and is initialized with sample data.
 */
"use client"; // Specifies that this component should be rendered on the client side.

import './Profile.css'; // Import custom CSS for styling the profile page.
import Image from 'next/image'; // Next.js optimized image component for displaying profile pictures.
import React, { useState } from 'react'; // React hook for managing component state.

export default function Profile() {
    // State to manage profile details (name, company, location).
    const [profile] = useState({
        name: 'Alyssa F', // User's name.
        company: 'XXX', // User's company name.
        location: 'Dallas, Texas', // User's location.
    });

    // Function to display profile information in an alert box.
    const displayInfo = () => {
        alert(`Name: ${profile.name}\nCompany: ${profile.company}\nLocation: ${profile.location}`);
    };

    return (
        <div className='container mx-auto'>
            {/* Header section for the profile page */}
            <div className="header">
                <h2 className="pageMessage">Rebirth Job Portal:</h2>
            </div>

            {/* Section displaying profile information */}
            <div className="profileInfo">
                <Image 
                    className="profileImage" 
                    src="/download.png" // Profile picture source.
                    alt="Profile" // Alt text for accessibility.
                    width={120} // Width of the profile image.
                    height={120} // Height of the profile image.
                />
                {/* Display profile details */}
                <h4>Name: {profile.name}</h4>
                <h4>Company Name: {profile.company}</h4>
                <h4>Location: {profile.location}</h4>
                
                {/* Button to display profile details in an alert box */}
                <button className="editAccount" onClick={displayInfo}>View Profile</button>
            </div>
        </div>
    );
}
