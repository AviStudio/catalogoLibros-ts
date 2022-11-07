import { config } from "dotenv";
import { join } from "path";

config({
  path: join(__dirname, ".."),
});

const secrets = {
  MYSQL_USERNAME: "root" || process.env.MYSQL_USERNAME,
  MYSQL_PASSWORD: "root" || process.env.MYSQL_PASSWORD,
  MYSQL_DATABASE: "BookCatalog" || process.env.MYSQL_DATABASE,
  MYSQL_HOST: "127.0.0.1" || process.env.MYSQL_HOST,
};

export default secrets;
