import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import ensureSignedIn from "./ensureSignedIn";

const getCurrentUser = async () => {
  const clerkId = await ensureSignedIn();

  if (!clerkId) {
    throw redirect("/login");
  }

  const user = await prisma.user.findUnique({
    select: {
      id: true,
    },
    where: {
      clerkId: clerkId,
    },
  });

  if (!user) {
    throw redirect("/login");
  }

  return user;
};

export default getCurrentUser;
