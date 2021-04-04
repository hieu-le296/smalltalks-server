/**
 * @description     Get all users in
 * @route           GET /api/v1/users
 * @access          Private - access only admin
 */
exports.getUsers = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Show all users`,
  });
};

/**
 * @description     Get single user detail
 * @route           GET /api/v1/users/:id
 * @access          Private - access only admin
 */
exports.getUser = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Show user detail ${req.params.id}`,
  });
};

/**
 * @description     Create new user
 * @route           GET /api/v1/users
 * @access          Private - access only by admin
 */
exports.createUser = (req, res, next) => {
  console.log(req.body);
  res.status(200).json({
    success: true,
    msg: 'New user successfully created!',
    data: req.body,
  });
};

/**
 * @description     Update the user information
 * @route           PUT /api/v1/users/:id
 * @access          Private
 */
exports.updateUser = (req, res, next) => {
  const id = req.params.id;
  res.status(200).json({
    success: true,
    msg: `User with the id of ${id} successfully update!`,
    data: req.body,
  });
};

/**
 * @description     Delete the question
 * @route           DELETE /api/v1/users/:id
 * @access          Private
 */
exports.deleteUser = (req, res, next) => {
  const id = req.params.id;
  res.status(200).json({
    msg: `User with the id of ${id} successfully deleted!`,
  });
};

/**
 * @description     Get User's all questions
 * @route           GET /api/v1/users/:id/questions
 * @access          Public
 */
exports.getUserQuestions = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Show all questions of user id of ${req.params.id}`,
  });
};
