import { DataTypes, Model } from "sequelize";
import sequelize from "../db";

class Users extends Model {
  declare id: number;
  declare username: string;
  declare email: string;
  declare password: string;
}

Users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { sequelize, timestamps: false }
);

export default Users;
