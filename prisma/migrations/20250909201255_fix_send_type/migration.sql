/*
  Warnings:

  - You are about to drop the column `sendBy` on the `log_history` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."log_history" DROP COLUMN "sendBy",
ADD COLUMN     "sendType" "public"."CampaignEmailSendType" NOT NULL DEFAULT 'TRIGGER';
