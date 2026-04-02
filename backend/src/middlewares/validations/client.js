// Valida datos de clientes y controla unicidad de dni y cuit.
import { body } from "express-validator";
import { Op } from "sequelize";
import { Client } from "../../models/Client.model.js";
import { validateData } from "./validationData.helper.js";

const findExistingClientField = async (field, value, excludeId = null) => {
  if (value === undefined || value === null || value === "") {
    return;
  }

  const where = { [field]: value };
  if (excludeId) {
    where.id = { [Op.not]: excludeId };
  }

  const existingClient = await Client.findOne({ where });
  if (existingClient) {
    throw new Error(`El campo ${field} ya existe.`);
  }
};

export const validateNewClient = [
  body("dni")
    .optional({ values: "falsy" })
    .isInt()
    .withMessage("dni debe ser un numero entero")
    .bail()
    .custom((value) => findExistingClientField("dni", value)),
  body("cuit")
    .optional({ values: "falsy" })
    .isInt()
    .withMessage("cuit debe ser un numero entero")
    .bail()
    .custom((value) => findExistingClientField("cuit", value)),
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("name es obligatorio")
    .isString()
    .withMessage("name debe ser un texto"),
  body("address")
    .optional({ values: "falsy" })
    .isString()
    .withMessage("address debe ser un texto"),
  body("phone")
    .optional({ values: "falsy" })
    .isInt()
    .withMessage("phone debe ser un numero entero"),
  body("painter")
    .optional()
    .isBoolean()
    .withMessage("painter debe ser booleano"),
  validateData,
];

export const validateUpdateClient = [
  body("dni")
    .optional({ values: "falsy" })
    .isInt()
    .withMessage("dni debe ser un numero entero")
    .bail()
    .custom((value, { req }) => findExistingClientField("dni", value, req.params.id)),
  body("cuit")
    .optional({ values: "falsy" })
    .isInt()
    .withMessage("cuit debe ser un numero entero")
    .bail()
    .custom((value, { req }) => findExistingClientField("cuit", value, req.params.id)),
  body("name").optional().isString().withMessage("name debe ser un texto"),
  body("address")
    .optional({ values: "falsy" })
    .isString()
    .withMessage("address debe ser un texto"),
  body("phone")
    .optional({ values: "falsy" })
    .isInt()
    .withMessage("phone debe ser un numero entero"),
  body("painter")
    .optional()
    .isBoolean()
    .withMessage("painter debe ser booleano"),
  validateData,
];
