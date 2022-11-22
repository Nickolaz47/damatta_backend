// Router
import { Router } from "express";
// Controllers
import rentController from "../controllers/rentController";
// Middlewares
import checkCookie from "../middlewares/checkAccessCookie";
import rentValidations from "../middlewares/rentValidations";
import validate from "../middlewares/handleValidation";

const rentRouter = Router();

rentRouter.get("/get", checkCookie, rentController.getRents);
rentRouter.post(
  "/create",
  checkCookie,
  rentValidations.rentCreateValidation(),
  validate,
  rentController.createRent
);
rentRouter.put(
  "/:id",
  checkCookie,
  rentValidations.rentUpdateValidation(),
  validate,
  rentController.updateRent
);
rentRouter.delete("/:id", checkCookie, rentController.deleteRent);

export default rentRouter;
