/*
  Warnings:

  - You are about to drop the `tags` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `descriptions` on table `tasks` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "tags" DROP CONSTRAINT "tags_task_id_fkey";

-- AlterTable
ALTER TABLE "tasks" ALTER COLUMN "descriptions" SET NOT NULL;

-- DropTable
DROP TABLE "tags";
