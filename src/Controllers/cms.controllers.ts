import { Request, Response, Router } from "express";
import { json } from "sequelize";
import { IFormularioLibro } from "../libs/interfaces";
import Categoria from "../Models/Categorias";
import Libro from "../Models/Libros";
import { agregarLibro } from "../Services/cms.services";

const router: Router = Router();

// Vista
router.get("/cms", async (req: Request, res: Response) => {
  const libros = JSON.stringify(
    await Libro.findAll({
      include: Categoria,
      attributes: {
        exclude: ["categoria_id"],
      },
    })
  );

  res.render("pages/cms/index.hbs", {
    Libros: JSON.parse(libros),
    layout: "cms.hbs",
  });
});

router.get("/cms/add", async (req: Request, res: Response) => {
  const Categorias = JSON.stringify(await Categoria.findAll());

  res.render("pages/cms/add.hbs", {
    Categorias: JSON.parse(Categorias),
    layout: "cms.hbs",
  });
});

// Metodos
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

// Sustituir por delete cuando agregue method-override
router.post("/cms/delete/:id", async (req: Request, res: Response) => {
  const state = await Libro.destroy({
    where: { id: parseInt(req.params.id) },
  });

  if (!state) {
    return res.json({ msg: "No completado" });
  }

  res.redirect("/cms");
});

export default router;
