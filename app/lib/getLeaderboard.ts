import prisma from "@/lib/prisma";
import dayjs from "dayjs";

const getLeaderboardData = async () => {
  const startOfMonth = dayjs().startOf("month").toDate();
  const endOfMonth = dayjs().add(1, "month").startOf("month").toDate();

  const scores = await prisma.pushup
    .groupBy({
      by: ["userId"],
      _sum: {
        count: true,
      },
      orderBy: {
        _sum: {
          count: "desc",
        },
      },
      where: {
        date: {
          gte: startOfMonth,
          lt: endOfMonth,
        },
      },
    })
    .then((entry) =>
      entry.map((count) => ({
        userId: count.userId,
        totalPushups: count._sum.count ?? 0,
      }))
    );

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
    },
    where: {
      id: {
        in: scores.map((x) => x.userId),
      },
    },
  });

  const merged = scores.map((item) => {
    const user = users.find((y) => y.id === item.userId);

    return {
      userId: item.userId,
      name: user?.name ?? "Unkown",
      totalPushups: item.totalPushups,
    };
  });

  return merged;
};

export default getLeaderboardData;
