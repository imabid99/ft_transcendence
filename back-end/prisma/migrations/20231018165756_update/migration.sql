/*
  Warnings:

  - The primary key for the `Friendship` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Friendship` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `actionUserId` to the `Friendship` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Friendship_senderId_receiverId_key";

-- AlterTable
ALTER TABLE "Friendship" DROP CONSTRAINT "Friendship_pkey",
ADD COLUMN     "actionUserId" TEXT NOT NULL,
ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "status" DROP DEFAULT,
ADD CONSTRAINT "Friendship_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_actionUserId_fkey" FOREIGN KEY ("actionUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
