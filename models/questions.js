const Database = require('../utils/db_query');

// This class is used to perform the CRUD operations
class Question {
  constructor() {}
  static async findAll() {
    const db = new Database();
    const query = `
    SELECT q.questionId, q.title, q.content, u.userId, u.username, u.name, q.createdAt, q.updatedAt
    FROM questions q, users u
    WHERE q.questionId = u.userId`;

    const questions = await db.queryDatabase(query, []);
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

  static async create() {}

  static async findByIdAndUpdate(id) {}
}

module.exports = Question;
