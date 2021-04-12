const { check, validationResult, body } = require('express-validator');
const ThrowError = require('../utils/throwError');

exports.questionValidation = async (req, res, next) => {
  await check('title')
    .notEmpty()
    .withMessage(' Please input the question title')
    .run(req);

  await check('content')
    .notEmpty()
    .withMessage(' Please input the content')
    .run(req);

    await parseErrors(req,res,next);

};

exports.commentValidation = async (req, res, next) => {
  
  await check('content')
    .notEmpty()
    .withMessage(' Please input the content')
    .run(req);

    await parseErrors(req,res,next);

};




//Parse errors and return errors,if any and proceed to next middleware
let parseErrors = (req,res,next) => {

  const errors = validationResult(req).formatWith(({ msg }) => msg);

  const hasError = !errors.isEmpty();

  if (hasError) {
    return next(new ThrowError(errors.array(), 400));
  } else {
    next();
  }

}
