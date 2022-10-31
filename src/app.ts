import express, { Application } from "express";
import morgan from "morgan";

// Inicializar express
const app: Application = express();

// Configuraciones
app.set("port", 3000);

// Middlewares
app.use(morgan("dev"));

//Rutas

export default app;
