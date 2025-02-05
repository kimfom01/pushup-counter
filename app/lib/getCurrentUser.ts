import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const getCurrentUser = async () => {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    throw new NextResponse("Unauthorized", { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkId: clerkId,
    },
  });

  if (!user) {
    throw new NextResponse("User not exist", { status: 404 });
  }

  return user;
};

export default getCurrentUser;
