const express = require('express');

const { uploadProfilePic } = require('../controllers/auth');

const router = express.Router();

router.route('/:userId/profilepic').put(uploadProfilePic);

module.exports = router;
