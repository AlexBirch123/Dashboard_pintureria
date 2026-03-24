import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/BD.js";


// Clase para la creación de la tabla Sales
export class TypePayment extends Model {}

TypePayment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "typePayment",
  }
);


