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
        comments.forEach(comment => commentsData.push(new Comment(comment).data));

        return commentsData;

    }

    /**
     * Method to find one comment by id
     */
    static async findOne(id){
        const db = new Database();
        const query =
            `SELECT c.commentId, c.commentUserId, u.name, c.content, c.createdAt, c.updatedAt FROM comments c 
            INNER JOIN users u ON 
            c.commentUserId = u.userId 
            WHERE c.commentId = ?`;

        const comment = await db.queryDatabase(query, [id]);

    //Response from database is returned as array - so get the first element/row of array and format it in JSON
        return new Comment(comment[0]).data;

    }

    /**
     * Method to create a comment for a question
     */
    static async create(commentData){

        const {questionId,commentUserId,content} = commentData;

        const db = new Database();
        const query =
            `INSERT INTO comments (questionId,commentUserId,content) values(?,?,?)`;

        const comment = await db.queryDatabase(query,[
            questionId,
            commentUserId,
            content
        ]);

        //Return JSON object of new comment to frontend -- including info of user who posted the comment
        return Comment.findOne(comment.insertId);


    }
}

module.exports = Comment;