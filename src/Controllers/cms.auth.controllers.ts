import { Request, Response, Router } from "express";
import { signupUser } from "../Services/cms.auth.services";
import jwt from "jsonwebtoken";
import passport from "passport";
import { ILocalUser } from "../libs/interfaces";
import secrets from "../config";

const router: Router = Router();

router.get("/auth/cms/signup", (req: Request, res: Response) => {
  res.render("pages/cms/auth/signup.hbs", { layout: "cms.auth.hbs" });
});

router.post("/auth/cms/signup", async (req: Request, res: Response) => {
  // Cambiar por variables de entorno
  if (req.body.isSecret != secrets.SIGNUP_SECRET) {
    return res.redirect("/auth/cms/signup");
  }

  const state = await signupUser(req.body);

  if (!state) {
    return res.redirect("/auth/cms/signup");
  }

  res.redirect("/auth/cms/signin");
});

router.get("/auth/cms/signin", (req: Request, res: Response) => {
  res.render("pages/cms/auth/signin.hbs", { layout: "cms.auth.hbs" });
});

router.post(
  "/auth/cms/signin",
  passport.authenticate("local", {
    session: false,
    failureRedirect: "/auth/cms/signin",
    failureMessage: "Email or password isn't correct",
  }),
  (req: Request, res: Response) => {
    const user = <ILocalUser>req.user;

    const token = jwt.sign(
      { id: user.id, username: user.username },
      secrets.JWT_SECRETKEY,
      { expiresIn: secrets.JWT_EXPIRESIN }
    );

    res
      .cookie("jwt", token, {
        maxAge: <number> secrets.COOKIE_EXPIRESIN,
        secure: true,
      })
      .redirect("/cms");
  }
);

router.get(
  "/auth/cms/signout",
  passport.authenticate("jwt", { session: false }),
  (req: Request, res: Response) => {
    res.clearCookie("jwt").redirect("/auth/cms/signin");
  }
);

export default router;
