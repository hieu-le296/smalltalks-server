const express = require('express');

const {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
} = require('../controllers/auth');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

const { loginValidation } = require('../middleware/validation');

router.route('/register').post(register);

router.route('/login').post(loginValidation, login);

router.route('/me').get(protect, getMe);

router.route('/forgotpassword').post(forgotPassword);

router.route('/resetpassword/:resettoken').put(resetPassword);

module.exports = router;
