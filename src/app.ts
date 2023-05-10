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
import apiRouter from "../routes/apiRouter";

const app = express();

const front_url: string =
  config.get("env") === "dev"
    ? config.get("devFrontUrl")
    : config.get("prodFrontUrl");

app.use(express.json());
app.use(cors({ origin: front_url, credentials: true }));
app.use(cookieParser());
app.use(morganMiddleware);

app.use("/api", apiRouter);

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
