const express = require('express');

const {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  uploadProfilePic,
  uploadBackgroundPic,
  updateUser,
  deleteUser,
} = require('../controllers/auth');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

const { loginValidation } = require('../middleware/validation');

router.route('/register').post(register);

router.route('/login').post(loginValidation, login);

router.route('/me').get(protect, getMe);

router.route('/forgotpassword').post(forgotPassword);

router.route('/resetpassword/:resettoken').put(resetPassword);

router
  .route('/:userId/profilepic')
  .put(protect, authorize('user', 'admin'), uploadProfilePic);

router
  .route('/:userId/backgroundpic')
  .put(protect, authorize('user', 'admin'), uploadBackgroundPic);

router.route('/:userId').put(protect, authorize('user', 'admin'), updateUser);

router
  .route('/:userId')
  .delete(protect, authorize('user', 'admin'), deleteUser);

module.exports = router;
