import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

function JobListing(props) {
  return (
    <Link href="/">
      <section className="w-full h-auto bg-white border border-gray-300 shadow-[0px_0px_1rem_rgba(0,0,0,0.1)] hover:shadow-[0px_0px_1rem_rgba(0,0,0,0.2)] transition rounded-2xl p-2">
        <div className='flex items-end'>
          <h3 className="text-gray-800 text-2xl">{props.name}{" "}</h3>
          <p className='text-gray-600'>{props.location}</p>
        </div>
      <div className='flex'>
        <Button>eoqwije</Button>
      </div>


      </section>
    </Link>
  )
}

export default JobListing