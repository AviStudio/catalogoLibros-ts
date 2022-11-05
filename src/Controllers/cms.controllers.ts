import { Request, Response, Router } from "express";
import passport from "passport";
import { IFormularioLibro } from "../libs/interfaces";
import Categoria from "../Models/Categorias";
import Libro from "../Models/Libros";
import { agregarLibro, editarLibro } from "../Services/cms.services";

const router: Router = Router();

router.all("*", passport.authenticate("jwt", { session: false }));

// Vista principal
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

// Agregar libro y categoria
router.get("/cms/add", async (req: Request, res: Response) => {
  const Categorias = JSON.stringify(await Categoria.findAll());

  res.render("pages/cms/add.hbs", {
    Categorias: JSON.parse(Categorias),
    layout: "cms.hbs",
  });
});

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

// Editar un elemento
router.get("/cms/edit/:id", async (req: Request, res: Response) => {
  const Categorias = JSON.stringify(await Categoria.findAll());
  const libroEditar = JSON.stringify(
    await Libro.findOne({
      where: {
        id: parseInt(req.params.id),
      },
      include: Categoria,
    })
  );

  res.render("pages/cms/edit.hbs", {
    Categorias: JSON.parse(Categorias),
    Libro: JSON.parse(libroEditar),
    layout: "cms.hbs",
  });
});

router.put("/cms/edit/:id", async (req: Request, res: Response) => {
  const parametrosFormulario: IFormularioLibro = { ...req.body };

  const state = await editarLibro(
    parametrosFormulario,
    parseInt(req.params.id)
  );

  if (!state) {
    res.json({ msg: "Algo salio mal" });
  }

  res.redirect("/cms");
});

// Eliminar un elemento
router.delete("/cms/delete/:id", async (req: Request, res: Response) => {
  const state = await Libro.destroy({
    where: { id: parseInt(req.params.id) },
  });

  if (!state) {
    return res.json({ msg: "No completado" });
  }

  res.redirect("/cms");
});

export default router;
