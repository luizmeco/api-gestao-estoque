-- CreateTable
CREATE TABLE "gastos" (
    "id" SERIAL NOT NULL,
    "data" DATE NOT NULL,
    "produto" VARCHAR(255) NOT NULL,
    "qtd" DECIMAL(10,2) NOT NULL,
    "valor_unitario" DECIMAL(10,2) NOT NULL,
    "total" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "gastos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "producao" (
    "id" SERIAL NOT NULL,
    "data" DATE NOT NULL,
    "estufa" INTEGER NOT NULL,
    "peso" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "producao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vendas" (
    "id" SERIAL NOT NULL,
    "data" DATE NOT NULL,
    "produto" VARCHAR(50) NOT NULL,
    "tipo" VARCHAR(20) NOT NULL,
    "qtd" DECIMAL(10,2) NOT NULL,
    "valor_unitario" DECIMAL(10,2) NOT NULL,
    "valor_total" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "vendas_pkey" PRIMARY KEY ("id")
);

