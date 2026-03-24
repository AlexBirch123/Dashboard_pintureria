import { CategoryProd } from "./categoryProd.model.js";
import { Client } from "./Client.model.js";
import { Product } from "./Product.model.js";
import { Provider } from "./provider.model.js";
import { Sale } from "./sale.model.js";
import { TypePayment } from "./typePayment.model.js";
import { TypeVoucher } from "./typeVoucher.model.js";
import { Buy } from "./buy.model.js";
import { RowSale} from "./rowSale.model.js";
import { RowBuy } from "./rowBuy.model.js";

TypePayment.hasMany(Sale, { foreignKey: "id_type_payment" });
Sale.belongsTo(TypePayment, { foreignKey: "id_type_payment" }); 
//Se debe crear un tabla intermedia por la relacion entre tipos de pagos y ventas,
//ya que una venta puede tener varios tipos de pagos y un tipo de pago puede estar asociado a varias ventas.

TypeVoucher.hasMany(Sale, { foreignKey: "id_type_voucher" });
Sale.belongsTo(TypeVoucher, { foreignKey: "id_type_voucher" }); 
//una venta tiene un tipo de comprobante, pero un tipo de comprobante puede estar asociado a varias ventas.

Client.hasMany(Sale, { foreignKey: "id_client" });
Sale.belongsTo(Client, { foreignKey: "id_client" }); 
//una venta tiene un cliente, pero un cliente puede estar asociado a varias ventas.

CategoryProd.hasMany(Product, { foreignKey: "category_id" });
Product.belongsTo(CategoryProd, { foreignKey: "category_id" });

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

Provider.hasMany(Buy, { foreignKey: "id_provider" });
Buy.belongsTo(Provider, { foreignKey: "id_provider" });

TypePayment.hasMany(Buy, { foreignKey: "type_payment" });
Buy.belongsTo(TypePayment, { foreignKey: "type_payment" });

TypeVoucher.hasMany(Buy, { foreignKey: "type_voucher" });
Buy.belongsTo(TypeVoucher, { foreignKey: "type_voucher" });

export {
  CategoryProd,
  Client,
  Product,
  Provider,
  Sale,
  TypePayment,
  TypeVoucher,
  Buy,
  RowSale,
  RowBuy
};