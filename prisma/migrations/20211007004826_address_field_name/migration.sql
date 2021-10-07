/*
  Warnings:

  - You are about to drop the column `address` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `neighbour` on the `Address` table. All the data in the column will be lost.
  - Added the required column `neighborhood` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "address",
DROP COLUMN "neighbour",
ADD COLUMN     "neighborhood" TEXT NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL;
