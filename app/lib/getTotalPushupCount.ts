import prisma from "@/lib/prisma";

const getTotalPushupCount = async (userId: number) => {
  const count = await prisma.pushup
    .aggregate({
      _sum: {
        count: true,
      },
      where: {
        userId: userId,
      },
    })
    .then((x) => x._sum.count);

  return count;
};

export default getTotalPushupCount;
