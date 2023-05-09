/*
  Warnings:

  - The primary key for the `agenda` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `agenda` table. All the data in the column will be lost.
  - You are about to drop the column `meetingId` on the `agenda` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `agenda` table. All the data in the column will be lost.
  - You are about to drop the `admins` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `mastering` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `clientId` to the `agenda` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `agenda` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `agenda` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('BASIC', 'ADMIN');

-- DropForeignKey
ALTER TABLE "admins" DROP CONSTRAINT "admins_adminId_fkey";

-- DropForeignKey
ALTER TABLE "admins" DROP CONSTRAINT "admins_orderId_fkey";

-- DropForeignKey
ALTER TABLE "agenda" DROP CONSTRAINT "agenda_userId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_masteringType_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_userId_fkey";

-- DropIndex
DROP INDEX "agenda_userId_key";

-- AlterTable
ALTER TABLE "agenda" DROP CONSTRAINT "agenda_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "meetingId",
DROP COLUMN "userId",
ADD COLUMN     "clientId" TEXT NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "agenda_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "admins";

-- DropTable
DROP TABLE "mastering";

-- DropTable
DROP TABLE "orders";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'BASIC',
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clientId" TEXT NOT NULL,
    "feedback" TEXT,
    "price" INTEGER NOT NULL DEFAULT 0,
    "numbOfTrack" INTEGER NOT NULL DEFAULT 1,
    "masteringId" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mastering" (
    "id" TEXT NOT NULL,
    "masteringType" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "Mastering_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Mastering_masteringType_key" ON "Mastering"("masteringType");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_masteringId_fkey" FOREIGN KEY ("masteringId") REFERENCES "Mastering"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agenda" ADD CONSTRAINT "agenda_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
