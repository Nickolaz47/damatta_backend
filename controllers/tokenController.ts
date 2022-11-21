// Types
import { Request, Response } from "express";
// Config
import config from "config";
// Auth
import jwt from "jsonwebtoken";
import { generateAccessToken } from "../auth/token";

const refreshToken = async (req: Request, res: Response) => {
  const { cookies } = req;
  const refreshToken = cookies.authRefreshCookie;

  const refreshSecret = config.get<string>("jwtRefreshSecret");

  if (!refreshToken) {
    return res.status(401).json({ errors: ["Acesso negado!"] });
  }

  jwt.verify(refreshToken, refreshSecret, async (err: any, user: any) => {
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ errors: ["Refresh token expirado!"] });
    }

    try {
      const newAccessToken = generateAccessToken({
        id: user.id,
        name: user.name,
      });

      res.cookie("authAccessCookie", newAccessToken, {
        secure: false,
        httpOnly: true,
      });

      return res.json({ msg: "Access token renovado!" });
    } catch (error) {
      return res.status(403).json({ errors: ["Token inválido!"] });
    }
  });
};

const tokenController = { refreshToken };
export default tokenController;
