import React, { Suspense } from "react";
import ensureSignedIn from "../lib/ensureSignedIn";
import LeaderboardTable from "./LeaderboardTable";
import getLeaderboardData from "../lib/getLeaderboard";
import { Metadata } from "next";
import dayjs from "dayjs";
import months from "../lib/months";

export const metadata: Metadata = {
  title: "Leaderboard | Pushup Counter",
  description: "Count Your Push-Ups",
};

const Leaderboard = async () => {
  await ensureSignedIn();
  const leaderBoardData = getLeaderboardData();
  return (
    <div className="grid grid-rows-[auto_1fr] justify-center h-full w-full gap-16 p-16">
      <h1 className="text-3xl text-center font-bold">
        Leaderboard ({months.get(dayjs().month() + 1)})
      </h1>
      <Suspense
        fallback={<div className="italic">Fetching the leaderboard</div>}
      >
        <LeaderboardTable data={leaderBoardData} />
      </Suspense>
    </div>
  );
};

export default Leaderboard;
