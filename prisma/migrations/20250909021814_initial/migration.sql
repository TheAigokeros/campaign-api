/*
  Warnings:

  - You are about to drop the `Campaign` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."Campaign";

-- CreateTable
CREATE TABLE "public"."template" (
    "id" SERIAL NOT NULL,
    "email_content" TEXT NOT NULL,

    CONSTRAINT "template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."campaign_mailer" (
    "id" SERIAL NOT NULL,
    "template_id" INTEGER,
    "name" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "email_content" TEXT NOT NULL,
    "schedule" TIMESTAMP(3) NOT NULL,
    "status" INTEGER NOT NULL,
    "datetime_create" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "datetime_update" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "campaign_mailer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."log_history" (
    "id" SERIAL NOT NULL,
    "template_id" INTEGER,
    "campaign_mailer" INTEGER NOT NULL,
    "time_stamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "log_history_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."campaign_mailer" ADD CONSTRAINT "campaign_mailer_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "public"."template"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."log_history" ADD CONSTRAINT "log_history_campaign_mailer_fkey" FOREIGN KEY ("campaign_mailer") REFERENCES "public"."campaign_mailer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
