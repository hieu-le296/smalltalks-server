const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
const path = require('path');

class ImageHandler {
  constructor(folder) {
    this.folder = folder;
  }

  static fileName(userId) {
    return `${userId}_${uuidv4()}.png`;
  }

  filePath(fileName) {
    return path.resolve(`${this.folder}/${fileName}`);
  }

  // Resize and Save Profile Picture
  async saveProfile(buffer, userId) {
    const fileName = ImageHandler.fileName(userId);
    const filePath = this.filePath(fileName);

    await sharp(buffer)
      .resize(300, 300, {
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      })
      .toFile(filePath);

    return fileName;
  }

  // Resize and Save Background Picture
  async saveBackground(buffer, userId) {
    const fileName = ImageHandler.fileName(userId);
    const filePath = this.filePath(fileName);

    await sharp(buffer)
      .resize(820, 360, {
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      })
      .toFile(filePath);

    return fileName;
  }

  // Remove All User's Images
  static async removeUserImages(userId) {
    // Find the user profile images
    const profilePics = fs
      .readdirSync(`${process.env.FILE_UPLOAD_PATH}/avatars/`)
      .filter((file) => file.startsWith(`${userId}`));

    // Remove user's profile images
    if (profilePics.length !== 0) {
      for (let i = 0; i < profilePics.length; i++) {
        await fs.promises.unlink(
          `${process.env.FILE_UPLOAD_PATH}/avatars/${profilePics[i]}`
        );
      }
    }

    // Find the user background images
    const backgroundPics = fs
      .readdirSync(`${process.env.FILE_UPLOAD_PATH}/backgrounds/`)
      .filter((file) => file.startsWith(`${userId}`));

    // Remove user's background images
    if (backgroundPics.length !== 0) {
      for (let j = 0; j < backgroundPics.length; j++) {
        await fs.promises.unlink(
          `${process.env.FILE_UPLOAD_PATH}/backgrounds/${backgroundPics[j]}`
        );
      }
    }
  }
}

module.exports = ImageHandler;
