import { DataTypes, Model } from "sequelize";
import sequelize from "../db";
import Books from "./Books";

class Categories extends Model {
  declare id: number;
  declare categoryName: string;
}

Categories.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    categoryName: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
  },
  { sequelize, timestamps: false }
);

Categories.hasMany(Books, {
  foreignKey: "categoryId",
  sourceKey: "id",
});

Books.belongsTo(Categories, {
  foreignKey: "categoryId",
  targetKey: "id",
});

export default Categories;
