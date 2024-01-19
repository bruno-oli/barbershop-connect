-- CreateTable
CREATE TABLE "Barber" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "avatar" TEXT DEFAULT 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "BarberRefreshToken" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "expiresIn" INTEGER NOT NULL,
    "barberId" TEXT NOT NULL,
    CONSTRAINT "BarberRefreshToken_barberId_fkey" FOREIGN KEY ("barberId") REFERENCES "Barber" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Barber_email_key" ON "Barber"("email");
