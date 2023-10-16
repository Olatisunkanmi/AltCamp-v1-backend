const Joi = require('joi');
const { ValidationHelper } = require('../../utils/helpers');
const {
  ACCOUNT_TYPES,
  // GENDER,
  // REGEX_PATTERNS,
  TRACKS,
} = require('../../constant');

/**
 * @class AuthValidation
 * @description Validates Auth data
 *
 *@note This class is a temporary class used during the migration process
 */

class AuthValidation {
  /**
   * @static validateAccountCreation
   * @description Validates user sign up data
   * @memberof AuthValidation
   * @returns {object} - Validation schema
   */
  static validateAccountCreation = Joi.object({
    firstName: ValidationHelper.validateString('firstName', Joi),
    lastName: ValidationHelper.validateString('lastName', Joi),
    email: ValidationHelper.validateEmail('email', Joi),
    password: ValidationHelper.validateString('password', Joi),
    track: ValidationHelper.validateEnums(Object.values(TRACKS), 'Track', Joi),
    category: ValidationHelper.validateEnums(
      Object.values(ACCOUNT_TYPES),
      'Category',
      Joi
    ),
    // altSchoolId: ValidationHelper.validateString('altSchoolId', Joi),
  });

  /**
   * @static ValidateUserSignUp
   * @description Validates user sign up data
   * @memberof AuthValidation
   * @returns {object} - Validation schema
   */
  static validateUserSignIn = Joi.object({
    email: ValidationHelper.validateEmail('email', Joi),
    password: ValidationHelper.validateString('password', Joi),
  });
}

module.exports = AuthValidation;
