"use client"
import MeetingTypeList from '@/components/MeetingTypeList';
import { useEffect, useState } from 'react';

const Home = () => {
  const [now, setNow] = useState(new Date());
  const date = (new Intl.DateTimeFormat('en-US', { dateStyle:'full' })).format(now)
  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(new Date());
    }, 1000)

    return () => clearInterval(intervalId);
  }, [])  
  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <div className='h-[300px] w-full rounded-[20px] bg-hero bg-cover'>
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className='glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal'>
            Upcoming Meeting at: 12:30 PM
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">
              {/* Time */}
              {now.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'})}
            </h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">
              {/* Day Date */}
              {date}
            </p>
          </div>
        </div>
      </div>
      <MeetingTypeList />
    </section>
  )
}

export default Home