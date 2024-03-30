"use client"
import { useGetCalls } from '@/hooks/usegetCalls';
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import MeetingCard from './MeetingCard';

const CallList = ({type}:{type:'ended'|'upcoming'|'recordings'}) => {
    const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls();
    const [recordings, setRecordings] = useState<CallRecording[]>([])
    const router = useRouter();
    const getCalls = ()=>{
        switch (type) {
            case 'ended':
                return endedCalls;
            case 'upcoming':
                return upcomingCalls;
            case 'recordings':
                return recordings
            default:
                return [];
        }
    }
    const getNoCallsMessage = ()=>{
        switch (type) {
            case 'ended':
                return 'No Previous Calls';
            case 'upcoming':
                return 'No Upcoming Calls';
            case 'recordings':
                return 'No Recordings Available'
            default:
                return '';
        }
    }

    const calls = getCalls();
    const noCallsMessage = getNoCallsMessage();
  return (
    <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
        {calls && calls.length > 0 ? calls.map((meeting:Call|CallRecording) => (
            <MeetingCard />
        )): (<div>{noCallsMessage}</div>)
    }
    </div>
  )
}

export default CallList