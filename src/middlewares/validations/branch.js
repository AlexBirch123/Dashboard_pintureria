import { body } from 'express-validator';
import { Branch } from '../../models/Sucursal.model.js';
import { validateData } from './validationData.helper.js';
import { Op } from 'sequelize';

const findAddress = async (value,excludId = null) => {
  const whereClause = { address: value };
  if(excludId)whereClause.id = { [Op.not] : excludId };
  const branch = await Branch.findOne({where: whereClause});
  if(branch){
    throw new Error('address already exists');
  }}

export const validateNewBranch = [
    body('address')
      .exists({checkFalsy:true}).not().isEmpty().withMessage('address should not be empty')
      .isString().withMessage('address should be a string')
      .bail()
      .custom(async (value, { req }) => await findAddress(value)),
    body('phone')
      .exists({checkFalsy:true}).not().isEmpty().withMessage('phone should not be empty')
      .isInt().withMessage('phone should be a string'),
    validateData
];
  
export const validateUpdateBranch = [
    body('address')
      .optional().isString().withMessage('address should be a string')
      .bail()
      .custom(async (value, { req }) => await findAddress(value, req.params.id)),
    body('phone').optional().isInt().withMessage('phone should be an integer'),
    validateData
];