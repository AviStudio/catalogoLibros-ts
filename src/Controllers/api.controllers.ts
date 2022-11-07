import { Request, Response, Router } from "express";
import {
  apiQuery,
  apiQueryFiltered,
  categoriesQuery,
} from "../Services/api.services";

const router: Router = Router();

router.get("/api/books/:id?", async (req: Request, res: Response) => {
  if (!req.params.id) {
    const allBooks = await apiQuery();

    return res.json(allBooks);
  }

  const filteredBooks = await apiQueryFiltered(parseInt(req.params.id));

  res.json(filteredBooks);
});

router.get("/api/categories", async (req: Request, res: Response) => {
  const allCategories = await categoriesQuery();

  res.json(allCategories);
});

export default router;
