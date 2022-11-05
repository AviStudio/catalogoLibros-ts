import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy } from "passport-jwt";
import Usuario from "../Models/Usuarios";
import bcrypt from "bcryptjs";

const cookieExtractor = (req: any) => {
  let jwt = null;

  if (req && req.cookies) {
    jwt = req.cookies["jwt"];
  }

  return jwt;
};

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: "secreto",
    },
    async (jwt_payload, done) => {
      try {
        const usuario = await Usuario.findOne({
          where: {
            id: jwt_payload.id,
          },
        });

        if (!usuario) return done(null, false);

        done(null, usuario);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  new LocalStrategy(
    {
      usernameField: "email_usuario",
      passwordField: "contraseña_usuario",
    },
    async (username, password, done) => {
      try {
        const usuario = await Usuario.findOne({
          where: {
            email_usuario: username,
          },
        });

        if (!usuario) return done(null, false);

        const comparacionContraseña = bcrypt.compareSync(
          password,
          usuario.contraseña_usuario
        );

        if (!comparacionContraseña) return done(null, false);

        done(null, usuario);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (id, done) => {
  try {
    const usuario = await Usuario.findOne({ where: { id: id } });
    if (usuario) {
      done(null, usuario);
    }
  } catch (error) {
    done(error);
  }
});
