//@ts-nocheck

"use client";
import { useGetCalls } from "@/hooks/useGetCalls";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import MeetingCard from "./MeetingCard";
import Loader from "./Loader";
import { toast } from "./ui/use-toast";

const CallList = ({ type }: { type: "ended" | "upcoming" | "recordings" }) => {
  const { endedCalls, upcomingCalls, callRecordings, isLoading } =
    useGetCalls();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);
  const router = useRouter();
  const hostname =
    typeof window !== "undefined" && window.location.hostname
      ? window.location.hostname
      : "";
  const getCalls = () => {
    switch (type) {
      case "ended":
        return endedCalls;
      case "upcoming":
        return upcomingCalls;
      case "recordings":
        return recordings;
      default:
        return [];
    }
  };
  const getNoCallsMessage = () => {
    switch (type) {
      case "ended":
        return "No Previous Calls";
      case "upcoming":
        return "No Upcoming Calls";
      case "recordings":
        return "No Recordings Available";
      default:
        return "";
    }
  };

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const callData = await Promise.all(
        callRecordings.map((meeting) => meeting.queryRecordings())
      );

      const recordings = callData
        .filter((call) => call.recordings.length > 0)
        .flatMap((call) => call.recordings);

      setRecordings(recordings);
      } catch (error) {
        toast({title:"Try again later", description:"Failed to fetch recordings"})
      }
      
    };
    if (type === "recordings") {
      fetchRecordings();
    }
  }, [type, recordings]);

  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();

  if (isLoading) return <Loader />;

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => (
          <MeetingCard
            key={(meeting as Call)?.id}
            icon={
              type === "ended"
                ? "/icons/previous.svg"
                : type === "upcoming"
                ? "/icons/upcoming.svg"
                : "/icons/recordings.svg"
            }
            title={
              (meeting as Call)?.state?.custom?.description?.substring(0, 20) ||
              meeting?.filename?.substring(0, 20) ||
              "Personal Room"
            }
            date={
              (meeting as Call)?.state?.startsAt?.toLocaleString() ||
              meeting.start_time.toLocaleString()
            }
            isPreviousMeeting={type === "ended"}
            buttonIcon1={type === "recordings" ? "/icons/play.svg" : undefined}
            handleClick={
              type === "recordings"
                ? () => router.push(`${meeting.url}`)
                : () => router.push(`/meeting/${meeting.id}`)
            }
            link={
              type === "recordings"
                ? meeting.url
                : `${hostname}/meeting/${meeting.id}`
            }
            buttonText={type === "recordings" ? "Play" : "Start"}
          />
        ))
      ) : (
        <div>{noCallsMessage}</div>
      )}
    </div>
  );
};

export default CallList;
