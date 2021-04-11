const express = require('express');

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  setUserPassword,
  deleteUser,
  getUserQuestions,
  getUserComments,
} = require('../controllers/users');

const router = express.Router();

router.route('/').get(getUsers).post(createUser);

router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

router.route('/:id/questions').get(getUserQuestions);

router.route('/:id/comments').get(getUserComments);

router.route('/:id/password').put(setUserPassword);

module.exports = router;
