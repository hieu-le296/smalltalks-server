const express = require('express');
const router = express.Router();

const {
  getUserQuestions,
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/users');

router.route('/').get(getUsers).post(createUser);

router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

router.route('/:id/questions').get(getUserQuestions);

module.exports = router;
