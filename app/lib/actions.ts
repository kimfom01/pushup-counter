"use server";

import prisma from "@/lib/prisma";
import getCurrentUser from "./getCurrentUser";
import { revalidatePath } from "next/cache";

export async function logPushups(prevState: unknown, formData: FormData) {
  const user = await getCurrentUser();

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
    await prisma.pushup.create({
      data: {
        userId: user.id,
        count: pushupCount,
        date: new Date(),
      },
    });
    revalidatePath("/dashboard/counter");
    return { message: "Created new entry" };
  }

  pushup.count += pushupCount;
  await prisma.pushup.update({
    where: {
      id: pushup.id,
      userId: user.id,
    },
    data: pushup,
  });
  revalidatePath("/dashboard/counter");
  return { message: "Added the pushups" };
}
