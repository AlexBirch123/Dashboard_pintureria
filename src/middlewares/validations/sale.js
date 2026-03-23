import { body } from 'express-validator';
import { validateData } from './validationData.helper.js';
import { Client } from '../../models/Cliente.model.js';
import { User } from '../../models/Usuario.model.js';
import { Branch } from '../../models/Sucursal.model.js';
import { Employee } from '../../models/Empleados.model.js';
import { Product } from '../../models/Productos.model.js';


export const validateNewSale = [
    body('idClient')
    .optional().isInt().withMessage('idClient should be an integer')
    .bail()
    .custom(async(value) => {
        const client = await Client.findOne({where: {id: value}});
        if(!client) throw new Error('idClient does not exist');
        return true;
       }),

    body('idUser')
    .optional().isInt().withMessage('isUser should be an integer')
    .bail()
    .custom(async(value) => {
        const user = await User.findOne({where: {id: value}});
        if(!user) throw new Error('idUser does not exist');
        return true;
       }),

    body('idEmp')
      .exists({checkFalsy:true}).not().isEmpty().withMessage('idEmp should not be empty')
      .isInt().withMessage('idEmp should be an integer')
      .bail()
      .custom(async(value) => {
        const emp = await Employee.findOne({where: {id: value}});
        if(!emp) throw new Error('idEmp does not exist');
        return true;
       }),

    body('idBranch')
      .exists({checkFalsy:true}).not().isEmpty().withMessage('idBranch should not be empty')
      .isInt().withMessage('idBranch should be an integer')
      .bail()
      .custom(async(value) => {
        const branch = await Branch.findOne({where: {id: value}});
        if(!branch) throw new Error('idBranch does not exist');
        return true;
       }),

    body('total')
      .exists({checkFalsy:true}).not().isEmpty().withMessage('total should not be empty')
      .isInt().withMessage('total should be an integer')
      .bail()
      .custom((value) => {
        if(value === 0) throw new Error('total should be greater than 0');
        return true;
       }),

    body('paymentId').optional().isInt().withMessage('paymentId should be an integer'),
    
    body('saleProds')
      .exists({checkFalsy:true}).not().isEmpty().withMessage('saleProds should not be empty')
      .isArray().withMessage('saleProds should be an Array')
      .bail()
      .custom(async(value) => {
        if(value.length === 0) throw new Error('saleProds should have at least one product');
        for(const prod of value){
            
            if(!prod.idProd || !prod.quantity || !prod.price) throw new Error('each product should have idProd, quantity and price');
            if(!isInteger(prod.idProd)) throw new Error('idProd should be an integer');
            if(!isInteger(prod.quantity) || prod.quantity <= 0 ) throw new Error('quantity should be greater than 0');
            if(!isInteger(prod.price) ||prod.price <= 0) throw new Error('price should be greater than 0');
            
            const productBD = await Product.findOne({where: {id: prod.idProd}});
            if(!productBD) throw new Error('idProd does not exist');    
        }
       }),
    validateData
];
  
