import { config } from "dotenv";
import { join } from "path";

config({
  path: join(__dirname, ".."),
});

const secrets = {
  SERVER_PORT: 3000 || process.env.SERVER_PORT,
  MYSQL_USERNAME: "root" || process.env.MYSQL_USERNAME,
  MYSQL_PASSWORD: "root" || process.env.MYSQL_PASSWORD,
  MYSQL_DATABASE: "BookCatalog" || process.env.MYSQL_DATABASE,
  MYSQL_HOST: "127.0.0.1" || process.env.MYSQL_HOST,
  JWT_EXPIRESIN: "2h" || process.env.JWT_EXPIRESIN,
  JWT_SECRETKEY: "secret" || process.env.JWT_SECRETKEY,
  COOKIE_EXPIRESIN: 2 * 60 * 60 * 100 || process.env.COOKIE_EXPIRESIN,
  SIGNUP_SECRET: "secreto" || process.env.SIGNUP_SECRET
};

export default secrets;
