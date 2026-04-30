import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/BD.js";


// Clase para la creación de la tabla Sales
export class Sale extends Model {}

Sale.init(
  {
    id: {
      // Nro de comprobante de la venta, por ejemplo 00007-00001101.
      type: DataTypes.STRING(14),
      primaryKey: true,
      validate: {
        is: /^\d{5}-\d{8}$/,
      },
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
      primaryKey: true,
      references: {
        model: "typeVouchers",
        key: "id",},
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    },
    id_branch: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "branches",
        key: "id",
      },
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
