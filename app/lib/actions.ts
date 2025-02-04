"use server";

import prisma from "@/lib/prisma";
import Pushup from "@/models/pushup";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function logPushups(formData: FormData) {
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

  const pushupCount = Number(formData.get("pushupCount"));

  const pushup = await prisma.pushup.findFirst({
    where: {
      userId: user.id,
      date: {
        gte: new Date().toISOString(),
      },
    },
  });

  if (!pushup) {
    const newPushup: Pushup = {
      userId: user.id,
      count: pushupCount,
      date: new Date(),
    };
    await prisma.pushup.create({ data: newPushup });
    return;
  }

  pushup.count += pushupCount;
  await prisma.pushup.update({
    where: {
      id: pushup.id,
      userId: user.id,
    },
    data: pushup,
  });
}
