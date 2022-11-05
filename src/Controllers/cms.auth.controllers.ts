import { Request, Response, Router } from "express";
import { IUsuarioLocal } from "../libs/interfaces";
import { registrarUsuario } from "../Services/cms.auth.services";
import jwt from "jsonwebtoken";
import passport from "passport";

const router: Router = Router();

// Registro
router.post("/cms/register", async (req: Request, res: Response) => {
  // Cambiar por variables de entorno
  if (req.body.secreto != "secreto") {
    return res.json({ msg: "No puede realizarse el registro" });
  }

  const state = await registrarUsuario(req.body);

  if (!state) {
    return res.json({ msg: "Usuario ya existente" });
  }

  res.json({ msg: "Usuario registrado" });
});

// Inicio de sesión
router.get("/cms/login", (req: Request, res: Response) => {
  res.render("pages/cms/auth/login.hbs");
});

router.post(
  "/cms/login",
  passport.authenticate("local", { session: false }),
  (req: Request, res: Response) => {
    const usuario = <IUsuarioLocal>req.user;

    const token = jwt.sign(
      { id: usuario.id, nombre_usuario: usuario.nombre_usuario },
      "secreto"
    );

    res.cookie("jwt", token).redirect("/cms");
  }
);

// Terminar sesión
router.post(
  "/cms/logout",
  passport.authenticate("jwt", { session: false }),
  (req: Request, res: Response) => {
    res.clearCookie('jwt').redirect("/cms/login")
  }
);

export default router;
