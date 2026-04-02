// Valida productos y verifica referencias existentes a proveedor y categoria.
import { body } from "express-validator";
import { Op } from "sequelize";
import { CategoryProd } from "../../models/categoryProd.model.js";
import { Product } from "../../models/Product.model.js";
import { Provider } from "../../models/provider.model.js";
import { validateData } from "./validationData.helper.js";

const findProductById = async (value, excludeId = null) => {
  const where = { id: value };

  if (excludeId) {
    where.id = { [Op.not]: excludeId };
  }

  const existingProduct = await Product.findOne({ where });
  if (existingProduct) {
    throw new Error("El producto ya existe.");
  }
};

const ensureProviderExists = async (value) => {
  if (value === undefined || value === null || value === "") {
    return;
  }

  const provider = await Provider.findByPk(value);
  if (!provider) {
    throw new Error("provider_id no existe.");
  }
};

const ensureCategoryExists = async (value) => {
  if (value === undefined || value === null || value === "") {
    return;
  }

  const category = await CategoryProd.findByPk(value);
  if (!category) {
    throw new Error("category_id no existe.");
  }
};

export const validateNewProduct = [
  body("id")
    .exists({ checkFalsy: true })
    .withMessage("id es obligatorio")
    .isString()
    .withMessage("id debe ser un texto")
    .bail()
    .custom((value) => findProductById(value)),
  body("description")
    .exists({ checkFalsy: true })
    .withMessage("description es obligatorio")
    .isString()
    .withMessage("description debe ser un texto"),
  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("stock debe ser un entero mayor o igual a 0"),
  body("cost")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("cost debe ser un numero mayor o igual a 0"),
  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("price debe ser un numero mayor o igual a 0"),
  body("brand")
    .optional({ values: "falsy" })
    .isString()
    .withMessage("brand debe ser un texto"),
  body("provider_id")
    .optional({ values: "falsy" })
    .isInt()
    .withMessage("provider_id debe ser un entero")
    .bail()
    .custom((value) => ensureProviderExists(value)),
  body("category_id")
    .optional({ values: "falsy" })
    .isInt()
    .withMessage("category_id debe ser un entero")
    .bail()
    .custom((value) => ensureCategoryExists(value)),
  validateData,
];

export const validateUpdateProduct = [
  body("id").optional().isString().withMessage("id debe ser un texto"),
  body("description").optional().isString().withMessage("description debe ser un texto"),
  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("stock debe ser un entero mayor o igual a 0"),
  body("cost")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("cost debe ser un numero mayor o igual a 0"),
  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("price debe ser un numero mayor o igual a 0"),
  body("brand")
    .optional({ values: "falsy" })
    .isString()
    .withMessage("brand debe ser un texto"),
  body("provider_id")
    .optional({ values: "falsy" })
    .isInt()
    .withMessage("provider_id debe ser un entero")
    .bail()
    .custom((value) => ensureProviderExists(value)),
  body("category_id")
    .optional({ values: "falsy" })
    .isInt()
    .withMessage("category_id debe ser un entero")
    .bail()
    .custom((value) => ensureCategoryExists(value)),
  validateData,
];
