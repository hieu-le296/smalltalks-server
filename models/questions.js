const Database = require('../utils/db_query');

class Question {
    constructor()
    constructor(userId, title, content, createdAt, updatedAt) {
        this.userId = userId;
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

module.exports = Question;