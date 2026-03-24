import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/BD.js";


// Clase para la creación de la tabla intermedia entre Buys y Product, para almacenar los productos de cada venta
export class RowBuys extends Model {}

RowBuys.init(
  {
    id_buy: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "buys",
        key: "id",
      },
    },
    id_prod: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "products",
        key: "id",
      },
    },
    price: { 
      //precio de compra del producto sin IVA, puede ser distinto al costo de compra del producto
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    discount: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "row_buys",
  }
);
