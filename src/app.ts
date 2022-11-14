import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import { create } from "express-handlebars";
import { join } from "path";
import override from "method-override";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";

import indexRoutes from "./Controllers/index.controllers";
import cmsRoutes from "./Controllers/cms.controllers";
import apiRoutes from "./Controllers/api.controllers";
import cmsAuthRoutes from "./Controllers/cms.auth.controllers";
import secrets from "./config";
import "./libs/passport";

// Inicializar express
const app: Application = express();

// Configuraciones
app.set("port", secrets.SERVER_PORT);
app.set("views", join(__dirname, "Views"));

// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(override("_method"));
app.use(cookieParser());
app.use(
  session({
    secret: "secreto",
    resave: false,
    saveUninitialized: false,
  })
);
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
app.use(passport.initialize());
app.use(passport.session());

//Rutas
app.use(indexRoutes);
app.use(apiRoutes);
app.use(cmsAuthRoutes);
app.use(cmsRoutes);

app.use(function (req: Request, res: Response) {
  res.status(404).render("404.hbs");
});

export default app;
