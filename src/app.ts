import express, { Application } from "express";
import morgan from "morgan";
import { create } from "express-handlebars";
import { join } from "path";

import indexRoutes from "./Controllers/index.controllers";
import cmsRoutes from "./Controllers/cms.controllers";

// Inicializar express
const app: Application = express();

// Configuraciones
app.set("port", 3000);
app.set("views", join(__dirname, "Views"));

// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine(
  ".hbs",
  create({
    defaultLayout: "main",
    layoutsDir: join(app.get("views"), "layouts"),
    partialsDir: join(app.get("views"), "partials"),
    extname: ".hbs",
  }).engine
);
app.set("view engine", ".hbs");

//Rutas
app.use(indexRoutes);
app.use(cmsRoutes);

export default app;
