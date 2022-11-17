import winston from "winston";
import config from "config";

// Definindo nível dos erros
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Verificando o ambiente e a partir disso definindo se é warn ou debug
const level = (): string => {
  const env = config.get<string>("env");
  const isDev = env === "dev";
  return isDev ? "debug" : "warn";
};

// Definindo cor dos erros
const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

winston.addColors(colors);

// Formatando o log
const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf(
    (info) => `${info.timestamp} - ${info.level} - ${info.message}`
  )
);

// Salvando os logs
const transports = [
  new winston.transports.Console({
    format: winston.format.colorize({ all: true }),
  }),
  new winston.transports.File({
    filename: "./logs/error.log",
    level: "error",
  }),
  new winston.transports.File({
    filename: "./logs/all.log",
  }),
];

const Logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

export default Logger;
