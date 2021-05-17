const crypto = require('crypto');
const Database = require('../utils/db_query');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class User {
  constructor(user) {
    const {
      userId,
      name,
      username,
      email,
      role,
      profilePic,
      backgroundPic,
      createdAt,
      updatedAt,
    } = user;

    this.data = {
      userId,
      name,
      username,
      email,
      role,
      profilePic,
      backgroundPic,
      createdAt,
      updatedAt,
    };
  }

  /**
   * Find all users
   * @returns usersData
   */
  static async findAll() {
    const db = new Database();

    let query = 'SELECT * FROM users ORDER BY userId DESC;';
    const users = await db.queryDatabase(query, []);
    const usersData = [];

    // Format data for each user
    users.forEach((user) => usersData.push(new User(user).data));

    return usersData;
  }

  /**
   * Find one user
   * @param {*} field for condition in WHERE clause
   * @param {*} value
   * @returns single user - a promise
   */
  static async findOne(field, value) {
    const db = new Database();
    let query = `SELECT * FROM users WHERE ${field} = ?`;
    const user = await db.queryDatabase(query, [value]);

    if (field === 'email') {
      const data = new User(user[0]).data;
      data.password = user[0].passwd;
      data.resetPasswordExpireQuery = user[0].resetPasswordToken;
      data.resetPasswordExpire = user[0].resetPasswordExpire;
      return data;
    }

    if (field === 'resetPasswordToken') {
      const data = new User(user[0]).data;
      data.resetPasswordExpireQuery = user[0].resetPasswordToken;
      data.resetPasswordExpire = user[0].resetPasswordExpire;
      return data;
    }
    return new User(user[0]).data;
  }

  /**
   * Create a user
   * @param {*} user
   * @returns
   */
  static async create(user) {
    const db = new Database();
    user.password = await User.encryptPassword(user.password.toString());
    let insertQuery = `INSERT INTO users(name, username, email, passwd, role) VALUES(?, ?, ?, ?, ?);`;

    return db.queryDatabase(insertQuery, [
      user.name,
      user.username,
      user.email,
      user.password,
      'user',
    ]);
  }

  /**
   * Admin creates a user. Admin can decide the role
   * @param {*} user
   * @returns the user created - a promise
   */
  static async adminCreate(user) {
    const db = new Database();
    user.password = await User.encryptPassword(user.password.toString());
    let insertQuery = `INSERT INTO users(name, username, email, passwd, role) VALUES(?, ?, ?, ?, ?);`;

    return db.queryDatabase(insertQuery, [
      user.name,
      user.username,
      user.email,
      user.password,
      user.role,
    ]);
  }

  /**
   * Find the user and update its information
   * @param {*} id of the user
   * @param {*} user object
   * @returns result - a promise
   */
  static async findByIdAndUpdate(id, user) {
    const db = new Database();
    let query = `UPDATE users SET ? WHERE userId = ?`;

    return db.queryDatabase(query, [user, id]);
  }

  /**
   * Set the new password for user
   * @param {*} id of the user
   * @param {*} password - new password
   * @returns result - a promise
   */
  static async setUserPassword(id, password) {
    const db = new Database();
    const newPassword = await User.encryptPassword(password);
    let query = `UPDATE users SET passwd = ? WHERE userId = ?`;
    return db.queryDatabase(query, [newPassword, id]);
  }

  /**
   * Delete the user
   * @param {*} id of the user
   * @returns - a promise
   */
  static async findByIdandDelete(id) {
    const db = new Database();
    let query = `DELETE FROM users WHERE userId = ?`;
    return db.queryDatabase(query, [id]);
  }

  /**
   * Find all the posts of the specific user
   * @param {*} id of the user
   * @returns all posts of that user - a promise
   */
  static async findUserPosts(id) {
    const db = new Database();
    let query = `
      SELECT p.postId, p.title, p.slug, p.content, p.createdAt, p.updatedAt, u.name, u.username, u.profilePic, u.backgroundPic FROM users u 
      INNER JOIN posts p ON u.userId = p.userId 
      WHERE u.userId = ?
      ORDER BY p.postId DESC;
    `;
    const posts = await db.queryDatabase(query, [id]);

    const postsData = [];

    posts.forEach((post) => {
      const data = {
        postId: post.postId,
        postedBy: {
          userId: post.userId,
          username: post.username,
          name: post.name,
          profilePic: post.profilePic,
        },
        title: post.title,
        content: post.content,
        slug: post.slug,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      };

      postsData.push(data);
    });
    return postsData;
  }

  /**
   * Find all comments of the specific user
   * @param {*} id of the user
   * @returns all comments of that user - a promise
   */
  static async findUserComments(id) {
    const db = new Database();
    let query = `
      SELECT p.postId, c.commentId, c.content, c.createdAt, c.updatedAt 
      FROM users u LEFT JOIN comments c 
        ON u.userId = c.commentUserId INNER JOIN posts p 
        ON c.postId = p.postId
      WHERE u.userId = ?
    `;
    return db.queryDatabase(query, [id]);
  }

  /**
   * Update User picture profile
   * @param {*} id of the user
   * @param {*} filename of the profile picture
   * @returns result - a promise
   */
  static async findUserAndUpdatePicture(id, type, filename) {
    const db = new Database();
    let query = `UPDATE users SET ${type} = ? WHERE userId = ?;`;

    return db.queryDatabase(query, [filename, id]);
  }

  /**
   * Encrypting the password
   * @param {*} password
   * @returns hashed password - a promise
   */
  static async encryptPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  /**
   * Generate the JSON token
   * @param {*} userId
   * @returns JSON token with the id and expiration date in the payload
   */
  static getSignedJwtToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  }

  /**
   * Compare the entered password with the correct user password
   * @param {*} enteredPassword
   * @param {*} userPassword
   * @returns a promise
   */
  static matchPassword(enteredPassword, userPassword) {
    return bcrypt.compare(enteredPassword, userPassword);
  }

  /**
   * Generate the token for password reset
   * @param {*} userId of the user
   * @returns the reset Token
   */
  static async getResetPasswordToken(userId) {
    const db = new Database();

    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash token and set to resetPassword
    let resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    const resetPasswordTokenQuery = `UPDATE users SET resetPasswordToken = ? WHERE userId = ?;`;
    await db.queryDatabase(resetPasswordTokenQuery, [
      resetPasswordToken,
      userId,
    ]);

    // Set the expiration in 10 minutes for token
    const timeElapsed = Date.now() + 10 * 60 * 1000;
    const today = new Date(timeElapsed);
    // Format the date to store in MySQL
    let resetPasswordExpire = today
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ');
    const resetPasswordExpireQuery = `UPDATE users SET resetPasswordExpire = ? WHERE userId = ?;`;
    await db.queryDatabase(resetPasswordExpireQuery, [
      resetPasswordExpire,
      userId,
    ]);

    return resetToken;
  }

  /**
   * Empty the Reset Token and Expiration Date
   * @param {*} id of the user
   */
  static async emptyTokenAndExpire(id) {
    const db = new Database();
    const query = `UPDATE users SET resetPasswordToken = NULL, resetPasswordExpire = NULL WHERE userId = ? `;
    await db.queryDatabase(query, [id]);
  }

  /**
   * Check if there is time left for token.
   * @param {*} type of the field
   * @param {*} id of the user
   * @returns time left - a promise
   */
  static async checkTokenTimeLeft(type, id) {
    const db = new Database();
    const query = `SELECT TIMESTAMPDIFF(MINUTE, CURRENT_TIMESTAMP() , ${type}) AS timeLeft FROM users WHERE userId = ?;`;

    return db.queryDatabase(query, [id]);
  }
}

module.exports = User;
