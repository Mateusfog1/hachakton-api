import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createUsuario = async (req: Request, res: Response) => {
  const {
    nome,
    email,
    senha,
    telefone,
    tipo,
    areaAbrangenciaId,
    estabelecimentoId,
  } = req.body;

  try {
    const usuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha,
        telefone,
        tipo,
        areaAbrangenciaId,
        estabelecimentoId,
      },
    });
    return res.status(201).json(usuario);
  } catch (error: any) {
    console.error('Erro ao criar Usuário:', error);
    return res.status(500).json({ error: error.message });
  }
};

export const getAllUsuarios = async (_req: Request, res: Response) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      include: {
        FormularioAntivetor: true, 
        NotificacaoArbovirose: true, 
        AreaAbrangencia: true, 
        EstabelecimentoSaude: true, 
      },
    });
    return res.status(200).json(usuarios);
  } catch (error: any) {
    console.error('Erro ao listar Usuários:', error);
    return res.status(500).json({ error: error.message });
  }
};

export const getUsuarioById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id: Number(id) },
      include: {
        FormularioAntivetor: true,
        NotificacaoArbovirose: true,
        AreaAbrangencia: true,
        EstabelecimentoSaude: true,
      },
    });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    return res.status(200).json(usuario);
  } catch (error: any) {
    console.error('Erro ao buscar Usuário:', error);
    return res.status(500).json({ error: error.message });
  }
};
