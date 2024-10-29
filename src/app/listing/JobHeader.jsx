import React from 'react'
import { Badge } from '@/components/ui/badge'

function JobHeader(props) {

  const skills = "Django, HTML"

  return (
    <section className="flex flex-row w-full h-auto bg-white border border-gray-300 shadow-[0px_0px_1rem_rgba(0,0,0,0.1)] transition rounded-2xl p-4 gap-4">
      <div className='w-full flex flex-row h-auto p-4 gap-5 items-center'>
        <h3 className="text-gray-800 text-2xl whitespace-pre-wrap">{props.name} </h3>
      <div className='h-view w-[1px] bg-gray-300' />
        <div className='flex gap-3'>
          <p className='font-[family-name:var(--font-europa)] font-bold'>Skills:</p>
          {skills.split(', ').map((skill) => <Badge variant="default" className='bg-[#FFC10C]'>{skill || "N/A"}</Badge>)}
        </div>
      </div>
    </section>
  )
}

export default JobHeader