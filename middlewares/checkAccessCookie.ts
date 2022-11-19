// Types
import { Request, Response, NextFunction } from "express";
// Config
import config from "config";
// Models
import User from "../models/User.js";
// Auth
import jwt from "jsonwebtoken";
// Interfaces
import { UserInterface } from "../models/interfaces/User";

interface RequestWithUser extends Request {
  user: UserInterface | null;
}

const checkCookie = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { cookies } = req;
  const accessToken = cookies.authAccessCookie;

  const accessSecret = config.get<string>("jwtAccessSecret");

  if (!accessToken) {
    return res.status(401).json({ errors: ["Acesso negado!"] });
  }

  jwt.verify(accessToken, accessSecret, async (err: any, user: any) => {
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ errors: ["Access token expirado!"] });
    }

    try {
      req.user = await User.findOne({
        where: { id: user.id },
        attributes: { exclude: ["password"] },
        raw: true,
      });

      return next();
    } catch (error) {
      return res.status(403).json({ errors: ["Token inválido!"] });
    }
  });
};

export default checkCookie;
