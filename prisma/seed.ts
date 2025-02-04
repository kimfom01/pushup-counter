import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Test User",
    email: "test@gmail.com",
    pushups: {
      create: [
        {
          count: 30,
          date: new Date().toISOString(),
        },
      ],
    },
  },
];

export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}

main();
