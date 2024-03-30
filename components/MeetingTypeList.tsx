"use client";

import { useState } from "react";
import Card from "./Card";
import { useRouter } from "next/navigation";
import MeetingModel from "./MeetingModel";

const MeetingTypeList = () => {
    const [meetingState, setMeetingState] = useState<'isScheduleMeeting'|'isJoiningMeeting'|'isInstantMeeting'|undefined>();
    const router = useRouter();

    const createMeeting = () => {
        
    }
  return (

    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4 ">
      <Card
        className="bg-orange-1"
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start and instant Meeting"
        handleClick={()=>setMeetingState('isInstantMeeting')}
      />
      <Card
        className= 'bg-blue-1'
        img= '/icons/join-meeting.svg'
        title= 'Join Meeting'
        description='via Invite Link'
        handleClick={()=>setMeetingState('isJoiningMeeting')}
      />
      <Card
         className= 'bg-purple-1'
        img= '/icons/schedule.svg'
        title= 'Schedule Meeting'
        description='Start and instant Meeting'
        handleClick={()=>setMeetingState('isScheduleMeeting')}
      />
      <Card
        className= 'bg-yellow-1'
        img= '/icons/add-meeting.svg'
        title= 'View Recordings'
        description='Meeting recordings'
        handleClick={()=>router.push('/recordings')}
      />
      <MeetingModel
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={()=>setMeetingState(undefined)}
        title='Start an Instant Meeting'
        className='text-center'
        buttonText='Start Meeting'
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;
