import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT,
  env: process.env.ENV,
  devDbUri: process.env.DEV_DB_URI,
  devDbUser: process.env.DEV_DB_USER,
  devDbPassword: process.env.DEV_DB_PASSWORD,
  prodDbUri: process.env.PROD_DB_URI,
  prodDbUser: process.env.PROD_DB_USER,
  prodDbPassword: process.env.PROD_DB_PASSWORD,
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
};
