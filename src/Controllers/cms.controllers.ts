import { Request, Response, Router } from "express";
import passport from "passport";
import { IBookForm } from "../libs/interfaces";
import {
  addCategory,
  addBook,
  listBooks,
  listCategories,
  bookQuery,
  editBook,
  deleteBook,
} from "../Services/cms.services";

const router: Router = Router();

router.all(
  "/cms/*",
  passport.authenticate("jwt", {
    session: false,
    failureMessage: "Invalid Token",
    failureRedirect: "/auth/cms/signin",
  })
);

// Vista principal
router.get("/cms", async (req: Request, res: Response) => {
  const allBooks = await listBooks();

  res.render("pages/cms/index.hbs", {
    Books: JSON.parse(allBooks),
    layout: "cms.hbs",
  });
});

// Agregar libro y categoria
router.get("/cms/add", async (req: Request, res: Response) => {
  const categories = await listCategories();

  res.render("pages/cms/add.hbs", {
    Categories: JSON.parse(categories),
    layout: "cms.hbs",
  });
});

router.post("/cms/add/book", async (req: Request, res: Response) => {
  const paramsForm: IBookForm = { ...req.body };

  const isAggregated = await addBook(paramsForm);

  if (!isAggregated) {
    res.json({ msg: "something went wrong" });
  }

  res.redirect("/cms/add");
});

router.post("/cms/add/category", async (req: Request, res: Response) => {
  const isAggregated = await addCategory(req.body.categoryNameForm);

  if (!isAggregated) return res.redirect("/cms/add");

  res.redirect("/cms/add");
});

// Editar un elemento
router.get("/cms/edit/:id", async (req: Request, res: Response) => {
  const categories = await listCategories();
  const bookData = await bookQuery(parseInt(req.params.id));

  res.render("pages/cms/edit.hbs", {
    Categories: JSON.parse(categories),
    Book: JSON.parse(bookData),
    layout: "cms.hbs",
  });
});

router.put("/cms/edit/:id", async (req: Request, res: Response) => {
  const paramsForm: IBookForm = { ...req.body };

  const state = await editBook(paramsForm, parseInt(req.params.id));

  if (!state) {
    res.json({ msg: "something went wrong" });
  }

  res.redirect("/cms");
});

// Eliminar un elemento
router.delete("/cms/delete/:id", async (req: Request, res: Response) => {
  const state = await deleteBook(parseInt(req.params.id));

  if (!state) {
    return res.json({ msg: "something went wrong" });
  }

  res.redirect("/cms");
});

export default router;
