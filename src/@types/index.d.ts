import { ISessionToken } from "../entities/SessionToken";

declare global {
  namespace Express {
    export interface Request {
      session_data: ISessionToken;
    }
  }
}
