-- CreateTable
CREATE TABLE "Simulations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" INTEGER NOT NULL,
    "phone" INTEGER NOT NULL,
    "birthDate" TEXT NOT NULL,
    "email" INTEGER NOT NULL,
    "income" INTEGER NOT NULL,
    "haveHelp" BOOLEAN NOT NULL,
    "dirtyName" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Simulations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "cep" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "complement" TEXT NOT NULL,
    "neighbour" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "estate" TEXT NOT NULL,
    "simulationId" INTEGER NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Address_simulationId_unique" ON "Address"("simulationId");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_simulationId_fkey" FOREIGN KEY ("simulationId") REFERENCES "Simulations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
