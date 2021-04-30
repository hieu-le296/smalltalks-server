const fs = require('fs');

exports.removeUserPictures = async (userId) => {
  // Find the user picture
  const profilePic = fs
    .readdirSync(`${process.env.FILE_UPLOAD_PATH}/avatars/`)
    .filter((file) => file.startsWith(`photo_${userId}`));

  // Remove user's profile image
  if (profilePic.length !== 0)
    await fs.promises.unlink(
      `${process.env.FILE_UPLOAD_PATH}/avatars/${profilePic}`
    );

  // Find the user background image
  const backgroundPic = fs
    .readdirSync(`${process.env.FILE_UPLOAD_PATH}/backgrounds/`)
    .filter((file) => file.startsWith(`background_${userId}`));

  // Remove user's background image
  if (backgroundPic.length !== 0)
    await fs.promises.unlink(
      `${process.env.FILE_UPLOAD_PATH}/backgrounds/${backgroundPic}`
    );
};
