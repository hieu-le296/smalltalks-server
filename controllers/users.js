const ThrowError = require('../utils/throwError');
const asyncHandler = require('../middleware/async');
const User = require('../models/users');

/**
 * @description     Get all users in admin page
 * @route           GET /api/v1/users
 * @access          Private - access only admin
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
 * @route           GET /api/v1/users/:id
 * @access          Private - access only admin
 */
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findOne('userId', req.params.id);
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
 * @access          Private - access only admin
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
 * @description     Delete the question
 * @route           DELETE /api/v1/users/:id
 * @access          Private - access only by admin or user
 */
exports.deleteUser = asyncHandler(async (req, res, next) => {
  req.user = 2; // req.user.id will be from authentication later on
  req.role = 'user'; // req.user.admin will be from authentication later on

  const user = await User.findOne('userId', req.params.id);

  if (user.userId != req.user && req.role !== 'admin')
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
 * @description     Get User's all questions. This route is for showing on user's public page. Admin can delete any questions of that user
 * @route           GET /api/v1/users/:id/questions
 * @access          Public
 */
exports.getUserQuestions = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Show all questions of user id of ${req.params.id}`,
    data: users[req.params.id - 1].questions,
  });
});

/**
 * @description     Get User's all questions. This route is for showing on user's public page. Admin can delete any comments of that user
 * @route           GET /api/v1/users/:id/comments
 * @access          Public
 */
exports.getUserComments = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Show all comments of user id of ${req.params.id}`,
    data: users[req.params.id - 1].questions,
  });
});
