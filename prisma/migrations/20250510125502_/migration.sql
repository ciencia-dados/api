-- CreateTable
CREATE TABLE "data" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "espId" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "data_espId_key" ON "data"("espId");
