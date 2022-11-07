import { ISignupForm } from "../libs/interfaces";
import Users from "../Models/Users";
import bcrypt from "bcryptjs";
import { Op } from "sequelize";

export async function signupUser(params: ISignupForm): Promise<Boolean> {
  const itExists = await Users.findOne({
    where: {
      [Op.or]: [
        {
          username: params.usernameSignup,
        },
        {
          password: params.emailSignup,
        },
      ],
    },
  });

  if (itExists) {
    return false;
  }

  const passEncrypted = bcrypt.hashSync(params.passwordSignup, 10);

  const newUser = await Users.create({
    username: params.usernameSignup,
    email: params.emailSignup,
    password: passEncrypted,
  });

  newUser.save();

  return true;
}
