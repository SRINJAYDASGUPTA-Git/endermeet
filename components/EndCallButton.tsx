"use client"
import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk';
import React, { use } from 'react'

const EndCallButton = () => {
    const call = useCall();

    const {useLocalParticipant} = useCallStateHooks();
    const localParticipant = useLocalParticipant();
  return (
    <div>EndCallButton</div>
  )
}

export default EndCallButton