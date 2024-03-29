// Router
import { Router } from "express";
// Controller
import financeController from "../controllers/financeController";
// Middlewares
import checkCookie from "../middlewares/checkAccessCookie";

const financeRouter = Router();

financeRouter.get("/balance", checkCookie, financeController.getBalance);
financeRouter.get(
  "/balanceTotal",
  checkCookie,
  financeController.getTotalBalance
);

export default financeRouter;
