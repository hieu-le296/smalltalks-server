const Database = require('../utils/db_query');

// This class is used to perform the CRUD operations
class Question {
  constructor(question) {
    //Object destructing to access fields of 'question'
    const {
      questionId,
      userId,
      username,
      name,
      title,
      content,
      createdAt,
      updatedAt,
    } = question;

    this.data = {
      questionId,
      postedBy: {
        userId,
        username,
        name,
      },
      title,
      content,
      createdAt,
      updatedAt,
    };
  }

  /**
   * Find all questions
   * @returns questionsData - All questions
   */
  static async findAll(req) {
    const db = new Database();

    let query = `
    SELECT q.questionId, q.title, q.content, u.userId, u.username, u.name, q.createdAt, q.updatedAt
    FROM questions q INNER JOIN users u 
    ON q.userId = u.userId`;

    if (req.searchKey) {
      query += ` WHERE q.title LIKE CONCAT('%','${req.searchKey}','%') OR q.content LIKE CONCAT('%','${req.searchKey}','%')`;
    }

    if (req.limit && req.offset) {
      query += ` LIMIT ${req.limit} OFFSET ${req.offset}`;
    }

    const questions = await db.queryDatabase(query, []);

    const questionsData = [];

    //Format data for each question
    questions.forEach((question) =>
      questionsData.push(new Question(question).data)
    );

    return questionsData;
  }

  /**
   * Find single question by Id
   * @param {id} id of the question
   * @returns single question
   */
  static async findOne(id) {
    const db = new Database();
    let query = `
            SELECT q.questionId, q.title, q.content, q.userId, u.username, u.name, q.createdAt, q.updatedAt
            FROM questions q INNER JOIN users u
            ON q.userId = u.userId
            WHERE q.questionId = ?;`;

    const questions = await db.queryDatabase(query, [id]);
    return new Question(questions[0]).data;
  }

  /**
   * Create a question
   * @param {question} question is the object
   * @returns insertId
   */
  static async create(question) {
    const db = new Database();
    let insertQuery = `INSERT INTO questions(userId, title, content) VALUES(?, ?, ?);`;
    const result = await db.queryDatabase(insertQuery, [
      question.userId,
      question.title,
      question.content,
    ]);
    return result;
  }

  /**
   * Update a question by Id
   * @param {id} id of the question
   * @param {question} question is the object
   */
  static async findByIdAndUpdate(id, question) {
    const db = new Database();
    let query = `UPDATE questions SET title = ?, content = ? WHERE questionId = ?`;
    await db.queryDatabase(query, [question.title, question.content, id]);
  }

  /**
   * Delete a question by Id
   * @param {id} id of the question
   * @returns {}
   */
  static async findByIdAndDelete(id) {
    const db = new Database();
    let query = `DELETE FROM questions WHERE questionId = ?`;
    return await db.queryDatabase(query, [id]);
  }
}

module.exports = Question;
