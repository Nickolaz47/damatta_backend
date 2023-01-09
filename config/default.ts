import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT,
  env: process.env.ENV,
  devDbName: process.env.DEV_DB_NAME,
  devDbUri: process.env.DEV_DB_URI,
  devDbUser: process.env.DEV_DB_USER,
  devDbPassword: process.env.DEV_DB_PASSWORD,
  devFrontUrl: process.env.DEV_FRONT_URL,
  prodDbName: process.env.PROD_DB_NAME,
  prodDbUri: process.env.PROD_DB_URI,
  prodDbUser: process.env.PROD_DB_USER,
  prodDbPassword: process.env.PROD_DB_PASSWORD,
  prodDbPort: process.env.PROD_DB_PORT,
  prodFrontUrl: process.env.PROD_FRONT_URL,
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
};
