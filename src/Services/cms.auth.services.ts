import { IFormularioRegistro, IUsuarioLocal } from "../libs/interfaces";
import Usuario from "../Models/Usuarios";
import bcrypt from "bcryptjs";
import { Op } from "sequelize";

export async function registrarUsuario(
  params: IFormularioRegistro
): Promise<Boolean> {
  const usuarioExistente = await Usuario.findOne({
    where: {
      [Op.or]: [
        {
          nombre_usuario: params.nombre_usuario,
        },
        {
          email_usuario: params.email_usuario,
        },
      ],
    },
  });

  if (usuarioExistente) {
    return false;
  }

  const contraseñaEncriptada = bcrypt.hashSync(params.contraseña_usuario, 10);

  const nuevoUsuario = await Usuario.create({
    nombre_usuario: params.nombre_usuario,
    email_usuario: params.email_usuario,
    contraseña_usuario: contraseñaEncriptada,
  });

  nuevoUsuario.save();

  return true;
}
