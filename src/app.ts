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
// Middlewares
import morganMiddleware from "../middlewares/morgan";

const app = express();

app.use(express.json());
app.use(morganMiddleware);

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
