const ThrowError = require('../utils/throwError');
const asyncHandler = require('../middleware/async');
const Question = require('../models/questions');

/**
 * @description     Get All public questions
 * @route           GET /api/v1/questions
 * @access          Public
 */
exports.getQuestions = asyncHandler(async (req, res, next) => {
  const questions = await Question.findAll(req);
  if (questions.length > 0) {
    res.status(200).json({
      success: true,
      pagination: {
        limit: req.limit,
        offset: req.offset,
      },
      data: questions,
      msg: 'Show all questions',
    });
  } else {
    return next(new ThrowError('No questions found', 404));
  }
});

/**
 * @description     Get single question
 * @route           GET /api/v1/questions/:id
 * @access          Public
 */
exports.getQuestion = asyncHandler(async (req, res, next) => {
  const question = await Question.findOne(req.params.id);

  res.status(200).json({
    success: true,
    data: question,
    msg: `Show question ${req.params.id}`,
  });
});

/**
 * @description     Create new question
 * @route           GET /api/v1/questions
 * @access          Private
 */
exports.createQuestion = asyncHandler(async (req, res, next) => {
  // Add the current logged in user to body => Will do after implementing the authentication
  // req.body.userId = req.user.id;
  req.body.userId = 2;
  const result = await Question.create(req.body);

  if (!result) return next(new ThrowError('Question is duplicate', 406));

  const foundQuestion = await Question.findOne(result.insertId);

  if (!foundQuestion)
    return next(new ThrowError('Could not create a question', 400));

  res.status(201).json({
    success: true,
    data: foundQuestion,
    msg: 'Question successfully created!',
  });
});

/**
 * @description     Update the question
 * @route           PUT /api/v1/questions/:id
 * @access          Private - Only owner or admin
 */
exports.updateQuestion = asyncHandler(async (req, res, next) => {
  req.user = 2; // req.user.id will be from authentication later on
  const question = await Question.findOne(req.params.id);

  if (!question)
    return next(new ThrowError('Could not update the question', 404));

  // Check if the question author
  if (question.postedBy.userId != req.user)
    return next(
      new ThrowError('This user is not authorized to update the question', 404)
    );

  await Question.findByIdAndUpdate(req.params.id, req.body);

  const updatedQuestion = await Question.findOne(req.params.id);

  res.status(200).json({
    success: true,
    data: updatedQuestion,
    msg: 'Question with successfully updated!',
  });
});

/**
 * @description     Delete the question
 * @route           DELETE /api/v1/questions/:id
 * @access          Private - Only owner or admin
 */
exports.deleteQuestion = asyncHandler(async (req, res, next) => {
  req.user = 2; // req.user.id will be from authentication later on
  const question = await Question.findOne(req.params.id);

  if (!question)
    return next(new ThrowError('Coudl not delete the question', 404));

  // Check if the question author
  if (question.postedBy.userId != req.user)
    return next(
      new ThrowError('This user is not authorized to update the question', 404)
    );

  await Question.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
    msg: 'Question successfully deleted!',
  });
});
