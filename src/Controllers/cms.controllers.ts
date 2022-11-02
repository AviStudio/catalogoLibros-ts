import { Request, Response, Router } from "express";
import { json } from "sequelize";
import { IFormularioLibro } from "../libs/interfaces";
import Categoria from "../Models/Categorias";
import Libro from "../Models/Libros";
import { agregarLibro } from "../Services/cms.services";

const router: Router = Router();

// Vista del panel
router.get("/cms", async (req: Request, res: Response) => {
  const libros = JSON.stringify(
    await Libro.findAll({
      include: Categoria,
      attributes: {
        exclude: ["categoria_id"],
      },
    })
  );

  res.render("pages/cms/index.hbs", { Libros: JSON.parse(libros) });
});

// Vista del formulario
router.get("/cms/add", async (req: Request, res: Response) => {
  const Categorias = JSON.stringify(await Categoria.findAll());

  res.render("pages/cms/add.hbs", { Categorias: JSON.parse(Categorias) });
});

// Metodos del formulario
router.post("/cms/add/libro", async (req: Request, res: Response) => {
  const parametrosFormulario: IFormularioLibro = { ...req.body };

  const state = await agregarLibro(parametrosFormulario);

  if (!state) {
    res.json({ msg: "Algo salio mal" });
  }

  res.redirect("/cms/add");
});

router.post("/cms/add/categoria", async (req: Request, res: Response) => {
  const { nombre_categoria } = req.body;

  const nuevaCategoria = await Categoria.create({
    nombre_categoria: nombre_categoria,
  });

  await nuevaCategoria.save();

  res.redirect("/cms/add");
});

export default router;
