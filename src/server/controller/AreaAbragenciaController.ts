import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createAreaAbrangencia = async (req: Request, res: Response) => {
  const { nomeBairro, descricao } = req.body;

  try {
    const area = await prisma.areaAbrangencia.create({
      data: {
        nomeBairro,
        descricao,
      },
    });
    return res.status(201).json(area);
  } catch (error: any) {
    console.error('Erro ao criar Área de Abrangência:', error);
    return res.status(500).json({ error: error.message });
  }
};

export const getAllAreasAbrangencia = async (_req: Request, res: Response) => {
  try {
    const areas = await prisma.areaAbrangencia.findMany({
      include: {
        Usuario: true, 
      },
    });
    return res.status(200).json(areas);
  } catch (error: any) {
    console.error('Erro ao listar Áreas de Abrangência:', error);
    return res.status(500).json({ error: error.message });
  }
};

export const getAreaAbrangenciaById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const area = await prisma.areaAbrangencia.findUnique({
      where: { id: Number(id) },
      include: {
        Usuario: true,
      },
    });

    if (!area) {
      return res.status(404).json({ error: 'Área não encontrada' });
    }

    return res.status(200).json(area);
  } catch (error: any) {
    console.error('Erro ao buscar Área de Abrangência:', error);
    return res.status(500).json({ error: error.message });
  }
};
