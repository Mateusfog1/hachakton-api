-- CreateTable
CREATE TABLE "Ocorrencia" (
    "ocorrenciaId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "UBSId" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "arquivo_registro" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ocorrencia_pkey" PRIMARY KEY ("ocorrenciaId")
);
