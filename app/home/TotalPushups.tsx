"use client";

import dayjs from "dayjs";
import { use } from "react";
import months from "../lib/months";

const TotalPushups = ({
  totalCount,
}: {
  totalCount: Promise<number | null>;
}) => {
  const count = use(totalCount);

  return (
    <div className="text-center w-full flex flex-col gap-4">
      <h1 className="text-xl font-bold">
        Total Pushups ({months.get(dayjs().month() + 1)})
      </h1>
      <div className="text-5xl font-bold">{count ?? 0}</div>
    </div>
  );
};

export default TotalPushups;
