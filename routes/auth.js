const express = require('express');

const { register, uploadProfilePic } = require('../controllers/auth');

const router = express.Router();

router.route('/register').post(register);

router.route('/:userId/profilepic').put(uploadProfilePic);

module.exports = router;
