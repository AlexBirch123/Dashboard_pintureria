// Valida ventas y confirma que cliente, tipo de pago y comprobante existan.
import { body } from "express-validator";
import { Client } from "../../models/Client.model.js";
import { TypePayment } from "../../models/typePayment.model.js";
import { TypeVoucher } from "../../models/typeVoucher.model.js";
import { validateData } from "./validationData.helper.js";

const ensureClientExists = async (value) => {
  const client = await Client.findByPk(value);
  if (!client) {
    throw new Error("id_client no existe.");
  }
};

const ensureTypePaymentExists = async (value) => {
  const typePayment = await TypePayment.findByPk(value);
  if (!typePayment) {
    throw new Error("id_type_payment no existe.");
  }
};

const ensureTypeVoucherExists = async (value) => {
  const typeVoucher = await TypeVoucher.findByPk(value);
  if (!typeVoucher) {
    throw new Error("id_type_voucher no existe.");
  }
};

const sharedRules = [
  body("id_client")
    .optional()
    .isInt()
    .withMessage("id_client debe ser un entero")
    .bail()
    .custom((value) => ensureClientExists(value)),
  body("id_type_payment")
    .optional()
    .isInt()
    .withMessage("id_type_payment debe ser un entero")
    .bail()
    .custom((value) => ensureTypePaymentExists(value)),
  body("id_type_voucher")
    .optional()
    .isInt()
    .withMessage("id_type_voucher debe ser un entero")
    .bail()
    .custom((value) => ensureTypeVoucherExists(value)),
  body("date")
    .optional({ values: "falsy" })
    .isISO8601()
    .withMessage("date debe ser una fecha valida"),
  body("total")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("total debe ser mayor a 0"),
  body("discount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("discount debe ser mayor o igual a 0"),
];

export const validateNewSale = [
  body("id_client")
    .exists({ checkFalsy: true })
    .withMessage("id_client es obligatorio")
    .isInt()
    .withMessage("id_client debe ser un entero")
    .bail()
    .custom((value) => ensureClientExists(value)),
  body("id_type_payment")
    .exists({ checkFalsy: true })
    .withMessage("id_type_payment es obligatorio")
    .isInt()
    .withMessage("id_type_payment debe ser un entero")
    .bail()
    .custom((value) => ensureTypePaymentExists(value)),
  body("id_type_voucher")
    .exists({ checkFalsy: true })
    .withMessage("id_type_voucher es obligatorio")
    .isInt()
    .withMessage("id_type_voucher debe ser un entero")
    .bail()
    .custom((value) => ensureTypeVoucherExists(value)),
  body("total")
    .exists({ checkFalsy: true })
    .withMessage("total es obligatorio")
    .isFloat({ gt: 0 })
    .withMessage("total debe ser mayor a 0"),
  ...sharedRules,
  validateData,
];

export const validateUpdateSale = [...sharedRules, validateData];
