const Database = require('../utils/db_query');

// This class is for creating the model before CRUD operation
class QuestionModel {
  constructor(questionId, title, content) {
    this.questionId = questionId;
    this.title = title;
    this.content = content;
  }
}

// This class is for API JSON return
class QuestionInfo extends QuestionModel {
  constructor(questionId, title, content, createdAt, updatedAt, postedBy) {
    super(questionId, title, content);
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.postedBy = postedBy;
  }
}

// This class is used to perform the CRUD operations
class Question {
  constructor() {}
  static async findAll() {
    const db = new Database();
    const query = `
    SELECT q.questionId, q.title, q.content, u.userId, u.username, q.createdAt, q.updatedAt
    FROM questions q, users u
    WHERE q.questionId = u.userId`;

    const questions = await db.queryDatabase(query, []);
    let questionInfos = [];
    questions.forEach((question) => {
      const questionInfo = new QuestionInfo(
        question.questionId,
        question.title,
        question.content,
        question.createdAt,
        question.updatedAt,
        {
          userId: question.userId,
          username: question.username,
        }
      );
      questionInfos.push(questionInfo);
    });

    return questionInfos;
  }

  static async create() {}

  static async findByIdAndUpdate(id) {}
}

module.exports = Question;
