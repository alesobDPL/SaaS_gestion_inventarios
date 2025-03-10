/*
  Warnings:

  - Changed the type of `email` on the `Supplier` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Supplier" DROP COLUMN "email",
ADD COLUMN     "email" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_email_key" ON "Supplier"("email");
