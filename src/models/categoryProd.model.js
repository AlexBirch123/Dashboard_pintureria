import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/BD.js";


// Clase para la creación de la tabla Category
export class Category extends Model {}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "category",
  }
);


