-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "complement" DROP NOT NULL,
ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "neighborhood" DROP NOT NULL,
ALTER COLUMN "street" DROP NOT NULL,
ALTER COLUMN "state" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Simulations" ADD COLUMN     "carValue" INTEGER,
ADD COLUMN     "initPayment" INTEGER,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL;
