import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/BD.js";


// Clase para la creación de la tabla intermedia entre Sales y Product, para almacenar los productos de cada venta
export class RowSales extends Model {}

RowSales.init(
  {
    id_sale: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "sales",
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
    price: { //precio de venta del producto, puede ser distinto al precio de lista del producto
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
    modelName: "rowSales",
  }
);


