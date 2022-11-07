import { Sequelize } from "sequelize";
import secrets from "./config";

const sequelize = new Sequelize(
  secrets.MYSQL_DATABASE,
  secrets.MYSQL_USERNAME,
  secrets.MYSQL_PASSWORD,
  {
    host: secrets.MYSQL_HOST,
    dialect: "mysql",
  }
);

export default sequelize;
