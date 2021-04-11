const Database = require('../utils/db_query');
const { findAll } = require('./questions');
const bcrypt = require('bcryptjs');

class User {
  constructor(user) {
    const { userId, name, username, email, role, createdAt, updatedAt } = user;

    this.data = {
      userId,
      name,
      username,
      email,
      role,
      createdAt,
      updatedAt,
    };
  }

  static async findAll() {
    const db = new Database();

    let query = 'SELECT * FROM users;';
    const users = await db.queryDatabase(query, []);
    const usersData = [];

    // Format data for each user
    users.forEach((user) => usersData.push(new User(user).data));

    return usersData;
  }

  static async findOne(field, value) {
    const db = new Database();
    let query = `SELECT * FROM users WHERE ${field} = ?`;
    const user = await db.queryDatabase(query, [value]);
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

  static async findByIdandDelete(id) {
    const db = new Database();
    let query = `DELETE FROM users WHERE userId = ?`;
    return await db.queryDatabase(query, [id]);
  }

  // Encrypt password using bcrypt
  static async encryptPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
}

module.exports = User;
