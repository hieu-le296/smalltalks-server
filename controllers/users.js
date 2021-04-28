const path = require('path');
const ThrowError = require('../utils/throwError');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');

/**
 * @description     Get all users in admin page
 * @route           GET /api/v1/users
 * @access          Private - access only by admin or user
 */
exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.findAll();
  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
    msg: `All users successfully fetched!`,
  });
});

/**
 * @description     Get single user detail
 * @route           GET /api/v1/users/:username
 * @access          Private - access only by admin or user
 */
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findOne('username', req.params.username);
  res.status(200).json({
    success: true,
    data: user,
    msg: `Here is the information of user with username ${user.username}`,
  });
});

/**
 * @description     Create new user
 * @route           GET /api/v1/users
 * @access          Private - access only by admin
 */
exports.createUser = asyncHandler(async (req, res, next) => {
  const result = await User.create(req.body);

  if (!result) return next(new ThrowError('User already existed', 406));

  const foundUser = await User.findOne('userId', result.insertId);

  if (!foundUser)
    return next(new ThrowError('Could not create a new user', 400));
  res.status(200).json({
    success: true,
    data: foundUser,
    msg: 'New user successfully created!',
  });
});

/**
 * @description     Update the user information
 * @route           PUT /api/v1/users/:id
 * @access          Private - access only by admin or user
 */
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findOne('userId', req.params.id);

  // Check if the user is found
  if (!user) return next(new ThrowError('User not found!', 404));

  const result = await User.findByIdAndUpdate(req.params.id, req.body);

  if (!result)
    return next(
      new ThrowError('User information duplicate with other users', 406)
    );

  const updatedUser = await User.findOne('userId', req.params.id);
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
  const user = await User.findOne('userId', req.params.id);

  if (user.userId !== req.user.userId && req.user.role !== 'admin')
    return next(
      new ThrowError('You are not authorized to delete this user!', 401)
    );

  const username = user.username;

  await User.findByIdandDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
    msg: `User with username ${username} successfully deleted!`,
  });
});

/**
 * @description     Update user password
 * @route           PUT /api/v1/users/:id/password
 * @access          Private - access only by admin or user
 */
exports.setUserPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne('userId', req.params.id);

  const username = user.username;

  await User.setUserPassword(req.params.id, req.body.password);

  res.status(200).json({
    success: true,
    msg: `Passowrd of username ${username} successfully updated!`,
  });
});

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

  // Create custom filename and its extension
  file.name = `photo_${user.userId}${path.parse(file.name).ext}`;

  file.mv(
    `${process.env.FILE_UPLOAD_PATH}/avatars/${file.name}`,
    async (err) => {
      if (err) {
        console.log(err);
        return next(new ThrowError(`Problem with file upload`, 500));
      }
      await User.findUserAndUpdatePicture(
        req.params.userId,
        'profilePic',
        file.name
      );

      res.status(200).json({
        success: true,
        data: file.name,
      });
    }
  );
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

  // Create custom filename and its extension
  file.name = `background_${user.userId}${path.parse(file.name).ext}`;

  file.mv(
    `${process.env.FILE_UPLOAD_PATH}/backgrounds/${file.name}`,
    async (err) => {
      if (err) {
        console.log(err);
        return next(new ThrowError(`Problem with file upload`, 500));
      }
      await User.findUserAndUpdatePicture(
        req.params.userId,
        'backgroundPic',
        file.name
      );

      res.status(200).json({
        success: true,
        data: file.name,
      });
    }
  );
});

/**
 * @description     Get User's all questions. This route is for showing on user's public page. Admin or question author can delete any questions of that user
 * @route           GET /api/v1/users/:id/questions
 * @access          Public
 */
exports.getUserQuestions = asyncHandler(async (req, res, next) => {
  // Find user
  const user = await checkUserExists(req, res, next);

  const { userId, username, name, profilePic, backgroundPic } = user;

  const questions = await User.findUserQuestions(userId);

  res.status(200).json({
    success: true,
    msg: `All quetions that username ${username} posted`,
    userId: userId,
    name: name,
    username: username,
    backgroundPic: backgroundPic,
    profilePic: profilePic,
    questions: questions,
  });
});

/**
 * @description     Get User's all questions. This route is for showing on user's public page. Admin can delete any comments of that user
 * @route           GET /api/v1/users/:id/comments
 * @access          Public
 */
exports.getUserComments = asyncHandler(async (req, res, next) => {
  // Find user
  const user = await checkUserExists(req, res, next);

  const { userId, username, name, profilePic, backgroundPic } = user;

  const comments = await User.findUserComments(userId);
  res.status(200).json({
    success: true,
    msg: `All comments that username ${username} posted`,
    userId: userId,
    name: name,
    username: username,
    backgroundPic: backgroundPic,
    profilePic: profilePic,
    comments: comments,
  });
});

const checkUserExists = async (req, res, next) => {
  const user = await User.findOne('username', req.params.username);
  if (!user) return next(new ThrowError('User not found!', 404));
  return user;
};
