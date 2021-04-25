const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ThrowError = require('../utils/throwError');
const User = require('../models/User');

/**
 * Function to protect the route by checking the Bearer Token from Header Authorization
 */
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token)
    return next(
      new ThrowError('You are not authorized to access this route', 401)
    );

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    req.user = await User.findOne('userId', decoded.id);

    next();
  } catch (error) {}
});

/**
 *
 * @param  {...any} roles any current roles
 * @returns go to next()
 */
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ThrowError(`You are not unauthorized to access this route`, 403)
      );
    }
    next();
  };
};
