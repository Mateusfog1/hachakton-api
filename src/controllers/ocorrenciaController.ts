import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'; 

const prisma = new PrismaClient(); 

export const createOcorrencia = async (req: Request, res: Response) => {
  const {
    userId,
    UBSId,
    descricao,
    arquivo_registro,
    latitude,
    longitude
  } = req.body;

  try {
    const ocorrencia = await prisma.ocorrencia.create({
      data: {
        userId,
        UBSId,
        descricao,
        arquivo_registro,
        latitude,
        longitude
      }
    });
    return res.status(201).json(ocorrencia);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};
