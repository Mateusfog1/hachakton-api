import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createNotificacaoArbovirose = async (req: Request, res: Response) => {
  const {
    profissionalId,
    tipoDoenca,
    nomePaciente,
    idadePaciente,
    sexoPaciente,
    bairroPaciente,
    confirmada,
    dataConfirmacao
  } = req.body;

  try {
    const notificacao = await prisma.notificacaoArbovirose.create({
      data: {
        profissionalId,
        tipoDoenca,
        nomePaciente,
        idadePaciente,
        sexoPaciente,
        bairroPaciente,
        confirmada,
        dataConfirmacao,
      },
    });
    return res.status(201).json(notificacao);
  } catch (error: any) {
    console.error('Erro ao criar Notificação Arbovirose:', error);
    return res.status(500).json({ error: error.message });
  }
};

export const getAllNotificacoesArbovirose = async (_req: Request, res: Response) => {
  try {
    const notificacoes = await prisma.notificacaoArbovirose.findMany({
      include: {
        Usuario: true, 
      },
    });
    return res.status(200).json(notificacoes);
  } catch (error: any) {
    console.error('Erro ao listar Notificações Arbovirose:', error);
    return res.status(500).json({ error: error.message });
  }
};

export const getNotificacaoArboviroseById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const notificacao = await prisma.notificacaoArbovirose.findUnique({
      where: { id: Number(id) },
      include: {
        Usuario: true,
      },
    });

    if (!notificacao) {
      return res.status(404).json({ error: 'Notificação não encontrada' });
    }

    return res.status(200).json(notificacao);
  } catch (error: any) {
    console.error('Erro ao buscar Notificação Arbovirose:', error);
    return res.status(500).json({ error: error.message });
  }
};
