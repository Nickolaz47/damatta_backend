// Router
import { Router } from "express";
// Controller
import tokenController from "../controllers/tokenController";

const tokenRouter = Router();

tokenRouter.get("/refresh", tokenController.refreshToken);

export default tokenRouter;
