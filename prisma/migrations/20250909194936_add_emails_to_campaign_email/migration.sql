/*
  Warnings:

  - The `status` column on the `campaign_email` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."CampaignEmailStatus" AS ENUM ('CANCEL', 'DRAFT', 'SCHEDULE', 'SEND');

-- AlterTable
ALTER TABLE "public"."campaign_email" ADD COLUMN     "emails" TEXT[],
DROP COLUMN "status",
ADD COLUMN     "status" "public"."CampaignEmailStatus" NOT NULL DEFAULT 'DRAFT';
