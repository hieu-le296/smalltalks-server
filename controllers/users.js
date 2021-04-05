const users = [
  {
    id: 1,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@gmail.com',
    role: 'admin',
    profilePics: 'default.jpeg',
    questionIds: [1],
    commentIds: [4, 6],
  },

  {
    id: 2,
    name: 'Hieu Le',
    username: 'hieule',
    email: 'hieu@gmail.com',
    role: 'admin',
    profilePics: 'default.jpeg',
    questionIds: [2],
    commentIds: [1, 5],
  },

  {
    id: 3,
    name: 'Gurjit Singh',
    username: 'gurjit',
    email: 'gurjit@gmail.com',
    role: 'admin',
    profilePics: 'default.jpeg',
    questionIds: [3],
    commentIds: [2, 3],
  },
];
/**
 * @description     Get all users in admin page
 * @route           GET /api/v1/users
 * @access          Private - access only admin
 */
exports.getUsers = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: users,
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
    data: users[req.params.id - 1],
    msg: `Show user detail with the id of ${req.params.id}`,
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
 * @access          Private - access only admin
 */
exports.updateUser = (req, res, next) => {
  const id = req.params.id;
  res.status(200).json({
    success: true,
    msg: `User with the id of ${id} successfully updated!`,
    data: req.body,
  });
};

/**
 * @description     Delete the question
 * @route           DELETE /api/v1/users/:id
 * @access          Private - access only admin
 */
exports.deleteUser = (req, res, next) => {
  const id = req.params.id;
  res.status(200).json({
    msg: `User with the id of ${id} successfully deleted!`,
  });
};

/**
 * @description     Get User's all questions. This route is for showing on user's public page
 * @route           GET /api/v1/users/:id/questions
 * @access          Public
 */
exports.getUserQuestions = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Show all questions of user id of ${req.params.id}`,
  });
};
