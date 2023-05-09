/*
  Warnings:

  - You are about to drop the `agenda` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "agenda" DROP CONSTRAINT "agenda_clientId_fkey";

-- DropTable
DROP TABLE "agenda";

-- CreateTable
CREATE TABLE "Agenda" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "clientId" TEXT NOT NULL,

    CONSTRAINT "Agenda_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Agenda" ADD CONSTRAINT "Agenda_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
