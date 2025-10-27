import MeetingStream from "@/components/MeetingStream";

async function MeetingPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  return (
    <main className="h-screen w-full">
      <MeetingStream meetingId={id} />
    </main>
  );
}

export default MeetingPage;
