-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pushup" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,
    "date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pushup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Pushup" ADD CONSTRAINT "Pushup_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
