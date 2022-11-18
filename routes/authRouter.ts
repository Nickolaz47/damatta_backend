// Router
import { Router } from "express";
// Controllers
import authController from "../controllers/authController";
// Middlewares
import authValidations from "../middlewares/authValidations";
import validate from "../middlewares/handleValidation";

const authRouter = Router();

authRouter.post(
  "/register",
  authValidations.authCreationValidation(),
  validate,
  authController.register
);
authRouter.post(
  "/login",
  authValidations.authLoginValidation(),
  validate,
  authController.login
);
authRouter.get("/logout", authController.logout);

export default authRouter;
