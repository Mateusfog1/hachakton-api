import "dotenv/config";
import { RequestHandler } from "express";
import { EntityError } from "../../entities/errors/EntityError";
import { SessionTokenService } from "../../services/session-token-service";
import { HttpHandler } from "../../utils/http-handler";
import { ApplicationError } from "../../entities/errors/ApplicationError";

export const VerifySessionToken: RequestHandler = async (req, res, next) => {
  const Handler = new HttpHandler(res);

  const sessionTokenService = new SessionTokenService({
    secret: process.env.TOKEN_SECRET!,
  });

  const token = req.header("Authorization");

  try {
    if (!token) return Handler.unauthorized("Nenhum token de sessão foi fornecido");

    const [bearer, value] = token.split(" ");

    if (bearer !== "Bearer") return Handler.unauthorized("Token de sessão inválido");

    if (!sessionTokenService.verifyToken(value)) return Handler.unauthorized("Token de sessão inválido");

    const sessionData = SessionTokenService.decodeToken(value);

    req.session_data = sessionData;
    next();
  } catch (error) {
    if (error instanceof ApplicationError) return Handler.processError(error);

    if (error instanceof EntityError) return Handler.clientError(error.message);

    return Handler.internalError(error);
  }
};
