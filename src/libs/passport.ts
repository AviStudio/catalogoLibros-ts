import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy } from "passport-jwt";
import bcrypt from "bcryptjs";
import Users from "../Models/Users";
import { Request } from "express";
import secrets from "../config";

const cookieExtractor = (req: Request) => {
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
      secretOrKey: secrets.JWT_SECRETKEY,
    },
    async (jwt_payload, done) => {
      try {
        const user = await Users.findOne({
          where: {
            id: jwt_payload.id,
          },
        });

        if (!user) return done(null, false);

        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  new LocalStrategy(
    {
      usernameField: "emailSignin",
      passwordField: "passwordSignin",
    },
    async (username, password, done) => {
      try {
        const user = await Users.findOne({
          where: {
            email: username,
          },
        });

        if (!user) return done(null, false);

        const passCompared = bcrypt.compareSync(
          password,
          user.password
        );

        if (!passCompared) return done(null, false);

        done(null, user);
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
    const user = await Users.findOne({ where: { id: id } });
    if (user) {
      done(null, user);
    }
  } catch (error) {
    done(error);
  }
});
