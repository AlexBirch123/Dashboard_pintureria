// Valida credenciales y datos de usuario para auth y CRUD de usuarios.
import { body } from "express-validator";
import { Op } from "sequelize";
import { User } from "../../models/User.model.js";
import { validateData } from "./validationData.helper.js";

const validatePassword = (password) => {
  const upperCase = /[A-Z]/.test(password);
  const lowerCase = /[a-z]/.test(password);
  const number = /\d/.test(password);
  const minimumLength = password.length >= 6;

  return upperCase && lowerCase && number && minimumLength;
};

const findExistingUser = async (field, value, excludeId = null) => {
  const where = { [field]: value };

  if (excludeId) {
    where.id = { [Op.not]: excludeId };
  }

  const existing = await User.findOne({ where });
  if (existing) {
    throw new Error(`${field} ya existe.`);
  }
};

const passwordRule = (field) =>
  body(field)
    .isString()
    .withMessage(`${field} debe ser un texto`)
    .bail()
    .custom((value) => {
      if (!validatePassword(value)) {
        throw new Error("La contraseña debe tener al menos 6 caracteres, una mayuscula, una minuscula y un numero.");
      }

      return true;
    });

export const validateNewUser = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("name es obligatorio")
    .isString()
    .withMessage("name debe ser un texto"),
  body("email")
    .exists({ checkFalsy: true })
    .withMessage("email es obligatorio")
    .isEmail()
    .withMessage("email debe ser valido")
    .bail()
    .custom((value) => findExistingUser("email", value)),
  body("role")
    .optional()
    .isInt({ min: 1, max: 3 })
    .withMessage("role debe ser un entero entre 1 y 3"),
  body("psw_hash")
    .exists({ checkFalsy: true })
    .withMessage("psw_hash es obligatorio"),
  passwordRule("psw_hash"),
  validateData,
];

export const validateUpdateUser = [
  body("name").optional().isString().withMessage("name debe ser un texto"),
  body("email")
    .optional()
    .isEmail()
    .withMessage("email debe ser valido")
    .bail()
    .custom((value, { req }) => findExistingUser("email", value, req.params.id)),
  body("role")
    .optional()
    .isInt({ min: 1, max: 3 })
    .withMessage("role debe ser un entero entre 1 y 3"),
  body("psw_hash").optional(),
  body("psw_hash")
    .optional()
    .isString()
    .withMessage("psw_hash debe ser un texto")
    .bail()
    .custom((value) => {
      if (!validatePassword(value)) {
        throw new Error("La contraseña debe tener al menos 6 caracteres, una mayuscula, una minuscula y un numero.");
      }

      return true;
    }),
  validateData,
];

export const validateRegister = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("name es obligatorio")
    .isString()
    .withMessage("name debe ser un texto"),
  body("email")
    .exists({ checkFalsy: true })
    .withMessage("email es obligatorio")
    .isEmail()
    .withMessage("email debe ser valido")
    .bail()
    .custom((value) => findExistingUser("email", value)),
  body("password")
    .exists({ checkFalsy: true })
    .withMessage("password es obligatorio"),
  passwordRule("password"),
  body("role")
    .optional()
    .isInt({ min: 1, max: 3 })
    .withMessage("role debe ser un entero entre 1 y 3"),
  validateData,
];

export const validateLogin = [
  body("email")
    .exists({ checkFalsy: true })
    .withMessage("email es obligatorio")
    .isEmail()
    .withMessage("email debe ser valido"),
  body("password")
    .exists({ checkFalsy: true })
    .withMessage("password es obligatorio")
    .isString()
    .withMessage("password debe ser un texto"),
  validateData,
];
