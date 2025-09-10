-- CreateEnum
CREATE TYPE "public"."CampaignEmailSendType" AS ENUM ('SCHEDULE', 'TRIGGER');

-- AlterTable
ALTER TABLE "public"."log_history" ADD COLUMN     "sendBy" "public"."CampaignEmailSendType" NOT NULL DEFAULT 'TRIGGER';
