import "dotenv/config";
import { ApplicationError } from "../entities/errors/ApplicationError";

export class EnvironmentManager {
  static DATABASE_URL = process.env.DATABASE_URL!;
  static POSTGRES_USER = process.env.POSTGRES_USER!;
  static POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD!;
  static DATASOURCE_DB = process.env.DATASOURCE_DB!;
  static SALT = process.env.SALT!;
  static SECRET = process.env.SECRET!;
  static ENCODING_KEY = process.env
  static DEV_FRONTEND_HOST = process.env.DEV_FRONTEND_HOST!;
  static PROD_FRONTEND_HOST = process.env.PROD_FRONTEND_HOST!;
  static ENVIRONMENT = process.env.ENVIRONMENT!;
  static PORT = process.env.PORT!;
  static FRONTEND_HOST = process.env[`${this.ENVIRONMENT}_FRONTEND_HOST`];

  private requiredVariables = [
    "DATABASE_URL",
    "POSTGRES_USER",
    "POSTGRES_PASSWORD",
    "DATASOURCE_DB",
    "SALT",
    "SECRET",
    "ENCODING_KEY",
    "DEV_FRONTEND_HOST",
    "PROD_FRONTEND_HOST",
    "ENVIRONMENT",
    "PORT",
  ];

  public checkEnvironmentContext() {
    const missingVariables = this.requiredVariables.filter((variable) => !process.env[variable]);

    if (missingVariables.length > 0) {
      throw new ApplicationError(500, `Missing environment variables: ${missingVariables.join(", ")}`);
    }

    if (EnvironmentManager.ENVIRONMENT !== "DEV" && EnvironmentManager.ENVIRONMENT !== "PROD") {
      throw new ApplicationError(500, `Invalid environment variable: ${EnvironmentManager.ENVIRONMENT}`);
    }

    console.log(`[EnvironmentManager] Environment variables loaded successfully`);
  }
}
