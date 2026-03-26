import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/BD.js";
import { CategoryProd } from "./categoryProd.model.js";
import { Provider } from "./provider.model.js";
import { Branch } from "./branch.model.js";


// Clase para la creación de la tabla de costos generales
export class GeneralCost extends Model {}

GeneralCost.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    id_branch:{
      type: DataTypes.STRING,
      allowNull: false,
      references:{
        model: "branches",
        key:"id"
      },
      onDelete:"cascade",
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cost: {
      type: DataTypes.FLOAT,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: "generalCost",
  }
);



