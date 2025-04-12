import { USER_ROLE } from "@prisma/client";

export interface ISessionToken {
  userId: number;
  role: USER_ROLE;
  email: string;
  name: string;
  exp: number;
  iat: number;
}
