import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/BD.js";



// Clase para la creación de la tabla Buys
export class Buy extends Model {}

Buy.init(
  {
    id: {
      // Nro de comprobante de la compra, por ejemplo 00007-00001101.
      type: DataTypes.STRING(14),
      primaryKey: true,
      validate: {
        is: /^\d{5}-\d{8}$/,
      },
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    id_provider: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "providers",
        key: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    },
    type_voucher: { 
      //Tipo de comprobante, si es R no tiene IVA, son costos de productos sin IVA
      //si es A se debe calcular el IVA del costo total
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "typeVouchers",
        key: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    },
    type_payment: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "typePayments",
        key: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    },
      discount: {
      //los descuentos se aplican sobre el precio de costo sin IVA, no sobre el precio total de la compra
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
    }
  },
  {
    sequelize,
    modelName: "buy",
  }
);


