"use client"; // Enabling client-side behavior

import { useEffect } from "react";
import { useAuth } from "../../../auth/AuthProvider"; // Adjust path if needed
import { useRouter } from "next/navigation";
import React from 'react'
import JobListing from '../../jobListing'
import { Button } from '../../../dashboard/components/ui/button'
import { Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '../../../dashboard/components/ui/badge'

export default function DashboardPage() {
  const { user, loading, handleSignOut } = useAuth();
  const router = useRouter();

  // Redirect to home if user is not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/"); // Redirect to login
    }
  }, [user, loading, router]);

  if (loading) return <p>Loading...</p>;

  // Prevent flickering if user is null
  if (!user) {
    return <p>Unauthorized</p>;
  }

  const desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  const dummy = [
    {
      id: 1,
      name: "Software Engineer Intern",
      location: "1234 Windonway Lane"

    },
    {
      id: 2,
      name: "Software Engineer",
      location: "1234 Windonway Lane"
    },
    {
      id: 3,
      name: "Software Engineer",
      location: "1234 Windonway Lane"
    },
    {
      id: 4,
      name: "Software Engineer",
      location: "1234 Windonway Lane"
    },
    {
      id: 5,
      name: "Software Engineer",
      location: "1234 Windonway Lane"
    },
    {
      id: 6,
      name: "Software Engineer",
      location: "1234 Windonway Lane"
    }
  ]

  return (
    <section className='flex flex-col h-screen w-full px-16 pt-16 gap-8'>
      <div className="flex flex-col gap-8">
        <div className="flex flex-row gap-8 items-center justify-between">
          <h3 className="text-3xl font-bold">Welcome, {user.email}!</h3>
          <button
            onClick={handleSignOut}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Sign Out
          </button>
        </div>

        <div className='flex flex-col gap-1'>
          <h3 className='text-gray-900 text-2xl font-bold'>Insights</h3>
          <div className='flex h-full w-full bg-white p-8 rounded-xl gap-6'>
            <div className='flex gap-2 items-center'>
              <Badge variant="outline" className='text-xl'>187</Badge>
              <p>Applicable Candidates</p>
            </div>
            <div className='flex gap-2 items-center'>
              <Badge variant="outline" className='border-[#FFC10C] text-[#FFC10C] text-xl'>34</Badge>
              <p>In Interview Progress</p>
            </div>
            <div className='flex gap-2 items-center'>
              <Badge className='bg-[#FFC10C] text-xl'>17</Badge>
              <p>Accepted Applications</p>
            </div>

          </div>
        </div>
      </div>
      {/* <hr className="w-full divide-gray-400 h-[2px]"></hr> */}
      <div className='flex flex-col h-full gap-2'>
        <h3 className='text-gray-900 text-2xl font-bold'>Listings</h3>
        <div className='flex flex-col w-full bg-white p-8 rounded-t-xl gap-8'>

          <Button asChild className='bg-[#FFC10C]'>
            <Link href='/jobposting'><Sparkles />Create New Job Posting</Link>
          </Button>
          {dummy.map((dumdum) =>
            <JobListing key={dumdum.id} name={dumdum.name} location={dumdum.location} desc={desc} />
          )}
        </div>
      </div>
    </section>
  )
}