const Database = require('../utils/db_query');

class Question {
  constructor(userId, title, content, createdAt, updatedAt) {
    this.userId = userId;
    this.title = title;
    this.content = content;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
  static async find() {
    const db = new Database();
    const query = `SELECT * FROM questions`;
    return await db.queryDatabase(query, []);
  }
}

module.exports = Question;
