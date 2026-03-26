import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/BD.js";
import { Client } from "./Client.model.js";
import { Provider } from "./provider.model.js";
import { TypePayment } from "./typePayment.model.js";


export class CreditNote extends Model {}

CreditNote.init(
  {
    id: { 
      type: DataTypes.STRING,
      primaryKey: true,
      validate: {
        is: /^[0-9]-[0-9]$/,
      },
    },
    id_client: {
      type: DataTypes.INTEGER,
      allowNull:true,
      references:{
        model: "clients",
        key:"id"
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    },
    id_provider: {
      type: DataTypes.INTEGER,
      allowNull:true,
      references:{
        model: "providers",
        key:"id"
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull:false,
      defaultValue:0,
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
    modelName: "creditNote",
  }
);
export default CreditNote;
