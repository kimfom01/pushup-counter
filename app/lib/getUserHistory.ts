import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

const pageSize = 7;

const getUserHistory = async (clerkId: string, page?: number) => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

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
