import LogPushupForm from "@/components/LogPushupForm";
import TotalPushups from "@/components/TotalPushups";
import { Suspense } from "react";
import getCurrentUser from "../lib/getCurrentUser";
import getTotalPushupCount from "../lib/getTotalPushupCount";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pushup Counter | Home",
  description: "Count Your Push-Ups",
};

const Home = async () => {
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
};

export default Home;
