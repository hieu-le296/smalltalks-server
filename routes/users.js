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

const { protect, authorize } = require('../middleware/auth');


const {userValidation} = require('../middleware/validation');


// Admin Access only

router
  .route('/')
  .get(protect, authorize('admin'), getUsers)
  .post(protect, authorize('admin'), userValidation, createUser);

router
  .route('/:id')
  .get(protect, authorize('admin'), getUser)
  .put(protect, authorize('admin'), userValidation, updateUser)
  .delete(protect, authorize('admin'), deleteUser);

router.route('/:id/password').put(protect, authorize('admin'), setUserPassword);

// Public Access

router.route('/:id/questions').get(getUserQuestions);

router.route('/:id/comments').get(getUserComments);

module.exports = router;
