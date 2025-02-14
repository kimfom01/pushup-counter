"use client";

import { use } from "react";

const TotalPushups = ({
  totalCount,
}: {
  totalCount: Promise<number | null>;
}) => {
  const count = use(totalCount);

  return (
    <div className="text-center w-full flex flex-col gap-4">
      <h1 className="text-xl font-bold">Total Pushups</h1>
      <div className="text-5xl font-bold">{count}</div>
    </div>
  );
};

export default TotalPushups;
