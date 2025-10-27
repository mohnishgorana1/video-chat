"use client";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import MeetingRoom from "./MeetingRoom";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import MeetingSetup from "./MeetingSetup";
import Loader from "./Loader";

function MeetingStream({ meetingId }: { meetingId: string }) {
  const { user, isLoaded } = useUser();
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  const { call, isCallLoading } = useGetCallById(meetingId);
  console.log("call", call);

  if (!isLoaded || isCallLoading) {
    return <Loader />;
  }
  // Double-check: If we get here, 'call' MUST be defined, but let's add a final safety check
  if (!call) {
    console.error(
      "Call is undefined after loading finished. Check API key/data."
    );
    return <div>Error loading meeting data.</div>;
  }
  return (
    // Stream Call Context: It renders the <StreamCall call={call}>.
    // This is critical as it passes the retrieved Stream call object to the entire sub-tree, enabling components like MeetingSetup to interact with the call.
    <StreamCall call={call}>
      <StreamTheme >
        {!isSetupComplete ? (
          <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
        ) : (
          <MeetingRoom />
        )}
      </StreamTheme>
    </StreamCall>
  );
}

export default MeetingStream;
