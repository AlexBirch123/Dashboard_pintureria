import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/BD.js";


export class History extends Model {}

History.init(
  {
    id_product: { 
      type: DataTypes.STRING,
      primaryKey: true,
      references:{
        model: "products",
        key:"id"
      },
      onDelete:"cascade",
      onUpdate:"cascade"
    },
    date_since: { 
      type: DataTypes.DATE,
      primaryKey: true,
      defaultValue: DataTypes.NOW,
    },
    date_until: { 
      type: DataTypes.DATE,
      allowNull: true,
    },
    price: { 
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "history",
  }
);

