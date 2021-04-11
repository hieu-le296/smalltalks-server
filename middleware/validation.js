const { check, validationResult, body } = require('express-validator');
const ThrowError = require('../utils/throwError');

exports.performValidation = async (req, res, next) => {
  await check('title')
    .notEmpty()
    .withMessage(' Please input the question title')
    .run(req);

  await check('content')
    .notEmpty()
    .withMessage(' Please input the content')
    .run(req);

  const errors = validationResult(req).formatWith(({ msg }) => msg);

  const hasError = !errors.isEmpty();

  if (hasError) {
    return next(new ThrowError(errors.array(), 400));
  } else {
    next();
  }
};
