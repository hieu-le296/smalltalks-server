const Database = require('../utils/db_query');

class Comment {
    constructor()
    constructor(questionId, commentUserId, content, createdAt, updatedAt) {
        this.questionId = questionId;
        this.commentUserId = commentUserId;
        this.content = content;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

module.exports = Comment;