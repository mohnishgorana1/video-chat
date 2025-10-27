"use client";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const Table = ({
  title,
  description,
  description2,
  isCapitalize,
}: {
  title: string;
  description: string;
  description2?: string;
  isCapitalize?: boolean;
}) => {
  return (
    <div className="flex flex-col items-start gap-2 xl:flex-row">
      <h1 className="text-base font-medium text-sky-300 lg:text-xl xl:min-w-32">
        {title}
      </h1>
      <h1
        className={`truncate text-sm font-bold max-sm:max-w-[30px] lg:text-xl `}
      >
        <span className={`${isCapitalize && "capitalize"}`}>{description}</span>
        <span className="font-normal">{description2}</span>
      </h1>
    </div>
  );
};

function PersonalRoomPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const meetingId = user?.id;
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;
  const client = useStreamVideoClient();

  const { call } = useGetCallById(meetingId!);

  const startRoom = async () => {
    if (!client || !user) return;

    const newCall = client.call("default", meetingId!);

    if (!call) {
      const response = await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }
    router.push(`/meeting/${meetingId}?personal=true`);
  };

  if (!isLoaded || !user) {
    return <Loader />;
  }

  return (
    <section className="size-full flex-col flex gap-10 text-white">
      <h1 className="text-3xl font-bold ">Personal Room</h1>

      <div className="flex w-full flex-col gap-8 xl:max-w-[900px]">
        <Table
          title="Topic"
          description={`${user?.fullName}`}
          description2={`'s meeting Room`}
          isCapitalize={true}
        />
        <Table title="Meeting ID" description={meetingId!} />
        <Table title="Invite Link" description={meetingLink} />
      </div>

      <div className="flex gap-5 ">
        <Button
          className="bg-blue-500 hover:bg-blue-700 duration-300 ease-in-out cursor-pointer"
          onClick={startRoom}
        >
          Start Meeting
        </Button>
        <Button
          className="bg-gray-700  hover:bg-gray-800 duration-300 ease-in-out cursor-pointer"
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast.success("Link Copied");
          }}
        >
          Copy Invitation
        </Button>
      </div>
    </section>
  );
}

export default PersonalRoomPage;
