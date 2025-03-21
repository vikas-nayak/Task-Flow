/*
  Warnings:

  - You are about to drop the column `GmailTemplate` on the `Workflows` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Workflows" DROP COLUMN "GmailTemplate",
ADD COLUMN     "gmailBody" TEXT,
ADD COLUMN     "gmailSubject" TEXT,
ADD COLUMN     "gmailTo" TEXT;
