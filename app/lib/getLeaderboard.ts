import prisma from "@/lib/prisma";

const getLeaderboardData = async () => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

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
        totalPushups: count._sum.count,
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
