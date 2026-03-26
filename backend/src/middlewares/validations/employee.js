import { body } from 'express-validator';
import { validateData } from './validationData.helper.js';
import { Employee } from '../../models/Empleados.model.js';
import { Op } from 'sequelize';

const findDNI = async (value , excludId = null) => {
  const whereClause = { dni: value };
  if(excludId)whereClause.id = { [Op.not] : excludId };
  const existingEmp = await Employee.findOne({where: whereClause});
  if(existingEmp){
    throw new Error('DNI already exists');
  }
}

export const validateNewEmployee = [
  body('dni')
    .exists({checkFalsy:true}).not().isEmpty().withMessage('DNI should not be empty')
    .isInt().withMessage('DNI should be an integer')
    .toInt()
    .bail()
    .custom(async (value, { req }) => await findDNI(value)),
  body('name')
    .exists({checkFalsy:true}).not().isEmpty().withMessage('name should not be empty')
    .isString().withMessage('name should be a string'),
  body('salary')
    .exists({checkFalsy:true}).not().isEmpty().withMessage('salary should not be empty')
    .isFloat().withMessage('salary should be a float'),
  body('phone').optional().toInt().isInt().withMessage('phone should be an integer'),
  validateData
];
  
export const validateUpdateEmployee = [
  body('dni')
    .optional().isInt().withMessage('DNI should be an integer')
    .bail()
    .custom(async (value, { req }) => await findDNI(value,req.params.id)),
  body('name').optional().isString().withMessage('name should be a string'),
  body('salary').optional().toFloat().isFloat().withMessage('salary should be a float'),
  body('phone').optional().toInt().isInt().withMessage('phone should be an integer'),
  validateData
];
