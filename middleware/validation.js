const { check, validationResult, body } = require('express-validator');
const ThrowError = require('../utils/throwError');

exports.postValidation = async (req, res, next) => {
  await check('title')
    .notEmpty()
    .withMessage(' Please input the post title')
    .run(req);

  await check('content')
    .notEmpty()
    .withMessage(' Please input the content')
    .run(req);

  await parseErrors(req, res, next);
};

exports.commentValidation = async (req, res, next) => {
  await check('content')
    .notEmpty()
    .withMessage(' Please input the content')
    .run(req);

  await parseErrors(req, res, next);
};

//validation for user registration/update
exports.userValidation = async (req, res, next) => {
  if (req.body.name) {
    await check('name')
      .notEmpty()
      .withMessage(' Please input the name')
      .run(req);
  }
  if (req.body.username) {
    await check('username')
      .notEmpty()
      .withMessage(' Please input the username')
      .run(req);
  }
  if (req.body.email) {
    await check('email')
      .notEmpty()
      .withMessage(' Please input the email')
      .run(req);
  }
  if (req.body.password) {
    await check('password')
      .notEmpty()
      .withMessage(' Please input the password')
      .run(req);
  }

  await parseErrors(req, res, next);
};

//validation for user login
exports.loginValidation = async (req, res, next) => {
  await check('email')
    .notEmpty()
    .withMessage(' Please input the email')
    .run(req);

  await check('password')
    .notEmpty()
    .withMessage(' Please input the password')
    .run(req);

  await parseErrors(req, res, next);
};

// validation for contact me
exports.contactMeValidation = async (req, res, next) => {
  await check('name').notEmpty().withMessage(' Please input the name').run(req);

  await check('email')
    .notEmpty()
    .withMessage(' Please input the email')
    .run(req);

  await check('message')
    .notEmpty()
    .withMessage(' Please input a message')
    .run(req);

  await parseErrors(req, res, next);
};

//Parse errors and return errors,if any and proceed to next middleware
let parseErrors = (req, res, next) => {
  const errors = validationResult(req).formatWith(({ msg }) => msg);

  const hasError = !errors.isEmpty();

  if (hasError) {
    return next(new ThrowError(errors.array(), 400));
  } else {
    next();
  }
};
