import { decode, sign, verify } from "jsonwebtoken";
import { ISessionToken } from "../entities/SessionToken";
export type ISessionTokenInput = Omit<ISessionToken, "exp" | "iat">;

export interface ISessionTokenService {
  generateToken({ email, role, name, userId }: ISessionTokenInput): string;
  verifyToken(token: string): boolean;
}

export interface ISessionTokenServiceConfig {
  secret: string;
  /** Expressado em segundos, ou string descrevendo um intervalo de tempo. Ex: 60, "2 days", "10h", "7d" */
  expiresIn?: string;
}

export class SessionTokenService implements ISessionTokenService {
  private readonly secret: string;

  constructor(config: ISessionTokenServiceConfig) {
    this.secret = config.secret;
  }

  generateToken({ email, role, name, userId }: ISessionTokenInput): string {
    return sign({ email, role, name, userId }, this.secret);
  }

  verifyToken(token: string): boolean {
    try {
      verify(token, this.secret);
      return true;
    } catch (error) {
      return false;
    }
  }

  static decodeToken(token: string): ISessionToken {
    return decode(token) as ISessionToken;
  }
}
