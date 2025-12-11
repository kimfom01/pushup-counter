import { Suspense } from "react";
import getCurrentUser from "../lib/getCurrentUser";
import getTotalPushupCount from "../lib/getTotalPushupCount";
import TotalPushups from "./counter/TotalPushups";

const Dashboard = async () => {
  const user = await getCurrentUser();
  const totalCount = getTotalPushupCount(user.id);
  return (
    <div className="grid grid-rows-[auto_1fr] justify-center items-center h-full w-full p-16">
      <Suspense
        fallback={<div className="italic">Calculating total pushups...</div>}
      >
        <TotalPushups totalCount={totalCount} />
      </Suspense>
    </div>
  );
};

export default Dashboard;
