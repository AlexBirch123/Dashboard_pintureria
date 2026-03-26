import { body } from 'express-validator';
import { validateData } from './validationData.helper.js';
import { Category } from '../../models/categorias.model.js';
import { Op } from 'sequelize';


const findCat = async (value,excludId = null) => {
  const whereClause = { description: value };
  if(excludId)whereClause.id = { [Op.not] : excludId };
  const cat = await Category.findOne({where: whereClause});
  if(cat){
    throw new Error('category already exists');
  }}

export const validateNewCat = [
  body('description')
    .exists({checkFalsy:true}).not().isEmpty().withMessage('description should not be empty')
    .isString().withMessage('description should be a string')
    .bail()
    .custom(async(value,{req})=> await findCat(value)),
  body('imgUrl').optional().isString().withMessage('imgUrl should be a string'),
  validateData
];
  
export const validateUpdateCat = [
  body('description')
  .optional().isString().withMessage('description should be an integer')
  .bail()
  .custom(async(value,{req})=> await findCat(value, req.params.id)),
  body('imgUrl').optional().isString().withMessage('imgUrl should be a string'),
  validateData
];
