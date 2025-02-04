"use server";

import prisma from "@/lib/prisma";
import Pushup from "@/models/pushup";

export async function logPushups(formData: FormData) {
  const userId = Number(formData.get("userId"));
  const pushupCount = Number(formData.get("pushupCount"));

  const pushup = await prisma.pushup.findFirst({
    where: {
      userId: userId,
    },
  });

  if (!pushup) {
    const newPushup: Pushup = {
      userId: userId,
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
      userId: userId,
    },
    data: pushup,
  });
}
