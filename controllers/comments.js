const ThrowError = require('../utils/throwError');
const asyncHandler = require('../middleware/async');
const Comment = require('../models/comments');


/** 
 * @description     Get all comments that associated with the question
 * @route           GET /api/v1/questions/:questionId/comments
 * @access          Public
 */
exports.getComments = async(req, res, next) => {
 
  const questionId = req.params.questionId;

  const questionComments = await Comment.findAll(questionId);

  res.status(200).json({
    success: true,
    data: questionComments,
    msg: `Show all comments of the question with the id of ${req.params.questionId}`,
  });
};

/** 
 * @description     Get single comment
 * @route           GET /api/v1/comments/:id
 * @access          Public
 */
exports.getComment = async(req, res, next) => {

  const commentId = req.params.id;

  const comment = await Comment.findOne(commentId);

  res.status(200).json({
    success: true,
    data: comment,
    msg: `Show single comment detail with the id of ${req.params.id}`,
  });
};

/**
 * @description     Create a question comment
 * @route           POST /api/v1/questions/:questionId/comments
 * @access          Private - authenticated users
 */
exports.createComment = asyncHandler(async(req, res, next) => {

  /**
   * Format of data => {
    "commentUserId": 1,
    "content":"React + Node is good too!"
    }
   */
  
  req.body.questionId = req.params.questionId;

  const comment = await Comment.create(req.body);

  if (!comment) return next(new ThrowError('Comment is duplicated!', 400));


  const foundComment = await Comment.findOne(comment.insertId);

  if (!foundComment)
    return next(new ThrowError('Could not create the comment!', 400));


  res.status(201).json({
    success: true,
    msg: 'New comment successfully created!',
    data: foundComment
  });
});

/**
 * @description     Update the comment
 * @route           PUT /api/v1/comments/:id
 * @access          Private - authenticated users
 */
exports.updateComment = async(req, res, next) => {
  const id = req.params.id;

  req.body.id = req.params.id;

  const updatedComment = await Comment.update(req.body);

  res.status(200).json({
    success: true,
    msg: `Comment with the id of ${id} successfully updated!`,
    data: updatedComment,
  });
};

/**
 * @description     Delete the comment
 * @route           DELETE /api/v1/comments/:id
 * @access          Private - authenticated users
 */
exports.deleteComment = async(req, res, next) => {
  const id = req.params.id;

  await Comment.delete(id);

  res.status(200).json({
    success:true,
    msg: `Comment with the id of ${id} successfully deleted!`
  });
};
