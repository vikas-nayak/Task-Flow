/*
  Warnings:

  - You are about to drop the column `gmailAccessToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `gmailIntegrationId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `gmailRefreshToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `googleResourceId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `localGoogleId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `GmailIntegration` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_gmailIntegrationId_fkey";

-- DropIndex
DROP INDEX "User_googleResourceId_key";

-- DropIndex
DROP INDEX "User_localGoogleId_key";

-- AlterTable
ALTER TABLE "Connections" ADD COLUMN     "gmailId" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "gmailAccessToken",
DROP COLUMN "gmailIntegrationId",
DROP COLUMN "gmailRefreshToken",
DROP COLUMN "googleResourceId",
DROP COLUMN "localGoogleId";

-- DropTable
DROP TABLE "GmailIntegration";

-- CreateTable
CREATE TABLE "Gmail" (
    "id" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "email" TEXT,
    "expiryDate" BIGINT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Gmail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Gmail_accessToken_key" ON "Gmail"("accessToken");

-- AddForeignKey
ALTER TABLE "Gmail" ADD CONSTRAINT "Gmail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Connections" ADD CONSTRAINT "Connections_gmailId_fkey" FOREIGN KEY ("gmailId") REFERENCES "Gmail"("id") ON DELETE SET NULL ON UPDATE CASCADE;
