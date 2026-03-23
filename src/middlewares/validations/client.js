import { body } from 'express-validator';
import { validateData } from './validationData.helper.js';
import { Client } from '../../models/Cliente.model.js';


const findDNI = async (value) => {
  const existingclient = await Client.findOne({where: {dni: value}});
  if(existingclient){
    throw new Error('DNI already exists');
  }
}
export const validateNewClient = [
  body('dni')
    .exists({checkFalsy:true}).not().isEmpty().withMessage('DNI should not be empty')
    .toInt()//se debe pasar a entero porque express-validator lo convierte a string
    .isInt().withMessage('DNI should be an integer')
    .bail()
    .custom( async(value)=>{ await findDNI(value)}),
  body('name')
    .exists({checkFalsy:true}).not().isEmpty().withMessage('name should not be empty')
    .isString().withMessage('name sould be a string'),
  body('address').optional().isString().withMessage('address should be a string'),
  body('phone').optional().isInt().withMessage('phone should be an integer'),
  validateData
];

export const validateUpdateClient = [
    body('dni')
      .optional()
      .toInt() //se debe pasar a entero porque express-validator lo convierte a string
      .isInt().withMessage('DNI should be an integer')
      .bail()
      .custom( async(value)=>{ await findDNI(value)}),        
    body('name').optional().isString().withMessage('name sould be a string'),
    body('address').optional().isString().withMessage('address should be a string'),
    body('phone').optional().isInt().withMessage('phone should be an integer'),
    validateData
  ];