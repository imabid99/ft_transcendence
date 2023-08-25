-- CreateTable
CREATE TABLE "_MutedUsers" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_BannedUsers" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MutedUsers_AB_unique" ON "_MutedUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_MutedUsers_B_index" ON "_MutedUsers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BannedUsers_AB_unique" ON "_BannedUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_BannedUsers_B_index" ON "_BannedUsers"("B");

-- AddForeignKey
ALTER TABLE "_MutedUsers" ADD CONSTRAINT "_MutedUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MutedUsers" ADD CONSTRAINT "_MutedUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "channels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BannedUsers" ADD CONSTRAINT "_BannedUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BannedUsers" ADD CONSTRAINT "_BannedUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "channels"("id") ON DELETE CASCADE ON UPDATE CASCADE;
