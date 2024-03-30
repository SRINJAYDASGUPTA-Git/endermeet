"use client";

import { useState } from "react";
import Card from "./Card";
import { useRouter } from "next/navigation";
import MeetingModel from "./MeetingModel";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/components/ui/use-toast"

const MeetingTypeList = () => {
  const { toast } = useToast()
    const [meetingState, setMeetingState] = useState<'isScheduleMeeting'|'isJoiningMeeting'|'isInstantMeeting'|undefined>();
    const [values, setValues] = useState({
      dateTime: new Date(),
      description: "",
      link:""
    })

    const [callDetails, setCallDetails] = useState<Call>()
    const router = useRouter();
    const {user} = useUser();
    const client = useStreamVideoClient();
    const createMeeting = async () => {
      if(!user || !client) return;
      try {
        if(!values.dateTime) {
          toast({
            title: "Plesase Select a Date and Time",
          })
          return;
        }
        const id = crypto.randomUUID()
        const call = client.call('default', id)
        if(!call) throw new Error('Failed to create a call');

        const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
        const description = values.description || 'Instant Meeting';

        await call.getOrCreate({
          data:{
            starts_at: startsAt,
            custom:{
              description,
            }
          }
        })

        setCallDetails(call);

        if(!values.description){
          router.push(`/meeting/${call.id}`)
        }

        toast({
          title: "Meeting Created",
        })
        
      } catch (error) {
        console.log(error)
        toast({
          title: "Failed to Create Meeting",
        })
      }
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
