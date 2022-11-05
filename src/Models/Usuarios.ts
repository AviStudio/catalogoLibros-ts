import { DataTypes, Model } from "sequelize";
import sequelize from "../db";

class Usuario extends Model {
  declare id: number;
  declare nombre_usuario: string;
  declare email_usuario: string;
  declare contraseña_usuario: string;
}

Usuario.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_usuario: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email_usuario: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    contraseña_usuario: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { sequelize, timestamps: false }
);

export default Usuario;
