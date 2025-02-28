"use client";

import dayjs from "dayjs";
import { use } from "react";

const months = new Map([
  [1, "January"],
  [2, "February"],
  [3, "March"],
  [4, "April"],
  [5, "May"],
  [6, "June"],
  [7, "July"],
  [8, "August"],
  [9, "September"],
  [10, "October"],
  [11, "November"],
  [12, "December"],
]);
const TotalPushups = ({
  totalCount,
}: {
  totalCount: Promise<number | null>;
}) => {
  const count = use(totalCount);

  return (
    <div className="text-center w-full flex flex-col gap-4">
      <h1 className="text-xl font-bold">
        Total Pushups for {months.get(dayjs().month() + 1)}
      </h1>
      <div className="text-5xl font-bold">{count}</div>
    </div>
  );
};

export default TotalPushups;
