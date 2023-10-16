const router = require('express').Router();
const { AuthController, AuthValidation } = require('./index.js');
const { validationMiddleware, rateLimit } = require('../../middleware');

const { Login } = AuthController;
const { validate } = validationMiddleware;
const { ValidateUserSignIn } = AuthValidation;

router.use(rateLimit());

router.post('/login', validate(ValidateUserSignIn), Login);

module.exports = router;
