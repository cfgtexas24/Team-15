import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { BookOpen, Edit } from 'lucide-react'


function JobListing(props) {
  return (
    <Link href="/listing">
      <section className="flex flex-row w-full h-auto bg-white border border-gray-300 shadow-[0px_0px_1rem_rgba(0,0,0,0.1)] hover:shadow-[0px_0px_1rem_rgba(0,0,0,0.2)] transition rounded-2xl p-4 gap-4">
        <div className='w-auto flex flex-col justify-evenly h-auto p-4 gap-4'>
          <div className='flex items-center'>
            <h3 className="text-gray-800 text-2xl">{props.name}</h3>
          </div>
          <div className='flex gap-3'>
            <Button asChild className='bg-[#FFC10C]'>
              <Link href='/applicable_candidates'><Edit />Edit Job Listing</Link>
            </Button>
            <Button asChild variant='outline' className='text-[#FFC10C]'>
              <Link href='/applicable_candidates'><BookOpen />View Job Listing</Link>
            </Button>
          </div>
        </div>
        <div className='h-view w-[1px] bg-gray-300'/>
        <div className='w-flex flex flex-col h-auto p-4 gap-4'>
          
        <p className='text-gray-600'><span className='font-bold'>Location: </span>{props.location}</p>
        <p className='text-gray-600'><span className='font-bold'>Description: </span>{props.desc}</p>
        
        </div>
      </section>
    </Link>
  )
}

export default JobListing