/*
  Warnings:

  - The values [CANCEL] on the enum `CampaignEmailSendType` will be removed. If these variants are still used in the database, this will fail.
  - The values [CANCEL] on the enum `CampaignEmailStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."CampaignEmailSendType_new" AS ENUM ('SCHEDULE', 'TRIGGER', 'CANCLE', 'FAIL');
ALTER TABLE "public"."log_history" ALTER COLUMN "sendType" DROP DEFAULT;
ALTER TABLE "public"."log_history" ALTER COLUMN "sendType" TYPE "public"."CampaignEmailSendType_new" USING ("sendType"::text::"public"."CampaignEmailSendType_new");
ALTER TYPE "public"."CampaignEmailSendType" RENAME TO "CampaignEmailSendType_old";
ALTER TYPE "public"."CampaignEmailSendType_new" RENAME TO "CampaignEmailSendType";
DROP TYPE "public"."CampaignEmailSendType_old";
ALTER TABLE "public"."log_history" ALTER COLUMN "sendType" SET DEFAULT 'TRIGGER';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "public"."CampaignEmailStatus_new" AS ENUM ('CANCLE', 'DRAFT', 'SCHEDULE', 'SEND', 'FAIL');
ALTER TABLE "public"."campaign_email" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."campaign_email" ALTER COLUMN "status" TYPE "public"."CampaignEmailStatus_new" USING ("status"::text::"public"."CampaignEmailStatus_new");
ALTER TYPE "public"."CampaignEmailStatus" RENAME TO "CampaignEmailStatus_old";
ALTER TYPE "public"."CampaignEmailStatus_new" RENAME TO "CampaignEmailStatus";
DROP TYPE "public"."CampaignEmailStatus_old";
ALTER TABLE "public"."campaign_email" ALTER COLUMN "status" SET DEFAULT 'DRAFT';
COMMIT;
