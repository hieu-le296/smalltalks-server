const Database = require('../utils/db_query');
const { findAll } = require('./questions');

class User {
  constructor(user) {
    const {
      userId,
      name,
      username,
      email,
      password,
      role,
      createdAt,
      updatedAt,
    } = user;

    this.data = {
      userId,
      name,
      username,
      email,
      createdAt,
      updatedAt,
      questions,
      comments,
    };
  }

  static async findAll() {
    const db = new Database();

    let query = 'SELECT * FROM users;';

    return await db.queryDatabase(query, []);
  }
}

module.exports = User;
