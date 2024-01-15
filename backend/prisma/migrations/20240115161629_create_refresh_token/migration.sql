/*
  Warnings:

  - You are about to drop the column `createdAt` on the `UserRefreshToken` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `UserRefreshToken` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `UserRefreshToken` table. All the data in the column will be lost.
  - Added the required column `expiresIn` to the `UserRefreshToken` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserRefreshToken" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "expiresIn" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "UserRefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserRefreshToken" ("id", "userId") SELECT "id", "userId" FROM "UserRefreshToken";
DROP TABLE "UserRefreshToken";
ALTER TABLE "new_UserRefreshToken" RENAME TO "UserRefreshToken";
CREATE UNIQUE INDEX "UserRefreshToken_userId_key" ON "UserRefreshToken"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
