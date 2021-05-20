const express = require('express');

const { sendMail } = require('../controllers/contactMe');
const { contactMeValidation } = require('../middleware/validation');

const router = express.Router();

router.route('/').post(contactMeValidation, sendMail);

module.exports = router;
