/**
 * @class ValidatorMiddleware
 * @description Middleware for validating request body
 * @note This class is a temporary class used during the migration process
 */

class validationMiddleware {
  /**
   * @private
   * @static verify
   * @param {} validator | The validator schema
   * @param {} payload  | The request body to be validated
   * @returns {}
   * @memberof ValidatorMiddleware
   */
  static async verify(validator, payload) {
    await validator.validateAsync(payload, { abortEarly: false });
  }

  /**
   * @static validate
   * @param {object} validatorSchema  | The validator schema
   * @returns {object} | The request body to be validated
   * @memberof ValidatorMiddleware
   * @description This method validates the request body
   */

  static validate(validatorSchema) {
    return async (req, res, next) => {
      const payload = req.body;
      try {
        await validationMiddleware.verify(validatorSchema, payload);
        next();
      } catch (err) {
        next(err);
      }
    };
  }
}

module.exports = validationMiddleware;
