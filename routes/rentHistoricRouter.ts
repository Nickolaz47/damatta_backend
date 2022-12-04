// Router
import { Router } from "express";
// Controller
import rentHistoricController from "../controllers/rentHistoricController";
// Middlewares
import checkCookie from "../middlewares/checkAccessCookie";

const rentHistoricRouter = Router();

rentHistoricRouter.get(
  "/get",
  checkCookie,
  rentHistoricController.getRentHistoric
);
rentHistoricRouter.post(
  "/create",
  checkCookie,
  rentHistoricController.createRentHistoric
);

export default rentHistoricRouter;
