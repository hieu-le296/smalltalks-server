const express = require('express');

const {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  uploadProfilePic,
} = require('../controllers/auth');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

const {loginValidation} = require('../middleware/validation');

router.route('/register').post(register);

router.route('/login').post(loginValidation, login);

router.route('/me').get(protect, getMe);

router.route('/forgotpassword').post(forgotPassword);

router.route('/resetpassword/:resettoken').put(resetPassword);

router
  .route('/:userId/profilepic')
  .put(protect, authorize('user', 'admin'), uploadProfilePic);

module.exports = router;
