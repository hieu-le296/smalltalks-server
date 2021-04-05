const Question = require('../models/questions');
const questions = [
  {
    id: 1,
    title: 'Why is the best web stack now?',
    content:
      'I am starting to study web development. Can someone give me a hint?',
    createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    updatedAt: null,
    postedBy: {
      userId: 1,
      name: 'John Doe',
    },
    comments: [
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
  },

  {
    commentId: 2,
    title: 'When will go back to UFV soon?',
    content:
      'It has been a while we did not go to the campus. I am just wondering when we go back to school?',
    createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    updatedAt: null,
    postedBy: {
      userId: 2,
      name: 'Hieu Le',
    },
    comments: [
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
  },

  {
    id: 3,
    title: 'Should I learn React or Angular now?',
    content: 'As title, anyone can give me an advice, please?',
    createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    updatedAt: null,
    postedBy: {
      userId: 1,
      name: 'John Doe',
    },
    comments: [
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
];

/**
 * @description     Get All public questions
 * @route           GET /api/v1/questions
 * @access          Public
 */
exports.getQuestions = async (req, res, next) => {
  try {
    const data = await Question.find();
    res.status(200).json({
      success: true,
      data: data,
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
exports.getQuestion = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: questions[req.params.id - 1],
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
