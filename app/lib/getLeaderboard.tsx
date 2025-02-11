import prisma from "@/lib/prisma";

const getLeaderboardData = async () => {
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
