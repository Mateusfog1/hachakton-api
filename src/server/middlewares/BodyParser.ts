import { RequestHandler } from "express";
import { decodeMessage } from "../../utils/crypto";

export const BodyParserMiddleware: RequestHandler = async (req, res, next) => {
  try {
    let data = "";

    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => {
      if (data) {
        const isBodyEncrypted = req.header("Encrypted-Body") === "false";

        try {
          req.body = isBodyEncrypted ? JSON.parse(data) : JSON.parse(decodeMessage(data));
          next();
        } catch (error) {
          next(new Error("Invalid encrypted data"));
        }
      }

      next();
    });
  } catch (error) {
    next(error);
  }
};
