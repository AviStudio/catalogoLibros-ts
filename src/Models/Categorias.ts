import { DataTypes, Model } from "sequelize";
import sequelize from "../db";
import Libro from "./Libros";

class Categoria extends Model {
  declare id: number;
  declare nombre_categoria: string;
}

Categoria.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_categoria: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
  },
  { sequelize, timestamps: false }
);

Categoria.hasMany(Libro, {
  foreignKey: "categoria_id",
  sourceKey: "id",
});

Libro.belongsTo(Categoria, {
  foreignKey: "categoria_id",
  targetKey: "id",
});

export default Categoria;
