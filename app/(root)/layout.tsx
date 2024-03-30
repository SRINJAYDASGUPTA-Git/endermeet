import StreamVideoProvider from '@/providers/StreamClientProvider'
import { Metadata } from 'next';
import  { ReactNode } from 'react'
export const metadata: Metadata = {
  title: "EnderMeet",
  description: "Enderman Efficient Video Conferencing Platform",
};

const RootLayout = ({children}:{children:ReactNode}) => {
  return (
    <main>
      <StreamVideoProvider>
        {children}
      </StreamVideoProvider>  
    </main>
  )
}

export default RootLayout