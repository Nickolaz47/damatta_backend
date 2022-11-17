// App
import express from "express";
// Config
import config from "config";
// Logger
import Logger from "../config/logger";
// Middlewares
import morganMiddleware from "../middlewares/morgan";

const app = express();

app.use(express.json());
app.use(morganMiddleware)

const port = config.get<number>("port");

app.listen(port, async () => {
  Logger.info(`🚀 App rodando na porta ${port}.`);
});
