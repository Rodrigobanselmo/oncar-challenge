/*
  Warnings:

  - The primary key for the `Brand` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `brand` on the `Brand` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Brand` table. All the data in the column will be lost.
  - You are about to drop the column `brandId` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `modelId` on the `Car` table. All the data in the column will be lost.
  - The primary key for the `Model` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `brandId` on the `Model` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Model` table. All the data in the column will be lost.
  - You are about to drop the column `model` on the `Model` table. All the data in the column will be lost.
  - Added the required column `name` to the `Brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brandName` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modelName` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `price` on the `Car` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `brandName` to the `Model` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Model` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Car" DROP CONSTRAINT "Car_brandId_fkey";

-- DropForeignKey
ALTER TABLE "Car" DROP CONSTRAINT "Car_modelId_fkey";

-- DropForeignKey
ALTER TABLE "Model" DROP CONSTRAINT "Model_brandId_fkey";

-- DropIndex
DROP INDEX "Brand_brand_key";

-- DropIndex
DROP INDEX "Model_model_brandId_key";

-- AlterTable
ALTER TABLE "Brand" DROP CONSTRAINT "Brand_pkey",
DROP COLUMN "brand",
DROP COLUMN "id",
ADD COLUMN     "name" TEXT NOT NULL,
ADD CONSTRAINT "Brand_pkey" PRIMARY KEY ("name");

-- AlterTable
ALTER TABLE "Car" DROP COLUMN "brandId",
DROP COLUMN "modelId",
ADD COLUMN     "brandName" TEXT NOT NULL,
ADD COLUMN     "modelName" TEXT NOT NULL,
DROP COLUMN "price",
ADD COLUMN     "price" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Model" DROP CONSTRAINT "Model_pkey",
DROP COLUMN "brandId",
DROP COLUMN "id",
DROP COLUMN "model",
ADD COLUMN     "brandName" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "num_requests" SET DEFAULT 0,
ADD CONSTRAINT "Model_pkey" PRIMARY KEY ("name", "brandName");

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_brandName_fkey" FOREIGN KEY ("brandName") REFERENCES "Brand"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_modelName_brandName_fkey" FOREIGN KEY ("modelName", "brandName") REFERENCES "Model"("name", "brandName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Model" ADD CONSTRAINT "Model_brandName_fkey" FOREIGN KEY ("brandName") REFERENCES "Brand"("name") ON DELETE CASCADE ON UPDATE CASCADE;
