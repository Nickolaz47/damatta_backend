Interfaces;
import { UserInterface } from "../models/interfaces/User";

declare global {
  namespace Express {
    export interface Request {
      user?: UserInterface;
    }
  }
}
