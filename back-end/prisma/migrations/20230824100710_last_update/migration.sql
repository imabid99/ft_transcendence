/*
  Warnings:

  - The primary key for the `channels` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_channelsId_fkey";

-- DropForeignKey
ALTER TABLE "_Admins" DROP CONSTRAINT "_Admins_B_fkey";

-- DropForeignKey
ALTER TABLE "_Members" DROP CONSTRAINT "_Members_B_fkey";

-- DropForeignKey
ALTER TABLE "_Owners" DROP CONSTRAINT "_Owners_B_fkey";

-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "channelsId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_Admins" ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_Members" ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_Owners" ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "channels" DROP CONSTRAINT "channels_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "channels_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "channels_id_seq";

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_channelsId_fkey" FOREIGN KEY ("channelsId") REFERENCES "channels"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Owners" ADD CONSTRAINT "_Owners_B_fkey" FOREIGN KEY ("B") REFERENCES "channels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Admins" ADD CONSTRAINT "_Admins_B_fkey" FOREIGN KEY ("B") REFERENCES "channels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Members" ADD CONSTRAINT "_Members_B_fkey" FOREIGN KEY ("B") REFERENCES "channels"("id") ON DELETE CASCADE ON UPDATE CASCADE;
