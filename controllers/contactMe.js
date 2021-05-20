const asyncHandler = require('../middleware/async');
const ThrowError = require('../utils/throwError');
const sendEmail = require('../utils/sendEmail');

exports.sendMail = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const { name, email, message } = req.body;

  try {
    await sendEmail({
      email: 'admin@ourdrives.com',
      subject: `${name} from ${email} sends you a message`,
      message,
    });
  } catch (error) {
    return next(new ThrowError('Email could not be sent', 500));
  }

  res.status(200).json({
    success: true,
    msg: 'Message has been sent. Thank you 😊',
  });
});
