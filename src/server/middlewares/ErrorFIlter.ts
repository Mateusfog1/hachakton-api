import { ErrorRequestHandler } from "express";
import { EntityError } from "../../entities/errors/EntityError";
import { ApplicationError } from "../../entities/errors/ApplicationError";

export const ServerErrorFilter: ErrorRequestHandler = (error, _request, response, _next) => {
  if (error instanceof ApplicationError) {
    return response.status(error.status).json({ message: error.message });
  }

  if (error instanceof EntityError) {
    return response.status(400).json({ message: error.message });
  }

  if (error instanceof Error) {
    return response.status(500).json({ message: error.message });
  }

  return response.status(500).json({ message: "Erro desconhecido, contate o suporte ou aguarde alguns instantes" });
};
