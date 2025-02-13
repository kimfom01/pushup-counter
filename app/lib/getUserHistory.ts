import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
const pageSize = 7;

const getUserHistory = async (clerkId: string, page?: number) => {
  const user = await prisma.user.findFirst({
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
          when: dayjs().to(item.date),
          date: dayjs(item.date).format("DD/MM/YYYY"),
        };
      })
    ),
  };
};

export default getUserHistory;
