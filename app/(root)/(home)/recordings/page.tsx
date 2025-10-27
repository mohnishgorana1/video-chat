import CallList from "@/components/CallList";
import React from "react";

function RecordingsPage() {
  return (
    <section className="size-full flex-col flex gap-10 text-white">
      <h1 className="text-3xl font-bold ">Recordings</h1>
      <CallList type="recordings" />
    </section>
  );
}

export default RecordingsPage;
