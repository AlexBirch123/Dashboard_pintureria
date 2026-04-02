// Define la entidad User con email unico, contraseña hasheada y rol de acceso.
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/BD.js";


// Clase para la creación de la tabla intermedia entre Buys y Product, para almacenar los productos de cada venta
export class User extends Model {}

User.init(
  {
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: { 
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    psw_hash: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2,
      validate: {
        min: 1,
        max: 3,
      },
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);
