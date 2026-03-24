import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/BD.js";
import { Category } from "./categoryProd.model.js";
import { Provider } from "./provider.model.js";


// Clase para la creación de la tabla Product
export class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    cost: { //costo del producto sin IVA
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    price: { //Precio de lista para la venta
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },    
    brand: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    provider_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      references: {
        model: "provider",
        key: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      references: {
        model: "category",
        key: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "products",
  }
);

Category.hasMany(Product, { foreignKey: "category_id" });
Product.belongsTo(Category, { foreignKey: "category_id" });

Product.belongsTo(Provider, { foreignKey: "provider_id" });
Provider.hasMany(Product, { foreignKey: "provider_id" });

// const categorias = await Categoria.findAll({
//   include: {
//     model: Producto,
//     as: "productos",
//   },
// });

// esto hace que al ahcer esa busqueda traiga los productos relacionados a cada categoria, 
// y lo mismo para el caso de los proveedores, 
// al hacer la busqueda de un producto traiga el proveedor relacionado a ese producto.