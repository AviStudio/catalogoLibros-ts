import { Request, Response, Router } from "express";
import Libro from "../Models/Libros";
import Categoria from "../Models/Categorias";

const router: Router = Router();

router.get("/api/libros/:id?", async (req: Request, res: Response) => {
  if (!req.params.id) {
    const libros = await Libro.findAll({
        include: Categoria,
        attributes: {exclude: ['categoria_id']}
    });

    return res.json(libros);
  }

  const librosCategoria = await Libro.findAll({
    where: {
      categoria_id: parseInt(req.params.id),
    },
    include: Categoria,
    attributes: {
      exclude: ['categoria_id']
    }
  });

  res.json(librosCategoria);
});

export default router;
