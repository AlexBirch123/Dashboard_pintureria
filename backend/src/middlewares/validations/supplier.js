// Valida proveedores y evita repetir CUIT en la tabla Provider.
import { body } from "express-validator";
import { Op } from "sequelize";
import { Provider } from "../../models/provider.model.js";
import { validateData } from "./validationData.helper.js";

const findProviderByCuit = async (value, excludeId = null) => {
  const where = { cuit: value };

  if (excludeId) {
    where.id = { [Op.not]: excludeId };
  }

  const provider = await Provider.findOne({ where });
  if (provider) {
    throw new Error("El CUIT ya existe.");
  }
};

export const validateNewSupplier = [
  body("description")
    .exists({ checkFalsy: true })
    .withMessage("description es obligatorio")
    .isString()
    .withMessage("description debe ser un texto"),
  body("cuit")
    .exists({ checkFalsy: true })
    .withMessage("cuit es obligatorio")
    .isInt()
    .withMessage("cuit debe ser un numero entero")
    .bail()
    .custom((value) => findProviderByCuit(value)),
  validateData,
];

export const validateUpdateSupplier = [
  body("description")
    .optional()
    .isString()
    .withMessage("description debe ser un texto"),
  body("cuit")
    .optional()
    .isInt()
    .withMessage("cuit debe ser un numero entero")
    .bail()
    .custom((value, { req }) => findProviderByCuit(value, req.params.id)),
  validateData,
];
