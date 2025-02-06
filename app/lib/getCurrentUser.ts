import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import ensureSignedIn from "./ensureSignedIn";

const getCurrentUser = async () => {
  const clerkId = await ensureSignedIn();

  if (!clerkId) {
    throw redirect("/");
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkId: clerkId,
    },
  });

  if (!user) {
    throw redirect("/");
  }

  return user;
};

export default getCurrentUser;
