-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "fromName" TEXT,
ALTER COLUMN "fromId" DROP NOT NULL;
