// Junta todas las validaciones de los modelos
// organizado por modelo y acción (create/update).
// Prepara los datos antes de crear o actualzar cualqueir modelo
import { validateNewBranch, validateUpdateBranch } from "./validations/branch.js";
import { validateNewCat, validateUpdateCat } from "./validations/category.js";
import { validateNewClient, validateUpdateClient } from "./validations/client.js";
import { validateNewProduct, validateUpdateProduct } from "./validations/product.js";
import { validateNewSale, validateUpdateSale } from "./validations/sale.js";
import { validateNewSupplier, validateUpdateSupplier } from "./validations/supplier.js";
import { validateNewUser, validateUpdateUser } from "./validations/user.js";
import { hashUserPassword } from "./prepareUserPayload.middleware.js";

export const resourceMiddlewares = {
  branches: {
    create: validateNewBranch,
    update: validateUpdateBranch,
  },
  categories: {
    create: validateNewCat,
    update: validateUpdateCat,
  },
  clients: {
    create: validateNewClient,
    update: validateUpdateClient,
  },
  products: {
    create: validateNewProduct,
    update: validateUpdateProduct,
  },
  providers: {
    create: validateNewSupplier,
    update: validateUpdateSupplier,
  },
  sales: {
    create: validateNewSale,
    update: validateUpdateSale,
  },
  users: {
    create: [...validateNewUser, hashUserPassword],
    update: [...validateUpdateUser, hashUserPassword],
  },
};
