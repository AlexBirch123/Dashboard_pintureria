import { body } from 'express-validator';
import { validateData } from './validationData.helper.js';
import { Product } from '../../models/Productos.model.js';
import { Op } from 'sequelize';

const commonProductValidation = [
  body('sku').optional().isString().withMessage('SKU should be a string')
    .bail()
    .custom(async(value) => {
      const whereClause = { sku: value };
      whereClause.id = { [Op.not] : req.params.id };
      const sku = await Product.findOne({where: whereClause}); 
      if(sku) throw new Error('SKU already exists');
    }),
  body('description').optional().isString().withMessage('description should be a string'),
  body('idProv').optional().isInt().withMessage('idProv should be an integer'),
  body('idCat').optional().isInt().withMessage('idCat should be an integer'),
  body('imgUrl').optional().isString().withMessage('imgUrl should be an sting'),
  body('productsArray')
    .optional().isArray().withMessage('productsArray should be an sting')
    .bail()
    .custom(async(value) => {
      if(value.length === 0) throw new Error('productsArray should have at least one product');
      for(const prod of value){
        if(!prod.title || !prod.price || !prod.stock) throw new Error('each product should have title, price and stock');
        if(!isString(prod.title)) throw new Error('title should be a string');
        if(!isFloat(prod.price) || prod.price <= 0) throw new Error('price should be greater than 0');
        if(!isInt(prod.stock) || prod.stock <= 0) throw new Error('stock should be greater than 0');
      }
    })
]

export const validateNewProduct = [
  body('title')
    .exists({checkFalsy:true}).not().isEmpty().withMessage('title should not be empty')
    .isString().withMessage('title should be a string'),
  body('price')
    .exists({checkFalsy:true}).not().isEmpty().withMessage('price should not be empty')
    .toFloat().isFloat().withMessage('price should be a float'),
  body('stock')
    .exists({checkFalsy:true}).not().isEmpty().withMessage('stock should not be empty')
    .toInt().isInt().withMessage('stock should be a integer'),
  ...commonProductValidation,
  validateData
];
  
export const validateUpdateProduct = [
  body('title').optional().isString().withMessage('title should be a string'),
  body('price').optional().toFloat().isFloat().withMessage('price should be a float'),
  body('stock').optional().toInt().isInt().withMessage('stock should be a integer'),
  ...commonProductValidation,
  validateData
];