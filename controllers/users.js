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
    data: users,
    msg: `Show all users`,
  });
});

/**
 * @description     Get single user detail
 * @route           GET /api/v1/users/:id
 * @access          Private - access only admin
 */
exports.getUser = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: users[req.params.id - 1],
    msg: `Show user detail with the id of ${req.params.id}`,
  });
});

/**
 * @description     Create new user
 * @route           GET /api/v1/users
 * @access          Private - access only by admin
 */
exports.createUser = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  res.status(200).json({
    success: true,
    msg: 'New user successfully created!',
    data: req.body,
  });
});

/**
 * @description     Update the user information
 * @route           PUT /api/v1/users/:id
 * @access          Private - access only admin
 */
exports.updateUser = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  res.status(200).json({
    success: true,
    msg: `User with the id of ${id} successfully updated!`,
    data: req.body,
  });
});

/**
 * @description     Delete the question
 * @route           DELETE /api/v1/users/:id
 * @access          Private - access only admin
 */
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  res.status(200).json({
    msg: `User with the id of ${id} successfully deleted!`,
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
