const path = require('path');
const crypto = require('crypto');
const asyncHandler = require('../middleware/async');
const ThrowError = require('../utils/throwError');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');
const ImageHandler = require('../utils/ImageHandler');

/**
 * @description     Register user
 * @route           POST /api/v1/auth/register
 * @access          Public
 */
exports.register = asyncHandler(async (req, res, next) => {
  // Create user
  const user = await User.create(req.body);

  if (!user)
    return next(
      new ThrowError(`User ${req.body.username} already existed!`, 400)
    );
  res.status(200).json({
    success: true,
    msg: `User Account ${req.body.username} sucessfully created!`,
  });

  // sendTokenCookie(user.insertId, 200, res);
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
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findOne('userId', req.user.userId);

  res.status(200).json({
    success: true,
    data: user,
  });
});

/**
 * @description     Forgot password
 * @route           POST /api/v1/auth/forgotpassword
 * @access          Public
 */
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne('email', req.body.email);

  if (!user)
    return next(new ThrowError('There is no user with req.body.email', 404));

  // Get reset token
  const resetToken = await User.getResetPasswordToken(user.userId);

  // Create reset url

  const resetUrl = `https://smalltalks.tk/resetpassword/${resetToken}`;

  const message = `You are receiving this email because you has requested a password. Click on the link below to change your password:\n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Reset Password',
      message,
    });

    res.status(200).json({
      success: true,
      data: 'An email has been sent to your mailbox for resetting the password!',
    });
  } catch (error) {
    // Empty resetPasswordToken and resetPasswordExpire
    await User.emptyTokenAndExpire(user.userId);

    return next(new ThrowError('Email could not be sent', 500));
  }
});

/**
 * @description     Reset password
 * @route           PUT /api/v1/auth/resetpassword/:resettoken
 * @access          Public
 */
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex');

  const user = await User.findOne('resetPasswordToken', resetPasswordToken);

  if (!user) {
    // Empty resetPasswordToken and resetPasswordExpire
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
});

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

// Update User details

/**
 * @description     Upload user profile picture
 * @route           PUT /api/v1/users/:userId/profilepic
 * @access          Private - Access by admin or user
 */
exports.uploadProfilePic = asyncHandler(async (req, res, next) => {
  const user = await User.findOne('userId', req.params.userId);

  // Check if the user is found
  if (!user) return next(new ThrowError('User not found!', 404));

  // Check if the user owner
  if (user.userId !== req.user.userId && req.user.role !== 'admin')
    return next(
      new ThrowError(
        'This user is not authorized to update the picture profile',
        401
      )
    );

  if (!req.files) return next(new ThrowError('Please upload a picture', 400));

  const file = req.files.file;

  //   Make sure the image is a photo
  if (!file.mimetype.startsWith('image')) {
    return next(new ThrowError('Please upload an image file', 400));
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ThrowError(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        404
      )
    );
  }

  const imagePath = `${process.env.FILE_UPLOAD_PATH}/avatars`;
  const imageUpload = new ImageHandler(imagePath);
  const fileName = await imageUpload.saveProfile(
    req.files.file.data,
    req.params.userId
  );

  await User.findUserAndUpdatePicture(
    req.params.userId,
    'profilePic',
    fileName
  );

  res.status(200).json({
    success: true,
    data: fileName,
  });
});

/**
 * @description     Upload user profile background
 * @route           PUT /api/v1/users/:userId/background
 * @access          Private - Access by admin or user
 */
exports.uploadBackgroundPic = asyncHandler(async (req, res, next) => {
  const user = await User.findOne('userId', req.params.userId);

  // Check if the user is found
  if (!user) return next(new ThrowError('User not found!', 404));

  // Check if the user owner
  if (user.userId !== req.user.userId && req.user.role !== 'admin')
    return next(
      new ThrowError(
        'This user is not authorized to update the picture profile',
        401
      )
    );

  if (!req.files) return next(new ThrowError('Please upload a picture', 400));

  const file = req.files.file;

  //   Make sure the image is a photo
  if (!file.mimetype.startsWith('image')) {
    return next(new ThrowError('Please upload an image file', 400));
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ThrowError(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        404
      )
    );
  }

  const imagePath = `${process.env.FILE_UPLOAD_PATH}/backgrounds`;
  const imageUpload = new ImageHandler(imagePath);
  const fileName = await imageUpload.saveBackground(
    req.files.file.data,
    req.params.userId
  );

  await User.findUserAndUpdatePicture(
    req.params.userId,
    'backgroundPic',
    fileName
  );

  res.status(200).json({
    success: true,
    data: fileName,
  });
});

/**
 * @description     Update the user information
 * @route           PUT /api/v1/users/:id
 * @access          Private - access only by admin or user
 */
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findOne('userId', req.params.userId);

  // Check if the user is found
  if (!user) return next(new ThrowError('User not found!', 404));

  const result = await User.findByIdAndUpdate(req.params.userId, req.body);

  if (!result)
    return next(
      new ThrowError('User information duplicate with other users', 406)
    );

  const updatedUser = await User.findOne('userId', req.params.userId);
  res.status(200).json({
    success: true,
    data: updatedUser,
    msg: `User ${req.body.username} successfully updated!`,
  });
});

/**
 * @description     Delete the user
 * @route           DELETE /api/v1/users/:id
 * @access          Private - access only by admin or user
 */
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findOne('userId', req.params.userId);

  if (user.userId !== req.user.userId && req.user.role !== 'admin')
    return next(
      new ThrowError('You are not authorized to delete this user!', 401)
    );

  const username = user.username;

  await User.findByIdandDelete(req.params.userId);

  ImageHandler.removeUserImages(user.userId);

  res.status(200).json({
    success: true,
    data: {},
    msg: `User with username ${username} successfully deleted!`,
  });
});
