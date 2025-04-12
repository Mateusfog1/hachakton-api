import "dotenv/config";
import { RequestHandler } from "express";
import { prisma } from "../../prisma/client";
import { SessionTokenService } from "../../services/session-token-service";

export const CriarUsuarioController: RequestHandler = async (req, res, next) => {
  console.log(req.body)
  try {
    const user = await prisma.uSER.create({ data: req.body });
    const tokenService = new SessionTokenService({ secret: process.env.SECRET! });
    const token = tokenService.generateToken(user);
    return res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};
