/*
  Warnings:

  - A unique constraint covering the columns `[googleResourceId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "googleResourceId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_googleResourceId_key" ON "User"("googleResourceId");
