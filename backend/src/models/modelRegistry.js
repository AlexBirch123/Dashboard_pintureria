
//Registro centralizado de modelos que mapea recursos con sus correspondientes modelos de base de datos para facilitar la gestión 
//y acceso a las entidades de la aplicación.
 
import {
  CategoryProd,
  Client,
  Product,
  Provider,
  Sale,
  TypePayment,
  TypeVoucher,
  Buy,
  RowSale,
  RowBuy,
  History,
  CreditNote,
  User,
  Branch,
  GeneralCost,
} from "./init.models.js";

export const modelRegistry = [
  { resource: "categories", model: CategoryProd },
  { resource: "clients", model: Client },
  { resource: "products", model: Product },
  { resource: "providers", model: Provider },
  { resource: "sales", model: Sale },
  { resource: "type-payments", model: TypePayment },
  { resource: "type-vouchers", model: TypeVoucher },
  { resource: "buys", model: Buy },
  { resource: "row-sales", model: RowSale },
  { resource: "row-buys", model: RowBuy },
  { resource: "histories", model: History },
  { resource: "credit-notes", model: CreditNote },
  { resource: "users", model: User },
  { resource: "branches", model: Branch },
  { resource: "general-costs", model: GeneralCost },
];
