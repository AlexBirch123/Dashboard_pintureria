import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/BD.js";
import { Provider } from "./provider.model.js";
import { TypePayment } from "./typePayment.model.js";
import { TypeVoucher } from "./typeVoucher.model.js";


// Clase para la creación de la tabla Buys
export class Buys extends Model {}

Buys.init(
  {
    id: {//nro de comprobante de la compra ej: "002-015226"
      type: DataTypes.STRING,
      primaryKey: true,
      validate: {
        is: /^[0-9]-[0-9]$/,
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
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "type_voucher",
        key: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    },
    type_payment: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "type_payment",
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
    modelName: "buys",
  }
);


Provider.hasMany(Buys, { foreignKey: "id_provider" });
Buys.belongsTo(Provider, { foreignKey: "id_provider" });

TypePayment.hasMany(Buys, { foreignKey: "type_payment" });
Buys.belongsTo(TypePayment, { foreignKey: "type_payment" });

TypeVoucher.hasMany(Buys, { foreignKey: "type_voucher" });
Buys.belongsTo(TypeVoucher, { foreignKey: "type_voucher" });