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
  rdsDbName: process.env.RDS_DB_NAME,
  rdsHost: process.env.RDS_HOSTNAME,
  rdsUser: process.env.RDS_USER,
  rdsPassword: process.env.RDS_PASSWORD,
  rdsPort: process.env.RDS_PORT,
  prodFrontUrl: process.env.PROD_FRONT_URL,
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
};
