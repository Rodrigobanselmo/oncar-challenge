/*
  Warnings:

  - You are about to drop the column `fuil` on the `Car` table. All the data in the column will be lost.
  - Added the required column `fuel` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Car" DROP COLUMN "fuil",
ADD COLUMN     "fuel" TEXT NOT NULL;
