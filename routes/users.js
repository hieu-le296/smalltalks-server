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

const { protect } = require('../middleware/auth');

router.route('/').get(protect, getUsers).post(protect, createUser);

router
  .route('/:id')
  .get(protect, getUser)
  .put(protect, updateUser)
  .delete(protect, deleteUser);

router.route('/:id/questions').get(getUserQuestions);

router.route('/:id/comments').get(getUserComments);

router.route('/:id/password').put(protect, setUserPassword);

module.exports = router;
