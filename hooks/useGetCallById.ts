import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export const useGetCallById = (id: string | string[]) => {
  const [call, setCall] = useState<Call>();
  const [isCallLoading, setIsCallLoading] = useState(true);
  const client = useStreamVideoClient();
  // Context Access (above line):
  // It uses useStreamVideoClient() to get the initialized Stream client instance
  // (which was set up in the StreamVideoProvider).

  useEffect(() => {
    if (!client) return;

    const loadCall = async () => {
      console.log("load call for meet id", id);
      const { calls } = await client.queryCalls({
        filter_conditions: {
          id,
        },
      });

      if (calls.length > 0) {
        setCall(calls[0]);
        console.log("call in useGetCallById hook", call);
      }
      setIsCallLoading(false);
    };
    loadCall();
  }, [client, id]);

  return { call, isCallLoading };
};
