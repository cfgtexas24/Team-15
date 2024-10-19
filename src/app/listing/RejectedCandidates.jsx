"use client"; // Add this line at the top

import './ConsideredCandidates.css';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from '@/components/ui/badge';
import { ThumbsUp } from 'lucide-react';

export default function RejectedCandidates() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

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

  const getStatusClass = (status) => {
    if (status.includes("Stage 1")) {
      return "red-bar";
    } else if (status.includes("Stage 2")) {
      return "yellow-bar";
    } else if (status.includes("Stage 3")) {
      return "green-bar";
    }
    return "";
  };


  return (
    <div className="app-container">

      <form onSubmit={handleSubmit}>
        <div className='search-input'>
          <input className='search-bar'
            type='text'
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder='Enter Candidate Search...'
          />
          <button className='search-button' type='submit'>Search</button>
        </div>
      </form>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Profile</TableHead>
            <TableHead className='text-right'>Rejection Reason</TableHead>

          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((item, index) => (
            <TableRow>
              <TableCell className="font-medium" key={index}>{item["Full Name"] || "N/A"}</TableCell>
              <TableCell>{item.Email || "N/A"}</TableCell>
              <TableCell>{item.Phone || "N/A"}</TableCell>
              <TableCell>
                <a href={item.Profile || "#"} target="_blank" rel="noopener noreferrer">{item.Profile || "N/A"}</a>
              </TableCell>
              <TableCell className="text-right">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {!results.length && <p className="no-results-message">Candidate Not Found.</p>}

    </div>
  );
}    