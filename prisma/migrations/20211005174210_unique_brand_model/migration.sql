/*
  Warnings:

  - A unique constraint covering the columns `[brand]` on the table `Brand` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[model,brandId]` on the table `Model` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Brand_brand_key" ON "Brand"("brand");

-- CreateIndex
CREATE UNIQUE INDEX "Model_model_brandId_key" ON "Model"("model", "brandId");
