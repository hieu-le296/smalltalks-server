const express = require('express');

const { register, login, uploadProfilePic } = require('../controllers/auth');

const router = express.Router();

router.route('/register').post(register);

router.route('/login').post(login);

router.route('/:userId/profilepic').put(uploadProfilePic);

module.exports = router;
