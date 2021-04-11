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

    let query = 'SELECT * FROM users;';
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
   * @returns single user
   */
  static async findOne(field, value) {
    const db = new Database();
    let query = `SELECT * FROM users WHERE ${field} = ?`;
    const user = await db.queryDatabase(query, [value]);

    if (field === 'email') {
      const data = new User(user[0]).data;
      data.password = user[0].passwd;
      return data;
    }
    return new User(user[0]).data;
  }

  static async create(user) {
    const db = new Database();
    user.password = await User.encryptPassword(user.password.toString());
    let insertQuery = `INSERT INTO users(name, username, email, passwd, role) VALUES(?, ?, ?, ?, ?);`;

    const result = await db.queryDatabase(insertQuery, [
      user.name,
      user.username,
      user.email,
      user.password,
      'user',
    ]);
    return result;
  }

  /**
   * Find the user and update its information
   * @param {*} id of the user
   * @param {*} user object
   * @returns result
   */
  static async findByIdAndUpdate(id, user) {
    const db = new Database();
    let query = `UPDATE users SET name = ?, username = ?, email = ?, role = ? WHERE userId = ?`;

    return await db.queryDatabase(query, [
      user.name,
      user.username,
      user.email,
      user.role,
      id,
    ]);
  }

  /**
   * Set the new password for user
   * @param {*} id of the user
   * @param {*} password - new password
   * @returns result
   */
  static async setUserPassword(id, password) {
    const db = new Database();
    const newPassword = await User.encryptPassword(password);
    let query = `UPDATE users SET passwd = ? WHERE userId = ?`;
    return await db.queryDatabase(query, [newPassword, id]);
  }

  /**
   * Delete the user
   * @param {*} id of the user
   * @returns
   */
  static async findByIdandDelete(id) {
    const db = new Database();
    let query = `DELETE FROM users WHERE userId = ?`;
    return await db.queryDatabase(query, [id]);
  }

  /**
   * Find all the questions of the specific user
   * @param {*} id of the user
   * @returns all questions of that user
   */
  static async findUserQuestions(id) {
    const db = new Database();
    let query = `
      SELECT q.questionId, q.title, q.createdAt, q.updatedAt FROM users u 
      INNER JOIN questions q ON u.userId = q.userId 
      WHERE u.userId = ?
    `;
    const data = await db.queryDatabase(query, [id]);
    return data;
  }

  /**
   * Find all comments of the specific user
   * @param {*} id of the user
   * @returns all comments of that user
   */
  static async findUserComments(id) {
    const db = new Database();
    let query = `
      SELECT q.questionId, c.commentId, c.content, c.createdAt, c.updatedAt 
      FROM users u LEFT JOIN comments c 
        ON u.userId = c.commentUserId INNER JOIN questions q 
        ON c.questionId = q.questionId
      WHERE u.userId = ?
    `;
    const data = await db.queryDatabase(query, [id]);
    return data;
  }

  /**
   * Update User picture profile
   * @param {*} id of the user
   * @param {*} filename of the profile picture
   * @returns result
   */
  static async findUserAndUpdatePicture(id, filename) {
    const db = new Database();
    let query = `UPDATE users SET profilePic = ? WHERE userId = ?;`;

    return await db.queryDatabase(query, [filename, id]);
  }

  /**
   * Encrypting the password
   * @param {*} password
   * @returns hashed password
   */
  static async encryptPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
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
   * @returns
   */
  static async matchPassword(enteredPassword, userPassword) {
    return await bcrypt.compare(enteredPassword, userPassword);
  }
}

module.exports = User;
