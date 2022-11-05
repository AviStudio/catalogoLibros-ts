import app from "./app";
import sequelize from "./db";

import "./Models/Categorias";
import "./Models/Libros";
import "./Models/Usuarios";

async function main() {
  try {
    await sequelize.sync({ alter: true });

    app.listen(app.get("port"));
    console.log(`Server on port ${app.get("port")}`);
  } catch (error) {
    console.log("Conexion a base de datos rechazada", error);
  }
}

main();
