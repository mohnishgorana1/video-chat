import CallList from "@/components/CallList";
import React from "react";

function PreviousPage() {
  return (
    <section className="size-full flex-col flex gap-10 text-white">
      <h1 className="text-3xl font-bold ">Previous</h1>
      <CallList 
        type="ended"
      />

    </section>
  );
}

export default PreviousPage;
