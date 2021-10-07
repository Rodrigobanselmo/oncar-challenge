/*
  Warnings:

  - Added the required column `score` to the `Simulations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Simulations" ADD COLUMN     "score" INTEGER NOT NULL;
