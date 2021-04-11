const express = require('express');

const {
  register,
  login,
  getMe,
  uploadProfilePic,
} = require('../controllers/auth');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.route('/register').post(register);

router.route('/login').post(login);

router.route('/me').get(protect, getMe);

router.route('/:userId/profilepic').put(uploadProfilePic);

module.exports = router;
