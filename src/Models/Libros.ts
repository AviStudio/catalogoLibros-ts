import { DataTypes, Model } from "sequelize";
import sequelize from "../db";

class Libro extends Model {
  declare id: number;
  declare autor: string;
  declare titulo: string;
  declare edicion: string;
  declare anio: string;
  declare editorial: string;
  declare pais: string;
  declare foto_link: string;
  declare categoria_id: number;
}

Libro.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    autor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    edicion: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    anio: {
      type: DataTypes.STRING(4),
      allowNull: false,
    },
    editorial: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pais: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    foto_link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, timestamps: false }
);

export default Libro;
