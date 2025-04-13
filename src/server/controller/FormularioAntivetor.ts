import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createFormularioAntivetor = async (req: Request, res: Response) => {
  const { agenteId, bairro, tipoVetor, localInspecao, resultado, validado, dataValidacao } = req.body;

  try {
    const formulario = await prisma.formularioAntivetor.create({
      data: {
        agenteId,
        bairro,
        tipoVetor,
        localInspecao,
        resultado,
        validado,
        dataValidacao,
      },
    });
    return res.status(201).json(formulario);
  } catch (error: any) {
    console.error('Erro ao criar Formulário Antivetor:', error);
    return res.status(500).json({ error: error.message });
  }
};

export const getAllFormulariosAntivetor = async (_req: Request, res: Response) => {
  try {
    const formularios = await prisma.formularioAntivetor.findMany({
      include: {
        Usuario: true, 
      },
    });
    return res.status(200).json(formularios);
  } catch (error: any) {
    console.error('Erro ao listar Formulários Antivetores:', error);
    return res.status(500).json({ error: error.message });
  }
};

export const getFormularioAntivetorById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const formulario = await prisma.formularioAntivetor.findUnique({
      where: { id: Number(id) },
      include: {
        Usuario: true,
      },
    });

    if (!formulario) {
      return res.status(404).json({ error: 'Formulário não encontrado' });
    }

    return res.status(200).json(formulario);
  } catch (error: any) {
    console.error('Erro ao buscar Formulário Antivetor:', error);
    return res.status(500).json({ error: error.message });
  }
};
