/**
 * @description     Get all comments that associated with the question
 * @route           GET /api/v1/question/:questionId/comments
 * @access          Public
 */
exports.getComments = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: users,
    msg: `Show all comments`,
  });
};

/**
 * @description     Get single comment
 * @route           GET /api/v1/comments/:id
 * @access          Public
 */
exports.getComment = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: users[req.params.id - 1],
    msg: `Show single comment detail with the id of ${req.params.id}`,
  });
};

/**
 * @description     Create a question comment
 * @route           GET /api/v1/questions/:questionId/comments
 * @access          Private - authenticated users
 */
exports.createComments = (req, res, next) => {
  console.log(req.body);
  res.status(200).json({
    success: true,
    msg: 'New user successfully created!',
    data: req.body,
  });
};

/**
 * @description     Update the comment
 * @route           PUT /api/v1/comments/:id
 * @access          Private - authenticated users
 */
exports.updateComment = (req, res, next) => {
  const id = req.params.id;
  res.status(200).json({
    success: true,
    msg: `Comment with the id of ${id} successfully updated!`,
    data: req.body,
  });
};

/**
 * @description     Delete the comment
 * @route           DELETE /api/v1/comments/:id
 * @access          Private - authenticated users
 */
exports.deleteUser = (req, res, next) => {
  const id = req.params.id;
  res.status(200).json({
    msg: `Comment with the id of ${id} successfully deleted!`,
  });
};
