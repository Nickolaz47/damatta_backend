// Router
import { Router } from "express";
// Routes
import authRouter from "../routes/authRouter";
import tokenRouter from "../routes/tokenRouter";
import locatorRouter from "../routes/locatorRouter";
import renterRouter from "../routes/renterRouter";
import saleRouter from "../routes/saleRouter";
import rentRouter from "../routes/rentRouter";
import expenseRouter from "../routes/expenseRouter";
import financeRouter from "../routes/financeRouter";
import rentHistoricRouter from "../routes/rentHistoricRouter";
import healthRouter from "../routes/healthRouter";

const apiRouter = Router();

apiRouter.use("/users", authRouter);
apiRouter.use("/token", tokenRouter);
apiRouter.use("/locators", locatorRouter);
apiRouter.use("/renters", renterRouter);
apiRouter.use("/sales", saleRouter);
apiRouter.use("/rents", rentRouter);
apiRouter.use("/expenses", expenseRouter);
apiRouter.use("/finance", financeRouter);
apiRouter.use("/rentHistoric", rentHistoricRouter);
apiRouter.use("/health", healthRouter);

export default apiRouter;