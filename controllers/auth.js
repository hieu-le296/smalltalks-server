const crypto = require('crypto');
const asyncHandler = require('../middleware/async');
const ThrowError = require('../utils/throwError');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

/**
 * @description     Register user
 * @route           POST /api/v1/auth/register
 * @access          Public
 */
exports.register = asyncHandler(async (req, res, next) => {
  // Create user
  const user = await User.create(req.body);

  sendTokenCookie(user.insertId, 200, res);
});

/**
 * @description     Login user
 * @route           POST /api/v1/auth/login
 * @access          Public
 */
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Check for user
  const user = await User.findOne('email', email);

  if (!user) return next(new ThrowError('Invalid credentials', 401));

  // Check if password matches
  const isMatched = await User.matchPassword(password, user.password);

  if (!isMatched) return next(new ThrowError('Invalid credentials', 401));

  sendTokenCookie(user.userId, 200, res);
});

/**
 * @description     Get current logged in user
 * @route           GET /api/v1/auth/login
 * @access          Private
 */
exports.getMe = asyncHandler(
  asyncHandler(async (req, res, next) => {
    const user = await User.findOne('userId', req.user.userId);

    res.status(200).json({
      success: true,
      data: user,
    });
  })
);

/**
 * @description     Forgot password
 * @route           POST /api/v1/auth/forgotpassword
 * @access          Public
 */
exports.forgotPassword = asyncHandler(
  asyncHandler(async (req, res, next) => {
    const user = await User.findOne('email', req.body.email);

    if (!user)
      return next(new ThrowError('There is user with req.body.email', 404));

    // Get reset token
    const resetToken = await User.getResetPasswordToken(user.userId);

    // Create reset url
    const resetUrl = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/auth/resetpassword/${resetToken}`;

    const message = `You are receiving this email because you has requested a password. Click on the link below to change your password:\n\n ${resetUrl}`;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Reset Password',
        message,
      });

      res.status(200).json({
        success: true,
        data:
          'An email has been sent to your mailbox for resetting the password!',
      });
    } catch (error) {
      // Empty resetPasswordToken and resetPasswordExpire
      await User.emptyTokenAndExpire(user.userId);

      return next(new ThrowError('Email could not be sent', 500));
    }
  })
);

/**
 * @description     Reset password
 * @route           PUT /api/v1/auth/resetpassword/:resettoken
 * @access          Public
 */
exports.resetPassword = asyncHandler(
  asyncHandler(async (req, res, next) => {
    // Get hashed token
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.resettoken)
      .digest('hex');

    const user = await User.findOne('resetPasswordToken', resetPasswordToken);

    if (!user) {
      // Empty resetPasswordToken and resetPasswordExpire
      await User.emptyTokenAndExpire(user.userId);
      return next(new ThrowError('Invalid token', 400));
    }

    const result = await User.checkTokenTimeLeft(
      'resetPasswordExpire',
      user.userId
    );

    if (result[0].timeLeft < 0) {
      // Empty resetPasswordToken and resetPasswordExpire
      await User.emptyTokenAndExpire(user.userId);
      return next(new ThrowError('Password Token Request Time Out!', 400));
    }

    // set new password
    await User.setUserPassword(user.userId, req.body.password);

    // Empty resetPasswordToken and resetPasswordExpire
    await User.emptyTokenAndExpire(user.userId);

    sendTokenCookie(user.userId, 200, res);
  })
);

const sendTokenCookie = (userId, statusCode, res) => {
  // Create token
  const token = User.getSignedJwtToken(userId);

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({ success: true, token });
};
