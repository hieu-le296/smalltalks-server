/**
 * @description     Get All public questions
 * @route           GET /api/v1/questions
 * @access          Public
 */
exports.getQuestions = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: 'Show all questions',
  });
};

/**
 * @description     Get single question
 * @route           GET /api/v1/questions/:id
 * @access          Public
 */
exports.getQuestion = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Show question ${req.params.id}`,
  });
};

/**
 * @description     Get single question
 * @route           GET /api/v1/questions/:id
 * @access          Public
 */
exports.getQuestion = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Show question ${req.params.id}`,
  });
};

/**
 * @description     Create new question
 * @route           GET /api/v1/questions
 * @access          Private
 */
exports.createQuestion = (req, res, next) => {
  console.log(req.body);
  res.status(200).json({
    success: true,
    msg: 'Question successfully created!',
    data: req.body,
  });
};

/**
 * @description     Update the question
 * @route           GET /api/v1/questions/:id
 * @access          Private
 */
exports.updateQuestion = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: 'Question with successfully updated!',
    data: req.body,
  });
};

exports.deleteQuestion = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: 'Question successfully deleted',
  });
};
