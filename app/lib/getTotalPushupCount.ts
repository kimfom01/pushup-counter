import prisma from "@/lib/prisma";
import dayjs from "dayjs";

const getTotalPushupCount = async (userId: number) => {
  const startOfMonth = dayjs().startOf("month").toDate();
  const endOfMonth = dayjs().add(1, "month").startOf("month").toDate();

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
