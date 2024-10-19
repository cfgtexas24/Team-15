import React from 'react'
import JobListing from './JobListing'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'
import Link from 'next/link'

function JobListingList() {

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
    <section className='flex flex-col h-screen w-full bg-gray-200 px-16 pt-16 gap-8'>
      <div className='flex h-1/4 w-full bg-white p-8 rounded-xl'>
        <h3 className='text-gray-900 text-2xl'>Insights</h3>
      </div>
      <div className='flex flex-col h-full w-full bg-white p-8 rounded-t-xl gap-8 overflow-y-scroll no-scrollbar'>
        <div className='flex justify-between'>
          <h3 className='text-gray-900 text-2xl'>Listings</h3>
          <Button asChild className='bg-[#FFC10C]'>
            <Link href='/jobposting'><Sparkles />Create New Job Posting</Link>
          </Button>
        </div>
        {dummy.map((dumdum) =>
          <JobListing key={dumdum.id} name={dumdum.name} location={dumdum.location} />
        )}
      </div>
    </section>
  )
}

export default JobListingList