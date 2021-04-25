const express = require('express');

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  setUserPassword,
  uploadProfilePic,
  uploadBackgroundPic,
  deleteUser,
  getUserQuestions,
  getUserComments,
} = require('../controllers/users');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

const { userValidation } = require('../middleware/validation');

// Admin Access only

router
  .route('/')
  .get(getUsers)
  .post(protect, authorize('admin'), userValidation, createUser);

router
  .route('/:id')
  .put(protect, authorize('user', 'admin'), userValidation, updateUser)
  .delete(protect, authorize('user', 'admin'), deleteUser);

router.route('/:username').get(getUser);

router
  .route('/:id/password')
  .put(protect, authorize('user', 'admin'), setUserPassword);

router
  .route('/:userId/profilepic')
  .put(protect, authorize('user', 'admin'), uploadProfilePic);

router
  .route('/:userId/backgroundpic')
  .put(protect, authorize('user', 'admin'), uploadBackgroundPic);

// Public Access

router.route('/:username/questions').get(getUserQuestions);

router.route('/:username/comments').get(getUserComments);

module.exports = router;
