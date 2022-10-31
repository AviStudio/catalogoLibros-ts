import { Request, Response, Router } from "express";
import Categoria from "../Models/Categorias";

const router: Router = Router();

router.post("/cms/add/libro", (req: Request, res: Response) => {});

router.get("/cms/add", (req: Request, res: Response) => {
  res.render("pages/cms/add.hbs");
});

router.post("/cms/add/categoria", async (req: Request, res: Response) => {
  const { nombre_categoria } = req.body;
  const nuevaCategoria = await Categoria.create({
    nombre_categoria: nombre_categoria,
  });

  console.log(nuevaCategoria);

  await nuevaCategoria.save();

  res.redirect("/cms/add")
});

export default router;
