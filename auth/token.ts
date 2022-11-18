import jwt from "jsonwebtoken";
import config from "config";

const accessSecret = config.get<string>("jwtAccessSecret");
const refreshSecret = config.get<string>("jwtRefreshSecret");

interface User {
  id: string;
  name: string;
}

export const generateAccessToken = (data: User): string => {
  return jwt.sign(data, accessSecret, { expiresIn: "15m" });
};

export const generateRefreshToken = (data: User): string => {
  return jwt.sign(data, refreshSecret, { expiresIn: "7d" });
};
