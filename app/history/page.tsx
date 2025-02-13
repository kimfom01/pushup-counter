import React, { Suspense } from "react";
import ensureSignedIn from "../lib/ensureSignedIn";
import HistoryTable from "./HistoryTable";
import getUserHistory from "../lib/getUserHistory";

const History = async () => {
  const clerkId = await ensureSignedIn();
  const historyData = getUserHistory(clerkId);

  return (
    <div className="grid grid-rows-[auto_1fr] justify-center h-full w-full gap-16 p-8">
      <h1 className="text-3xl text-center font-bold">History</h1>
      <Suspense fallback={<div className="italic">Fetching the history</div>}>
        <HistoryTable historyData={historyData} />
      </Suspense>
    </div>
  );
};

export default History;
