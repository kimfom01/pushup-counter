import prisma from "@/lib/prisma";
import dayjs from "dayjs";
import { redirect } from "next/navigation";

const pageSize = 7;

const getUserHistory = async (clerkId: string, page?: number) => {
  const startOfMonth = dayjs().startOf("month").toDate();
  const endOfMonth = dayjs().add(1, "month").startOf("month").toDate();

  const user = await prisma.user.findFirst({
    select: { id: true },
    where: {
      clerkId: clerkId,
    },
  });

  if (!user) {
    throw redirect("/login");
  }

  const history = await prisma.pushup.findMany({
    where: {
      userId: user.id,
      date: {
        gte: startOfMonth,
        lt: endOfMonth,
      },
    },
    orderBy: {
      date: "desc",
    },
    skip: ((page ?? 1) - 1) * pageSize,
    take: pageSize,
  });

  const total = await prisma.pushup.count({
    where: {
      userId: user.id,
      date: {
        gte: startOfMonth,
        lt: endOfMonth,
      },
    },
  });

  return {
    total,
    page,
    pageSize,
    historyData: Promise.resolve(
      history.map((item) => {
        return {
          id: item.id,
          userId: item.userId,
          count: item.count,
          date: item.date.toLocaleString(),
        };
      })
    ),
  };
};

export default getUserHistory;
