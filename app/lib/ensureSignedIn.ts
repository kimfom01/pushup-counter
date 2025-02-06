import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const ensureSignedIn = async () => {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    throw redirect("/");
  }

  return clerkId;
};

export default ensureSignedIn;
