// Types
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errorFormatter = ({ msg }: { msg: string }) => msg;
  const errors = validationResult(req).formatWith(errorFormatter).array();

  if (errors.length === 0) {
    return next();
  }

  return res.status(422).json({ errors });
};

export default validate;
