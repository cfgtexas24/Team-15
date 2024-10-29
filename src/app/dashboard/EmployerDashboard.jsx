"use client"; // Enabling client-side behavior

import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider"; // Adjust path if needed
import { useRouter } from "next/navigation";
import React from 'react'
import JobListing from './JobListing'
import { Button } from '../dashboard/components/ui/button'
import { Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '../dashboard/components/ui/badge'

import JobPostingModal from '../dashboard/components/genModal'

export default function DashboardPage() {
  const { user, loading, handleSignOut } = useAuth();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

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

  const [jobPostings, setJobPostings] = useState([
    {
      id: 1,
      name: "Software Engineer Intern",
      location: "1234 Windonway Lane, San Francisco, CA",
      company: "TechWave Inc.",
      desc: "Join our dynamic engineering team for a summer internship! You will work on real-world projects involving cloud computing and microservices. Collaborate with senior engineers to develop features, debug issues, and optimize performance. Ideal candidates are familiar with JavaScript, Python, and have a passion for learning new technologies.",
      requirements: [
        "Currently pursuing a degree in Computer Science or related field.",
        "Familiarity with Git and Agile methodologies.",
        "Knowledge of JavaScript and/or Python is a plus.",
      ],
      salary: "Paid internship: $25/hour",
    },
    {
      id: 2,
      name: "Marketing Manager",
      location: "500 Lakeshore Drive, Chicago, IL",
      company: "BrightSpot Media",
      desc: "We are looking for a Marketing Manager to lead our brand campaigns and manage our content strategy. The ideal candidate has experience with SEO, social media marketing, and email campaigns. You will work closely with the sales team to align strategies and meet growth goals.",
      requirements: [
        "3+ years of experience in marketing or related roles.",
        "Proven ability to lead campaigns from start to finish.",
        "Strong analytical skills to measure and improve performance.",
      ],
      salary: "$75,000 - $90,000/year + benefits",
    },
    {
      id: 3,
      name: "Data Scientist",
      location: "Remote (USA)",
      company: "NeuroTech AI",
      desc: "Join our cutting-edge research team to build predictive models and analyze large datasets. You will work on developing AI-powered solutions for healthcare. This role requires expertise in Python, machine learning, and data visualization tools.",
      requirements: [
        "2+ years of experience working with data science tools and libraries.",
        "Strong knowledge of Python, TensorFlow, and SQL.",
        "Experience with healthcare datasets is a plus.",
      ],
      salary: "$110,000 - $130,000/year + stock options",
    },
    {
      id: 4,
      name: "Frontend Developer",
      location: "234 Main Street, New York, NY",
      company: "PixelPerfect LLC",
      desc: "We are seeking a creative Frontend Developer to join our design-focused team. You will be responsible for building beautiful, responsive web interfaces using React.js and TailwindCSS. If you are passionate about design systems and user experiences, this role is perfect for you.",
      requirements: [
        "Proficiency in HTML, CSS, JavaScript, and React.js.",
        "Experience with TailwindCSS and UI frameworks.",
        "A good eye for design and attention to detail.",
      ],
      salary: "$85,000 - $100,000/year",
    },
    {
      id: 5,
      name: "Human Resources Coordinator",
      location: "870 Corporate Ave, Dallas, TX",
      company: "GreenField Logistics",
      desc: "As an HR Coordinator, you will manage employee onboarding, payroll, and benefits. You will act as a liaison between management and employees to resolve issues. This role requires strong interpersonal skills and experience with HR software.",
      requirements: [
        "1+ years of experience in HR or administrative roles.",
        "Familiarity with HR systems such as BambooHR or Workday.",
        "Excellent communication and conflict resolution skills.",
      ],
      salary: "$50,000 - $65,000/year",
    },
    {
      id: 6,
      name: "UX/UI Designer",
      location: "Remote - Global",
      company: "Flow Creative Studio",
      desc: "We are looking for a talented UX/UI Designer to create engaging user experiences for our clients. You will collaborate with developers and product managers to design wireframes, mockups, and prototypes. Experience with Figma and Adobe Creative Suite is required.",
      requirements: [
        "Portfolio showcasing UX/UI design projects.",
        "Proficiency in Figma, Sketch, or Adobe XD.",
        "Ability to conduct user research and testing.",
      ],
      salary: "Competitive, based on experience",
    },
    {
      id: 7,
      name: "Operations Manager",
      location: "312 Ocean Drive, Miami, FL",
      company: "Sunset Resort & Spa",
      desc: "Lead our resort's operations team to deliver world-class guest experiences. You will oversee front desk operations, housekeeping, and guest services. This role requires excellent organizational skills and experience in hospitality management.",
      requirements: [
        "3+ years of experience in operations or hospitality.",
        "Strong leadership and problem-solving abilities.",
        "Ability to work flexible hours, including weekends.",
      ],
      salary: "$70,000 - $85,000/year + perks",
    },
  ]);

  const addJobPosting = (newJob) => {
    setJobPostings((prevJobs) => [...prevJobs, newJob]);
  };
  

  return (
    <section className='flex flex-col h-screen w-full px-16 pt-16 gap-8'>
      <div className="flex flex-col gap-8">
        <div className="flex flex-row gap-8 items-center justify-between">
          <h3 className="text-3xl font-bold mx-auto ">Welcome, {user.email}!</h3>
          {/* <button
            onClick={handleSignOut}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Sign Out
          </button> */}
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

          <Button className='bg-[#FFC10C]' onClick={handleOpenModal}>Create New Job Posting</Button>

          <JobPostingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        addJobPosting={addJobPosting}
      />

          {jobPostings.map((dumdum) =>
            <JobListing key={dumdum.id} name={dumdum.name} location={dumdum.location} desc={dumdum.desc} />
          )}
        </div>
      </div>
    </section>
  )
}