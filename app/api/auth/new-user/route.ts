import { NextResponse } from "next/server";
import { currentUser, auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const user = await currentUser();
  if (!user) {
    return new NextResponse("User not exist", { status: 404 });
  }

  let dbUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
  });

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: user.fullName ?? "",
      },
    });
  }

  if (!dbUser) {
    return new NextResponse(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  }

  return new NextResponse(null, {
    status: 302,
    headers: {
      Location: "/",
    },
  });
}
