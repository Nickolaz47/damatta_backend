// Router
import { Router } from "express";
// Controllers
import saleController from "../controllers/saleController";
// Middlewares
import checkCookie from "../middlewares/checkAccessCookie";
import saleValidations from "../middlewares/saleValidations";
import validate from "../middlewares/handleValidation";

const saleRouter = Router();

saleRouter.get("/get", checkCookie, saleController.getSales);
saleRouter.post(
  "/create",
  checkCookie,
  saleValidations.saleCreateValidation(),
  validate,
  saleController.createSale
);
saleRouter.put(
  "/:id",
  checkCookie,
  saleValidations.saleUpdateValidation(),
  validate,
  saleController.updateSale
);
saleRouter.delete("/:id", checkCookie, saleController.deleteSale);

export default saleRouter;
