// Types
import { Request, Response } from "express";
// Config
import config from "config";
// Models
import User from "../models/User";
// Security
import { encryptData, decryptData } from "../auth/encryptData";
import { generateAccessToken, generateRefreshToken } from "../auth/token";

const register = async (req: Request, res: Response) => {
  const { name, password } = req.body;

  const checkIfUserExists = await User.findOne({ where: { name } });

  if (checkIfUserExists) {
    return res.status(409).json({ errors: ["O nome já está em uso."] });
  }

  const hashedPassword = encryptData(password);
  const user = { name, password: hashedPassword };

  const newUser = await User.create(user);

  const accessToken = generateAccessToken({
    id: newUser.id,
    name: newUser.name,
  });
  const refreshToken = generateRefreshToken({
    id: newUser.id,
    name: newUser.name,
  });

  res
    .cookie("authAccessCookie", accessToken, {
      secure: config.get<string>("env") === "dev" ? false : true,
      httpOnly: true,
    })
    .cookie("authRefreshCookie", refreshToken, {
      secure: config.get<string>("env") === "dev" ? false : true,
      httpOnly: true,
    });

  return res.json({ id: newUser.id });
};

const login = async (req: Request, res: Response) => {
  const { name, password } = req.body;

  const user = await User.findOne({ where: { name } });
  if (!user) {
    return res.status(401).json({ errors: ["Credenciais inválidas!"] });
  }

  const compairPasswords = decryptData(password, user.password);
  if (!compairPasswords) {
    return res.status(401).json({ errors: ["Credenciais inválidas!"] });
  }

  const accessToken = generateAccessToken({ id: user.id, name: user.name });
  const refreshToken = generateRefreshToken({ id: user.id, name: user.name });

  res
    .cookie("authAccessCookie", accessToken, {
      secure: config.get<string>("env") === "dev" ? false : true,
      httpOnly: true,
    })
    .cookie("authRefreshCookie", refreshToken, {
      secure: config.get<string>("env") === "dev" ? false : true,
      httpOnly: true,
    });

  return res.json({ id: user.id });
};

const logout = (req: Request, res: Response) => {
  res.clearCookie("authAccessCookie");
  res.clearCookie("authRefreshCookie");

  return res.json({ auth: false });
};

const authController = { register, login, logout };
export default authController;
