"use client"; // Add this line at the top

import { useState, useEffect } from 'react';
import Image from 'next/image';
import JobHeader from './JobHeader'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabsContent } from '@radix-ui/react-tabs';
import ConsideredCandidates from './ConsideredCandidates'
import ApplicableCandidates from './ApplicableCandidates'
import RejectedCandidates from './RejectedCandidates'

export default function Listing_Page() {
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

  const dummy = {
    id: 1,
    name: "Software Engineer Intern",
    location: "1234 Windonway Lane"
  }


  return (
    <div className="flex flex-col p-6 gap-3">
      <JobHeader id={dummy.id} name={dummy.name} location={dummy.location} />
      <div className="flex flex-row w-full h-auto bg-white border border-gray-300 shadow-[0px_0px_1rem_rgba(0,0,0,0.1)] transition rounded-2xl p-4 gap-4">
        <Tabs defaultValue="applicable" className='w-full'>
          <TabsList>
            <TabsTrigger value="applicable">Applicable Candidates</TabsTrigger>
            <TabsTrigger value="considered">Applicants in consideration</TabsTrigger>
            <TabsTrigger value="rejected">Rejected Candidates</TabsTrigger>
          </TabsList>
          <TabsContent value="applicable">
            <ApplicableCandidates />
          </TabsContent>
          <TabsContent value="considered">
            <ConsideredCandidates />
          </TabsContent>
          <TabsContent value="rejected">
            <RejectedCandidates />
          </TabsContent>
        </Tabs>
      </div>

    </div>
  );
}    
