const Database = require('../utils/db_query');

class Question {
  constructor(questionId, userId, title, content, createdAt, updatedAt) {
    this.userId = userId;
    this.title = title;
    this.content = content;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.questionId = questionId;
  }
  static async findAll() {
    const db = new Database();
    const query = `SELECT q.questionId, q.userId, q.title, q.content, q.created_at, q.updateAt, u.username, c.commentUserId, c.content, c.createdAt, c.updateAt
    FROM questions q INNER JOIN 
    users u ON q.userId = u.userId LEFT join  comments c 
    ON
          c.questionId = q.questionId;
       `;

    const data = await db.queryDatabase(query, []);

    let comments = [];

    // Loop through comments to have array

    const questions = {
      questionId: data.questionId,
      title: data.title,
      comments: comments

    }
    console.log(data)
    // return questions;
    return true;
  }

  static async create() {

  }

  static async findByIdAndUpdate(id) {

  }
}

module.exports = Question;
