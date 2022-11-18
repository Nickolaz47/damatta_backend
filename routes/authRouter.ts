// Router
import { Router } from "express";
// Controllers
import authController from "../controllers/authController";

const authRouter = Router();

authRouter.post("register", authController.register);
authRouter.post("login", authController.login);
authRouter.get("logout", authController.logout);

export default authRouter;
