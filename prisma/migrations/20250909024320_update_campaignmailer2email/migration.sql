/*
  Warnings:

  - You are about to drop the column `campaign_mailer` on the `log_history` table. All the data in the column will be lost.
  - You are about to drop the `campaign_mailer` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `campaign_email_id` to the `log_history` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."campaign_mailer" DROP CONSTRAINT "campaign_mailer_template_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."log_history" DROP CONSTRAINT "log_history_campaign_mailer_fkey";

-- AlterTable
ALTER TABLE "public"."log_history" DROP COLUMN "campaign_mailer",
ADD COLUMN     "campaign_email_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "public"."campaign_mailer";

-- CreateTable
CREATE TABLE "public"."campaign_email" (
    "id" SERIAL NOT NULL,
    "template_id" INTEGER,
    "name" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "email_content" TEXT NOT NULL,
    "schedule" TIMESTAMP(3) NOT NULL,
    "status" INTEGER NOT NULL,
    "datetime_create" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "datetime_update" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "campaign_email_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."campaign_email" ADD CONSTRAINT "campaign_email_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "public"."template"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."log_history" ADD CONSTRAINT "log_history_campaign_email_id_fkey" FOREIGN KEY ("campaign_email_id") REFERENCES "public"."campaign_email"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
