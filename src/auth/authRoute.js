const router = require('express').Router();
const { AuthController, AuthValidation } = require('./index.js');
const { validationMiddleware, rateLimit } = require('../../middleware');

const { Login, registerAccount } = AuthController;
const { validate } = validationMiddleware;
const { validateUserSignIn, validateAccountCreation } = AuthValidation;

router.use(rateLimit());

router.post('/login', validate(validateUserSignIn), Login);

router.post('/register', validate(validateAccountCreation), registerAccount);

module.exports = router;
