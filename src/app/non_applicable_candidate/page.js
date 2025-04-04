"use client"; 

import './None_Applicable_Candidates.css';
import { useState, useEffect} from 'react';
import Image from 'next/image';


export default function Non_Applicable_Candidates() {
    const [input, setInput] = useState('');
    const [results, setResults] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const sampleData = [
        {
            "Full Name": "Toby Grant",
            "Email": "tobygrant@example.com",
            "Phone": "123-456-7890",
            "Profile": "https://example.com/profile/tobygrant",
            "Reason for Rejection": "No experience in HTML"
        },
        {
            "Full Name": "Catherine Smith",
            "Email": "catherinesmith@example.com",
            "Phone": "098-765-4321",
            "Profile": "https://example.com/profile/tobygrant",
            "Reason for Rejection": "No Java experience"
        },
    ];

    useEffect(() => {
        setData(sampleData);
        setResults(sampleData);
        setLoading(false);
    }, []);

    const listingFinder = () => {
        const matches = sampleData.filter(item => {
            const current = item["Full Name"] ? item["Full Name"].toLowerCase() : '';
            return current.includes(input.toLowerCase());
        });
        setResults(matches);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        listingFinder();
    };

    return (
        <div className="app-container">
            <h1>Job Position: Software Engineer</h1>
            <h2>Search for Rejected Candidates</h2>
            <form onSubmit={handleSubmit}>
                <div className="search-input">
                    <input
                        className="search-bar"
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter Candidate Search..."
                    />
                    <button className="search-button" type="submit">Search</button>
                </div>
            </form>

            {!results.length && <p className="no-results-message">Candidate Not Found.</p>}

            <div className="results-container">
                {results.map((item, index) => (
                    <div className="container" key={index}>
                        <div className="logo">
                            <Image
                                src="/logo.png"
                                alt="Logo image"
                                width={100}
                                height={100}
                            />
                        </div>
                        <div className="candidate-info">
                            <p className="result-name">Name: {item["Full Name"] || "N/A"}</p>
                            <p className="result-info">Email: {item.Email || "N/A"}</p>
                            <p className="result-info">Phone: {item.Phone || "N/A"}</p>
                            <p className="result-info">
                                Profile: <a href={item.Profile || "#"} target="_blank" rel="noopener noreferrer">{item.Profile || "N/A"}</a>
                            </p>
                            <p className="result-info">Reason for Rejection: {item["Reason for Rejection"] || "N/A"}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
