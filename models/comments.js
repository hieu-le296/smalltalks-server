const Database = require('../utils/db_query');

class Comment {

    constructor(comment) {

        //Object destructing to access fields of 'comment' 
        const { commentId, commentUserId, name, content, createdAt, updatedAt } = comment;

        //JSON Object structure for comment
        this.data = {
            commentId,
            postedBy: {
                commentUserId,
                name
            },
            content,
            createdAt,
            updatedAt
        }

    }

    /**
     * Method to find all comments linked to a question having unique ID
     *
     */
    static async findAll(questionId) {
        const db = new Database();
        const query =
            `SELECT c.commentId, c.commentUserId, u.name, c.content, c.createdAt, c.updatedAt FROM comments c 
                INNER JOIN users u ON 
                c.commentUserId = u.userId 
                WHERE c.questionId = ?;`;

        const comments = await db.queryDatabase(query, [questionId]);

        const commentsData = [];

        //Format data for each comment 
        comments.forEach(comment => {
            commentsData.push(new Comment(comment).data);
        });

        return commentsData;

    }
}

module.exports = Comment;