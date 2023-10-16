const {
  RESPONSE_MESSAGE,
  // TOKEN_TYPE,
  // EMAIL_TEMPLATES,
  // EMAIL_SUBJECTS,
  // OTP_VALIDITY,
} = require('../../constant');
const {
  // ConflictError,
  UnAuthorizedError,
  // BadRequestError,
} = require('../../utils/customError');
const responseHandler = require('../../utils/responseHandler');
const authService = require('./authService');
// const TokenService = require('../token/tokenService');
// const mailService = require('../mailer/mailerService');
// const { tokenExpires, generateId } = require('../../utils/helper');

/**
 * @class AuthController
 * @description Auth controller
 */

class AuthController {
  /**
   * Logs in a user
   * @static
   * @param { Object } req - The request from the enndpoint
   * @param {Object } res - The response returned by the method
   * @memberof AuthController
   * @returns {JSON} -  A Json with the users details and a JWT Token
   */
  static async Login(req, res) {
    const { email, password } = req.body;

    let loginData = await authService.userLogin({ email, password });
    if (!loginData) {
      throw new UnAuthorizedError('Invalid credentials!');
    }
    const { token, user } = loginData;

    res.cookie('jwt_token', token);
    new responseHandler(res, { token, user }, 200, RESPONSE_MESSAGE.SUCCESS);
  }
}

module.exports = AuthController;
