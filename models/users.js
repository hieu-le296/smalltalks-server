const Database = require('../utils/db_query');

class User {
    constructor()
    constructor(name, username, email, password, role, profilePic, createdAt, updatedAt) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
        this.profilePic = profilePic;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

module.exports = User;