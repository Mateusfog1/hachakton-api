import { sign, SignOptions, verify } from "jsonwebtoken";

export abstract class JWTService {
  constructor(private TOKEN_SECRET: string) {}

  protected generateToken<T extends Object>(props: T, options: SignOptions): string {
    return sign(props, this.TOKEN_SECRET, options);
  }

  protected verifyToken<T extends Object>(token: string): T | null {
    try {
      return verify(token, this.TOKEN_SECRET) as T;
    } catch (error) {
      return null;
    }
  }

  isTokenValid(token: string): boolean {
    return !!this.verifyToken(token);
  }
}
