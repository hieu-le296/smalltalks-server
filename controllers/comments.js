const ThrowError = require('../utils/throwError');
const asyncHandler = require('../middleware/async');
const Comment = require('../models/Comment');

/**
 * @description     Get all comments that associated with the post
 * @route           GET /api/v1/posts/:postId/comments
 * @access          Public
 */
exports.getComments = async (req, res, next) => {
  const postId = req.params.postId;

  const postComments = await Comment.findAll(postId, req);

  if (postComments.length > 0) {
    res.status(200).json({
      success: true,
      data: postComments,
      msg: `Show all comments of the post with the id of ${req.params.postId}`,
    });
  } else {
    return next(new ThrowError('No comments found', 404));
  }
};

/**
 * @description     Get single comment
 * @route           GET /api/v1/comments/:id
 * @access          Public
 */
exports.getComment = async (req, res, next) => {
  const commentId = req.params.id;

  const comment = await Comment.findOne(commentId);

  res.status(200).json({
    success: true,
    data: comment,
    msg: `Show single comment detail with the id of ${req.params.id}`,
  });
};

/**
 * @description     Create a post comment
 * @route           POST /api/v1/posts/:postId/comments
 * @access          Private - authenticated users
 */
exports.createComment = asyncHandler(async (req, res, next) => {
  /**
   * Format of data => {
    "commentUserId": 1,
    "content":"React + Node is good too!"
    }
   */

  req.body.commentUserId = req.user.userId;

  req.body.postId = req.params.postId;

  const comment = await Comment.create(req.body);

  const foundComment = await Comment.findOne(comment.insertId);

  if (!foundComment)
    return next(new ThrowError('Could not create the comment!', 400));

  res.status(201).json({
    success: true,
    msg: 'New comment successfully created!',
    data: foundComment,
  });
});

/**
 * @description     Update the comment
 * @route           PUT /api/v1/comments/:id
 * @access          Private - authenticated users
 */
exports.updateComment = asyncHandler(async (req, res, next) => {
  req.body.commentUserId = req.user.userId;

  const comment = await Comment.findOne(req.params.id);

  // Check if the comment author
  if (
    comment.postedBy.commentUserId !== req.user.userId &&
    req.user.role !== 'admin'
  ) {
    return next(
      new ThrowError('This user is not authorized to update the comment', 401)
    );
  }

  if (!comment) {
    return next(new ThrowError('Could not update the comment', 404));
  }

  const updatedComment = await Comment.update(req.params.id, req.body);

  res.status(200).json({
    success: true,
    msg: `Comment successfully updated!`,
    data: updatedComment,
  });
});

/**
 * @description     Delete the comment
 * @route           DELETE /api/v1/comments/:id
 * @access          Private - authenticated users
 */
exports.deleteComment = async (req, res, next) => {
  req.body.commentUserId = req.user.userId;

  const comment = await Comment.findOne(req.params.id);

  if (!comment) {
    return next(new ThrowError('Could not delete the comment', 404));
  }

  // Check if the comment author
  if (
    comment.postedBy.commentUserId !== req.user.userId &&
    req.user.role !== 'admin'
  )
    return next(
      new ThrowError('This user is not authorized to update the comment', 401)
    );

  await Comment.delete(req.params.id);

  res.status(200).json({
    success: true,
    msg: `Comment successfully deleted!`,
  });
};
