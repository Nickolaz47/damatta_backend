// Router
import { Router } from "express";
// Controllers
import expenseController from "../controllers/expenseController";
// Middlewares
import checkCookie from "../middlewares/checkAccessCookie";
import expenseValidations from "../middlewares/expenseValidations";
import validate from "../middlewares/handleValidation";

const expenseRouter = Router();

expenseRouter.get("/get", checkCookie, expenseController.getExpenses);
expenseRouter.get("/:id", checkCookie, expenseController.getExpenseById);
expenseRouter.post(
  "/create",
  checkCookie,
  expenseValidations.expenseCreateValidation(),
  validate,
  expenseController.createExpense
);
expenseRouter.put(
  "/:id",
  checkCookie,
  expenseValidations.expenseUpdateValidation(),
  validate,
  expenseController.updateExpense
);
expenseRouter.delete("/:id", checkCookie, expenseController.deleteExpense);

export default expenseRouter;
