/**
 * @file page.js
 * @description This component displays a list of applicable job candidates for a Software Engineer position.
 * It allows users to search for candidates by name, displays their information (e.g., email, phone, profile),
 * and categorizes them based on their application status. The component uses sample data for demonstration purposes,
 * and dynamically updates the results as users type in the search bar. Application statuses are visually represented
 * with color-coded bars.
 * 
 * @dependencies 
 * - React hooks (useState, useEffect) to manage state and handle side effects (loading and filtering candidates).
 * - next/image: For rendering optimized images in the application.
 * - Custom CSS (Applicable_Candidates.css) for styling the page and status bars.
 * 
 * @function listingFinder
 * Filters the list of candidates by matching the input text to the candidate's full name.
 * 
 * @function handleSubmit
 * Handles the form submission to initiate the search process.
 * 
 * @function getStatusClass
 * Returns a CSS class based on the current stage of the application status, which is used to style the status bar.
 * 
 * @component Applicable_Candidates
 * Renders the search form, the candidate list, and visual application statuses. If no results are found, it displays
 * a "Candidate Not Found" message.
 */
"use client"; // Ensures this component is rendered on the client side.

import './Applicable_Candidates.css'; // Import custom CSS for styling.
import { useState, useEffect } from 'react'; // React hooks to manage state and side effects.
import Image from 'next/image'; // Next.js optimized image component.

export default function Applicable_Candidates() {
    // State variables for managing input, search results, data, loading state, and error handling.
    const [input, setInput] = useState(''); // Tracks user input in the search bar.
    const [results, setResults] = useState([]); // Stores the filtered list of candidates to be displayed.
    const [data, setData] = useState([]); // Holds the sample data of candidates.
    const [loading, setLoading] = useState(true); // Loading state indicator for when the data is being set.
    const [error, setError] = useState(null); // Handles potential errors (not used in this version).

    // Sample candidate data for demonstration purposes.
    const sampleData = [
        {
            "Full Name": "Toby Grant",
            "Email": "tobygrant@example.com",
            "Phone": "123-456-7890",
            "Profile": "https://example.com/profile/tobygrant",
            "Keywords": "JavaScript, React",
            "Application Status": "Stage 1: Resume Reviewed, Phone Call Completed"
        },
        {
            "Full Name": "Catherine Smith",
            "Email": "catherinesmith@example.com",
            "Phone": "098-765-4321",
            "Profile": "https://example.com/profile/catherinesmith",
            "Keywords": "Python, Django",
            "Application Status": "Stage 2: Interview with Team Leader Complete"
        },
    ];

    // useEffect hook to initialize data and results when the component mounts.
    useEffect(() => {
        setData(sampleData); // Load sample data.
        setResults(sampleData); // Initially set results to the full data set.
        setLoading(false); // Data loading complete.
    }, []);

    // Function to filter the candidates based on user input.
    const listingFinder = () => {
        const matches = sampleData.filter(item => {
            const current = item["Full Name"] ? item["Full Name"].toLowerCase() : ''; // Convert name to lowercase for case-insensitive search.
            return current.includes(input.toLowerCase()); // Check if the input matches any part of the candidate's name.
        });
        setResults(matches); // Update the search results.
    };

    // Handle form submission to trigger the search process.
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page reload on form submit.
        listingFinder(); // Call the function to filter the candidate list.
    };

    // Function to determine the CSS class for the status bar based on the application stage.
    const getStatusClass = (status) => {
        if (status.includes("Stage 1")) {
            return "red-bar"; // Red bar for Stage 1.
        } else if (status.includes("Stage 2")) {
            return "yellow-bar"; // Yellow bar for Stage 2.
        } else if (status.includes("Stage 3")) {
            return "green-bar"; // Green bar for Stage 3.
        }
        return ""; // No bar if status doesn't match any known stages.
    };

    return (
        <div className="app-container">
            {/* Page heading and search form */}
            <h1>Job Position: Software Engineer</h1>
            <h2>Search for Candidates</h2>
            <form onSubmit={handleSubmit}>
                <div className='search-input'>
                    <input className='search-bar'
                        type='text'
                        value={input}
                        onChange={e => setInput(e.target.value)} // Update the input state as the user types.
                        placeholder='Enter Candidate Search...'
                    />
                    <button className='search-button' type='submit'>Search</button>
                </div>
            </form>
    
            {!results.length && <p className="no-results-message">Candidate Not Found.</p>} {/* Message displayed when no candidates are found */}

            {/* Key for interpreting application statuses */}
            <div className="key-container">
                <h3>Application Status Key: </h3>
                <div className="key-item">
                    <div className="status-bar red-bar"></div>
                    <span>Stage 1: Resume Reviewed, Phone Call Completed</span>
                </div>
                <div className="key-item">
                    <div className="status-bar yellow-bar"></div>
                    <span>Stage 2: Interview with Team Leader Completed</span>
                </div>
                <div className="key-item">
                    <div className="status-bar green-bar"></div>
                    <span>Stage 3: Offer Extended</span>
                </div>
            </div>
    
            {/* Display the filtered list of candidates */}
            <div className="results-container">
                {results.map((item, index) => (
                    <div className='container' key={index}>
                        <div className='logo'>
                            <Image 
                                src="/logo.png"
                                alt="Logo image"
                                width={100}
                                height={100} // Display a logo or image for each candidate.
                            />
                        </div>
                        <div className="candidate info">
                            <p className='result-name'>Name: {item["Full Name"] || "N/A"}</p> {/* Display candidate's name */}
                            <p className="result-info">Email: {item.Email || "N/A"}</p> {/* Display candidate's email */}
                            <p className="result-info">Phone: {item.Phone || "N/A"}</p> {/* Display candidate's phone */}
                            <p className="result-info">Profile: <a href={item.Profile || "#"} target="_blank" rel="noopener noreferrer">{item.Profile || "N/A"}</a></p> {/* Display profile link */}
                            <p className="result-info">Keywords: {item.Keywords || "N/A"}</p> {/* Display keywords */}
                            <p className="result-info">Application Status: {item["Application Status"] || "N/A"}</p> {/* Display application status */}
                            
                            {/* Status bar with dynamic class based on the application stage */}
                            <div className={`status-bar ${getStatusClass(item["Application Status"])}`}></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
