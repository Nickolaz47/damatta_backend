import express from "express";
import config from "config";
import Logger from "../config/logger";

const app = express();

app.use(express.json());

const port = config.get<number>("port");

app.listen(port, async () => {
  Logger.info(`🚀 App rodando na porta ${port}.`);
});
