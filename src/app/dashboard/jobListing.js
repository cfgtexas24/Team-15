import React from 'react';
import Link from 'next/link';
import { Button } from './components/ui/button';
import { BookOpen, Edit } from 'lucide-react';

function JobListing(props) {
  return (
    <Link href="/">
      <section className="flex flex-col md:flex-row w-full bg-white border border-gray-300 shadow-[0px_0px_1rem_rgba(0,0,0,0.1)] 
                         hover:shadow-[0px_0px_1rem_rgba(0,0,0,0.2)] transition rounded-2xl p-4 gap-4">
        
        {/* Left Section */}
        <div className="w-full md:w-auto flex flex-col justify-evenly p-4 gap-4">
          <div className="flex items-center">
            <h3 className="text-gray-800 text-xl md:text-2xl">{props.name}</h3>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild className="bg-[#FFC10C]">
              <Link href="/applicable_candidates">
                <Edit className="mr-2" /> Edit Job Listing
              </Link>
            </Button>
            <Button asChild variant="outline" className="text-[#FFC10C]">
              <Link href="/applicable_candidates">
                <BookOpen className="mr-2" /> View Job Listing
              </Link>
            </Button>
          </div>
        </div>

        {/* Divider (Hidden on small screens) */}
        <div className="hidden md:block h-auto w-[1px] bg-gray-300" />

        {/* Right Section */}
        <div className="w-full md:w-auto flex flex-col p-4 gap-4">
          <p className="text-gray-600">
            <span className="font-bold">Location: </span>
            {props.location}
          </p>
          <p className="text-gray-600">
            <span className="font-bold">Description: </span>
            {props.desc}
          </p>
        </div>
      </section>
    </Link>
  );
}

export default JobListing;
