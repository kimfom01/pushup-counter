import prisma from "@/lib/prisma";

const getTotalPushupCount = async (userId: number) => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const count = await prisma.pushup
    .aggregate({
      _sum: {
        count: true,
      },
      where: {
        userId: userId,
        date: {
          gte: startOfMonth,
          lt: endOfMonth,
        },
      },
    })
    .then((x) => x._sum.count);

  return count;
};

export default getTotalPushupCount;
