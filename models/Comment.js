const Database = require('../utils/db_query');

class Comment {
  constructor(comment) {
    //Object destructing to access fields of 'comment'
    const {
      commentId,
      commentUserId,
      name,
      username,
      profilePic,
      content,
      createdAt,
      updatedAt,
    } = comment;

    //JSON Object structure for comment
    this.data = {
      commentId,
      postedBy: {
        commentUserId,
        name,
        username,
        profilePic,
      },
      content,
      createdAt,
      updatedAt,
    };
  }

  /**
   * Method to find all comments linked to a post having unique ID
   * @param {*} postId
   * @param {*} req
   * @returns commentsData
   */
  static async findAll(postId, req) {
    const db = new Database();
    let query = `SELECT c.commentId, c.commentUserId, u.name, u.username, u.profilePic, c.content, c.createdAt, c.updatedAt FROM comments c 
                INNER JOIN users u ON 
                c.commentUserId = u.userId 
                WHERE c.postId = ? ORDER BY c.createdAt DESC`;

    if (req.searchKey) {
      query += ` AND c.content LIKE CONCAT('%','${req.searchKey}','%')`;
    }

    const comments = await db.queryDatabase(query, [postId]);

    const commentsData = [];

    //Format data for each comment
    comments.forEach((comment) => commentsData.push(new Comment(comment).data));

    return commentsData;
  }

  /**
   * Method to find one comment by id
   * @param {*} id of the comment
   * @returns single commment
   */
  static async findOne(id) {
    const db = new Database();
    const query = `SELECT c.commentId, c.commentUserId, u.name, u.username, u.profilePic, c.content, c.createdAt, c.updatedAt FROM comments c 
            INNER JOIN users u ON 
            c.commentUserId = u.userId 
            WHERE c.commentId = ?`;

    const comment = await db.queryDatabase(query, [id]);

    //Response from database is returned as array - so get the first element/row of array and format it in JSON
    return new Comment(comment[0]).data;
  }

  /**
   * Method to create a comment for a post
   * @param {*} commentData
   * @returns insertId - a promise
   */
  static async create(commentData) {
    const { postId, commentUserId, content } = commentData;

    const db = new Database();
    const query = `INSERT INTO comments (postId,commentUserId,content) values(?,?,?)`;

    return db.queryDatabase(query, [postId, commentUserId, content]);
  }

  /**
   * Method to update a comment for a post
   * @param {*} id
   * @param {*} commentData
   * @returns updated comment
   */
  static async update(id, commentData) {
    const { content } = commentData;

    const db = new Database();

    const query = `UPDATE comments SET content = ? WHERE commentId = ?`;

    await db.queryDatabase(query, [content, id]);

    //Return JSON object of new comment to frontend -- including info of user who posted the comment
    return Comment.findOne(id);
  }

  /**
   * Method to delete a comment for a post
   * @param {*} commentId of the comment
   * @returns a promise
   */
  static async delete(commentId) {
    const db = new Database();
    const query = `DELETE FROM comments WHERE commentId = ?`;
    return db.queryDatabase(query, [commentId]);
  }
}

module.exports = Comment;
