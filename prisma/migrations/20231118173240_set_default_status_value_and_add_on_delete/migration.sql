-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_board_id_fkey";

-- AlterTable
ALTER TABLE "tasks" ALTER COLUMN "status" SET DEFAULT 'WAITING';

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_board_id_fkey" FOREIGN KEY ("board_id") REFERENCES "boards"("id") ON DELETE CASCADE ON UPDATE CASCADE;
