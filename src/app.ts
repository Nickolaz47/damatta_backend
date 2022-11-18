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
// Middlewares
import cors from "cors";
import cookieParser from "cookie-parser";
import morganMiddleware from "../middlewares/morgan";
// Routes
import authRouter from "../routes/authRouter";

const app = express();

app.use(express.json());
app.use(cors({ origin: config.get("devFrontUrl"), credentials: true }));
app.use(cookieParser());
app.use(morganMiddleware);

app.use("/", authRouter);

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
  });
