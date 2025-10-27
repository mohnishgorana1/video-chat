import CallList from "@/components/CallList";
import React from "react";

function UpcomingPage() {
  return (
    <section className="size-full flex-col flex gap-10 text-white">
      <h1 className="text-3xl font-bold ">Upcoming</h1>

      <CallList 
      type="upcoming" 
      
      />
    </section>
  );
}

export default UpcomingPage;
