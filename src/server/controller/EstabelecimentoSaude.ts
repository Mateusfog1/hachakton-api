import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createEstabelecimento = async (req: Request, res: Response) => {
  const { nome, tipo, bairro, cidade, cnes } = req.body;

  try {
    const novo = await prisma.estabelecimentoSaude.create({
      data: {
        nome,
        tipo,
        bairro,
        cidade,
        cnes,
      },
    });

    return res.status(201).json(novo);
  } catch (error: any) {
    console.error('Erro ao criar Estabelecimento de Saúde:', error);
    return res.status(500).json({ error: error.message });
  }
};

export const getAllEstabelecimentos = async (_req: Request, res: Response) => {
  try {
    const estabelecimentos = await prisma.estabelecimentoSaude.findMany({
      include: {
        Usuario: true,
      },
    });

    return res.status(200).json(estabelecimentos);
  } catch (error: any) {
    console.error('Erro ao listar Estabelecimentos de Saúde:', error);
    return res.status(500).json({ error: error.message });
  }
};

export const getEstabelecimentoById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const estabelecimento = await prisma.estabelecimentoSaude.findUnique({
      where: { id: Number(id) },
      include: {
        Usuario: true,
      },
    });

    if (!estabelecimento) {
      return res.status(404).json({ error: 'Estabelecimento não encontrado' });
    }

    return res.status(200).json(estabelecimento);
  } catch (error: any) {
    console.error('Erro ao buscar Estabelecimento:', error);
    return res.status(500).json({ error: error.message });
  }
};
