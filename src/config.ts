import { config } from "dotenv";
import { join } from "path";

config({
  path: join(__dirname, "..", ".env"),
});

const secrets = {
  SERVER_PORT: process.env.SERVER_PORT || 3000,
  MYSQL_USERNAME: process.env.MYSQL_USERNAME || "root",
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || "root",
  MYSQL_DATABASE: process.env.MYSQL_DATABASE || "BookCatalog",
  MYSQL_HOST: process.env.MYSQL_HOST || "127.0.0.1",
  JWT_EXPIRESIN: process.env.JWT_EXPIRESIN || "2h",
  JWT_SECRETKEY: process.env.JWT_SECRETKEY || "secret",
  COOKIE_EXPIRESIN: process.env.COOKIE_EXPIRESIN || 720000,
  SIGNUP_SECRET: process.env.SIGNUP_SECRET || "secreto",
};

export default secrets;
