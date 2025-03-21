-- AlterTable
ALTER TABLE "User" ADD COLUMN     "gmailIntegrationId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_gmailIntegrationId_fkey" FOREIGN KEY ("gmailIntegrationId") REFERENCES "GmailIntegration"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GmailTemplate" ADD CONSTRAINT "GmailTemplate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;
