import { Suspense } from "react";
import TotalPushups from "@/components/TotalPushups";
import LogPushupForm from "@/components/LogPushupForm";
import getCurrentUser from "./lib/getCurrentUser";
import getTotalPushupCount from "./lib/getTotalPushupCount";

export default async function Home() {
  const user = await getCurrentUser();
  const totalCount = getTotalPushupCount(user.id);

  return (
    <div className="grid grid-rows-[auto_1fr] justify-center items-center h-full w-full p-16">
      <Suspense
        fallback={<div className="italic">Calculating total pushups...</div>}
      >
        <TotalPushups totalCount={totalCount} />
      </Suspense>
      <LogPushupForm />
    </div>
  );
}
