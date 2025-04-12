import { RequestHandler } from "express";
import { prisma } from "../../prisma/client";

export const CriarOcorrenciaController: RequestHandler = async (req, res, next) => {
  try {
    await prisma.ocorrencia.create({ data: req.body });
    return res.status(201).send();
  } catch (error) {
    next(error);
  } 
};
