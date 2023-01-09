// Types
import { Request, Response } from "express";

const getHealth = (req: Request, res: Response) => {
  res.status(200).json({ message: "API is working!" });
};

const healthController = { getHealth };
export default healthController;
