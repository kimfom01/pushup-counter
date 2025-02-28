import prisma from "@/lib/prisma";

const getLeaderboardData = async () => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const leaderBoard = await prisma.pushup
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
    where: {
      id: {
        in: leaderBoard.map((x) => x.userId),
      },
    },
  });

  const merged = leaderBoard.map((board) => {
    const user = users.find((y) => y.id === board.userId);

    return {
      userId: board.userId,
      name: user?.name ?? "Unkown",
      totalPushups: board.totalPushups,
    };
  });

  return merged;
};

export default getLeaderboardData;
