const Account = require('../model/account');
const bcrypt = require('bcrypt');
const config = require('../config/index');
const crypto = require('crypto');
const createDomPurify = require('dompurify');
const jwt = require('jsonwebtoken');
const { JSDOM } = require('jsdom');
const domPurify = createDomPurify(new JSDOM().window);
const slugify = require('slugify');

/**
 * @class Helper
 * @description Helper class for utility functions and methods throughout the application lifecycle
 */

class Helper {
  /**
   * @static
   * @description creates a hashed token
   * @param {string} token - token to be hashed
   * @returns {string} hashed token
   * @memberof Helper
   */
  static createHashedToken = (token) => {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    return hashedToken;
  };

  /**
   * @static
   * @description creates a token
   * @param {object} payload - payload to be hashed
   * @returns {string} token
   * @memberof Helper
   */
  static createToken = (payload) => {
    const token = jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expiry,
      algorithm: 'HS256',
    });
    return token;
  };

  /**
   * @static
   * @description generates a slug
   * @param {string} title - title to be slugged
   * @returns {string} slug
   * @memberof Helper
   */
  static generateSlug = (title) => {
    return slugify(title, { lower: true, strict: true });
  };

  /**
   * @static
   * @description sanitises html
   * @param {string} content - content to be sanitised
   * @returns {string} sanitised content
   * @memberof Helper
   */
  static sanitiseHTML = (content) => {
    return domPurify.sanitize(content);
  };

  /**
   * @static
   * @description generates a random string
   * @param {number} length - length of the string to be generated
   * @returns {string} random string
   * @memberof Helper
   */
  static async validateCredentials(email, password) {
    const user = await Account.findOne({ email })
      .select('+password')
      .populate('owner', { __v: 0 });
    if (!user) return false;
    const passwordMatch = await Helper.verifyPassword(password, user.password);
    if (!passwordMatch) return false;
    return user;
  }

  /**
   * @static
   * @param {string} plain - plain text password
   * @param {string} hashed - hashed password
   * @returns {boolean} - true when password matches, false otherwise
   * @memberof Helper
   */
  static async verifyPassword(plain, hashed) {
    return await bcrypt.compare(plain, hashed);
  }

  /**
   * @static
   * @description generates a random string
   * @param {number} length - length of the string to be generated
   * @returns {string} random string
   * @memberof Helper
   */
  static tokenExpires(ttl) {
    const mttl = parseInt(ttl, 10);
    return `${mttl} minute${mttl === 1 ? 's' : ''}`;
  }
}

module.exports = Helper;
