// Valida altas y ediciones de categorias evitando descripciones duplicadas.
import { body } from "express-validator";
import { Op } from "sequelize";
import { CategoryProd } from "../../models/categoryProd.model.js";
import { validateData } from "./validationData.helper.js";

const findCategoryByDescription = async (value, excludeId = null) => {
  const where = { description: value };

  if (excludeId) {
    where.id = { [Op.not]: excludeId };
  }

  const category = await CategoryProd.findOne({ where });
  if (category) {
    throw new Error("La categoria ya existe.");
  }
};

export const validateNewCat = [
  body("description")
    .exists({ checkFalsy: true })
    .withMessage("description es obligatorio")
    .isString()
    .withMessage("description debe ser un texto")
    .bail()
    .custom((value) => findCategoryByDescription(value)),
  validateData,
];

export const validateUpdateCat = [
  body("description")
    .optional()
    .isString()
    .withMessage("description debe ser un texto")
    .bail()
    .custom((value, { req }) => findCategoryByDescription(value, req.params.id)),
  validateData,
];
