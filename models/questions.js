const Database = require('../utils/db_query');

// This class is used to perform the CRUD operations
class Question {
  constructor() {}

  static async findAll() {
    const db = new Database();
    const query = `
    SELECT q.questionId, q.title, q.content, u.userId, u.username, u.name, q.createdAt, q.updatedAt
    FROM questions q, users u
    WHERE q.userId = u.userId`;

    const questions = await db.queryDatabase(query, []);
    return Question.convertJSON(questions);
  }

  static async create(question) {
    const db = new Database();
    let insertQuery = `INSERT INTO questions(userId, title, content) VALUES(?, ?, ?);`;
    const result = await db.queryDatabase(insertQuery, [
      question.userId,
      question.title,
      question.content,
    ]);
    const insertId = result.insertId;
    const foundQuestion = await Question.findById(insertId);
    if (foundQuestion) return Question.convertJSON(foundQuestion);
  }

  static async findById(id) {
    const db = new Database();
    let query = `
            SELECT q.questionId, q.title, q.content, q.userId, u.username, u.name, q.createdAt, q.updatedAt
            FROM questions q, users u
            WHERE q.userId = u.userId AND q.questionId = ?;`;

    const questions = await db.queryDatabase(query, [id]);
    return this.convertJSON(questions);
  }

  static async findByIdAndUpdate(id, question) {
    const db = new Database();
    let query = `UPDATE questions SET title = ?, content = ? WHERE questionId = ?`;
    await db.queryDatabase(query, [question.title, question.content, id]);
    const updatedQuestion = await Question.findById(id);
    return Question.convertJSON(updatedQuestion);
  }

  static async findByIdAndDelete(id) {
    const db = new Database();
    let query = `DELETE FROM questions WHERE questionId = ?`;
    return await db.queryDatabase(query, [id]);
  }

  static convertJSON(questions) {
    let questionInfos = [];
    questions.forEach((question) => {
      const questionInfo = {
        questionId: question.questionId,
        title: question.title,
        content: question.content,
        createdAt: question.createdAt,
        updatedAt: question.updatedAt,
        postedBy: {
          userId: question.userId,
          username: question.username,
          name: question.name,
        },
      };

      questionInfos.push(questionInfo);
    });
    return questionInfos;
  }
}

module.exports = Question;
