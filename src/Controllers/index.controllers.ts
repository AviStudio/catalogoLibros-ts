import { Request, Response, Router } from "express";

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
  res.render("pages/home/home.hbs");
});

router.get("/about", (req: Request, res: Response) => {});

router.get("/started", (req: Request, res: Response) => {});

export default router;
