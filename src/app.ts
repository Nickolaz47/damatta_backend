// App
import express from "express";
// Config
import config from "config";
// Logger
import Logger from "../config/logger";
// DB
import sequelize from "../db/conn";
// Models
import Rent from "../models/Rent";
import Locator from "../models/Locator";
import Renter from "../models/Renter";
import User from "../models/User";
import Sale from "../models/Sale";
import Expense from "../models/Expense";
// Middlewares
import cors from "cors";
import cookieParser from "cookie-parser";
import morganMiddleware from "../middlewares/morgan";
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

const app = express();

app.use(express.json());
app.use(cors({ origin: config.get("devFrontUrl"), credentials: true }));
app.use(cookieParser());
app.use(morganMiddleware);

app.use("/", authRouter);
app.use("/token", tokenRouter);
app.use("/locators", locatorRouter);
app.use("/renters", renterRouter);
app.use("/sales", saleRouter);
app.use("/rents", rentRouter);
app.use("/expenses", expenseRouter);
app.use("/finance", financeRouter);
app.use("/rentHistoric", rentHistoricRouter);
app.use("/health", healthRouter);

const port = config.get<number>("port");

sequelize
  .sync()
  .then(() => {
    Logger.info("Conectado ao MySQL.");
    app.listen(port, async () => {
      Logger.info(`🚀 App rodando na porta ${port}.`);
    });
  })
  .catch((err) => {
    Logger.error(err);
    process.exit(1);
  });
