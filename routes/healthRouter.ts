// Controller
import healthController from "../controllers/healthController";
// Router
import { Router } from "express";

const healthRouter = Router();

healthRouter.get("/", healthController.getHealth);

export default healthRouter;
