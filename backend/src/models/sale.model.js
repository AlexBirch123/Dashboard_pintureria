import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/BD.js";


// Clase para la creación de la tabla Sales
export class Sale extends Model {}

Sale.init( //falta agregar las sucursales
  {
    id: { 
      //nro de comprobante de la venta
      //por este ID se deben juntar todas los items de esta venta para generer una unica venta
      //ya que la lista trae todos los items de todas las ventas
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_client: { //dni o cuit del cliente
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "clients",
        key: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    id_type_payment: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "typePayments",
        key: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    },
    id_type_voucher: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "typeVouchers",
        key: "id",},
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    },
    discount: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "sale",
  }
);
