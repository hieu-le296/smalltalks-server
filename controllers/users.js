const users = [
  {
    id: 1,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@gmail.com',
    role: 'admin',
    profilePics: 'default.jpeg',
    questions: [
      {
        questionId: 1,
        title: 'What is the best web stack now?',
        content:
          'I am starting to study web development. Can someone give me a hint?',
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: null,
      },

      {
        questionId: 3,
        title: 'Should I learn React or Angular now?',
        content: 'As title, anyone can give me an advice, please?',
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: null,
      },
    ],
    comments: [
      {
        commentId: 4,
        content: "I don't know",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: null,
      },
    ],
  },

  {
    id: 2,
    name: 'Hieu Le',
    username: 'hieule',
    email: 'hieu@gmail.com',
    role: 'admin',
    profilePics: 'default.jpeg',
    questions: [
      {
        questionId: 2,
        title: 'When will go back to UFV soon?',
        content:
          'It has been a while we did not go to the campus. I am just wondering when we go back to school?',
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: null,
      },
    ],
    comments: [
      {
        commentId: 1,
        content: 'MERN',
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: null,
      },

      {
        commentId: 5,
        content: 'UFV announces that they will welcome us back in this Fall',
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: null,
      },

      {
        commentId: 6,
        content:
          'Every framework has its pro and const. Take a look here: https://www.sitepoint.com/react-vs-angular/',
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: null,
      },
    ],
  },

  {
    id: 3,
    name: 'Gurjit Singh',
    username: 'gurjit',
    email: 'gurjit@gmail.com',
    role: 'admin',
    profilePics: 'default.jpeg',
    questions: [],
    comments: [
      {
        commentId: 2,
        content: 'MEAN',
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: null,
      },
      {
        commentId: 3,
        content: 'and PHP I think',
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: null,
      },
    ],
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
    data: users[req.params.id - 1].questions,
  });
};
