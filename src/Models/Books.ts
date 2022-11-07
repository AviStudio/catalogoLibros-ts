import { DataTypes, Model } from "sequelize";
import sequelize from "../db";

class Books extends Model {
  declare id: number;
  declare author: string;
  declare title: string;
  declare edition: string;
  declare year: string;
  declare editorial: string;
  declare country: string;
  declare photoUrl: string;
  declare categoryId: number;
}

Books.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    edition: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    year: {
      type: DataTypes.STRING(4),
      allowNull: false,
    },
    editorial: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photoUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, timestamps: false }
);

export default Books;
