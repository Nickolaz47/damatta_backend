// ORM
import { Sequelize } from "sequelize";
import mysql from "mysql2/promise";
// Config
import config from "config";
// Logger
import Logger from "../config/logger";

const dbName: string = "damatta";
const env = config.get("env");

const connectionConfig = {
  user:
    env === "dev"
      ? config.get<string>("devDbUser")
      : config.get<string>("prodDbUser"),
  password:
    env === "dev"
      ? config.get<string>("devDbPassword")
      : config.get<string>("prodDbPassword"),
  uri:
    env === "dev"
      ? config.get<string>("devDbUri")
      : config.get<string>("prodDbUri"),
};

// Criando o banco ou checando sua existência
mysql
  .createConnection({
    host: connectionConfig.uri,
    user: connectionConfig.user,
    password: connectionConfig.password,
  })
  .then((connection) => {
    connection
      .query(`CREATE DATABASE IF NOT EXISTS ${dbName}`)
      .then(() => {
        connection.end();
      })
      .catch((err) => Logger.error(err));
  })
  .catch((err) => Logger.error(err));

const sequelize = new Sequelize(
  dbName,
  connectionConfig.user,
  connectionConfig.password,
  { host: connectionConfig.uri, dialect: "mysql", logging: false }
);

export default sequelize;
