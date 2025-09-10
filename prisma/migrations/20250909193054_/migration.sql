/*
  Warnings:

  - You are about to drop the column `name` on the `campaign_email` table. All the data in the column will be lost.
  - Added the required column `campaign_id` to the `campaign_email` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `log_history` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emailContent` to the `log_history` table without a default value. This is not possible if the table is not empty.
  - Added the required column `success` to the `log_history` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."campaign_email" DROP COLUMN "name",
ADD COLUMN     "campaign_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."log_history" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "emailContent" TEXT NOT NULL,
ADD COLUMN     "success" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "public"."campaign" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "datetime_create" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "datetime_update" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "campaign_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."campaign_email" ADD CONSTRAINT "campaign_email_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "public"."campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
