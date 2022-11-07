import { join } from "path";
import app from "./app";
import sequelize from "./db";

import "./Models/Books";
import "./Models/Categories";
import "./Models/Users";

async function main() {
  try {
    await sequelize.sync({ alter: true });

    app.listen(app.get("port"));
    console.log(`Server on port ${app.get("port")}`);
  } catch (error) {
    console.log("database connection refused", error);
  }
}

main();
