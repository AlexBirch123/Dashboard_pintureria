import { body } from 'express-validator';
import { validateData } from './validationData.helper.js';
import { Op } from 'sequelize';
import { Supplier } from '../../models/Proveedores.model.js';

const findCuit = async ( value,excludeId = null) => {
  const whereClause = { cuit: value };
  if (excludeId) whereClause.id = { [Op.not] : excludeId }; 
  const existing = await Supplier.findOne({ where: whereClause });
  if(existing) throw new Error('CUIT already exists');
}

const commonValidation = [
    body('address').optional().isString().withMessage('address should be a string')
      .bail()
      .custom(async(value) => {
        const address = await Supplier.findOne({where: {address: value}}); 
        if(address)throw new Error('address already exists');  
      }),
    body('phone').optional().toInt().isInt().withMessage('phone should be an integer'),
]

export const validateNewSupplier = [
    body('cuit')
      .exists({checkFalsy:true}).not().isEmpty().withMessage('CUIT should not be empty')
      .toInt().isInt().withMessage('CUIT should be an integer')
      .bail()
      .custom(async (value, { req }) => await findCuit(value)),
    body('name')
      .exists({checkFalsy:true}).not().isEmpty().withMessage('name should not be empty')
      .isString().withMessage('name should be a string'),
    ...commonValidation,
    validateData
  ];
  
  export const validateUpdateSupplier = [
      body('cuit')
        .optional().toInt().isInt().withMessage('CUIT should be an integer')
        .bail()
        .custom(async (value, { req }) => await findCuit(value,req.params.id)),
      body('name').optional().isString().withMessage('name sould be a string'),
      ...commonValidation,
      validateData
    ];