import dotenv from "dotenv";

dotenv.config();

export default { port: process.env.PORT, env: process.env.ENV };
