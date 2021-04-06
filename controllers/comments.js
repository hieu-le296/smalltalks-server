
const Comment = require('../models/comments');
const comments = {
  questionId: {
    1: [
      {
        commentId: 1,
        postedBy: {
          commentUserId: 2,
          name: 'Hieu Le',
        },
        content: 'MERN',
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: null,
      },
      {
        commentId: 2,
        postedBy: {
          commentUserId: 3,
          name: 'Gurjit Singh',
        },
        content: 'MEAN',
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: null,
      },
      {
        commentId: 3,
        postedBy: {
          commentUserId: 3,
          name: 'Gurjit Singh',
        },
        content: 'and PHP I think',
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: null,
      },
    ],
    2: [
      {
        commentId: 4,
        postedBy: {
          commentUserId: 1,
          name: 'John Doe',
        },
        content: "I don't know",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: null,
      },

      {
        commentId: 5,
        postedBy: {
          commentUserId: 2,
          name: 'Hieu Le',
        },
        content: 'UFV announces that they will welcome us back in this Fall',
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: null,
      },
    ],
    3: [
      {
        id: 6,
        postedBy: {
          commentUserId: 2,
          name: 'Hieu Le',
        },
        content:
          'Every framework has its pro and const. Take a look here: https://www.sitepoint.com/react-vs-angular/',
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: null,
      },
    ],
  },
};
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
exports.getComment = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: {},
    msg: `Show single comment detail with the id of ${req.params.id}`,
  });
};

/**
 * @description     Create a question comment
 * @route           GET /api/v1/questions/:questionId/comments
 * @access          Private - authenticated users
 */
exports.createComment = (req, res, next) => {
  console.log(req.body);
  res.status(200).json({
    success: true,
    msg: 'New comment successfully created!',
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
exports.deleteComment = (req, res, next) => {
  const id = req.params.id;
  res.status(200).json({
    msg: `Comment with the id of ${id} successfully deleted!`,
  });
};
