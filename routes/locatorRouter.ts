// Router
import { Router } from "express";
// Controller
import locatorController from "../controllers/locatorController";
// Middlewares
import checkCookie from "../middlewares/checkAccessCookie";
import locatorValidations from "../middlewares/locatorValidations";
import validate from "../middlewares/handleValidation";

const locatorRouter = Router();

locatorRouter.get("/get", checkCookie, locatorController.getLocators);
locatorRouter.get("/:id", checkCookie, locatorController.getLocatorById);
locatorRouter.post(
  "/create",
  checkCookie,
  locatorValidations.locatorCreateValidation(),
  validate,
  locatorController.createLocator
);
locatorRouter.put(
  "/:id",
  checkCookie,
  locatorValidations.locatorUpdateValidation(),
  validate,
  locatorController.updateLocator
);
locatorRouter.delete("/:id", checkCookie, locatorController.deleteLocator);

export default locatorRouter;
