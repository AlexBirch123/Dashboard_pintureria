import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/BD.js";
import { TypePayment } from "./typePayment.model.js";
import { TypeVoucher } from "./typeVoucher.model.js";
import { TypeClient } from "./TypeClient.model.js";


// Clase para la creación de la tabla Sales
export class Sales extends Model {}

Sales.init( //falta agregar las sucursales
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
        model: "type_payment",
        key: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    },
    id_type_voucher: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "type_voucher",
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
    modelName: "sales",
  }
);


TypePayment.hasMany(Sales, { foreignKey: "id_type_payment" });
Sales.belongsTo(TypePayment, { foreignKey: "id_type_payment" }); 
//Se debe crear un tabla intermedia por la relacion entre tipos de pagos y ventas,
//ya que una venta puede tener varios tipos de pagos y un tipo de pago puede estar asociado a varias ventas.

TypeVoucher.hasMany(Sales, { foreignKey: "id_type_voucher" });
Sales.belongsTo(TypeVoucher, { foreignKey: "id_type_voucher" }); 
//una venta tiene un tipo de comprobante, pero un tipo de comprobante puede estar asociado a varias ventas.

TypeClient.hasMany(Sales, { foreignKey: "id_client" });
Sales.belongsTo(TypeClient, { foreignKey: "id_client" }); 
//una venta tiene un cliente, pero un cliente puede estar asociado a varias ventas.