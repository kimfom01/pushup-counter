import React, { Suspense } from "react";
import ensureSignedIn from "../lib/ensureSignedIn";
import LeaderboardTable from "@/components/LeaderboardTable";
import getLeaderboardData from "../lib/getLeaderboard";

const LeaderBoard = async () => {
  await ensureSignedIn();
  const leaderBoardData = getLeaderboardData();
  return (
    <div className="grid grid-rows-[auto_1fr] justify-center h-full w-full gap-16 p-16">
      <h1 className="text-3xl text-center font-bold">Leaderboard</h1>
      <Suspense
        fallback={<div className="italic">Fetching the leaderboard</div>}
      >
        <LeaderboardTable leaderBoardData={leaderBoardData} />
      </Suspense>
    </div>
  );
};

export default LeaderBoard;
