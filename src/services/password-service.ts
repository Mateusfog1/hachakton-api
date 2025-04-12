import { compareSync, genSaltSync, hashSync } from "bcrypt";
import { EnvironmentManager } from "../utils/environment-manager";

export class PasswordService {
  static hashPassword(password: string): string {
    const salt = genSaltSync(Number(EnvironmentManager.SALT));
    return hashSync(password, salt);
  }

  static comparePassword(password: string, hashedPassword: string): boolean {
    return compareSync(password, hashedPassword);
  }

  static generateDefaultRandomPassword(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}
