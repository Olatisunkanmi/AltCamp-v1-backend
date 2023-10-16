const Joi = require('joi');
const { ValidationHelper } = require('../../utils/helpers');

/**
 * @class AuthValidation
 * @description Validates Auth data
 *
 *@note This class is a temporary class used during the migration process
 */

class AuthValidation {
  /**
   * @static ValidateUserSignUp
   * @description Validates user sign up data
   * @memberof AuthValidation
   * @returns {object} - Validation schema
   */
  static ValidateUserSignIn = Joi.object({
    email: ValidationHelper.validateEmail('email', Joi),
    password: ValidationHelper.validateString('password', Joi),
  });
}

module.exports = AuthValidation;
