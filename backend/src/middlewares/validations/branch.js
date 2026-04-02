// Valida altas y ediciones de sucursales segun el modelo actual de Branch.
import { body } from "express-validator";
import { Op } from "sequelize";
import { Branch } from "../../models/branch.model.js";
import { validateData } from "./validationData.helper.js";

const findBranchByDescription = async (value, excludeId = null) => {
  const where = { description: value };

  if (excludeId) {
    where.id = { [Op.not]: excludeId };
  }

  const branch = await Branch.findOne({ where });
  if (branch) {
    throw new Error("La sucursal ya existe.");
  }
};

export const validateNewBranch = [
  body("description")
    .exists({ checkFalsy: true })
    .withMessage("description es obligatorio")
    .isString()
    .withMessage("description debe ser un texto")
    .bail()
    .custom((value) => findBranchByDescription(value)),
  body("address")
    .optional({ values: "falsy" })
    .isString()
    .withMessage("address debe ser un texto"),
  validateData,
];

export const validateUpdateBranch = [
  body("description")
    .optional()
    .isString()
    .withMessage("description debe ser un texto")
    .bail()
    .custom((value, { req }) => findBranchByDescription(value, req.params.id)),
  body("address")
    .optional({ values: "falsy" })
    .isString()
    .withMessage("address debe ser un texto"),
  validateData,
];
