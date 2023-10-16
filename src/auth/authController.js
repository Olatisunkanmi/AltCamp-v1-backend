const {
  RESPONSE_MESSAGE,
  // TOKEN_TYPE,
  // EMAIL_TEMPLATES,
  // EMAIL_SUBJECTS,
  // OTP_VALIDITY,
} = require('../../constant');
const {
  ConflictError,
  UnAuthorizedError,
  // BadRequestError,
} = require('../../utils/customError');
const responseHandler = require('../../utils/responseHandler');
const AuthService = require('./authService');
// const TokenService = require('../token/tokenService');
// const mailService = require('../mailer/mailerService');
// const { tokenExpires, generateId } = require('../../utils/helper');

/**
 * @class AuthController
 * @description Auth controller
 */

class AuthController {
  /**
   * @satatic registerAccount
   * @param {object} req | The request from the endpoint
   * @param {object} res | The response returned by the method
   * @memberof AuthController
   * @returns {JSON} -  A Json with the users details and a JWT Token
   */

  static async registerAccount(req, res) {
    const payload = { ...req.body };
    let registrationData = await AuthService.registerAccount(payload);

    if (!registrationData) {
      throw new ConflictError(RESPONSE_MESSAGE.CONFLICT(payload.category));
    }
    const { token, user } = registrationData;

    res.cookie('jwt_token', token);
    new responseHandler(
      res,
      { token, user },
      201,
      RESPONSE_MESSAGE.CREATE_SUCCESSFUL(payload.category)
    );
  }

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

    let loginData = await AuthService.userLogin({ email, password });
    if (!loginData) {
      throw new UnAuthorizedError('Invalid credentials!');
    }
    const { token, user } = loginData;

    res.cookie('jwt_token', token);
    new responseHandler(res, { token, user }, 200, RESPONSE_MESSAGE.SUCCESS);
  }
}

module.exports = AuthController;
