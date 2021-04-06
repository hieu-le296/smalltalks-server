const Question = require('../models/questions');

/**
 * @description     Get All public questions
 * @route           GET /api/v1/questions
 * @access          Public
 */
exports.getQuestions = async (req, res, next) => {
  try {
    const questions = await Question.findAll();
    res.status(200).json({
      success: true,
      data: questions,
      msg: 'Show all questions',
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      msg: 'Could not fetch questions',
    });
  }
};

/**
 * @description     Get single question
 * @route           GET /api/v1/questions/:id
 * @access          Public
 */
exports.getQuestion = async (req, res, next) => {
  try {
    const question = await Question.findOneById(req.params.id);
    res.status(200).json({
      success: true,
      data: question,
      msg: `Show question ${req.params.id}`,
    });
  } catch (error) {
    res.status(404).json({
      sucess: false,
      msg: `Question is not found with the id of ${req.params.id}`,
    });
  }
};

/**
 * @description     Create new question
 * @route           GET /api/v1/questions
 * @access          Private
 */
exports.createQuestion = async (req, res, next) => {
  // Add the current logged in user to body
  // req.body.userId = req.user.id;
  req.body.userId = 1;
  const createdQuestion = await Question.create(req.body);
  try {
    res.status(200).json({
      success: true,
      data: createdQuestion,
      msg: 'Question successfully created!',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: 'Could not create a question!',
    });
  }
};

/**
 * @description     Update the question
 * @route           PUT /api/v1/questions/:id
 * @access          Private - Only owner or admin
 */
exports.updateQuestion = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: 'Question with successfully updated!',
    data: req.body,
  });
};

/**
 * @description     Delete the question
 * @route           DELETE /api/v1/questions/:id
 * @access          Private - Only owner or admin
 */
exports.deleteQuestion = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: 'Question successfully deleted',
  });
};
