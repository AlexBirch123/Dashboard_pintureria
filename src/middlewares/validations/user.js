import { body } from 'express-validator';
import { validateData } from './validationData.helper.js';
import { Op } from 'sequelize';
import { User } from '../../models/Usuario.model.js';

const validatePassword = (password) =>{
    const UpperCase = /[A-Z]/.test(password);
    const LowerCase = /[a-z]/.test(password);
    const Number = /\d/.test(password);
    const MinimumLength = password.length >= 6;

    return UpperCase && LowerCase && Number && MinimumLength;
}

const findExisting = async (field, value,excludeId = null) => {
    const whereClause = { [field]: value };
    if (excludeId) whereClause.id = { [Op.not] : excludeId }; 
    const existing = await User.findOne({ where: whereClause });
    if(existing) throw new Error(`${field} already exists`);
}

export const validateNewUser = [
    body('userName')
      .exists({checkFalsy:true}).not().isEmpty().withMessage('username should not be empty')
      .isString().withMessage('address should be a string')
      .bail()
      .custom(async (value, { req }) => await findExisting('userName', value)),
    body('pswHash')
      .exists({checkFalsy:true}).not().isEmpty().withMessage('password should not be empty')
      .isString().withMessage('password should be a string')
      .bail()
      .custom((value)=>{
        if(!validatePassword(value)){
          throw new Error('password should have at least 6 characters, one uppercase, one lowercase and one number');
        }
        return true;
      }),
    body('email')
      .exists({checkFalsy:true}).not().isEmpty().withMessage('email should not be empty')
      .isEmail().withMessage('email should be an email')
      .bail()
      .custom(async (value, { req }) => await findExisting('email', value)),
    body('role')
      .optional()
      .isInt({min:1,max:3}).withMessage('role should be an integer between 1 and 3'),
    validateData
];
  
export const validateUpdateUser = [
    body('userName')
      .optional()
      .isString().withMessage('address should be a string')
      .bail()
      .custom(async (value, { req }) => await findExisting('userName', value , req.params.id)),
    body('pswHash')
      .optional()
      .isString().withMessage('password should be a string')
      .bail()
      .custom((value)=>{
        if(!validatePassword(value)){
          throw new Error('password should have at least 6 characters, one uppercase, one lowercase and one number');
        }
        return true;
      }),
    body('email')
      .optional()
      .isEmail().withMessage('email should be an email')
      .bail()
      .custom(async (value, { req }) => await findExisting('email', value , req.params.id)),
    body('role')
      .optional()
      .isInt({min:1,max:3}).withMessage('role should be an integer between 1 and 3'),
    validateData
];