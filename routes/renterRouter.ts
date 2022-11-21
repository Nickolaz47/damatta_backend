// Router
import { Router } from "express";
// Controllers
import renterController from "../controllers/renterController";
// Middlewares
import checkCookie from "../middlewares/checkAccessCookie";
import renterValidations from "../middlewares/renterValidations";
import validate from "../middlewares/handleValidation";

const renterRouter = Router();

renterRouter.get("/get", checkCookie, renterController.getRenters);
renterRouter.post(
  "/create",
  checkCookie,
  renterValidations.renterCreateValidation(),
  validate,
  renterController.createRenter
);
renterRouter.put(
  "/:id",
  checkCookie,
  renterValidations.renterUpdateValidation(),
  validate,
  renterController.updateRenter
);
renterRouter.delete("/:id", checkCookie, renterController.deleteRenter);

export default renterRouter;
