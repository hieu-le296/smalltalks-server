const path = require('path');
const asyncHandler = require('../middleware/async');
const ThrowError = require('../utils/throwError');
const User = require('../models/users');

/**
 * @description     Upload user profile picture
 * @route           PUT /api/v1/auth/:userId/profilepic
 * @access          Private
 */
exports.uploadProfilePic = asyncHandler(async (req, res, next) => {
  const user = await User.findOne('userId', req.params.userId);

  // Check if the user is found
  if (!user) return next(new ThrowError('User not found!', 404));

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

  // Create custom filename and its extension
  file.name = `photo_${user.username}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.log(err);
      return next(new ThrowError(`Problem with file upload`, 500));
    }
    await User.findUserAndUpdatePicture(req.params.userId, file.name);

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});

/**
 * @description     Register user
 * @route           POST /api/v1/auth/register
 * @access          Public
 */
exports.register = asyncHandler(async (req, res, next) => {
  // Create user
  const result = await User.create(req.body);

  const createdUser = await User.findOne('userId', result.insertId);

  res
    .status(200)
    .json({
      success: true,
      data: createdUser,
      msg: `User ${req.body.username} successfully created!`,
    });
});
