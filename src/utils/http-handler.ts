import { PrismaClientInitializationError } from "@prisma/client/runtime/library";
import { Response } from "express";
import { ApplicationError } from "../entities/errors/ApplicationError";

export class HttpHandler {
  constructor(private res: Response) {}

  sendJson(status: number, body: any) {
    return this.res.status(status).json(body || {});
  }

  ok(body: any) {
    return this.sendJson(200, body || {});
  }

  created(body: any) {
    return this.sendJson(201, body || {});
  }

  clientError(message: string) {
    return this.sendJson(400, { error: { message } });
  }

  notFound(message: string) {
    return this.sendJson(404, { error: { message } });
  }

  unauthorized(message: string) {
    return this.sendJson(401, { error: { message } });
  }

  forbidden(message: string) {
    return this.sendJson(403, { error: { message } });
  }

  processError(error: ApplicationError) {
    return this.sendJson(error.status, { error: { message: error.message } });
  }

  internalError(error: any) {
    if (error instanceof PrismaClientInitializationError) return this.databaseInitialization();

    console.log(error);

    return this.sendJson(500, {
      error: { message: "Houve um erro desconhecido, aguarde um instante enquanto resolvemos" },
    });
  }

  databaseInitialization() {
    return this.sendJson(500, {
      error: { message: "Nosso banco de dados se encontra fora do ar, tente novamente mais tarde" },
    });
  }
}
