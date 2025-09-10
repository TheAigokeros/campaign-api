/*
  Warnings:

  - You are about to drop the column `success` on the `log_history` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."log_history" DROP COLUMN "success";
